
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
        lineItems: this.props.lineItems || []
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



    handleSelect = e => {

        let {category, index} = e;
        const product = {...this.state.products[category][index]};

        product.quantity = 1;
        product.photoId = this.props.data.id;
        product.productId = index;
        const menu = JSON.parse(JSON.stringify(this.state.products));
        const selectMenu = menu[category];
        selectMenu[index].disabled = true;

        this.setState(prevState => ({
            products: {
                ...prevState.products,
                ...menu                    
            }
        }));

        this.props.addLineItemToCart(product);
    }


    removeItem = (e, category, productId, photoId ) => {

        // enable the item in the menu
        const menu = JSON.parse(JSON.stringify(this.state.products));
        const selectMenu = menu[category];
        const menuIndex = selectMenu.findIndex((element) => {
            return element.id === productId;
        });

        selectMenu[menuIndex].disabled = false;
        this.setState(prevState => ({
            products: {
                ...prevState.products,
                ...menu                    
            }
        }), () => {
            this.props.removeLineItemFromCart(productId, photoId);
            });
    }



    render() {
        const count = this.props.count || 0;
        const panel = this.props.panel || null;
        const image = this.props.data.images && this.props.data.images.length > 0 ? this.props.data.images[0] : this.props.data;

        let favourite = null;

        if ( this.props.favourite ) {
            favourite = <div className="c-cards-view__buttons">
                <div onClick={() => this.props.favHandler(this.props.data)} className="c-cards-view__favourite"></div>
                <div onClick={() => this.props.handleRemovePhoto(this.props.data.id)} className={cn([close.close, "c-cards-view__close"])}></div>
            </div>
        }

        const printOptions = this.state.products.print.map((prod, i) => {
            return {value: prod.id, label: prod.label, category: "print", index: i, disabled: prod.disabled}
        });

        const digitalOptions = this.state.products.digital.map((prod, i) => {
            return {value: prod.id, label: prod.label, category: "digital", index: i, disabled: prod.disabled}
        });
    




        // **************************************************
        //                DIGITAL PRODUCTS
        // **************************************************
        const newDigitalItem = <LineItem
            key             = {93939393939}
            active          = {!this.state.productStatus.digital}
            options         = {digitalOptions}
            selectValue     = {null}
            handleSelect    = {this.handleSelect}
            new // this line item has no product information attached.
        /> 


        const digitalProducts = this.props.data.lineItems.filter((item, i) => {
            return item.category === 'digital' ? true : false; 
        });


        const digitalItems = digitalProducts.map((item, i) => {
            if (item.category === 'digital') {

                const cartDiscount = this.props.handleGetCartItemDiscount(item);
                if (cartDiscount) {
                    item.priceTotal = cartDiscount;
                }
                return (
                    <LineItem
                        key             = {i} 
                        index           = {i+1}
                        active          = {true}
                        options         = {digitalOptions}
                        selectValue     = {digitalOptions[item.productId]}
                        product         = {item}
                        handleSelect    = {this.handleSelect}
                        handleQuantity  = {this.props.handleQuantity}
                        handleRemove    = {this.removeItem}
                    />
                )
            }
            return null;
        });





        // **************************************************
        //                      PRINT PRODUCTS
        // **************************************************
        const newPrintItem  = <LineItem
            key             = {93939393939}
            active          = {!this.state.productStatus.print}
            options         = {printOptions}
            selectValue     = {null}
            handleSelect    = {this.handleSelect}
            new // this line item has no product information attached.
        /> 
        const printProducts = this.props.data.lineItems.filter((item, i) => {
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
                        handleQuantity  = {this.props.handleQuantity}
                        handleRemove    = {this.removeItem}
                    />
                )
            }
            return null;

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
