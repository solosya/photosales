import * as actionTypes from './actions';

const intialState = {
    favourites: [
        {
            title: "Bowie One",
            content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
            publishDate: "23rd may 2000",
            hasMedia: true,
            image: "https://www.simpleminds.com/wp-content/uploads/2016/02/bowie.jpg"
        },
        {
            title: "Lego",
            content: "Less writing for the second card",
            publishDate: "24rd may 2000",
            hasMedia: true,
            image: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg"
        }

    ]
}

const reducer = (state = intialState, action) => {

};

export default reducer;