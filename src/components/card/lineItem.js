//Libraries
import React   from 'react'
import Select  from 'react-select'
import styled  from 'styled-components'

//Components
import Close   from '../closeIcon' 



const lineItem = (props) => {

    const customStyles = {
        option: (provided, state) => {
            return {...provided};
        },
        control: (provided, state) => {
            const styles = {
                ...provided,
                borderRadius: 0,
                borderColor: "#e7e7e7",
                height:'45px'
            }
            if (state.isDisabled) {
                styles.backgroundColor = 'white';
                styles.color = 'black';
            }
            return styles;
        },
        dropdownIndicator: (provided, state) => {

            const styles = {
                ...provided
            }
            if (state.isDisabled) {
                styles.color = 'white';
            }
            return styles;
        },
        indicatorSeparator: (provided, state) => {
            const styles = {
                ...provided
            }
            if (state.isDisabled) {
                styles.backgroundColor = 'white';
            }
            return styles;
        },
        indicatorsContainer: (provided, state) => {
            const styles = {
                ...provided
            }
            if (state.isDisabled) {
                styles.display ="none";
                // styles.backgroundColor = 'white';
                // styles.flexShrink = '1';
                // styles.maxWidth= '10px';
            }
            return styles;
        },


        
    }


    const options = props.options.filter((item) => {
        return !item.disabled;
    });

    let deleteButton = null;
    if (props.handleRemove) {
        deleteButton = <Close width="12px" height="12px" onClick={ (e) => props.handleRemove(e, props.product.id, props.product.photoId) } />
        // deleteButton = <p className={styles.delete} onClick={(e) => props.handleRemove(e, props.product.category, props.product.id, props.product.photoId)}>X</p>
    }

    let discountName = "";

    let total = "";
    
    if (props.product) {
        if ( props.product.discountName ) {
            discountName = props.product.discountName ; 
        }
        // if (props.product.priceTotalDiscount) {
        //     itemTotalDiscount = props.product.priceTotalDiscount;
        // }

        total = isNaN(props.product.priceTotal) ? "" : (props.product.priceTotal / 100).toFixed(2);

        if ( isNaN(total) ) {
            total = "";
        }
    }


    return (
        <LineItem title={discountName}>
            {/* <div style={{minWidth: '280px'}}> */}
            <Pulldown>
                <Select 
                    styles      = {customStyles} 
                    isDisabled  = {props.active} 
                    onChange    = {props.handleSelect}
                    value       = {props.selectValue}
                    options     = {options}
                />

            </Pulldown>
            {/* </div> */}
            {props.product && props.product.category === 'print'
                ? <QuantityInput type="number" min="1" value={props.product.quantity} placeholder="Qty" onChange={(e) => props.handleQuantity(e.target.value,  props.product)} />
                : <Spacer />
            }
            
            {deleteButton}

            {props.product
                ? <Price>
                    ${total}
                  </Price>
                : null
            }

            
        </LineItem>
)
}


const Pulldown = styled.div`

    /* desktop-lg */
    @media screen and (min-width : 1200px) {
        width:280px;
    }

    /* desktop */
    @media screen and (min-width : 992px) and (max-width : 1199px) {
        width:200px;
        max-width:90%;
    }

    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        width:218px;
        max-width:90%;
    }

    /* mobile */
    @media screen and (max-width :767px) {
        width:65%;
        max-width:90%;
    }
    width:100px;
`


const LineItem = styled.div`
    display:flex;
    min-width:100%;
    margin-bottom:10px;
    align-items:center;
`


// const FullPrice = styled.span`
//     color:red;
//     font-weight:bold;
//     text-decoration: line-through;
// `

const Price = styled.p`
    font-family: "Roboto";
    flex-grow: 1;
    text-align:right;
    margin:0;
    height:41px;
    font-size: 18px;
    line-height: 41px;
`
const QuantityInput = styled.input`
    box-sizing: border-box;
    padding:5px;
    font-size:16px;
    width:55px;
    height:45px;
    margin:0 10px;
    text-align:center;
    border: 1px solid #e7e7e7;
    &:focus {
        outline: none;
    }
    @media screen and (min-width : 768px) and (max-width : 991px) {
        width:45px;
    }

    /* mobile */
    @media screen and (max-width :767px) {
        width:50px;
    }


`

const Spacer = styled.div`
    width:47px;
    margin: 0 10px;
`



export default lineItem
