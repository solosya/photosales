import * as actionTypes from './actions';
import Shop from '../containers/checkout/shop';

const intialState = {
    total: 0,
    favourites: [
        {
            id: '6e5hfdghs5dt',
            title: "Prince One",
            content: "First image in another gallery",
            publishDate: "23rd may 2000",
            hasMedia: true,
            image: "https://static.guim.co.uk/sys-images/Music/Pix/pictures/2011/6/3/1307115506503/Prince-performing-on-stag-007.jpg",
        }
    ],
    cart: [
        {
            id: 'j49fj3fgsdsgdf8rj',
            title: "Cat",
            content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
            publishDate: "23rd may 2000",
            hasMedia: true,
            image: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg",
            lineItems: [],
        },
        {
            id: 'lkiuygfyny66',
            title: "Lego",
            content: "Less writing for the second card",
            publishDate: "24rd may 2000",
            hasMedia: true,
            image: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg",
            lineItems: [],
        }
        // {
        //     id: 'lkiuygfsfdyny66',
        //     title: "Lego",
        //     content: "Less writing for the second card",
        //     publishDate: "24rd may 2000",
        //     hasMedia: true,
        //     image: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg"
        // },

    ],
    pink: ['blue']
}

const reducer = (state = intialState, action) => {
    console.log(action);


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
        return cart;
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
            let cart = [...state.cart];
            const found = cart.filter((item) => {
                return action.photo.id !== item.id;
            });

            if (found.length < cart.length) {
                cart = found;
            } else {
                cart.push(action.photo);
            }
            console.log(cart);
            return {
                ...state,
                cart
            }
        }
        case actionTypes.ADD_ITEM_TO_CART: {
            console.log("IN THE REDUCER");
            let cart = [...state.cart];
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
                const flatCart = getLineItemsFromCart(cart)
                const shop = new Shop(flatCart);
                // debugger;
                const total = shop.calculateTotal();
                cart = placeLineItemsIntoCart(cart, total.cart);

                return {
                    ...state,
                    total: total.total,
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
                // debugger;
                if (index > -1) {
                    // var product = photo.lineItems[index]
                    var product = action.product;
                    const shop = new Shop([]);
                    product = shop.applyLineItemDiscount(product);
                    
                    cart[photoIndex].lineItems[index] = product;
                } 


                const flatCart = getLineItemsFromCart(cart);
                const shop2 = new Shop(flatCart);
                const total = shop2.calculateTotal();

                return {
                    ...state,
                    total:total.total,
                    cart
                };
            }
        }
        default:
            return state;
    }
};

export default reducer;