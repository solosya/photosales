import * as actionTypes from './actions/actions';
import Shop from '../containers/checkout/shop';
import {favourites, cart} from '../containers/checkout/data';

const intialState = {
    total: 0,
    favourites,
    cart
}

const reducer = (state = intialState, action) => {

    const findPhotoInCart  = (cart, product) => {
        const index = cart.findIndex((item) => {
            return product.photoId === item.id;
        });
        return index;
    }

    const findProductInCartItem = (photo, product) => {
        const index = photo.lineItems.findIndex((photo) => {
            return photo.id === product.id;
        });
        return index;
    }

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

    const resetCartTotals = (cart) => {
        for (let i=0; i<cart.length; i++) {
            let cartItem = cart[i];
            for (let j=0; j<cartItem.lineItems.length; j++) {
                let photo = cartItem.lineItems[j];
                photo.priceTotal = photo.price;
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

        case actionTypes.TOGGLE_FAVOURITE: {
            let favourites = [...state.favourites];

            const found = favourites.filter((item) => {
                return action.photo.id !== item.id;
            });

            if (found.length < favourites.length) {
                favourites = found;
            } else {
                favourites.push(action.photo);
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
                    cart[photoIndex].lineItems[index].priceTotal = 'pending';
                } 

                return {
                    ...state,
                    total:'pending',
                    cart
                };
            }
            return state;
        }

        case actionTypes.TOTAL_CART: {
            console.log(action);
            // const cart = [...state.cart];
            // let {total, finalCart} = calculateTotal(cart);
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