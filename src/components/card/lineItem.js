import React from 'react'
import Select               from 'react-select';
import styles  from './lineItem.module.scss';

const lineItem = (props) => {


    const customStyles = {
        option: (provided, state) => ({
            ...provided,
        }),
        control: (provided) => ({
            ...provided,
            borderRadius: 0
        }),
    }


    // console.log(props.options);

    const options = props.options.filter((item) => {
        return !item.disabled;
    });

    let deleteButton = null;
    if (props.handleRemove) {
        deleteButton = <p className={styles.delete} onClick={(e) => props.handleRemove(e, props.index -1, 'print')}>X</p>
    }

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
            {props.quantity
                ? <input type="text" value={props.quantity} placeholder="Qty" onChange={(e) => props.handleQuantity(e,  props.index -1)} />
                : null
            }
            {deleteButton}

            {props.quantity
                ? <p>$0.00 AUD</p>
                : null
            }
            
        </div>
)
}

export default lineItem
