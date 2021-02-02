import React                from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Card                 from '../../components/card/card.js'; 
import Header               from '../../components/partials/section_header.js';

const panel_4 = (props) => {

    let cardCount = 0;

    return (

        <Row key={props.title}  margin={props.margin || ""} data-panel="Panel 4">
            <Col classes={["col-12"]}>
                <Header 
                    linkHandler = {props.linkHandler} 
                    linkUrl     = { "/"+ props.blog.toLowerCase().replace(/\s/g, "-")+ "/" }
                    title       = {props.title}
                    panel       = {true}
                    fontSize    = '23px'
                    fontWeight  = '400'
                    marginBottom= '7px'

                />
            </Col>

            <Col classes={["col-12"]}>

                <Row data-panel="panel4">
                    {props.cards.slice(0,3).map((card ,i) => {
                        return <Col key={i} classes={["col-12", "col-md-4"]}>
                            <Card 
                                cardHandler={props.showGallery} 
                                data={card} 
                                count={cardCount++}
                                panel={props.title}
                                admin = {props.admin}
                                styles = {["ps-card-1-mobile", "ps-card-1-tablet", "ps-card-1-desktop"]}
                                linkHandler = {props.linkHandler} 
                            />
                        </Col>
                    })}
                </Row>


                
                <Row margin="30px">
                    {props.cards.slice(3,6).map((card, i) => {
                        return <Col key={i} classes={["col-12", "col-md-4"]}>
                            <Card 
                                cardHandler={props.showGallery} 
                                data={card} 
                                count={cardCount++}
                                panel={props.title}
                                admin = {props.admin}
                                styles = {["ps-card-1-mobile", "ps-card-1-tablet", "ps-card-1-desktop"]}
                                linkHandler = {props.linkHandler} 
                            />
                        </Col>
                    })}
                </Row>

                <Row margin="30px">
                    {props.cards.slice(6,9).map((card, i) => {
                        return <Col key={i} classes={["col-12", "col-md-4"]}>
                            <Card 
                                cardHandler={props.showGallery} 
                                data={card} 
                                count={cardCount++}
                                panel={props.title}
                                admin = {props.admin}
                                styles = {["ps-card-1-mobile", "ps-card-1-tablet", "ps-card-1-desktop"]}
                                linkHandler = {props.linkHandler} 
                            />
                        </Col>
                    })}
                </Row>

                <Row margin="30px">
                    {props.cards.slice(9,12).map((card, i) => {
                        return <Col key={i} classes={["col-12", "col-md-4"]}>
                            <Card 
                                cardHandler={props.showGallery} 
                                data={card} 
                                count={cardCount++}
                                panel={props.title}
                                admin = {props.admin}
                                styles = {["ps-card-1-mobile", "ps-card-1-tablet", "ps-card-1-desktop"]}
                                linkHandler = {props.linkHandler} 
                            />
                        </Col>
                    })}
                </Row>


            </Col>

        </Row>
    )
}

export default panel_4;