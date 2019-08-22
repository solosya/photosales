import React                 from 'react'
import styled, {css}         from 'styled-components'
import RippleSpinner         from '../components/spinners/RippleSpinner'


const checkoutTotal = (props) => {

    
    let total = isNaN(props.total) ? "" : (props.total / 100).toFixed(2);
    if ( isNaN(total) ) {
        total = "";
    }

    return (
        <Row {...props}>
            <Label>Total</Label>
            { total !== "" ? <Price>${total} AUD</Price> : <RippleSpinner /> }
            
        </Row>
    )
}

const Row = styled.div`
    position:relative;
    display: flex;
    flex-direction:row;
    align-items:start;
    vertical-align:middle;
    
    ${props => props.borderTop && css`
        border-top: 1px solid #595859;
        padding-top: 10px;
        margin-top:33px;
    `}    

`

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
