//Libraries
import React   from 'react'
import Select  from 'react-select'
import styled  from 'styled-components'

//Components
import Close   from '../closeIcon' 

//Styles
import styles  from './lineItem.module.scss'


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

    // console.log('what are the props options?', props.options);

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

        total = (props.product.priceTotal / 100).toFixed(2);
        if ( isNaN(total) ) {
            total = "";
        }

        
    }



    return (
        <div className={styles.lineItem} title={discountName}>
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
                ? <input className={styles.quantity} type="number" min="1" value={props.product.quantity} placeholder="Qty" onChange={(e) => props.handleQuantity(e.target.value,  props.product)} />
                : <div className={styles.quantityspacer}></div>
            }
            
            {deleteButton}

            {props.product
                ? <p className={styles.price}>
                    {/* {props.product.priceTotalFull !== props.product.priceTotal ? <span className={styles.fullPrice}>${props.product.priceTotalFull} - </span>  : ""} */}
                    
                    ${total}
                 </p>
                : null
            }

            
        </div>
)
}


const Pulldown = styled.div`


    /* desktop-lg */
    @media screen and (min-width : 1130px) {
        width:280px;
    }


    /* desktop */
    @media screen and (min-width : 992px) and (max-width : 1329px) {
        max-width:90%;
    }

    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        max-width:90%;
    }

    /* mobile */
    @media screen and (max-width :767px) {
        width:auto;
        max-width:90%;
        padding:20px 18px 20px 18px;

    }


    width:100px;
`



export default lineItem
