import React from 'react'
import styled from 'styled-components';
import Flexrow  from '../components/layout/flexrow';

const checkoutTotal = (props) => {
    return (
        <Flexrow {...props}>
            <Label>Total</Label>
            <Price>${props.total} AUD</Price>
        </Flexrow>
    )
}

const Label = styled.h2`
    font-size: 20px;
    font-weight: 300;
    color: #595859;
    margin:0;
    flex-grow:1;
`

const Price = styled.p`
    font-size: 22px;
    font-weight:500;
    color:black;
    margin:0;
    align-self:flex-end;
`

export default checkoutTotal
