import React  from 'react'
import styled, {css} from 'styled-components';


const flexrow = (props) => {

    return (
        <Brow {...props}>
            {props.children}
        </Brow>
    )
}


const Brow = styled.div`
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
    
    /* mobile */
    @media screen and (max-width :767px) {
        flex-direction:column;
        webkit-flex-direction:column;
    }



`
export default flexrow
