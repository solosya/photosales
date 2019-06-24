import React  from 'react'
import styled from 'styled-components';


const flexrow = ({children}) => {
    return (
        <Brow>
            {children}
        </Brow>
    )
}


const Brow = styled.div`
    position:relative;
    display: flex;
    flex-direction:horizontal;
    align-items:center;
`


export default flexrow