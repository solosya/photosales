//Libraries
import React        from 'react'
import Dotdotdot    from 'react-dotdotdot'
import cn           from 'classnames'

//Components
import FavIcon      from '../favourites/favIcon'
import CartIcon     from '../CartIcon'
import Admin        from './admin'

//Styles
import card1        from './card-1.module.scss'
import card2        from './card-2.module.scss'
import card4        from './card-4.module.scss'



const dragStart = (e, props) => {
    const params = {
        id:    props.data.id,
        count: props.count,
    }

    e.dataTransfer.setData("text/plain", JSON.stringify( params ));
}

const drop = (e, props) => {
    e.preventDefault();
    if (props.swapCards) {

        console.log('dragon dropped', props);
        const source = JSON.parse ( e.dataTransfer.getData("text") );

        const params = {
            sourcePosition: source.count,
            sourceArticleId: source.id,
            sourceIsSocial: 0,
            
            destinationPosition: props.count,
            destinationArticleId: props.data.id,
            destinationIsSocial: 0,
        }
        console.log(params);
        props.swapCards(params);
    }
}


const pin = (e, props) => {
    e.stopPropagation();
    console.log(props);
    if (props.pinCard) {
        const params = {
            id: props.data.id,
            position: props.count,
            status: props.data.isPinned,
            sourceIsSocial: 0,
        }
        props.pinCard(params);
    }
}


const Card = props =>  {
        
    const styles = [];

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

    let draggable = false;
    if (props.swapCards) {
        draggable = true;
    }

    return (
        <div onClick={() => props.cardHandler(count, panel)} className={cn(styles)}>
            <div  
                onDragStart = {(e) => dragStart(e, props)}
                onDragOver  = {(e) => {e.preventDefault();}}
                draggable   = {draggable}
                onDrop      = {(e) => drop(e, props)}
                >

                <article className={viewStyles}>
                    <figure className={mediaStyles}>
                        <picture>
                            <source media="(max-width: 767px) and (min-width: 501px)" srcSet={props.data.imageMedium} />
                            <source media="(max-width: 500px)" srcSet={props.data.imageSmall} />
                            <img draggable="false" width={props.data.imgWidth} height={props.data.imgHeight} className="img-fluid" src={image.url} alt="" />
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

                <Admin pin={pin} data={props}/>

            </div>
        </div>
    )
}

export default Card;