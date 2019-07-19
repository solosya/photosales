import React, {Component}   from 'react';
// import cn                   from 'classnames';
import Dotdotdot            from 'react-dotdotdot';
import './card-1.scss';
import './card-2.scss';


class Card extends Component {

    
    
    render() {
        // console.log(this.props)
        // const cardClass = cn( card_1["card-mobile"], card_1["card-tablet"], card_1["card-desktop"] );
        const count = this.props.count || 0;
        const panel = this.props.panel || null;
        const image = this.props.data.images && this.props.data.images.length > 0 ? this.props.data.images[0] : this.props.data;
        // const type = this.props.type || null;
        // console.log(image);
        // console.log(this.props);
        let favourite = null;
        
        if ( this.props.favourite ) {
            favourite = <div className="c-cards-view__buttons">
                <div onClick={() => this.props.favHandler(this.props.data)} className="c-cards-view__favourite"></div>
                <div onClick={() => this.props.cartHandler(this.props.data)} className="c-cards-view__cart"></div>
            </div>
        }



        return (
            <div onClick={() => this.props.cardHandler(count, panel)} className={this.props.styles}>
                <div  
                    className       = ""
                    data-id         = {this.props.data.id} 
                    data-guid       = {this.props.data.guid} 
                    data-position   = {this.props.data.position} 
                    >

                    <article className="c-cards-view">
                        <figure className='c-cards-view__media'>
                            <picture>
                                <source media="(max-width: 767px) and (min-width: 501px)" srcSet={this.props.data.imageMedium} />
                                <source media="(max-width: 500px)" srcSet={this.props.data.imageSmall} />
                                <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={image.url} alt="" />
                            </picture>
                        </figure>
                        
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
                </div>
            </div>
        )
    }
}

export default Card;