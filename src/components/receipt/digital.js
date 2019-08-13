import React from 'react'
import styled from 'styled-components'



const digital = (props) => {
    return (
        <Photo>
            <Title>{props.data.photo.title}</Title>
            <Attribute>Digital download</Attribute>
            <Attribute>Cost: {props.data.price}</Attribute>
            <Attribute>Click to download: {props.data.photo.path}</Attribute>
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


export default digital
