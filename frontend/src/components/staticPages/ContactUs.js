import { useState } from 'react';
import './ContactUs.css'
import csrfFetch from '../store/csrf';

const ContactUs = () => {
    const [contactValues, setContactValues] = useState({name: '', email: '', message: ''})
    const [messageState, setMessageState] = useState('unsent')
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if((Object.values(contactValues).every(val => val.trim() !== '')) && messageState !== 'loading'){ 
            setMessageState('loading')
            const res = await csrfFetch('/api/contact',{
                method: "POST",
                body: JSON.stringify({message: contactValues})
            })
            if(res.ok){
                const waitDelay = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        resolve('One Second Has Passed')
                    }, 500)
                })
                await waitDelay
                setMessageState('sent')
            }
        }
    }

    const contactForm = () => {
        if(messageState === 'unsent' || messageState === 'loading'){
            return (
                <>
                    <h2>Send a Message</h2>
                    <form className="contact-us-form" onSubmit={handleSubmit}>
                        <input type='text' placeholder='Name' value={contactValues.name} onChange={e => setContactValues(prevValues => ({...prevValues, name: e.target.value}))}/>
                        <input type='text' placeholder='Your Email'value={contactValues.email} onChange={e => setContactValues(prevValues => ({...prevValues, email: e.target.value}))}/>
                        <textarea placeholder='Your message here.' value={contactValues.message} onChange={e => setContactValues(prevValues => ({...prevValues, message: e.target.value}))}/>
                        <button>{messageState === 'loading' ? 'Sending Message...' : 'Send Message'}</button>
                    </form>
                </>
            )
        }else{
            return (
                <div className="contact-us-success-message" style={{fontSize: '20px', color: 'var(--primary-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>
                    <span><img src="https://spencerheywood.com/images/servo/icons/icons-07.png" style={{height:'43px', margin: '-3px 10px 0 0'}}/></span>Message Sent
                </div>
            )
        }
    }

    return (
        <div className="contact-us-container">
            <div className='contact-us'>
                <h1>Contact Us</h1>
                <p><span style={{fontWeight: 'bold'}}>Email:</span> spencer@bookservo.com</p>
                <p><span style={{fontWeight: 'bold'}}>Call or Text:</span> (971) 777-1485</p>
                <br/>
                <hr/>
                <br/>
                {contactForm()}
            </div>
        </div>
    )
}

export default ContactUs;