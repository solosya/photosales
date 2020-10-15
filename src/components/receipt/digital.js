import React from 'react'
import styled, {css} from 'styled-components'



const digital = (props) => {

    let cost = props.data.price;

    if (!isNaN( props.data.price ) && props.data.price > 0 ) {
        cost = (props.data.price/100).toFixed(2);
    }



    return (
        <Photo>
            <Title>{props.data.photo.caption}</Title>
            <Attribute>Digital download</Attribute>
            <Attribute>Cost: ${cost}</Attribute>
            <Attribute><Link color={props.color} href={props.data.photo.path} rel="noopener noreferrer" target="_blank"> Click to download </Link></Attribute>
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
const Link = styled.a`
    ${props => props.color && css`
        color: ${props.color};
    `}
`


export default digital
