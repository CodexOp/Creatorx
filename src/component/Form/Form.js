import React, {useState} from 'react';
import './Form.css'

const Form = (props) => {
    const [desc, setdesc] = useState('');
    return (
        <div>
            <div className='form_inner'>
                <h2>Share Images</h2>
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  props.uploadImage(desc)
                }}>
                    <input className='input-form' type='file' accept='.jpg, .jpeg, .png, .bmp, .gif' onChange={props.captureFile} id="image_input"/>
                    <div className='form_group'>
                     <br></br>
                     <input
                     id="imageDescription"
                     type="text"
                     onChange={event => setdesc(event.target.value)}
                     className='form-control'
                     placeholder='Image Description'
                     required
                     />
                    </div>
                    <button className='submit_button' type='submit'>UPLOAD!</button>
                </form>
            </div>
         
        </div>
    )
}

export default Form
