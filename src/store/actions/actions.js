//Libraries
import store            from '../store'
import axios            from 'axios'
import qs               from  'qs'
// import { browserHistory } from 'react-router';

//Comopnents
// import Shop             from '../../containers/checkout/shop'

//Actions
export const LOGIN                  = 'LOGIN'
export const TOTAL_CART             = 'TOTAL_CART'
export const FETCH_SAVED            = 'FETCH_SAVED'
export const TOGGLE_CART            = 'TOGGLE_CART'
export const TOGGLE_GUEST           = 'TOGGLE_GUEST'
export const ADD_ITEM_TO_CART       = 'ADD_ITEM_TO_CART'
export const TOGGLE_FAVOURITE       = 'TOGGLE_FAVOURITE'
export const UPDATE_CART_ITEM       = 'UPDATE_CART_ITEM'
export const LOGIN_ON_REFRESH       = 'LOGIN_ON_REFRESH'
export const REMOVE_ITEM_FROM_CART  = 'REMOVE_ITEM_FROM_CART'


export const getLineItemsFromCart = (cart) => {
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

// const calculateTotal = (cart) => {
//     const flatCart = getLineItemsFromCart(cart)
//     const shop = new Shop(flatCart);
//     const total = shop.calculateTotal();
//     cart = placeLineItemsIntoCart(cart, total.cart);
//     return {
//         total:total.total,
//         finalCart: cart
//     }
// }


export const login = (user, router) => {
    return dispatch => {
        axios.post('/api/auth/login', qs.stringify({"username": user.username, "password": user.password})).then((r) => {
            // console.log(r);
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




export const toggleFavourite = (p) => {
    // console.log("TIGGLIG", photo);
    const photo = {...p};
    const loggedIn = store.getState()['isLoggedIn'];
    const live = store.getState()['live'];
    // console.log(loggedIn);
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
                if (!live ) { // this is just for local dev in local npm server
                    photo.saveType = 'favourite';
                    dispatch({
                        type: TOGGLE_FAVOURITE,
                        photo: photo
                    });
                }
            });
        }
    }

    return dispatch => {
        // use local storage
        photo.saveType = 'favourite';
        dispatch({
            type: TOGGLE_FAVOURITE,
            photo: photo
        });
    }

}


export const toggleCart = (p) => {
    // console.log("taglling", photo);
    const photo = {...p};

    return dispatch => {

        const loggedIn = store.getState()['isLoggedIn'];
        const live = store.getState()['live'];

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
                if (!live ) { // this is just for local dev in local npm server
                    photo.saveType = 'cart';
                    dispatch({
                        type: TOGGLE_CART,
                        photo: photo
                    });
                }
            });
        } else {
            // use local storage
            photo.saveType = 'cart';
            dispatch({
                type: TOGGLE_CART,
                photo: photo
            });
        }
    }
}


export const fetchSaved = () => {

    const loggedIn = store.getState()['isLoggedIn'];

    return dispatch => {
        
        if (loggedIn) {
            console.log('fetching from database!!');
            axios.get('/api/user/user-media').then((r) => {
                // console.log("FAVOURITE FETCH SERVER", r.data.media);
    
                const media = r.data.media.map((m) => {
                    return {
                        id       : m.id,
                        url      : m.path,
                        guid     : m.guid,
                        title    : m.title,
                        width    : m.width,
                        height   : m.height,
                        caption  : m.caption,
                        saveType : m.type, //cart or favourite
                    }
                });
                // console.log("AFTER FAVOURITE FETCH", media);
                
                dispatch({
                    type: FETCH_SAVED,
                    media,
                    loggedIn
                });
            });

        } else {
            console.log('getting saved from local');
            // Attempt to get cart and favourites from local storage
            const cartString = localStorage.getItem('cart');
            const favString  = localStorage.getItem('favourites');
            
            const cart       =  cartString ? JSON.parse(cartString) : [];
            const favourites =  favString  ? JSON.parse(favString)  : [];
            const saved = cart.concat(favourites);
            console.log(saved);
            if (saved.length === 0 ) return;

            dispatch({
                type: FETCH_SAVED,
                media: saved,
            });
        }
    }
}

export const addItemToCart = (product) => {
    return dispatch => {
        dispatch(add(product));
        let cart = store.getState()['cart'];
            
        const flatCart = getLineItemsFromCart(cart)
        console.log(flatCart);
        axios.post('/api/shop/total', {"cart": flatCart} )
        .then((r) => {
            console.log(r);
            cart = placeLineItemsIntoCart(cart, r.data.cart);
            console.log(cart);
            dispatch({
                type: TOTAL_CART,
                total: r.data.total,
                cart: cart
            });
        });
        
    }
}

export const updateCartItem = (product) => {
    return dispatch => {
        dispatch(update(product));
        let cart = store.getState()['cart'];

        const flatCart = getLineItemsFromCart(cart)
        axios.post('/api/shop/total', {"cart": flatCart} )
        .then((r) => {
            console.log(r);
            cart = placeLineItemsIntoCart(cart, r.data.cart);
    
            dispatch({
                type: TOTAL_CART,
                total: r.data.total,
                cart: cart
            });
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

    return {
        type: TOTAL_CART,
        total,
        cart: cart

    };

}