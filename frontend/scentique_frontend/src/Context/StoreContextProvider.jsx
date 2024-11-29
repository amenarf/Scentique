import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [perfumeList, setPerfumeList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token , setToken]=useState(""); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:7777/api/category/2/');
                setPerfumeList(response.data);
            } catch (error) {
                console.error("Error fetching the perfume list:", error);
            }
        };

        fetchData();
    }, []);

    const removeFromCart = (id) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };
            if (updatedCart[id] > 0) {
                updatedCart[id] -= 1;
            }
            return updatedCart;
        });
    };

    // Fonction pour obtenir le total des montants du panier
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, id) => {
            const item = perfumeList.find((perfume) => perfume._id === id);
            return total + (item?.price || 0) * cartItems[id];
        }, 0);
    };
    useEffect(()=>{
        if (localStorage.getItem("Token")){
        setToken(localStorage.getItem("Token"))
    }
    
    },[])

    const contextValue = {
        perfumeList,
        cartItems,
        removeFromCart,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
