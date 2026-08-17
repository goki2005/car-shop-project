function Address() {

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Address submitted successfully! ✅");
    };

    return (
        <div className="page">

            <h1 className="title">
                 Delivery Address
            </h1>

            <form
                className="address-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Your Name"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    required
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                />

                <textarea
                    placeholder="Full Address"
                    required
                ></textarea>

                <input
                    type="text"
                    placeholder="City"
                    required
                />

                <input
                    type="text"
                    placeholder="Pincode"
                    required
                />

                <button type="submit">
                    Submit Address
                </button>

            </form>

        </div>
    );
}

export default Address;