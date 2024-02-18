import { useState } from 'react';
import './ContactUs.css'
import csrfFetch from '../store/csrf';

const ContactUs = () => {
    const [contactValues, setContactValues] = useState({name: '', email: '', message: ''})
    const [messageState, setMessageState] = useState('unsent')
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await csrfFetch('/api/contact',{
            method: "POST",
            body: JSON.stringify({message: contactValues})
        })
        if(res.ok){
            setMessageState('sent')
        }
    }

    const contactForm = () => {
        if(messageState === 'unsent'){
            return (
                <>
                    <h2>Send a Message</h2>
                    <form className="contact-us-form" onSubmit={handleSubmit}>
                        <input type='text' placeholder='Name' value={contactValues.name} onChange={e => setContactValues(prevValues => ({...prevValues, name: e.target.value}))}/>
                        <input type='text' placeholder='Email'value={contactValues.email} onChange={e => setContactValues(prevValues => ({...prevValues, email: e.target.value}))}/>
                        <textarea placeholder='Your message here.' value={contactValues.message} onChange={e => setContactValues(prevValues => ({...prevValues, message: e.target.value}))}/>
                        <button>Send Message</button>
                    </form>
                </>
            )
        }else{
            return (
                <div className="contact-us-success-message" style={{fontSize: '20px', color: 'var(--primary-green)', fontWeight: 'bold'}}>
                    Message Sent
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