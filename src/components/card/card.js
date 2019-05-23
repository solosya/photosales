import React, {Component}   from 'react';
import card                 from './card-1.module.scss';
import cn                   from 'classnames';
import Dotdotdot            from 'react-dotdotdot';


class Card extends Component {
    // state = {
    //     title: "hwllo world",
    //     content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
    //     author: "Lee Newman",
    //     publishDate: "23rd may 2000",
    //     hasMedia: true,
    //     image: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg"
    // }


    render() {
        // console.log(this.props.data);

        const cardClass = cn( card["card-1-mobile"], card["card-1-tablet"], card["card-1-desktop"] );
        const count = this.props.count;
        const panel = this.props.panel;

        return (
            <div onClick={() => this.props.cardHandler(count, panel)} className={cardClass}>
                <a  href                = {this.props.data.url} 
                    className           = ""
                    data-id             = {this.props.data.id} 
                    data-guid           = {this.props.data.guid} 
                    data-position       = {this.props.data.position} 
                    data-social         = {this.props.data.social}
                    data-article-image  = {this.props.data.articleImg} 
                    data-article-text   = {this.props.data.title}
                    >

                    <article className={card["c-cards-view"]}>

                        { (this.props.data.hasMedia) ? 
                            <figure className={card['c-cards-view__media']}>
                                <picture>
                                    <source media="(max-width: 767px) and (min-width: 501px)" srcSet={this.props.data.imageMedium} />
                                    <source media="(max-width: 500px)" srcSet={this.props.data.imageSmall} />

                                    { this.props.data.lazyload === false
                                     ?  <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={this.props.data.image} alt="" />
                                     :  <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={this.props.data.image} data-original={this.props.data.articleImg} alt="" />
                                    }

                                    <div className={card["video-icon"]}></div>

                                </picture>

                            </figure>
                            : null
                        }
                        
                        <div className={card["c-cards-view__container"]}>

                            <div className={card["c-cards-view__category"]}>{ this.props.data.category }</div>
                                                        
                            <h2 className={card["c-cards-view__heading"]}><Dotdotdot clamp={2}>{ this.props.data.title}</Dotdotdot></h2>
                                                    
                            <div className={card["c-cards-view__description"]}><Dotdotdot clamp={3}>{this.props.data.content}</Dotdotdot></div>
                        
                            <div className={card["c-cards-view__author"]}>
                                <div className={card["c-cards-view_time"]}>{this.props.data.publishDate}</div>
                            </div>
                        </div>


                    </article>
                </a>
            </div>
        )
    }
}

export default Card;