
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
        products: JSON.parse(JSON.stringify(this.props.products)),
        lineItems: [],
        lineItemCount: 1
    }


    handleCheckbox = e => {
        const status = {...this.state.productStatus};
        status[e.target.name] = e.target.checked;

        this.setState({productStatus: status}, () => {
            // console.log(this.state);
        });
    }

    // currently not in use.  updates an index pointing to an array
    // that points to the corresponding index in a reversed version of that array.
    rev =(n) => {
        var mid = (this.state.lineItems.length -1)/2;
        if (n>mid) {
            return n - (((n-mid)*2)-1) -1;
        }
        return n + (((mid-n)*2)+1) -1;
    }

    handleQuantity = (e, productID) => {
        const quantity = e.target.value;
        const productId = this.state.lineItems.findIndex((element) => {
            // console.log("PHOTO IDS");
            // console.log(element.photoId, this.props.data.id);
            // console.log(element.id, index);
            return element.photoId === this.props.data.id && element.id === productID;
        });

        const product = {...this.state.lineItems[productId]};
        product.quantity = +quantity;
        product.displayPrice = product.price * product.quantity;
        product.originalPrice = product.price * product.quantity;

        const discounts = this.props.discounts.lineItems;
        if (product.discount) {
            for( let i=0; i < product.discount.length; i++) {
                const discountId = product.discount[i];
                for (let j=0; j<discounts.length; j++) {
    
                    if (discounts[j].id === discountId && product.quantity >= discounts[j].quantity) {
                        const discountQuantity = product.quantity - discounts[j].quantity + 1;
                        const discountPrice = discounts[j].discount * discountQuantity;
                        const nonDiscountPrice = product.price * ( product.quantity - discountQuantity );
                        product.displayPrice = discountPrice + nonDiscountPrice;
                    }
                }
            }
        }
        const items = [...this.state.lineItems];
        items[productId] = product;

        this.setState({lineItems: items}, () => {
            // console.log("CARDCART STATE STATE", this.state);
            this.props.handlePurchaseCart(product);
        });
    }


    handleSelect = e => {

        let {category, index} = e;
        const product = {...this.state.products[category][index]};

        product.quantity = 1;
        product.photoId = this.props.data.id;
        product.productId = index;
        const menu = JSON.parse(JSON.stringify(this.state.products));
        const selectMenu = menu[category];
        selectMenu[index].disabled = true;

        // add the product to the lineItems
        const lineItems = [...this.state.lineItems];
        lineItems.push(product);

        this.setState(prevState => ({
            lineItems,
            products: {
                ...prevState.products,
                ...menu                    
            }
        }), () => {
            // console.log("CARDCART STATE STATE", this.state);
            this.props.handlePurchaseCart(product);
        });


    }


    removeItem = (e, productID ) => {

        const productIndex = this.state.lineItems.findIndex((element) => {
            // console.log("PHOTO IDS");
            // console.log(element.photoId, this.props.data.id);
            // console.log(element.id, index);
            return element.photoId === this.props.data.id && element.id === productID;
        });

        const lineItems = [...this.state.lineItems];
        const product = lineItems[productIndex];
        const productId = product.productId;
        lineItems.splice(productIndex, 1);


        // disable the item in the menu
        const menu = JSON.parse(JSON.stringify(this.state.products));
        const selectMenu = menu[product.category];
        selectMenu[productId].disabled = false;
        this.setState(prevState => ({
            lineItems,
            products: {
                ...prevState.products,
                ...menu                    
            }
        }), () => {
            // console.log("CARDCART STATE", this.state);
            this.props.handleItemRemove(product);
            });
    }

    // calculate = () => {
    //     this.setState()
    // }


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

        const printOptions = this.state.products.print.map((prod, i) => {
            return {value: prod.id, label: prod.label, category: "print", index: i, disabled: prod.disabled}
        });

        const digitalOptions = this.state.products.digital.map((prod, i) => {
            return {value: prod.id, label: prod.label, category: "digital", index: i, disabled: prod.disabled}
        });
    

        const newDigitalItem = <LineItem
            key             = {93939393939}
            active          = {!this.state.productStatus.digital}
            options         = {digitalOptions}
            selectValue     = {null}
            handleSelect    = {this.handleSelect}
        /> 

        const digitalProducts = this.state.lineItems.filter((item, i) => {
            return item.category === 'digital' ? true : false; 
        });
        // console.log("DIGITA:", digitalProducts);
        const digitalItems = digitalProducts.map((item, i) => {
            if (item.category === 'digital') {
                return (
                    <LineItem
                        key             = {i} 
                        index           = {i+1}
                        active          = {true}
                        options         = {digitalOptions}
                        selectValue     = {digitalOptions[item.productId]}
                        product         = {item}
                        handleSelect    = {this.handleSelect}
                        handleQuantity  = {this.handleQuantity}
                        handleRemove    = {this.removeItem}
                    />
                )
            }
        });



        const newPrintItem = <LineItem
            key             = {93939393939}
            active          = {!this.state.productStatus.print}
            options         = {printOptions}
            selectValue     = {null}
            handleSelect    = {this.handleSelect}
        /> 
        const printProducts = this.state.lineItems.filter((item, i) => {
            return item.category === 'print' ? true : false; 
        });
        const printItems = printProducts.map((item, i) => {
            if (item.category === 'print') {
                return (
                    <LineItem
                        key             = {i} 
                        index           = {i+1}
                        active          = {true}
                        options         = {printOptions}
                        selectValue     = {printOptions[item.productId]}
                        product         = {item}
                        handleSelect    = {this.handleSelect}
                        handleQuantity  = {this.handleQuantity}
                        handleRemove    = {this.removeItem}
                    />
                )
            }
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
                                    
                                    {printItems}
                                    {printProducts.length < this.state.products.print.length ? newPrintItem : null}

                                </div>

                            </Flexrow>
                            




                            <Flexrow>
                                <Checkbox label="Digital" checked={this.state.productStatus.digital} name="digital" onChange={this.handleCheckbox} />
                                <div className="c-cards-view__lineItems">
                                    
                                    {digitalItems}
                                    {digitalProducts.length < this.state.products.digital.length ? newDigitalItem : null}

                                </div>
                            </Flexrow>




                        </div>


                    </article>
                </a>
            </div>
        )
    }
}




export default CardCart;


        // this.setState(prevState => ({
        //     ...prevState,
        //     someProperty: {
        //         ...prevState.someProperty,
        //         someOtherProperty: {
        //             ...prevState.someProperty.someOtherProperty, 
        //             anotherProperty: {
        //                ...prevState.someProperty.someOtherProperty.anotherProperty,
        //                flag: false
        //             }
        //         }
        //     }
        // }))
