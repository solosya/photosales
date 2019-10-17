import React from 'react'
import styled from 'styled-components'


const contact = () => {
    return (
        <Container>
            <Text>Purchase digital or printed photos from [network name] and associated publications.</Text> 
            <Text>If you wish to purchase a photo not shown here, please contact us. </Text>
        </Container>
    )
}


const Container = styled.div`
    margin-bottom: 38px;
`

const Text = styled.p`
    font-size: 18px;
    font-weight:500;
    color: #595859;
    margin-top:5px;
`


export default contact
