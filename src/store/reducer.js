import * as actionTypes from './actions';

const intialState = {
    favourites: [
        {
            id: '6e5hfdghs5dt',
            title: "Prince One",
            content: "First image in another gallery",
            publishDate: "23rd may 2000",
            hasMedia: true,
            image: "https://static.guim.co.uk/sys-images/Music/Pix/pictures/2011/6/3/1307115506503/Prince-performing-on-stag-007.jpg"
        }
    ],
    cart: [
        {
            id: 'j49fj3fgsdsgdf8rj',
            title: "Cat",
            content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
            publishDate: "23rd may 2000",
            hasMedia: true,
            image: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg"
        },
        {
            id: 'lkiuygfyny66',
            title: "Lego",
            content: "Less writing for the second card",
            publishDate: "24rd may 2000",
            hasMedia: true,
            image: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg"
        }
    ]
}

const reducer = (state = intialState, action) => {
    console.log(action);

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
            console.log('toggling cart');
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


        default:
            return state;
    }
};

export default reducer;