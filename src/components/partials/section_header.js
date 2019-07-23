import React            from 'react';
import styles           from './sectionheader.module.scss';
import cn               from 'classnames';
import FavIcon          from '../favourites/favIcon';
import CheckoutIcon     from '../CartIcon';


const sectionHeader = (props) => {

    let isLoggedIn = "";

    
    const titleStyleArr = [styles['c-section-head__title']];
    if (props.larger) {
        titleStyleArr.push(styles["c-section-head__title--40"]);
    }
    if (props.medium) {
        titleStyleArr.push(styles["c-section-head__title--30"]);
    }

    if (props.thin) {
        titleStyleArr.push(styles["c-section-head__title--light"]);
    }

    if (props.loggedIn && props.loggedIn === true) {
        isLoggedIn = "c-section-head__loggedin";
    }

    
    const titleStyles = cn( titleStyleArr );
    

    let cart = null;

    if (props.cart) {

        cart = 
            <div className={styles['c-section-head__buttons']}>
                <div className={styles['c-section-head__favourite']} onClick={ props.favouritesHandler}>
                    <FavIcon on={props.favourites > 0} />
                    <label>Favourites</label>
                </div>
                {/* <div className={favStyles} onClick={props.favouritesHandler}>Favourites</div> */}
                <div className={styles['c-section-head__cart']} onClick={ () => props.linkHandler("/checkout/")}>
                    <CheckoutIcon on={props.cartItems > 0} />
                    <label>Checkout</label>
                </div>
                {/* <div onClick={props.checkoutLinkHandler} className={cartStyles}>{ props.cartItems} Check out</div> */}
            </div>;
    }


    return (
        <div className={cn(styles['c-section-head'], styles[isLoggedIn])}>

            <div className={styles['c-section-head__title-container']}>
                    <h1 onClick={()=> props.linkHandler(props.linkUrl)} className={titleStyles}>{props.title}</h1>
                { cart } 
            </div>

            <div className={styles['c-section-head__rule']}></div>
        </div>
    )
}

export default sectionHeader;