import React, {Component}   from 'react'
import styles               from './favourites.module.scss';
import Card                 from '../../components/card/card.js'; 
import Divider              from '../../components/divider/divider';

class Favourites extends Component {



    render() { 

        const cards = this.props.favourites.map( (fav, i) => {
            const card =
                [<Card 
                    key={i}
                    data={fav}
                    styles="card-2-mobile card-2-tablet card-2-desktop"
                    cardHandler={() => { return false;}}
                    favHandler={this.props.favHandler}
                    cartHandler={this.props.cartHandler}
                    favourite
                ></Card>];
            
            // add a divider beneath each card except the last
            if (i !== this.props.favourites.length -1) {
                card.push( <Divider key={i+'div'}/>)
            }
           
            return card;
        });
        


        return (
            <div className={styles.favourites}>
                <h1 className={styles.favourites__title}>Favourites</h1>
                { cards ? cards : null}

            </div>
        )
    }
}

export default Favourites;