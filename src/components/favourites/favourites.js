// Libraries
import React, {Component}   from 'react'
import TransitionGroup      from 'react-transition-group/TransitionGroup'; 
import CSSTransition        from 'react-transition-group/CSSTransition'; 

// Components
import Card                 from '../../components/card/card.js'; 

// Styles
import styles               from './favourites.module.scss';

class Favourites extends Component {



    render() { 

        const cards = this.props.favourites.map( (fav, i) => {

            const key = fav.title + fav.id;
            const card =
                <CSSTransition key={key}
                    timeout={400}
                    classNames="card"
                    >
                    <Card 
                        key         = {i}
                        data        = {fav}
                        styles      = {["card-2-mobile", "card-2-tablet", "card-2-desktop"]}
                        cardHandler = {() => { return false;}}
                        favHandler  = {this.props.favHandler}
                        cartHandler = {this.props.cartHandler}
                        favourite
                    ></Card>
            </CSSTransition>;

            return card;
        });
        

        
        return (
            <div className={styles.favourites}>
                <h1 className={styles.favourites__title}>Favourites</h1>
                <TransitionGroup>
                    { cards ? cards : null}
                </TransitionGroup>

            </div>
        )
    }
}

export default Favourites;