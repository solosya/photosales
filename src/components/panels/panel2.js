import React                from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Card                 from '../../components/card/card.js'; 
import Header               from '../../components/partials/section_header.js';

const panel_1 = (props) => {

    let cardCount = 0;

    return (

        <Row key={props.title}  margin={props.margin || ""}>
            
            <Col classes={["col-12"]}>
                <Header 
                    linkHandler = {props.linkHandler} 
                    linkUrl     = { "/"+ props.title.toLowerCase().replace(/\s/g, "-")+ "/" }
                    title       = {props.title} 
                />
            </Col>

            <Col classes={["col-12"]}>

                <Row data-panel="panel2">
                    {props.cards.slice(0,4).map((card, i) => {
                        return <Col key={i} classes={["col-12", "col-md-6", "col-lg-3"]}>
                            <Card 
                                data   = {card} 
                                count  = {cardCount++}
                                panel  = {props.title}
                                admin  = {props.admin}
                                styles = {["ps-card-1-mobile", "ps-card-1-tablet", "ps-card-1-desktop"]}
                                cardHandler={props.showGallery} 
                                />
                        </Col>
                    })}
                </Row>

            </Col>

        </Row>
    )
}

export default panel_1;