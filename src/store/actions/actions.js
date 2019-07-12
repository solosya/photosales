import store from '../store';
import Shop from '../../containers/checkout/shop';
import axios from 'axios';

export const TOGGLE_FAVOURITE       = 'TOGGLE_FAVOURITE';
export const TOGGLE_CART            = 'TOGGLE_CART';
export const ADD_ITEM_TO_CART       = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART  = 'REMOVE_ITEM_FROM_CART';
export const UPDATE_CART_ITEM       = 'UPDATE_CART_ITEM';
export const TOTAL_CART             = 'TOTAL_CART';

const getLineItemsFromCart = (cart) => {
    const items = [];
    for (let i=0; i<cart.length; i++) {
        let cartItem = cart[i];
        for (let j=0; j<cartItem.lineItems.length; j++) {
            let photo = cartItem.lineItems[j];
            items.push(photo);
        }
    }
    return items;
}

const placeLineItemsIntoCart = (cart, discountItems) => {
    for (let i=0; i<discountItems.length; i++) {
        let discountedItem = discountItems[i];
        discounts:
        for (let j=0; j<cart.length; j++) {
            let originalPhoto = cart[j];
            for (let k=0; k<originalPhoto.lineItems.length; k++) {
                let originalItem = originalPhoto.lineItems[k];
                if (originalItem.id === discountedItem.id && originalItem.photoId === discountedItem.photoId) {
                    originalPhoto.lineItems[k] = discountedItem;
                    break discounts;
                }
            }
        }
    }
    return JSON.parse(JSON.stringify( cart ));
}

const calculateTotal = (cart) => {
    const flatCart = getLineItemsFromCart(cart)
    const shop = new Shop(flatCart);
    const total = shop.calculateTotal();
    cart = placeLineItemsIntoCart(cart, total.cart);
    return {
        total:total.total,
        finalCart: cart
    }
}


export const addItemToCart = (product) => {
    return dispatch => {
        dispatch(add(product));
        const cart = store.getState()['cart'];
        setTimeout(() => {
            dispatch(total(cart));

        },2000);
    }
}

export const updateCartItem = (product) => {
    return dispatch => {
        dispatch(update(product));
        const cart = store.getState()['cart'];
        setTimeout(() => {
            dispatch(total(cart));
        },2000);
    }
}


export const add = (product) => {
    let car =  {
        type: ADD_ITEM_TO_CART,
        product
    }
    return car;
}

export const update = (product) => {
    let car =  {
        type: UPDATE_CART_ITEM,
        product
    }
    return car;
}


export const total = (cart) => {
    // let {total, finalCart} = calculateTotal(cart);
    console.log('calling the backend here');
    axios.post('/api/shop/total', {"cart": cart} )
    .then((r) => {
        console.log(r);
        
        // let car =  {
        //     type: TOTAL_CART,
        //     total,
        //     cart: finalCart
        // }
        // return car;
        return {};
    });

    return {};

}