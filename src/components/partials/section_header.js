import React            from 'react';
import styles           from './sectionheader.module.scss';
import cn               from 'classnames';
import FavIcon          from '../favourites/favIcon';
import CheckoutIcon     from '../CartIcon';
import Styled, {css}    from 'styled-components'

const sectionHeader = (props) => {

    let isLoggedIn = "";

    
    const titleStyleArr = [styles['c-section-head__title']];
    let fontSize = '28px';
    let fontWeight = '400';
    let fontColor = null;
    let margin = null;


    if (props.marginBottom) {
        margin = props.marginBottom;
    }

    if (props.fontColor) {
        fontColor = props.fontColor;
    }
    if (props.fontSize) {
        fontSize = props.fontSize;
        // titleStyleArr.push(styles["c-section-head__title--40"]);
    }
    if (props.fontWeight) {
        fontWeight = props.fontWeight;
        // titleStyleArr.push(styles["c-section-head__title--30"]);
    }
    // if (props.panel) {
    //     // titleStyleArr.push(styles["c-section-head__title--23"]);
    // }


    if (props.loggedIn && props.loggedIn === true) {
        isLoggedIn = "c-section-head__loggedin";
    }

    
    const titleStyles = cn( titleStyleArr );
    

    let cart = null;

    if (props.cart) {


        const favLabelStyles = [ styles['c-section-head__fav-label'] ];
        if (props.favourites > 0) {
            favLabelStyles.push( styles['c-section-head__fav-label--on'] );
        }


        const cartLabelStyles = [ styles['c-section-head__cart-label'] ];
        if (props.cartItems > 0) {
            cartLabelStyles.push( styles['c-section-head__cart-label--on'] );
        }

        cart = 
            <div className={styles['c-section-head__buttons']}>
                <div className={styles['c-section-head__favourite']} onClick={ props.favouritesHandler}>
                    <FavIcon on={props.favourites > 0} />
                    <label className={cn(favLabelStyles)}>Favourites</label>
                </div>

                <div className={styles['c-section-head__cart']} onClick={ () => props.linkHandler("/checkout")}>
                    <label className={styles['c-section-head__cart-count']}>{props.cartItems}</label>
                    <CheckoutIcon on={props.cartItems > 0} />

                    
                    <label className={cn(cartLabelStyles)}>Checkout</label>
                </div>
                {/* <div onClick={props.checkoutLinkHandler} className={cartStyles}>{ props.cartItems} Check out</div> */}
            </div>;
    }


    return (

        <div className={cn(styles['c-section-head'], styles[isLoggedIn])}>

            <div className={styles['c-section-head__title-container']}>
                <Title  
                    onClick={()=> props.linkHandler(props.linkUrl)}  
                    color={fontColor}
                    size={fontSize}
                    weight={fontWeight}
                    margin={margin}
                >
                    {props.title}</Title>

                {/* <h1 onClick={()=> props.linkHandler(props.linkUrl)} className={titleStyles}>{props.title}</h1> */}
                { props.panel && 
                    <ViewAll href={props.linkUrl} onClick={(e) => {
                        e.preventDefault();
                        props.linkHandler(props.linkUrl)}
                    }>View all</ViewAll>
                }
                { cart } 
            </div>

            <div className={styles['c-section-head__rule']}></div>
        </div>
    )
}

const Title = Styled.h1`
    font-family: 'Roboto';
    cursor:pointer;
    margin:0;
    font-size: 28px;
    font-weight: 500;

    ${props => props.color && css`
        color: ${props.color};
    `}
    ${props => props.size && css`
        font-size: ${props.size};
    `}
    ${props => props.weight && css`
        font-weight: ${props.weight};
    `}
    ${props => props.margin && css`
        margin-bottom: ${props.margin};
    `}

`

const ViewAll = Styled.a`
    font-size: 12px;
    font-weight: 500;
    position: relative;
    top: 13px;
    text-decoration:none;
    color:#5f5f5f;
    text-transform: uppercase;
`

export default sectionHeader;