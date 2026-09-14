import { Link } from "react-router-dom";

function OrderSuccess() {
    return (
        <main className="page-container success-page">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <p className="small-text">ORDER CONFIRMED</p>

                <h1>Order Placed Successfully!</h1>

                <p className="success-message">
                    Your AquaCore products have been ordered successfully.
                    You can continue exploring the marketplace or return
                    to your dashboard.
                </p>

                <div className="success-actions">
                    <Link to="/marketplace" className="secondary-btn">
                        Continue Shopping
                    </Link>

                    <Link to="/home" className="primary-btn">
                        Go to Dashboard
                    </Link>
                </div>

            </div>

        </main>
    );
}

export default OrderSuccess;