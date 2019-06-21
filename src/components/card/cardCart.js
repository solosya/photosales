
// Libraries
import React, {Component}   from 'react';
import Dotdotdot            from 'react-dotdotdot';
import Select               from 'react-select';
import cn                   from 'classnames';
// Components
import Checkbox from '../form/checkbox';
import Flexrow from '../layout/flexrow';
import LineItem from './lineItem';

// Styles
import './card-3.scss';
import close from '../../styles/close.module.scss';




class CardCart extends Component {

    state = {
        productStatus: {
            print: false,
            digital: false,
        },
        products: this.props.products,
        lineItems: [{
            quantity: 0
        }],
        cart: [],
    }


    handleCheckbox = e => {
        const status = {...this.state.productStatus};
        const lineItems = [...this.state.lineItems];
        status[e.target.name] = e.target.checked;

        this.setState({productStatus: status}, () => {
            console.log(this.state);
        });
    }

    handleQuantity = e => {
        console.log('handling select');
        const data = {};
        this.setState({quantity: e.target.value}, () => {
            console.log(this.state);
        });
    }


    handleSelect = e => {
        // console.log('handling select');
        // console.log(e);
        let {value, category, label, index} = e;
        console.log(value, category, label);
        const product = this.state.products[category][index];
        product.quantity = 1;
        const cart = [...this.state.cart];
        cart.push(product)
        // const data = {};
        // data[e.target.name] = e.target.value;
        // console.log(data);
        // this.setState(data, () => {
        //     console.log(this.state);
        // });
    }

    calculate = () => {
        this.setState()
    }


    render() {
        const count = this.props.count || 0;
        const panel = this.props.panel || null;
        const image = this.props.data.images && this.props.data.images.length > 0 ? this.props.data.images[0] : this.props.data;

        let favourite = null;

        if ( this.props.favourite ) {
            favourite = <div className="c-cards-view__buttons">
                <div onClick={() => this.props.favHandler(this.props.data)} className="c-cards-view__favourite"></div>
                <div onClick={() => this.props.cartHandler(this.props.data)} className={cn([close.close, "c-cards-view__close"])}></div>
            </div>
        }

        const printOptions = this.state.products.print.map((plan, i) => {
            return {value: plan.id, label: plan.label, category: "print", index: i}
        });
    
        const digitalOptions = this.state.products.digital.map((plan, i) => {
            return {value: plan.id, label: plan.label, category: "digitial", index: i}
        });
    
        // singleValue: (provided, state) => {
        // },
        // input: (provided, state) => ({
        //     background: 'red'
        // })

        const lineItems = this.state.lineItems.map((item) => {
            return (
                <LineItem 
                    active          = {!this.state.productStatus.print}
                    options         = {printOptions}
                    quantity        = {item.quantity}
                    handleSelect    = {this.handleSelect}
                    handleQuantity  = {this.handleQuantity}
                />
            )

        });
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
                            <div className="c-cards-view__photo-top">
                                <h2 className="c-cards-view__heading"><Dotdotdot clamp={2}>{ this.props.data.title}</Dotdotdot></h2>
                                {favourite ? favourite : null}
                            </div>


                            <Flexrow>
                                <Checkbox label="Print" checked={this.state.productStatus.print} name="print" onChange={this.handleCheckbox} />
                                {lineItems}
                                
                                {/* <div style={{width: 200}}>
                                    <Select styles={customStyles} isDisabled={!this.state.productStatus.print} onChange={this.handleSelect} options={printOptions} />
                                </div>
                                <input type="text" value={this.state.quantity} placeholder="Qty" onChange={this.handleQuantity} />
                                <p>$0.00 AUD</p> */}
                            </Flexrow>
                            
                            <Flexrow>
                                <Checkbox label="Digital" checked={this.state.productStatus.digital} name="digital" onChange={this.handleCheckbox} />
                                {/* <div style={{width: 200}}>
                                    <Select styles={customStyles} isDisabled={!this.state.productStatus.digital} onChange={this.handleSelect} options={digitalOptions} />
                                </div>
                                <p>$0.00 AUD</p> */}
                            </Flexrow>




                        </div>


                    </article>
                </a>
            </div>
        )
    }
}




export default CardCart;