//Libraries
import React                from 'react'
import { Waypoint }         from 'react-waypoint'

//Components
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Card                 from '../../components/card/card.js';
import Header               from '../../components/partials/section_header.js'
import Container            from '../../components/layout/container'
import Button               from '../../components/button/button'

const results = (props) => {
    console.log("RESULTS", props);

    return (
        <Container>
    
            <Row key="searchResults"  margin={props.margin || ""}>
                <Col classes={["col-12"]}>
                    <Header 
                        linkHandler = {props.linkHandler} 
                        linkUrl     = { false }
                        title       = "Search results" />
                </Col>


                <Col classes={["col-12"]}>
                    <Row>
                        
                        {props.photos.map((photo, i) => {
                            return (
                                <Col key={i} classes={["col-12", "col-md-4"]} marginBottom="30px">
                                    <Card 
                                        data        = {photo} 
                                        panel       = {props.title}
                                        cardHandler = {props.cardHandler} 
                                        styles      = "card-1-mobile card-1-tablet card-1-desktop"
                                    />
                                </Col>
                            )
                        })}

                    </Row>

                        


                    {/* <Waypoint onEnter={this.loadMore} /> */}

                    <Row margin="30px">
                        <Col classes={["col-12"]}>
                            {/* <Button handler={this.loadMore} classes={["button", "button--red", "button--top-30"]}>Load more {this.cardCount}</Button> */}
                        </Col>
                    </Row>



                </Col>

            </Row>
        </Container>    
    )
}

export default results
