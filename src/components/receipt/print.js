import React from 'react'
import styled from 'styled-components'



const print = (props) => {
    return (
        <Photo>
            <Title>{props.data.photo.title}</Title>
            <Attribute>Size: {props.data.name}</Attribute>
            <Attribute>Quantity: {props.data.quantity}</Attribute>
            <Attribute>Cost: {props.data.price}</Attribute>
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
