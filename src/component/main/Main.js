import React, {useEffect, useState} from 'react';
import './main.css';
import Navbar from "../navbar/Navbar";
import Web3 from 'web3';
import Creatorx from '../../build/contracts/Creatorx.json';
import Form from '../Form/Form'
import { create } from 'ipfs-http-client';
import Identicon from 'react-identicons';
const ipfs = create({host:'ipfs.infura.io', apiPath:'/api/v0', port:5001, protocol: 'https'})


const Main =() => {

   const [accMain, setAccounts] = useState();
   const [creatorxState, setCreatorx] = useState(null);
   const [images, setImages] = useState([]);
   const [Loading, setLoading] = useState(false);
   const [buffers, setBuffer] = useState();
   const [hash, sethash] = useState();
   var mine = [];

  
    useEffect(() => {
        connectWeb3()
        loadData()
    return () => {}
        }, [])
        


    //this connect metamask to our web3 application

    const connectWeb3 = async() => {
        if (typeof window.ethereum !== 'undefined') {
           const accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' });
           window.web3 = new Web3(window.ethereum);
           setAccounts(accounts[0])
          }
        return
        }


        const tipImage = (id, tipAmount) =>{
           creatorxState.methods.tipImage(id).send({from:accMain, value:tipAmount}).on('transactionHash', (hash) =>{
        } ) 
    }



        const loadData = async() =>{
    // network id
    const web3 = window.web3
    const networkId =  await window.ethereum.request({ method: 'net_version' })
    const newtworkData = await Creatorx.networks[networkId]
    if(newtworkData){
        const creatorx = new window.web3.eth.Contract(Creatorx.abi, newtworkData.address)
        setCreatorx(creatorx)
        const imageCount = await creatorx.methods.imageCount().call()
        console.log(imageCount)

        for (var i = 1; i<= imageCount; i++){
            const image = await creatorx.methods.images(i).call();
            mine.push(image) 
        }
        setImages(mine)

        images.sort((a,b) => b.tipAmount - a.tipAmount)
        setLoading(false);
    }


    else{
    alert('creatorx contract is not deployed')
    }
        }




        const captureFile = (e) =>{
            e.preventDefault()
            const file = e.target.files[0]
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)

            reader.onloadend = () =>{
            setBuffer(Buffer(reader.result))
            }
           }


           const uploadImage = async(description) =>{
           await ipfs.add(buffers).then((res)=>{
            console.log('submitting file to IFPS')
            sethash(res.path)
            const hashtry = res.path
            setLoading(true)
               creatorxState.methods.uploadImage(hashtry, description).send({from:accMain}).on('transactionHash', (hash)=>{
                setLoading(false)
               })
           }).catch((error=>{
            console.log(error)
           }))
 


               
           }


    return (
        <div>   
            {Loading ? <div> <Navbar Acc = {accMain}/>
<div id="loader" ><p>Loading ....</p> </div> </div>: 
            <>
            <Navbar Acc = {accMain}/>
            <div className='whole_body'>
            <Form captureFile={captureFile} uploadImage={uploadImage}/>
            <div className='posts'>
               
               {images.map((image, key)=>{
                   return (
                       <>
                       <div className='card_header'>
                           <div className='head'>
                       <Identicon className="main_avatar" string={image.author} />
                       <small className='author'>{image.author}</small>
                       </div>
                       <ul id="image_list">
                           <li className='imd'>
                               
                               <img className="image_post" src={`https://ipfs.infura.io/ipfs/${image.hash}`} key={key}/>
                               <p className='image_desc'>{image.description}</p>
                           </li>
                           <li className="tips_section" key={key}>
                           <small className='tips'>
                               TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                           </small>
                           <button className='sendEther'
                           name={image.id}
                           onClick={(event)=>{
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            tipImage(event.target.name, tipAmount)
                             

                           }}>
                           TIP 0.1 ETH
                           </button>
                           </li>
                       </ul>

                       </div>
                       </>
                   )
               })}
            </div>
            </div>
            </>
            }

        </div>
    )




}

export default Main
