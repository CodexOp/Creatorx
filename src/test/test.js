const Creatorx = artifacts.require('Creatorx.sol')
const { assert } = require('chai');

require('chai')
.use(require('chai-as-promised'))
.should()




contract('Creatorx', ([deployer, author, tipper])=>{
    let creatorx

    before(async()=>{
        creatorx = await Creatorx.deployed()
    })
  
    describe('deployment', async()=>{
        it('deploys successfully', async()=>{
            const address = await creatorx.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async()=>{
            const name =  await creatorx.name()
            assert.equal(name, 'Creatorx')
        })
    })

    

    describe('images', async()=>{
        let result;
        let hash = 'abc123';

        before(async()=>{
            result = await creatorx.uploadImage(hash, 'image Description', {from:author})
            imageCount = await creatorx.imageCount()

        })



       it('create images', async()=>{
 // success
 assert.equal(imageCount, 1)
 const event = result.logs[0].args
 assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
 assert.equal(event.hash, hash, 'hash is correct')
 assert.equal(event.description, 'image Description', 'desc is correct')
 assert.equal(event.tipAmount, 0, 'tip is correct')
 assert.equal(event.author, author, 'author is correct')
 assert.equal()

 // failure test

 await creatorx.uploadImage('','Image Description', {from:author}).should.be.rejected;
 await creatorx.uploadImage('hash','', {from:author}).should.be.rejected;

       })

       it('list images', async()=>{
           const image = await creatorx.images(imageCount)
           assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
           assert.equal(image.hash, hash, 'hash is correct')
           assert.equal(image.description, 'image Description', 'desc is correct')
           assert.equal(image.tipAmount, 0, 'tip is correct')
           assert.equal(image.author, author, 'author is correct')
       })


       

    it('allow user to tip', async()=>{
        let oldAuthorBalance;
    
        oldAuthorBalance = await web3.eth.getBalance(author);
        oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);
    
        result = await creatorx.tipImage(imageCount, {from:tipper, value: web3.utils.toWei('1', 'Ether')})
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
        assert.equal(event.hash, hash, 'hash is correct')
        assert.equal(event.description, 'image Description', 'desc is correct')
        assert.equal(event.tipAmount, 1000000000000000000, 'tip is correct')
        assert.equal(event.author, author, 'author is correct')
    
        
        let newAuthorBalance
        newAuthorBalance = await web3.eth.getBalance(author)
        newAuthorBalance = new web3.utils.BN(newAuthorBalance)
    
    
        let tipImageOwner
        tipImageOwner = web3.utils.toWei('1', 'Ether')
        tipImageOwner = new web3.utils.BN(tipImageOwner)
    
    
        const expectedBalance = oldAuthorBalance.add(tipImageOwner)
        assert.equal(newAuthorBalance.toString(), expectedBalance.toString())
    
        // falilure check
    
        await creatorx.tipImage(99, {from:tipper, value:web3.utils.toWei('1', 'Ether')}).should.be.rejected
     
        })
    
    
    
    })




    


})

