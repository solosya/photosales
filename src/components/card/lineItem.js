import React from 'react'
import Select               from 'react-select';

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


    return (
        <>
            <div style={{width: 200}}>
                <Select styles={customStyles} isDisabled={props.active} onChange={props.handleSelect} options={props.options} />
            </div>
            <input type="text" value={props.quantity} placeholder="Qty" onChange={props.handleQuantity} />
            <p>$0.00 AUD</p>
        </>
)
}

export default lineItem
