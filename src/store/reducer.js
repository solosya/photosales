import * as actionTypes from './actions/actions'
import Shop from '../containers/checkout/shop'
// import {favourites, cart} from '../containers/checkout/data';

const intialState = {
    cart        : [],
    live        : true,
    total       : 0,
    guest       : false,
    favourites  : [],
    isLoggedIn  : false,
    pageTitle   : "Photo Sales"
}



const reducer = (state = intialState, action) => {

    const findPhotoInCart  = (cart, product) => {
        const index = cart.findIndex((item) => {
            return product.photoId === item.id;
        });
        return index;
    }

    const findProductInCartItem = (photo, product) => {
        if (typeof photo.lineItems === 'undefined') {
            return -1;
        }
        const index = photo.lineItems.findIndex((photo) => {
            return photo.id === product.id;
        });
        return index;
    }

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

    const resetCartTotals = (cart) => {
        for (let i=0; i<cart.length; i++) {
            let cartItem = cart[i];
            if (typeof cartItem.lineItems != 'undefined') {
                for (let j=0; j<cartItem.lineItems.length; j++) {
                    let photo = cartItem.lineItems[j];
                    photo.priceTotal = photo.price;
                }
            }
        }
        return cart;
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
            total,
            finalCart: cart
        }
    }


    switch (action.type) {

        case actionTypes.TOGGLE_GUEST: {
            const guest  = !state.guest;
            return {
                ...state,
                guest
            }
        }

        case actionTypes.LOGIN_ON_REFRESH: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                hasAccess: action.hasAccess
            }
        }
        case actionTypes.FETCH_SAVED: {
            // console.log('fetched favourites in the reducer!!', action.media);

            const favourites  = [...state.favourites];
            const cart  = [...state.cart];

            for(let i=0;i<action.media.length;i++) {
                if (action.media[i].saveType === 'favourite') {
                    favourites.push(action.media[i]);
                }
                if (action.media[i].saveType === 'cart') {
                    cart.push(action.media[i]);
                }
            }

            // console.log(favourites, cart);
            return {
                ...state,
                favourites,
                cart
            }
        }


        case actionTypes.TOGGLE_FAVOURITE: {

            let favourites = [...state.favourites];
            const loggedIn = state.isLoggedIn;

            const found = favourites.filter((item) => {
                return action.photo.id !== item.id;
            });

            // first attemp to remove the favourite
            if (found.length < favourites.length) {
                favourites = found;
            } else { // add it
                favourites.push(action.photo);
            }

            if (!loggedIn) {
                localStorage.setItem('favourites', JSON.stringify(favourites));
            }

            return {
                ...state,
                favourites
            }
        }


        case actionTypes.TOGGLE_CART: {
            let cart = resetCartTotals([...state.cart]);

            const found = cart.filter((item) => {
                return action.photo.id !== item.id;
            });

            if (found.length < cart.length) {
                cart = found;
            } else {
                cart.push(action.photo);
            }

            var {total, finalCart} = calculateTotal(cart);
            
            localStorage.setItem('cart', JSON.stringify(finalCart));

            return {
                ...state,
                cart: finalCart,
                total: total.total
            }
        }


        case actionTypes.ADD_ITEM_TO_CART: {
            let cart = resetCartTotals([...state.cart]);

            const product = action.product;
            const photoIndex = findPhotoInCart(cart, product);
            if (photoIndex > -1) {
                const photo = JSON.parse(JSON.stringify( cart[photoIndex] ));
                const index = findProductInCartItem(photo, action.product);
                if (typeof photo.lineItems === 'undefined') {
                    photo.lineItems = [];
                }
                if (index === -1) {
                    photo.lineItems.push(product);
                } else {
                    photo.lineItems[index] = product;
                }

                cart[photoIndex] = photo;
                // let {total, finalCart} = calculateTotal(cart);

                return {
                    ...state,
                    total:0,
                    cart
                };
            }

            return state;
        }

        
        case actionTypes.REMOVE_ITEM_FROM_CART: {
            let cart = resetCartTotals([...state.cart]);

            const photoIndex = findPhotoInCart(cart, { photoId: action.photoId });
            if (photoIndex > -1) {
                const photo = JSON.parse(JSON.stringify( cart[photoIndex] ));
                const index = findProductInCartItem(photo, { id: action.productId} );
                if (index !== -1) {
                    photo.lineItems.splice(index, 1);
                }

                cart[photoIndex] = photo;
                let {total, finalCart} = calculateTotal(cart);

                return {
                    ...state,
                    total: total.total,
                    cart: finalCart
                };
            }

            return state;
        }


        case actionTypes.UPDATE_CART_ITEM: {
            const cart = [...state.cart];
            const photoIndex = findPhotoInCart(cart, action.product);

            if (photoIndex > -1) {
                const photo = JSON.parse(JSON.stringify( cart[photoIndex] ));
                const index = findProductInCartItem(photo, action.product);

                if (index > -1) {
                    cart[photoIndex].lineItems[index] = action.product;
                    cart[photoIndex].lineItems[index].priceTotal = 'p';
                } 

                return {
                    ...state,
                    total:'p',
                    cart
                };
            }
            return state;
        }

        case actionTypes.TOTAL_CART: {

            return {
                ...state,
                total:action.total,
                cart: action.cart
            };

        }
        default:
            return state;
    }
};

export default reducer;