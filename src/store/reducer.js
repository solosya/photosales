import * as actionTypes from './actions/actions'

const intialState = {
    cart        : [],
    live        : true,
    total       : 0,
    guest       : false,
    favourites  : [],
    isLoggedIn  : false,
    admin       : false,
    pageTitle   : "Photo Sales",
    stripeKey   : "pk_test_iwtlTrCiV2h43DlBnHnPiyy6",
    env         : '',
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
        const index = photo.lineItems.findIndex((item) => {
            return item.id === product.id;
        });
        return index;
    }




    const resetCartTotals = (cart) => {
        for (let i=0; i<cart.length; i++) {
            let cartItem = cart[i];
            if (typeof cartItem.lineItems != 'undefined') {
                for (let j=0; j<cartItem.lineItems.length; j++) {
                    let photo = cartItem.lineItems[j];
                    photo.priceTotal = NaN;
                }
            }
        }
        return cart;
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

            const newState = {
                ...state,
                isLoggedIn: action.isLoggedIn,
                admin: action.admin,
                stripeKey: action.stripeKey,
                pageTitle: action.pageTitle,
                env      : action.env
            }

            return newState;
        }
        case actionTypes.FETCH_SAVED: {

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

        case actionTypes.CLEAR_CART: {
            const localCart = localStorage.getItem('cart');
            
            if (localCart !== null) {
                localStorage.removeItem('cart');
            }
            
            return {
                ...state,
                cart : []
            }
        }


        case actionTypes.TOGGLE_CART: {
            let cart = resetCartTotals([...state.cart]);

            const loggedIn = state.isLoggedIn;

            const found = cart.filter((item) => {
                return action.photo.id !== item.id;
            });

            if (found.length < cart.length) {
                cart = found;
            } else {
                cart.push(action.photo);
            }

            if (!loggedIn) {
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            return {
                ...state,
                cart,
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

                return {
                    ...state,
                    total:NaN,
                    cart
                };
            }

            return state;
        }

        
        case actionTypes.REMOVE_ITEM_FROM_CART: {
            let cart = resetCartTotals([...state.cart]);

            const photoIndex = findPhotoInCart(cart, { photoId: action.product.photoId });

            if (photoIndex > -1) {
                const photo = JSON.parse(JSON.stringify( cart[photoIndex] ));
                const index = findProductInCartItem(photo, action.product );

                
                if (index !== -1) {
                    photo.lineItems.splice(index, 1);
                }

                cart[photoIndex] = photo;

                return {
                    ...state,
                    cart
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
                    cart[photoIndex].lineItems[index].priceTotal = NaN;
                } 

                return {
                    ...state,
                    total:NaN,
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