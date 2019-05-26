import React, {Component}   from 'react';
import card_1               from './card-1.scss';
import card_2               from './card-2.scss';
import cn                   from 'classnames';
import Dotdotdot            from 'react-dotdotdot';


class Card extends Component {

    

    render() {
        // const cardClass = cn( card_1["card-mobile"], card_1["card-tablet"], card_1["card-desktop"] );

        const count = this.props.count || 0;
        const panel = this.props.panel || null;
        const image = this.props.data.images && this.props.data.images.length > 0 ? this.props.data.images[0] : this.props.data;
        const type = this.props.type || null;
        let favourite = null;
        
        if ( this.props.favourite ) {
            favourite = <div className="c-cards-view__buttons">
                <div onClick={this.props.favHandler} className="c-cards-view__favourite"></div>
                <div onClick={this.props.cartHandler} className="c-cards-view__cart">C</div>
            </div>
        }




        return (
            <div onClick={() => this.props.cardHandler(count, panel)} className={this.props.styles}>
                <a  href                = {this.props.data.url} 
                    className           = ""
                    data-id             = {this.props.data.id} 
                    data-guid           = {this.props.data.guid} 
                    data-position       = {this.props.data.position} 
                    data-social         = {this.props.data.social}
                    data-article-image  = {this.props.data.articleImg} 
                    data-article-text   = {this.props.data.title}
                    >

                    <article className="c-cards-view">

                        { (image.hasMedia) ? 
                            <figure className='c-cards-view__media'>
                                <picture>
                                    <source media="(max-width: 767px) and (min-width: 501px)" srcSet={this.props.data.imageMedium} />
                                    <source media="(max-width: 500px)" srcSet={this.props.data.imageSmall} />

                                    { this.props.data.lazyload === false
                                        ?  <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={image.image} alt="" />
                                        :  <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={image.image} data-original={this.props.data.articleImg} alt="" />
                                    }

                                    <div className="video-icon"></div>

                                </picture>

                            </figure>
                            : null
                        }
                        
                        <div className="c-cards-view__container">

                            <div className="c-cards-view__category">{ this.props.data.category }</div>
                                                        
                            <h2 className="c-cards-view__heading"><Dotdotdot clamp={2}>{ this.props.data.title}</Dotdotdot></h2>

                            {favourite ? favourite : null}

                            <div className="c-cards-view__description"><Dotdotdot clamp={3}>{this.props.data.content}</Dotdotdot></div>
                        
                            <div className="c-cards-view__author">
                                <div className="c-cards-view_time">{this.props.data.publishDate}</div>
                            </div>
                        </div>


                    </article>
                </a>
            </div>
        )
    }
}

export default Card;