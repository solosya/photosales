import React                from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Card                 from '../../components/card/card.js'; 
import Header               from '../../components/partials/section_header.js';

const panel_1 = (props) => {

    let cardCount = 0;
    return (

        <Row key={props.title}>
            <Col classes={["col-12"]}>
                <Header title={props.title} />
            </Col>

            <Col classes={["col-12", "col-md-4"]}>
                <Card cardHandler={props.cardHandler} data={props.cards[cardCount]} count={cardCount++} panel={props.title}></Card>
            </Col>

            <Col classes={["col-12", "col-md-4"]}>
                <Card cardHandler={props.cardHandler}  data={props.cards[cardCount]} count={cardCount++} panel={props.title}></Card>
            </Col>

            <Col classes={["col-12", "col-md-4"]}>
                <Card cardHandler={props.cardHandler}  data={props.cards[cardCount]} count={cardCount++} panel={props.title}></Card>
            </Col>

        </Row>
    )
}

export default panel_1;