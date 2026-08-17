function Contact() {
    return (
        <div className="page">

            <section className="contact-section">

                <h1>Contact Us </h1>

                <p> Coimbatore, Tamil Nadu</p>

                <p> +91 98765 43210</p>

                <p>📧 carshop@gmail.com</p>

                <div className="map-container">

                    <iframe
                        src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu&output=embed"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Car Shop Location"
                    ></iframe>

                </div>

            </section>

        </div>
    );
}

export default Contact;