import React                from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Card                 from '../../components/card/card.js'; 
import Header               from '../../components/partials/section_header.js';

const panel_3 = (props) => {

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

                <Row data-panel="pane3">
                    {props.cards.slice(0,4).map((card ,i) => {
                        return <Col key={i} classes={["col-12", "col-md-6", "col-lg-3"]}>
                            <Card 
                                cardHandler={props.showGallery} 
                                data={card} 
                                count={cardCount++}
                                panel={props.title}
                                styles = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                            />
                        </Col>
                    })}
                </Row>


                
                <Row margin="30px">
                    {props.cards.slice(4,7).map((card, i) => {
                        return <Col key={i} classes={["col-12", "col-md-6", "col-lg-3"]}>
                            <Card 
                                cardHandler={props.showGallery} 
                                data={card} 
                                count={cardCount++}
                                panel={props.title}
                                styles = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                            />
                        </Col>
                    })}
                </Row>


            </Col>

        </Row>
    )
}

export default panel_3;