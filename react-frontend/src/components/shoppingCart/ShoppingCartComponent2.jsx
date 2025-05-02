import React, { useState } from "react";
// import ShoppingCart from "../../models/shoppingCart";
import useShoppingCart from "../../hooks/useShoppingCart";

const ShoppingCartComponent2 = () => {

    const { items, addItem, clearCart} = useShoppingCart("Euros")

    const handleAddItem = () => {
        console.log("adding item ...")

        const newItem = {
            id: 1,
            nombre: "camiseta",
            precio: 2.99,
            cantidad: 2
        }

        addItem(newItem)
    }

    return (
        <>
            <button onClick={handleAddItem}>Add item</button>

            <ul>
                {items.map((item, index) => (
                    <>
                        <li key={index.id}>{item.nombre} - {item.cantidad} - {item.precio}€</li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default ShoppingCartComponent2