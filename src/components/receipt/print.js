import React from 'react'
import styled from 'styled-components'


const print = (props) => {

    let cost = props.data.price;

    if (!isNaN( props.data.price ) && props.data.price > 0 ) {
        cost = (props.data.price/100).toFixed(2);
    }
    
    console.log(props.data);
    return (
        <Photo>
            <Title>{props.data.photo.caption}</Title>
            <Attribute>Size: {props.data.text_field2}</Attribute>
            <Attribute>Quantity: {props.data.quantity}</Attribute>
            <Attribute>Cost: ${cost}</Attribute>
        </Photo>
    )
}

const Photo = styled.div`
    margin-bottom:25px;
`

const Title = styled.h2`
    font-size: 15px;
    font-weight: 500;
`
const Attribute = styled.p`
    font-size: 15px;
    font-weight: 400;
    margin-top:4px;
`


export default print;
