import React from 'react'
import Select               from 'react-select';
import styles  from './lineItem.module.scss';

const lineItem = (props) => {

    const customStyles = {
        option: (provided, state) => {
            return {...provided};
        },
        control: (provided, state) => {
            const styles = {
                ...provided,
                borderRadius: 0,
            }
            if (state.isDisabled) {
                styles.backgroundColor = 'white';
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


    // console.log(props.options);

    const options = props.options.filter((item) => {
        return !item.disabled;
    });

    let deleteButton = null;
    if (props.handleRemove) {
        deleteButton = <p className={styles.delete} onClick={(e) => props.handleRemove(e, props.product.category, props.product.id, props.product.photoId)}>X</p>
    }

    let discountName = "";

    if (props.product) {

        if ( props.product.discountName ) {
            discountName = props.product.discountName ; 
        }
        // if (props.product.priceTotalDiscount) {
        //     itemTotalDiscount = props.product.priceTotalDiscount;
        // }

    }

    console.log(props.product);
    return (
        <div className={styles.lineItem}>
            <div style={{width: 200}}>
                <Select 
                    styles      = {customStyles} 
                    isDisabled  = {props.active} 
                    onChange    = {props.handleSelect}
                    value       = {props.selectValue}
                    options     = {options}
                />
            </div>
            {props.product && props.product.category === 'print'
                ? <input type="number" value={props.product.quantity} placeholder="Qty" onChange={(e) => props.handleQuantity(e.target.value,  props.product)} />
                : null
            }
            {deleteButton}
            {discountName}
            {props.product
                ? <p>
                    {props.product.priceTotalFull !== props.product.priceTotal ? <span className={styles.fullPrice}>${props.product.priceTotalFull} - </span>  : ""}
                    
                    ${props.product.priceTotal} AUD
                 </p>
                : null
            }
            
        </div>
)
}

export default lineItem
