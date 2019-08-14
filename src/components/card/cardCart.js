
// Libraries
import React, {Component}   from 'react'
import Dotdotdot            from 'react-dotdotdot'
import styled               from 'styled-components'

// Components
import Checkbox             from '../form/checkbox'
import Flexrow              from '../layout/flexrow'
import LineItem             from './lineItem'
import Close                from '../../components/closeIcon' 
// import FavIcon              from '../favourites/favIcon';

// Styles
import './card-3.scss';
// import close from '../../styles/close.module.scss';
//Components




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

    getProductIndex(product) {

        return this.state.products.findIndex((element) => {
            return element.id === product.value;
        });
    }


    handleSelect = e => {

        const index = this.getProductIndex(e);

        const products = [...this.state.products];
        const product = {...products[index]};

        product.quantity = 1;
        product.photoId = this.props.data.id;
        product.productIndex = index;
        product.disabled = true;

        products.splice(index, 1, product);

        this.setState({products});

        this.props.addLineItemToCart(product);
    }


    removeItem = (e, productIndex, photoId ) => {
        const index = this.getProductIndex({value: productIndex});

        // enable the item in the menu
        const products = [...this.state.products];
        const product = {...products[index] };
        product.disabled = false;

        products.splice(index, 1, product);

        this.setState({ products }
        , () => {
            product.productIndex = index;
            this.props.removeLineItemFromCart(product);
        });
    }



    render() {
        const count = this.props.count || 0;
        const image = this.props.data.images && this.props.data.images.length > 0 ? this.props.data.images[0] : this.props.data;

        
        let favourite = null;

        if ( this.props.favourite ) {
            favourite = <div className="c-cards-view__buttons">
                <Close width="22px" height="22px"  onClick={() => this.props.handleRemovePhoto(this.props.data)}></Close>
            </div>
        }


        let printOptions   = [];
        let digitalOptions = [];
        if (this.state.products.length > 0) {
            printOptions = this.state.products.filter((prod) => {
                return prod.category === 'print';
            }).map((prod) => {
                return {value: prod.id, label: prod.label, category: prod.category, disabled: prod.disabled}
            });

            digitalOptions = this.state.products.filter((prod) => {
                return prod.category === 'digital';
            }).map((prod) => {
                return {value: prod.id, label: prod.label, category: prod.category, disabled: prod.disabled}
            });

        }




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

        let digitalProducts = [];
        if (typeof this.props.data.lineItems != 'undefined') {
            digitalProducts = this.props.data.lineItems.filter((item, i) => {
                return item.category === 'digital' ? true : false; 
            });
        }
        


        const digitalItems = digitalProducts.map((item, i) => {
            if (item.category === 'digital') {

                return (
                    <LineItem
                        key             = {i} 
                        index           = {i+1}
                        active          = {true}
                        options         = {digitalOptions}
                        selectValue     = {item}
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
        let printProducts = [];
        if (typeof this.props.data.lineItems != 'undefined') {
            printProducts = this.props.data.lineItems.filter((item, i) => {
                return item.category === 'print' ? true : false; 
            });
        }


        


        const printItems = printProducts.map((item, i) => {


            if (item.category === 'print') {


                return (
                    <LineItem
                        key             = {i} 
                        index           = {i+1}
                        active          = {true}
                        options         = {printOptions}
                        selectValue     = {printOptions[item.productIndex]}
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
            <div key={this.props.data.id} className={this.props.styles}>
                <div  href              = "#" 
                    className           = ""
                    data-id             = {this.props.data.id} 
                    data-guid           = {this.props.data.guid} 
                    data-position       = {this.props.data.position} 
                    data-social         = {this.props.data.social}
                    data-article-image  = {this.props.data.articleImg} 
                    data-article-text   = {this.props.data.title}
                    >

                    <article className="c-cards-view">

                        <figure className='c-cards-view__media' onClick={() => this.props.cardHandler(count)} >
                            <picture>
                                <source media="(max-width: 767px) and (min-width: 501px)" srcSet={this.props.data.imageMedium} />
                                <source media="(max-width: 500px)" srcSet={this.props.data.imageSmall} />

                                { this.props.data.lazyload === false
                                    ?  <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={image.url} alt="" />
                                    :  <img width={this.props.data.imgWidth} height={this.props.data.imgHeight} className="img-fluid" src={image.url} data-original={this.props.data.articleImg} alt="" />
                                }

                                <div className="video-icon"></div>

                            </picture>

                        </figure>
                        
                        <div className="c-cards-view__container">
                            <div className="c-cards-view__photo-top">
                                <h2 className="c-cards-view__heading"><Dotdotdot clamp={2}>{ this.props.data.caption}</Dotdotdot></h2>
                                {favourite ? favourite : null}
                            </div>

                            
                            <Flexrow>
                                <ProductCategory> 
                                    <Checkbox label="Print" checked={this.state.productStatus.print} name="print" onChange={this.handleCheckbox} />
                                </ProductCategory>

                                <LineItems>
                                    { printItems }
                                    { printProducts.length < printOptions.length && newPrintItem }
                                </LineItems>

                            </Flexrow>
                            




                            <Flexrow>
                                <ProductCategory> 
                                    <Checkbox label="Digital" checked={this.state.productStatus.digital} name="digital" onChange={this.handleCheckbox} />
                                </ProductCategory>

                                <LineItems>
                                    
                                    {digitalItems}
                                    {digitalProducts.length < digitalOptions.length && newDigitalItem }

                                </LineItems>
                            </Flexrow>




                        </div>


                    </article>
                </div>
            </div>
        )
    }
}


const ProductCategory = styled.div`
    width: 100px;
    margin-top: 13px;

    /* mobile */
    @media screen and (max-width :767px) {
        margin-bottom:7px;
    }
`


const LineItems = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
`

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
