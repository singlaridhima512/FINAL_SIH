import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    // Fetch products and cart
    useEffect(() => {

        const fetchData = async () => {

            try {

                const productsResponse = await fetch(
                    "http://localhost:8000/api/marketplace"
                );

                const productsData =
                    await productsResponse.json();

                setProducts(productsData);


                const cartResponse = await fetch(
                    "http://localhost:8000/api/cart"
                );

                const cartData =
                    await cartResponse.json();

                setCart(cartData);

            } catch (error) {

                console.error(error);

                alert("Cannot connect to backend.");

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, []);


    // Find product details
    const getProduct = (productId) => {

        return products.find(
            product => product.id === productId
        );

    };


    // Update quantity
    const updateQuantity = async (productId, quantity) => {

        if (quantity < 1) {
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8000/api/cart/update",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        productId,
                        quantity
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setCart(data.cart);

        } catch (error) {

            console.error(error);

        }
    };


    // Remove product
    const removeProduct = async (productId) => {

        try {

            const response = await fetch(
                `http://localhost:8000/api/cart/remove/${productId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setCart(data.cart);

        } catch (error) {

            console.error(error);

        }
    };


    // Calculate total
    const total = cart.reduce(
        (sum, item) => {

            const product = getProduct(item.productId);

            if (!product) {
                return sum;
            }

            return sum + product.price * item.quantity;

        },
        0
    );


    // Place order
    const placeOrder = async () => {

        try {

            const response = await fetch(
                "http://localhost:8000/api/orders/place",
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setCart([]);

            navigate("/order-success");

        } catch (error) {

            console.error(error);

            alert("Cannot place order.");

        }
    };


    if (loading) {

        return (
            <main className="page-container">

                <div className="empty-state">

                    <h3>
                        Loading cart...
                    </h3>

                </div>

            </main>
        );

    }


    return (

        <main className="page-container">

            <div className="page-header">

                <p className="small-text">
                    AQUACORE STORE
                </p>

                <h1>
                    Your Cart
                </h1>

                <p>
                    Review your selected products before ordering.
                </p>

            </div>


            {cart.length === 0 ? (

                <div className="empty-state">

                    <div className="empty-icon">
                        🛒
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some products from the marketplace.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/marketplace")
                        }
                    >
                        Go to Marketplace
                    </button>

                </div>

            ) : (

                <div className="cart-layout">

                    {/* Cart Items */}

                    <div className="cart-items">

                        {cart.map(item => {

                            const product =
                                getProduct(item.productId);

                            if (!product) {
                                return null;
                            }

                            return (

                                <div
                                    className="cart-item"
                                    key={item.productId}
                                >

                                    <div className="cart-product-icon">
                                        {product.icon || "🐟"}
                                    </div>


                                    <div className="cart-product-info">

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <p>
                                            {product.description}
                                        </p>

                                        <strong>
                                            ₹{product.price}
                                        </strong>

                                    </div>


                                    <div className="cart-actions">

                                        <div className="quantity-control">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>


                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeProduct(
                                                    item.productId
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>


                    {/* Order Summary */}

                    <div className="cart-summary">

                        <p className="small-text">
                            ORDER SUMMARY
                        </p>

                        <h2>
                            ₹{total}
                        </h2>

                        <p>
                            Total amount
                        </p>

                        <button
                            className="primary-btn"
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            )}

        </main>

    );
}

export default Cart;