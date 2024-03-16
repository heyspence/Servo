import './VendorOnboarding.css'
import {useHistory} from "react-router-dom/cjs/react-router-dom.min"

const VendorOnboarding = () => {
    const history = useHistory();
    const handleGetInTouchClick = () => {
        history.push('/contact-us')
    }

    return (
        <div className="vendor-onboarding-container">
            <div className="vendor-onboarding">
                <h1>Grow Your Home Service Business with Servo</h1>
                <p style={{marginBottom: '50px'}}>Designed for businesses ready to elevate their operations, Servo opens the door to a new customer base without the burden of traditional advertising costs or lead generation fees.</p>
                <div className="comparison-chart" style={{marginBottom: '60px'}}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'left', fontWeight:'bold', fontSize: '18px' }}>Features</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center', fontWeight:'bold', fontSize: '18px' }}>Servo</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center', fontWeight:'bold', fontSize: '18px' }}>Lead Generation Sites</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>Confirmed Bookings</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>✔️</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>❌</td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>Custom CRM Integration</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>✔️</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>❌</td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>Instant Online Quoting</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>✔️</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>❌</td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>No Upfront Costs</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>✔️</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>❌</td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>Commission-Based Model</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>✔️</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>❌</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                <h2>Why Partner with Servo?</h2>
                <p>Partnering with Servo means accessing a supplemental stream of job bookings, seamlessly integrating into your workflow and boosting your business without interrupting your day-to-day operations.</p>

                <h2>No Lead Generation Fees</h2>
                <p>With Servo, say goodbye to upfront costs, monthly subscriptions, and hidden charges. We're your tech ally, focusing on supporting your growth, not exploiting it. Our commission-based model aligns our success with yours, ensuring a partnership where your growth is our priority.</p>

                <h2>Seamless Integration and Operations</h2>
                <p>Integration with Servo is smooth, allowing the incoming jobs to merge into your workflow effortlessly. We take on the burden of scheduling and payment processing, automating the mundane to let you concentrate on what you do best—providing outstanding service.</p>

                <h2>Long-Term in Mind</h2>
                <p>At Servo, our aim goes beyond mere transactions; we strive to be your long-term partner. Understanding that trust is earned over time, we commit to supporting your business growth every step of the way.</p>

                <h2>Efficient Scheduling and Quoting</h2>
                <p>Say farewell to the endless back-and-forth. Our systems enable you to offer instant quotes and real-time availability, simplifying the booking process and increasing your conversion rates.</p>

                <h2>Transparent, Hassle-Free Payouts</h2>
                <p>No more payment delays or chasing after invoices. Servo ensures your payments are processed promptly and securely, so you can focus more on your services and less on the finances.</p>

                <h2>Join Us and Start Growing Today</h2>
                <p>Partnering with Servo is straightforward. Get in touch, and our team will guide you through the setup process. There’s no commitment or signup cost. Experience how Servo can revolutionize your business and propel you to new achievements.</p>

                <button onClick={handleGetInTouchClick} style={{margin: '40px 0 0 0', width: '150px'}}>Get In Touch</button>
            </div>
        </div>
    )
}

export default VendorOnboarding;