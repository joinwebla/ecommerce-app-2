import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cartData, setCartData] = useState({});

    const loadProducts = () => {
        axios({
            method: 'GET',
            url: 'https://api.chec.io/v1/products',
            params: {},
            headers: {
                "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
            }
        }).then((res) => {
            console.log(res.data.data, "success");
            setProducts(res.data.data)
        }).catch((err) => {
            console.log(err, "failed");
        })
    }

    const createACart = () => {
        const cartID = localStorage.getItem("cartID");
        if(cartID) {
            axios({
                method: 'GET',
                url: `https://api.chec.io/v1/carts/${cartID}`,
                headers: {
                    "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
                }
            }).then((res) => {
                setCartData(res.data)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios({
                method: 'GET',
                url: 'https://api.chec.io/v1/carts',
                headers: {
                    "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
                }
            }).then((res) => {
                localStorage.setItem("cartID", res.data.id);
                setCartData(res.data)
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        loadProducts(); //loading setting to state
        createACart();
    }, [])

    const handleLogout = () => {
        localStorage.setItem("authToken", "");
        window.location.href = "/login"
    }

    const addItemToCart = (productID) => {
        const cartID = localStorage.getItem("cartID");

        axios({
            method: "POST",
            url: `https://api.chec.io/v1/carts/${cartID}`,
            headers: {
                "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
            },
            data: {
                id: productID
            }
        }).then((res) => {
            console.log(res.data.cart);
            setCartData(res.data.cart)
        }).catch((err) => {
            console.log(err);
        })
    }
    const allAddedProductIds = cartData.line_items ? cartData.line_items.map((item) => {return item.product_id}) : [];
    
    return (
        <>
            <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h1>Ecommerce APP</h1>
                <button onClick={handleLogout}>Logout</button>
                <div style={{margin: 20, border: '1px solid', maxWidth: 300, padding: 20}}>
                    <p>Total Products Added - {cartData.total_items || 0}</p>
                    <p>Total Price - {cartData.subtotal ? cartData.subtotal.formatted_with_symbol : 0}</p>
                </div>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                {
                    products.map((product) => {
                        const id = product.id;
                        const isAddedToCart = allAddedProductIds.includes(id); //true //false

                        return(
                            <div className="card" style={{width: 300, margin: 20}}>
                                <img
                                    src={product.image.url}
                                    style={{width: '100%', height: 300}}
                                    className="card-img-top" alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <h6 className="text-success">Price - {product.price.formatted_with_symbol}</h6>
                                    <p className="card-text">
                                        {product.description}
                                    </p>
                                    {
                                        isAddedToCart ? (
                                            <button className="btn btn-danger">Remove from Cart</button>
                                        ) : (
                                            <button onClick={() => {addItemToCart(product.id)}} className="btn btn-primary">Add to Cart</button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home;