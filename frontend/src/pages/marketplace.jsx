import { useEffect, useState } from "react";

function Marketplace() {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const categories = [
        "All",
        "Fish Health",
        "Bacterial Treatment",
        "Water Care"
    ];


    // Get products from backend
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8000/api/marketplace"
                );

                const data = await response.json();

                setProducts(data);

            } catch (error) {

                console.error("Error fetching products:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchProducts();

    }, []);


    // Add product to cart
    const addToCart = async (productId) => {

        try {

            const response = await fetch(
                "http://localhost:8000/api/cart/add",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        productId: productId
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Product added to cart!");

        } catch (error) {

            console.error(error);

            alert("Cannot connect to backend.");

        }
    };


    // Filter products
    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                product =>
                    product.category === selectedCategory
            );


    return (

        <main className="page-container">

            <div className="page-header">

                <p className="small-text">
                    AQUACORE STORE
                </p>

                <h1>
                    Marketplace
                </h1>

                <p>
                    Products to keep your fish and aquarium healthy.
                </p>

            </div>


            {/* Categories */}

            <div className="category-buttons">

                {categories.map(category => (

                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "category-btn active"
                                : "category-btn"
                        }
                        onClick={() =>
                            setSelectedCategory(category)
                        }
                    >
                        {category}
                    </button>

                ))}

            </div>


            {/* Loading */}

            {loading && (

                <div className="empty-state">

                    <h3>
                        Loading products...
                    </h3>

                </div>

            )}


            {/* Products */}

            {!loading && (

                <div className="marketplace-grid">

                    {filteredProducts.map(product => (

                        <div
                            className="product-card"
                            key={product.id}
                        >

                            <div className="product-icon">
                                {product.icon || "🐟"}
                            </div>

                            <p className="product-category">
                                {product.category}
                            </p>

                            <h3>
                                {product.name}
                            </h3>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <div className="product-rating">
                                ⭐ {product.rating}
                            </div>

                            <div className="product-bottom">

                                <strong>
                                    ₹{product.price}
                                </strong>

                                <button
                                    className="primary-btn"
                                    onClick={() =>
                                        addToCart(product.id)
                                    }
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {!loading &&
                filteredProducts.length === 0 && (

                    <div className="empty-state">

                        <h3>
                            No products found
                        </h3>

                        <p>
                            Try another category.
                        </p>

                    </div>

                )}

        </main>

    );
}

export default Marketplace;