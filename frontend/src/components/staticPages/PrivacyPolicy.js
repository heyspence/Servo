import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy">
            <h1>Servo Privacy Policy</h1>
            <section>
                <p><strong>Effective Date: Mar 9, 2024</strong></p>
                <p>Welcome to Servo, LLC ("Servo", "we", "us", "our"). We respect your privacy and are committed to protecting it through our compliance with this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website ("Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
            </section>
            <section>
                <h2>Our Commitment to Your Privacy</h2>
                <p>At Servo, LLC, we hold the privacy of your personal information in the highest regard. We do not sell or share your information with anyone, except as necessary to provide the services you request. Specifically, when you place an order through our Website, we share your name, address, phone number, service preferences, property details, order date, and email address only with the companies with whom you have placed an order. This sharing is essential for the fulfillment of the service you have requested from us and is conducted with your privacy in mind.</p>
            </section>
            <section>
                <h2>Information We Collect About You and How We Collect It</h2>
                <p>We collect several types of information from and about users of our Website, including information:</p>
                <ul>
                    <li>By which you may be personally identified, such as name, postal address, email address, telephone number ("personal information");</li>
                    <li>That is about you but individually does not identify you, such as your home's square footage and your service preferences, which you may provide in our instant quote forms on service provider pages;</li>
                    <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
                </ul>
                <p>We collect this information:</p>
                <ul>
                    <li>Directly from you when you provide it to us, including when you fill out instant quote forms or place an order.</li>
                    <li>Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses, and information collected through cookies and other tracking technologies.</li>
                </ul>
            </section>

            <section>
                <h2>How We Use Your Information</h2>
                <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
                <ul>
                    <li>To present our Website and its contents to you.</li>
                    <li>To provide you with information, products, or services that you request from us, including generating instant quotes based on the square footage of your home and your service preferences.</li>
                    <li>To fulfill any other purpose for which you provide it.</li>
                    <li>To provide you with notices about your account/subscription, including expiration and renewal notices.</li>
                    <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                    <li>To notify you about changes to our Website or any products or services we offer or provide through it.</li>
                    <li>To allow you to participate in interactive features on our Website.</li>
                    <li>In any other way we may describe when you provide the information.</li>
                    <li>For any other purpose with your consent.</li>
                </ul>
            </section>

            <section>
                <h2>Payments</h2>
                <p>For payment processing, we use third-party services (e.g., payment processors). Our third-party payment processor, Stripe, securely stores your card information for future use when you place an order on our Website. We do not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. All transactions require your explicit, on-session consent.</p>
                <p>Stripe adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express, and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
            </section>
                    <section className="contact-info">
                        <h2>Contact Information</h2>
                        <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at:</p>
                        <p>Email: <a href="mailto:spencer@bookservo.com">spencer@bookservo.com</a></p>
                        <p>Phone: <a href="tel:9717771485">(971) 777-1845</a></p>
                    </section>
                </div>
        </div>
    )
}

export default PrivacyPolicy;