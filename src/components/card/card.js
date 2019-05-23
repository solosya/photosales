import React, {Component}   from 'react';
import card                 from './card-1.module.scss';
import cn                   from 'classnames';
import Dotdotdot            from 'react-dotdotdot';


class Card extends Component {

    state = {
        title: "hwllo world",
        content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
        author: "Lee Newman",
        publishDate: "23rd may 2000",
        hasMedia: true,
        image: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg"
    }


    render() {

        const cardClass = cn( card["card-1-mobile"], card["card-1-tablet"], card["card-1-desktop"] );

        return (
            <div onClick={this.props.cardHandler} className={cardClass}>
                <a  href                = {this.state.url} 
                    className           = ""
                    data-id             = {this.state.id} 
                    data-guid           = {this.state.guid} 
                    data-position       = {this.state.position} 
                    data-social         = {this.state.social}
                    data-article-image  = {this.state.articleImg} 
                    data-article-text   = {this.state.title}
                    >

                    <article className={card["c-cards-view"]}>

                        { (this.state.hasMedia) ? 
                            <figure className={card['c-cards-view__media']}>
                                <picture>
                                    <source media="(max-width: 767px) and (min-width: 501px)" srcSet={this.state.imageMedium} />
                                    <source media="(max-width: 500px)" srcSet={this.state.imageSmall} />

                                    { this.state.lazyload === false
                                     ?  <img width={this.state.imgWidth} height={this.state.imgHeight} className="img-fluid" src={this.state.image} alt="" />
                                     :  <img width={this.state.imgWidth} height={this.state.imgHeight} className="img-fluid" src={this.state.image} data-original={this.state.articleImg} alt="" />
                                    }

                                    <div className={card["video-icon"]}></div>

                                </picture>

                            </figure>
                            : null
                        }
                        
                        <div className={card["c-cards-view__container"]}>

                            <div className={card["c-cards-view__category"]}>{ this.state.category }</div>
                                                        
                            <h2 className={card["c-cards-view__heading"]}><Dotdotdot clamp={2}>{ this.state.title}</Dotdotdot></h2>
                                                    
                            <div className={card["c-cards-view__description"]}><Dotdotdot clamp={3}>{this.state.content}</Dotdotdot></div>
                        
                            <div className={card["c-cards-view__author"]}>
                                <div className={card["c-cards-view_time"]}>{this.state.publishDate}</div>
                            </div>
                        </div>


                    </article>
                </a>
            </div>
        )
    }
}

export default Card;