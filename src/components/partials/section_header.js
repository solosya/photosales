import React      from 'react';
import styles     from './sectionheader.module.scss';
import cn         from 'classnames';



const sectionHeader = (props) => {
    const titleStyleArr = [styles['c-section-head__title']];
    if (props.larger) {
        titleStyleArr.push(styles["c-section-head__title--40"]);
    }
    const titleStyles = cn( titleStyleArr );
    

    let cart = null;

    if (props.cart) {
        cart = 
            <React.Fragment>
                <div>Favourites</div>
                <div>Cart</div>
            </React.Fragment>;
    }


    return (
        <div className={styles['c-section-head']}>

            <div className={styles['c-section-head__title-container']}>
                <a className={styles['c-section-head__link']} href={props.url}>
                    <h1 className={titleStyles}>{props.title}</h1>
                </a>
                { cart } 
            </div>

            <div className={styles['c-section-head__rule']}></div>
        </div>
    )
}

export default sectionHeader;