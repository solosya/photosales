//Libraries
import React        from 'react'
import Dotdotdot    from 'react-dotdotdot'
import cn           from 'classnames'
// import cloudinary   from 'cloudinary-core'
import styled       from 'styled-components'

//Components
import FavIcon      from '../favourites/favIcon'
import CartIcon     from '../CartIcon'
import Admin        from './admin'

//Styles
import card1        from './card-1.module.scss'
import card2        from './card-2.module.scss'
import card4        from './card-4.module.scss'
import card5        from './card-5.module.scss'



const dragStart = (e, props) => {
    const params = {
        id:    props.data.id,
        count: props.count + 1,
    }

    e.dataTransfer.setData("text/plain", JSON.stringify( params ));
}

const drop = (e, props) => {
    e.preventDefault();
    if (props.swapCards) {

        const source = JSON.parse ( e.dataTransfer.getData("text") );

        const params = {
            sourcePosition: source.count,
            sourceArticleId: source.id,
            sourceIsSocial: 0,
            
            destinationPosition: props.count + 1,
            destinationArticleId: props.data.id,
            destinationIsSocial: 0,
        }

        props.swapCards(params);
    }
}


const pin = (e, props) => {
    e.stopPropagation();

    if (props.pinCard) {
        const params = {
            id: props.data.id,
            position: props.count +1, //count is zero based, pinned isn't
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
        if (style.indexOf('5') > -1 ) {
            styles.push(card5[style]);
            // cards['4'] = true;
        }
    };

    const viewStyles =          cn([card1["c-cards-view"],              card2["c-cards-view"],              card4["c-cards-view"],                 card5["c-cards-view"]]);
    const containerStyles =     cn([card1["c-cards-view__container"],   card2["c-cards-view__container"],   card4["c-cards-view__container"],      card5["c-cards-view__container"]]);
    const mediaStyles =         cn([card1["c-cards-view__media"],       card2["c-cards-view__media"],       card4["c-cards-view__media"],          card5["c-cards-view__media"]]);
    const buttonStyles =        cn([card1["c-cards-view__buttons"],     card2["c-cards-view__buttons"],     card4["c-cards-view__buttons"],        card5["c-cards-view__buttons"]]);
    const categoryStyles =      cn([card1["c-cards-view__category"],    card2["c-cards-view__category"],    card4["c-cards-view__category"],       card5["c-cards-view__category"]]);
    const headingStyles =       cn([card1["c-cards-view__heading"],     card2["c-cards-view__heading"],     card4["c-cards-view__heading"],        card5["c-cards-view__heading"]]);
    const descriptionStyles =   cn([card1["c-cards-view__description"], card2["c-cards-view__description"], card4["c-cards-view__description"],    card5["c-cards-view__description"]]);
    const viewButtonStyles =    cn([card1["c-cards-view__view-buttons"], card2["c-cards-view__view-buttons"], card4["c-cards-view__view-buttons"],    card5["c-cards-view__view-buttons"]]);
    // const authorStyles =        cn([card1["c-cards-view__author"],      card2["c-cards-view__author"],      card4["c-cards-view__author"],         card5["c-cards-view__author"]]);
    // const timeStyles =          cn([card1["c-cards-view_time"],         card2["c-cards-view_time"],         card4["c-cards-view_time"],            card5["c-cards-view_time"]]);

    const count = props.count || 0;
    const panel = props.panel || null;
    const image = props.data.images && props.data.images.length > 0 ? props.data.images[0] : props.data;


    // we can turn the quick view and view all gallery buttons off per card
    let galleryButtons = true;
    if ( typeof props.galleryButtons !== 'undefined' && props.galleryButtons === false) {
        galleryButtons = false;
    }

    // If gallery buttons are enabled, we sometimes don't want the view all (gallery page/search page)
    let viewAllButton = true;
    if ( typeof props.viewAllButton !== 'undefined' && props.viewAllButton === false) {
        viewAllButton = false;
    }

    // Admin lest a user pin and swap cards
    let admin = false;
    if (typeof props.admin !== 'undefined' && props.admin === true) {
        admin = true;
    }

    // Shopping cart and favourite buttons
    let buttons = null;
    if ( props.buttons ) {
        buttons = 
            <div className={buttonStyles}>
                <FavIcon  onClick={(e) => {e.stopPropagation();props.favHandler(props.data)}}  grey on={props.favourite}></FavIcon>
                <CartIcon onClick={(e) => {e.stopPropagation();props.cartHandler(props.data)}} grey on={props.cart}></CartIcon>
            </div>
    }

    let draggable = false;
    if (props.swapCards) {
        draggable = true;
    }



    let imageUrl = [].concat(image.url);
    if (typeof imageUrl[1] === 'undefined') {
        imageUrl.push(imageUrl[0]);
        imageUrl.push(imageUrl[0]);
    }
    if (typeof imageUrl[2] === 'undefined') {
        imageUrl.push(imageUrl[1]);
    }

    // const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'cognitives'});
    if (typeof image.path !== 'undefined' && image.path !== null && image.path) {
        const url = image.path.replace('/upload/', '/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_faces:auto,q_auto,w_500,h_340/');

        // const url = cloudinaryCore.url(image.path, {
        //     width: "580",
        //     height: "384",
        //     crop: "fit" 
        // });

        imageUrl = [url, url, url];
    }


    const content = props.data.content || props.data.caption



    return (
        // if gallery buttons are included then the click event should do nothing
        <div className={cn(styles)} onClick={() => { !galleryButtons && props.cardHandler(count, panel)}}>
            <div  
                onDragStart = {(e) => dragStart(e, props)}
                onDragOver  = {(e) => {e.preventDefault();}}
                draggable   = {draggable}
                onDrop      = {(e) => drop(e, props)}
                >

                <article className={viewStyles}>
                    <figure className={mediaStyles}>
                        <picture>
                            <source media="(max-width: 500px)" srcSet={imageUrl[2]} />
                            <source media="(min-width: 501px) and (max-width: 767px)" srcSet={imageUrl[1]} />
                            <img draggable="false" src={imageUrl[0]} alt={image.caption} />
                        </picture>
                    </figure>
                    
                    <div className={containerStyles}>

                        <div className={categoryStyles}>{ props.data.category }</div>
                                                    
                        <h2 className={headingStyles}><Dotdotdot clamp={2}>{ props.data.title} </Dotdotdot></h2>

                        {buttons ? buttons : null}

                        <div className={descriptionStyles}><Dotdotdot clamp={3}>{content}</Dotdotdot></div>
                        
                        {galleryButtons && 
                            <div className={viewButtonStyles}>
                                <Quickview onClick={() => { props.cardHandler(count, panel)}} >Quick view</Quickview>
                                {viewAllButton &&
                                    <Viewall onClick={()=> props.linkHandler("/single-gallery/" + props.data.id)}>View All</Viewall>
                                }
                            </div>
                        }
                        {/* <div className={authorStyles}>
                            <div className={timeStyles}>{props.data.publishDate}</div>
                        </div> */}
                    </div>


                </article>

                {admin && <Admin pin={pin} data={{...props}}/> }

            </div>
        </div>
    )
}


const Quickview = styled.button`
    height:35px;
    width: 103px;
    background-color:#4a90e2;
    text-transform:uppercase;
    border:none;
    color:white;
    font-size: 11px;
    &:hover {
        cursor: pointer
    }
    &:focus{
        outline:0;
        background-color:#7a90e2;

    }
`

const Viewall = styled.button`
    height:35px;
    width: 103px;
    border: 1px solid #4a90e2;
    text-transform:uppercase;
    background-color:white;
    color:#4a90e2;
    font-size: 11px;
    font-weight:400;
    &:hover {
        cursor: pointer
    }
    &:focus{
        outline:0;
    }
`


export default Card;