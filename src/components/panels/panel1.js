import React                from 'react'
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Card                 from '../../components/card/card.js';
import Header               from '../../components/partials/section_header.js'

const panel_1 = (props) => {

    let cardCount = 0;

    return (

        <Row key={props.title} margin={props.margin || ""} data-panel="Panel 1">

            <Col classes={["col-12"]}>
                <Header 
                    linkHandler = {props.linkHandler} 
                    linkUrl     = { "/"+ props.blog.toLowerCase().replace(/\s/g, "-") }
                    title       = {props.title}
                    panel       = {true}
                    // fontColor   = {this.props.color}
                    fontSize    = '23px'
                    fontWeight  = '400'
                    marginBottom= '7px'

                />
            </Col>

            <Col classes={["col-12"]}>

                <Row data-panel="panel1">
                    {props.cards.slice(0,3).map((card, i) => {

                        return (
                            <Col key={i} classes={["col-12", "col-md-4"]}>
                                <Card 
                                    data        = {props.cards[cardCount]} 
                                    count       = {cardCount++}
                                    panel       = {props.title}
                                    styles      = {["ps-card-1-mobile", "ps-card-1-tablet", "ps-card-1-desktop"]}
                                    cardHandler = {props.showGallery}
                                    linkHandler = {props.linkHandler} 
                                    admin       = {props.admin}
                                />
                            </Col>
                        )
                    })}
                </Row>
            
            </Col>

        </Row>
    )
}

export default panel_1;