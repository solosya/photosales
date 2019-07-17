import React   from 'react';
import styled, {css} from 'styled-components';


const row = (props) => {

    return (
        <Row {...props}>
            {props.children}
        </Row>
    )
}


const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;

    ${props => props.margin && css`
        margin-top: ${props.margin}
    `}
`


export default row;