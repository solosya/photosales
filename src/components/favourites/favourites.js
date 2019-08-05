// Libraries
import React, {Component}   from 'react'
import TransitionGroup      from 'react-transition-group/TransitionGroup'; 
import CSSTransition        from 'react-transition-group/CSSTransition'; 

// Components
import Card                 from '../../components/card/card.js'; 

// Styles
import styles               from './favourites.module.scss';

class Favourites extends Component {


    showGallery = (index) => {
        console.log(index);
        const photo = this.props.favourites[index];
        console.log(photo);
        this.props.showGallery(photo);
    }
    render() { 

        const cards = this.props.favourites.map( (fav, i) => {

            const {favourite, cart} = this.props.photoStatusHandler(fav.id);

            
            const key = fav.title + fav.id;
            const card =
                <CSSTransition key={key}
                    timeout={400}
                    classNames="card"
                    >
                    <Card 
                        key         = {i}
                        data        = {fav}
                        count       = {i}
                        styles      = {["card-2-mobile", "card-2-tablet", "card-2-desktop"]}
                        cardHandler = {this.showGallery}
                        favHandler  = {this.props.favHandler}
                        cartHandler = {this.props.cartHandler}
                        admin       = {false}
                        favourite   = {favourite}
                        cart        = {cart}
                        buttons
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