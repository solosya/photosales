//Libraries
import React, {Component}   from 'react'
import Dotdotdot            from 'react-dotdotdot'
import cn                   from 'classnames'

//Components
import FavIcon              from '../favourites/favIcon'
import CartIcon             from '../CartIcon'


import card1 from './card-1.module.scss'
import card2 from './card-2.module.scss'
import card4 from './card-4.module.scss'



const Card = props =>  {
        
    const styles = [];
    // const cards = {};
    for (let i = 0; i < props.styles.length; i++) {
        let style = props.styles[i];
        if (style.indexOf('1') > -1 ) {
            styles.push(card1[style]);
            // cards['1'] = true;
        }
        if (style.indexOf('2') > -1 ) {
            styles.push(card2[style]);
            // cards['2'] = true;
        }
        if (style.indexOf('4') > -1 ) {
            styles.push(card4[style]);
            // cards['4'] = true;
        }
    };

    const viewStyles =          cn([card1["c-cards-view"],              card2["c-cards-view"],              card4["c-cards-view"]]);
    const containerStyles =     cn([card1["c-cards-view__container"],   card2["c-cards-view__container"],   card4["c-cards-view__container"]]);
    const mediaStyles =         cn([card1["c-cards-view__media"],       card2["c-cards-view__media"],       card4["c-cards-view__media"]]);
    const buttonStyles =        cn([card1["c-cards-view__buttons"],     card2["c-cards-view__buttons"],     card4["c-cards-view__buttons"]]);
    const categoryStyles =      cn([card1["c-cards-view__category"],    card2["c-cards-view__category"],    card4["c-cards-view__category"]]);
    const headingStyles =       cn([card1["c-cards-view__heading"],     card2["c-cards-view__heading"],     card4["c-cards-view__heading"]]);
    const descriptionStyles =   cn([card1["c-cards-view__description"], card2["c-cards-view__description"], card4["c-cards-view__description"]]);
    const authorStyles =        cn([card1["c-cards-view__author"],      card2["c-cards-view__author"],      card4["c-cards-view__author"]]);
    const timeStyles =          cn([card1["c-cards-view_time"],         card2["c-cards-view_time"],         card4["c-cards-view_time"]]);

    const count = props.count || 0;
    const panel = props.panel || null;
    const image = props.data.images && props.data.images.length > 0 ? props.data.images[0] : props.data;
    let buttons = null;
    
    if ( props.buttons ) {
        buttons = 
            <div className={buttonStyles}>
                <FavIcon  onClick={(e) => {e.stopPropagation();props.favHandler(props.data)}}  grey on={props.favourite} style={{marginBottom:'10px'}} ></FavIcon>
                <CartIcon onClick={(e) => {e.stopPropagation();props.cartHandler(props.data)}} grey on={props.cart}></CartIcon>
            </div>
    }

    return (
        <div onClick={() => props.cardHandler(count, panel)} className={cn(styles)}>
            <div  
                className       = ""
                data-id         = {props.data.id} 
                data-guid       = {props.data.guid} 
                data-position   = {props.data.position} 
                >

                <article className={viewStyles}>
                    <figure className={mediaStyles}>
                        <picture>
                            <source media="(max-width: 767px) and (min-width: 501px)" srcSet={props.data.imageMedium} />
                            <source media="(max-width: 500px)" srcSet={props.data.imageSmall} />
                            <img width={props.data.imgWidth} height={props.data.imgHeight} className="img-fluid" src={image.url} alt="" />
                        </picture>
                    </figure>
                    
                    <div className={containerStyles}>

                        <div className={categoryStyles}>{ props.data.category }</div>
                                                    
                        <h2 className={headingStyles}><Dotdotdot clamp={2}>{ props.data.title}</Dotdotdot></h2>

                        {buttons ? buttons : null}

                        <div className={descriptionStyles}><Dotdotdot clamp={3}>{props.data.content}</Dotdotdot></div>
                    
                        <div className={authorStyles}>
                            <div className={timeStyles}>{props.data.publishDate}</div>
                        </div>
                    </div>


                </article>
            </div>
        </div>
    )
}

export default Card;