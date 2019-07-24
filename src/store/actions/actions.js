//Libraries
import store            from '../store'
import axios            from 'axios'
import qs               from  'qs'
// import { browserHistory } from 'react-router';

//Comopnents
import Shop             from '../../containers/checkout/shop'

//Actions
export const FETCH_SAVED            = 'FETCH_SAVED'
export const TOGGLE_FAVOURITE       = 'TOGGLE_FAVOURITE'
export const TOGGLE_CART            = 'TOGGLE_CART'
export const ADD_ITEM_TO_CART       = 'ADD_ITEM_TO_CART'
export const REMOVE_ITEM_FROM_CART  = 'REMOVE_ITEM_FROM_CART'
export const UPDATE_CART_ITEM       = 'UPDATE_CART_ITEM'
export const TOTAL_CART             = 'TOTAL_CART'
export const LOGIN_ON_REFRESH       = 'LOGIN_ON_REFRESH'
export const LOGIN                  = 'LOGIN'
export const TOGGLE_GUEST           = 'TOGGLE_GUEST'


const getLineItemsFromCart = (cart) => {
    const items = [];
    for (let i=0; i<cart.length; i++) {
        let cartItem = cart[i];
        if (typeof cartItem.lineItems != 'undefined') {
            for (let j=0; j<cartItem.lineItems.length; j++) {
                let photo = cartItem.lineItems[j];
                items.push(photo);
            }
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


export const login = (user, router) => {
    return dispatch => {
        axios.post('/api/auth/login', qs.stringify({"username": user.username, "password": user.password})).then((r) => {
            console.log(r);
            if (r.data.success === 1) {
                dispatch({
                    type: LOGIN_ON_REFRESH,
                    isLoggedIn: true,
                    hasAccess: true,
                });
                router.push(window.basePath + '/checkout');
            }
        });
    }
}


export const guest = (router) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_GUEST,
        });
        router.push(window.basePath + '/checkout');
    }
}




export const toggleFavourite = (photo) => {
    console.log("TIGGLIG", photo);
    
    const loggedIn = store.getState()['isLoggedIn'];
    console.log(loggedIn);
    if (loggedIn) {

        return dispatch => {
    
            axios.post('/api/user/follow-media', qs.stringify({"guid": photo.guid, "type": 'favourite'})).then((r) => {
                console.log(r);
                if (r.data.success === 1) {
                    dispatch({
                        type: TOGGLE_FAVOURITE,
                        photo: photo
                    });
                }
            }).catch(() => {
                // use local storage
                dispatch({
                    type: TOGGLE_FAVOURITE,
                    photo: photo
                });
            });
        }
    }

    return dispatch => {
        // use local storage
        dispatch({
            type: TOGGLE_FAVOURITE,
            photo: photo
        });
    }

}


export const toggleCart = (photo) => {
    console.log("taglling", photo);
    
    return dispatch => {

        const loggedIn = store.getState()['isLoggedIn'];
        if (loggedIn) {
    
            axios.post('/api/user/follow-media', qs.stringify({"guid": photo.guid, "type": 'cart'})).then((r) => {
                console.log("TOGGLING CART", r);
                if (r.data.success === 1) {
                    dispatch({
                        type: TOGGLE_CART,
                        photo: photo
                    });
                }
            }).catch(() => {
                // use local storage
                dispatch({
                    type: TOGGLE_CART,
                    photo: photo
                });
            });
        } else {
            // use local storage
            dispatch({
                type: TOGGLE_CART,
                photo: photo
            });
        }
    }
}


export const fetchSaved = () => {

    const loggedIn = store.getState()['isLoggedIn'];
    //fetch local state to compare against logged in state

    return dispatch => {

        axios.get('/api/user/user-media').then((r) => {

            const media = r.data.media.map((m) => {
                m.url = m.path;
                return m;
            });
            console.log("AFTER FAVOURITE FETCH", media);
            dispatch({
                type: FETCH_SAVED,
                media
            });
        });
    }
}

export const addItemToCart = (product) => {
    return dispatch => {
        dispatch(add(product));
        const cart = store.getState()['cart'];
        setTimeout(() => {
            dispatch(total(cart));
        });
    }
}

export const updateCartItem = (product) => {
    return dispatch => {
        dispatch(update(product));
        const cart = store.getState()['cart'];
        setTimeout(() => {
            dispatch(total(cart));
        });
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
    let {total, finalCart} = calculateTotal(cart);
    console.log('calling the backend here');
    // axios.post('/api/shop/total', {"cart": cart} )
    // .then((r) => {
    //     console.log(r);
        
    //     // let car =  {
    //     //     type: TOTAL_CART,
    //     //     total,
    //     //     cart: finalCart
    //     // }
    //     // return car;
    //     return {
    //         type: TOTAL_CART,
    //         total,
    //         cart: cart

    //     };
    // });

    return {
        type: TOTAL_CART,
        total,
        cart: finalCart

    };

}