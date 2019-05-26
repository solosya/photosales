import React, {Component}   from 'react'
import styles               from './favourites.module.scss';
import Card                 from '../../components/card/card.js'; 

import Button from '../../components/button/button';

class Favourites extends Component {
    state = {
        current: 0,
        items: [],
    };




    render() { 

        const cards = this.props.favourites.map( (fav) => {
            return <Card 
                data={fav}
                styles="card-2-mobile card-2-tablet card-2-desktop"
                cardHandler={() => { return false;}}
                favHandler={this.props.favHandler}
                cartHandler={this.props.cartHandler}
                favourite
                ></Card>
        });
        


        return (
            <div>
                <h1>Hi I'm the favourites!!!</h1>
                { cards ? cards : null}
                <Button handler={this.addToCart} classes={["button", "button--red", "button--top-30"]}>ADD TO CART</Button>

            </div>
        )
    }
}

export default Favourites;