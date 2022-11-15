import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {

    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)
    const [checkoutId, setCheckoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')

    async function addToCart(newItem) {
        setCartOpen(true)
        
        if (cart.length === 0) {
            setCart([newItem])
            // the following is coming from our product form where we create our object with id and variant quanitty. 
            const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

            setCheckoutId(checkout.id)
            setCheckoutUrl(checkout.webUrl)

            localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))

        } else {
            let newCart = [...cart]
// here w're checking if the id of the new item already exists in the car. It if does exist we'll increase the quantity of the variant quantity in the cart. If it doesn't already exist we'll add it to the cart and set the new cart to the state.
            cart.map(item => {
                if (item.id === newItem.id) {
                    item.variantQuantity++
                    newCart = [...cart]
                } else {
                    newCart = [...cart, newItem]
                }
            })
// below we're updating the cart object and the checkout object.
            setCart(newCart) 

            const newCheckout = await updateCheckout(checkoutId, newCart)
            localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
        }
    }

    //     async function removeCartItem(itemToRemove) {
    //     // to remove items we use built in js filter method 
    //     const updatedCart = cart.filter(item => item.id !== itemToRemove)
    //     //sets updated cart to cart, localstorage, and checkout 
    //     setCart(updatedCart)
    //     const newCheckout = await updateCheckout(checkoutId, updatedCart)

    //     localStorage.setItem('checkout_id', JSON.stringify([updatedCart, newCheckout]))
    //     //if card is less then one the it closes automatically 
    //     if (cart.length === 1) {
    //         setCartOpen(false)
    //     }
      
    // }

  return (
      <CartContext.Provider value={{
          cart,
          cartOpen,
          setCartOpen,
          addToCart,
          checkoutUrl
      }}>
          {children}
    </CartContext.Provider>
  )
} 

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
// we've now set up our cart context and we're going to wrap our app in the provider. We'll also need to import the provider into our _app.js file.
