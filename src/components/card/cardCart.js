
// Libraries
import React, {Component}   from 'react';
import Dotdotdot            from 'react-dotdotdot';
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
        products: {...this.props.products},
        productMenu: {...this.props.products},
        lineItems: [],
        lineItemCount: 1
    }


    handleCheckbox = e => {
        const status = {...this.state.productStatus};
        status[e.target.name] = e.target.checked;

        this.setState({productStatus: status}, () => {
            console.log(this.state);
        });
    }

    rev =(n) => {
        var mid = (this.state.lineItems.length -1)/2;
        if (n>mid) {
            return n - (((n-mid)*2)-1) -1;
        }
        return n + (((mid-n)*2)+1) -1;
    }
        
    handleQuantity = (e, i) => {
        // console.log(this.state.lineItems);
        const quantity = e.target.value;
        const product = {...this.state.lineItems[i]};

        product.quantity = +quantity;
        const items = [...this.state.lineItems];
        items[i] = product;

        this.setState({lineItems: items}, () => {

            this.props.handlePurchaseCart(product);

        });
    }


    handleSelect = e => {

        let {value, category, label, index} = e;
        console.log(value, category, label);
        const product = {...this.state.products[category][index]};
        product.quantity = 1;
        product.photoId = this.props.data.id;
        product.productId = index;
        
        // disable the item in the menu
        const menu = {...this.state.productMenu};
        const selectMenu = menu[category];
        selectMenu[index].disabled = true;

        // add the product to the lineItems
        const newLine = [...this.state.lineItems];
        newLine.push(product);

        this.setState({
            lineItems: newLine,
            productMenu: menu
        }, () => {
            // console.log(this.state);
            this.props.handlePurchaseCart(product);
        });
    }


    removeItem = (e, index, category ) => {

        const lineItems = [...this.state.lineItems];
        const item = lineItems[index];
        const productId = item.productId;
        lineItems.splice(index, 1);


        // disable the item in the menu
        const productMenu = {...this.state.productMenu};
        const selectMenu = productMenu[category];
        selectMenu[productId].disabled = false;

        this.setState({
            lineItems,
            productMenu
            }, () => {
                console.log(this.state.productMenu);
            }
        );
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

        console.log(this.props.data);
        const printOptions = this.state.productMenu.print.map((plan, i) => {
            return {value: plan.id, label: plan.label, category: "print", index: i, disabled: plan.disabled}
        });
        console.log(printOptions);

        // const digitalOptions = this.state.products.digital.map((plan, i) => {
        //     return {value: plan.id, label: plan.label, category: "digitial", index: i}
        // });
    
        const newItem = <LineItem
            key             = {93939393939}
            active          = {!this.state.productStatus.print}
            options         = {printOptions}
            selectValue     = {null}
            handleSelect    = {this.handleSelect}
        /> 

        const lineItems = this.state.lineItems.map((item, i) => {
            return (
                <LineItem
                    key             = {i} 
                    index           = {i+1}
                    active          = {!this.state.productStatus.print}
                    options         = {printOptions}
                    selectValue     = {printOptions[item.productId]}
                    quantity        = {item.quantity}
                    handleSelect    = {this.handleSelect}
                    handleQuantity  = {this.handleQuantity}
                    handleRemove    = {this.removeItem}
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
                                
                                <div className="c-cards-view__lineItems">
                                    
                                    {lineItems}
                                    {this.state.lineItems.length < this.state.productMenu.print.length ? newItem : null}

                                </div>

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