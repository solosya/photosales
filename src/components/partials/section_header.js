import React            from 'react';
import styles           from './sectionheader.module.scss';
import cn               from 'classnames';



const sectionHeader = (props) => {
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



    const titleStyles = cn( titleStyleArr );
    

    let cart = null;

    if (props.cart) {
        const favouritesOn = props.favourites > 0 ? styles['c-section-head__favouriteOn'] : '';
        const favStyles = cn(styles['c-section-head__favourite'], favouritesOn);
        const cartOn = props.cartItems > 0 ? styles['c-section-head__cartOn'] : '';
        const cartStyles = cn(styles['c-section-head__cart'], cartOn);

        cart = 
            <div className={styles['c-section-head__buttons']}>
                <div className={favStyles} onClick={props.favouritesHandler}>Favourites</div>
                <div onClick={props.checkoutLinkHandler} className={cartStyles}>{ props.cartItems} Check out</div>
            </div>;
    }


    return (
        <div className={styles['c-section-head']}>

            <div className={styles['c-section-head__title-container']}>
                    <h1 onClick={props.homeLinkHandler} className={titleStyles}>{props.title}</h1>
                { cart } 
            </div>

            <div className={styles['c-section-head__rule']}></div>
        </div>
    )
}

export default sectionHeader;