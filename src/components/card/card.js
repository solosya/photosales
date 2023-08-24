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
                        <ZoomContainer>
                            <Zoom onClick={() => { props.cardHandler(count, panel)}} />
                        </ZoomContainer>
                    </figure>
                    
                    <div className={containerStyles}>

                        <div className={categoryStyles}>{ props.data.category }</div>
                                                    
                        <h2 className={headingStyles}><Dotdotdot clamp={2}>{ props.data.title} </Dotdotdot></h2>

                        {buttons ? buttons : null}

                        <div className={descriptionStyles}><Dotdotdot clamp={3}>{content}</Dotdotdot></div>
                        
                        {galleryButtons && 
                            <div className={viewButtonStyles}>
                                {/* <Quickview onClick={() => { props.cardHandler(count, panel)}} >Quick view</Quickview> */}
                                {viewAllButton &&
                                    <Viewall onClick={()=> props.linkHandler("/single-gallery/" + props.data.id)}>View All</Viewall>
                                }
                            </div>
                        }
                        <div className={authorStyles}>
                            <div className={timeStyles}>{props.data.publishDate}</div>
                        </div>
                    </div>


                </article>

                {admin && <Admin pin={pin} data={{...props}}/> }

            </div>
        </div>
    )
}


const ZoomContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:41px;
    width:41px;
    background: rgba(54,53,53,.7);
    position: absolute;
    bottom: 0;
    right: 0;
    &:hover {
        background: rgba(54,53,53,.6);
        cursor:pointer;
    }
`

const Zoom = styled.div`
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNyIgaGVpZ2h0PSIyNyIgdmlld0JveD0iMCAwIDI3IDI3Ij4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9Imozb3R6NjZjZ2EiIHdpZHRoPSIxMzcuNSUiIGhlaWdodD0iMTM3LjUlIiB4PSItMjAuOCUiIHk9Ii0yMC44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iLjUiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0JsdXJPdXRlcjEiIHJlc3VsdD0ic2hhZG93TWF0cml4T3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDk1OTM1MzE0NyAwIi8+CiAgICAgICAgICAgIDxmZU1lcmdlPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjEiLz4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPgogICAgICAgICAgICA8L2ZlTWVyZ2U+CiAgICAgICAgPC9maWx0ZXI+CiAgICAgICAgPGZpbHRlciBpZD0ibW9oODR5NW00YiIgd2lkdGg9IjIzNi40JSIgaGVpZ2h0PSIyMzYuNCUiIHg9Ii02OC4yJSIgeT0iLTY4LjIlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHk9IjEiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIgc3RkRGV2aWF0aW9uPSIxIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjIxMTUxMTE0NSAwIi8+CiAgICAgICAgICAgIDxmZU1lcmdlPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjEiLz4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPgogICAgICAgICAgICA8L2ZlTWVyZ2U+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIHN0cm9rZT0iI0ZGRiI+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHN0cm9rZS13aWR0aD0iMS45MiI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBmaWx0ZXI9InVybCgjajNvdHo2NmNnYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzY2IC04MDApIHRyYW5zbGF0ZSgxMDQgNTAxKSB0cmFuc2xhdGUoODg0IDc4KSB0cmFuc2xhdGUoMzgwIDIyMikiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTE2LjQ4OSAxNi40OTZMMjMuMDE0IDIzLjAyMiIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOS4zOCA5LjY0NWMwIDUuMzExLTQuMzM5IDkuNjE2LTkuNjkgOS42MTYtNS4zNTIgMC05LjY5LTQuMzA1LTkuNjktOS42MTZDMCA0LjMzNSA0LjMzOC4wMyA5LjY5LjAzYzUuMzUxIDAgOS42OSA0LjMwNSA5LjY5IDkuNjE2eiIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjgiIGZpbHRlcj0idXJsKCNtb2g4NHk1bTRiKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNjYgLTgwMCkgdHJhbnNsYXRlKDEwNCA1MDEpIHRyYW5zbGF0ZSg4ODQgNzgpIHRyYW5zbGF0ZSgzODAgMjIyKSB0cmFuc2xhdGUoNSA0KSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4wODkgMEw1LjA4OSAxMC4zMDNNMCA0Ljk3N0wxMC4zMDMgNC45NzciLz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
    background-repeat: no-repeat;
    background-size:cover;
    height: 24px;
    width: 24px;
    margin-top: 2px;
    margin-left: 3px;
`

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
    /* border: 1px solid #4a90e2; */
    border: 1px solid black;
    text-transform:uppercase;
    background-color:white;
    /* color:#4a90e2; */
    color:black;
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