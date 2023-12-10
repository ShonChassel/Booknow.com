import Navbar from "../navbar/Navbar";
import "./CheckoutSuccess.scss";

const CheckoutSuccess = () => {
    return (
        <div>
            <Navbar />
            <div className="Checkout-Success">
                <h2>Checkout Successful</h2>
                <p>Your order might take some time to process.</p>
                <p>
                    Check your order status at your profile after about 10mins.
                </p>
                <p>
                    Incase of any inqueries contact the support at{" "}
                    <strong>support@booknow.com</strong>
                </p>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
