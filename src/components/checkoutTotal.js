import React from 'react'
import styled from 'styled-components';
import Flexrow  from '../components/layout/flexrow';

const checkoutTotal = (props) => {

    const total = typeof props.total === 'number' ? +props.total.toFixed(2) : props.total;

    return (
        <Flexrow {...props}>
            <Label>Total</Label>
            <Price>${total} AUD</Price>
        </Flexrow>
    )
}

const Label = styled.h2`
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 300;
    color: #595859;
    margin:0;
    flex-grow:1;
`

const Price = styled.p`
    font-family: 'Roboto';
    font-size: 22px;
    font-weight:500;
    color:black;
    margin:0;
    align-self:flex-end;
`

export default checkoutTotal
