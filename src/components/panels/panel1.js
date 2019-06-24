import React                from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Card                 from '../../components/card/card.js'; 
import Header               from '../../components/partials/section_header.js';

const panel_1 = (props) => {

    let cardCount = 0;

    // console.log(props.cards[1]);
    return (
        <Row key={props.title}>
            <Col classes={["col-12"]}>
                <Header title={props.title} />
            </Col>

            { props.cards[cardCount] ?
                <Col classes={["col-12", "col-md-4"]}>
                    <Card   cardHandler={
                            props.cardHandler} 
                            data={props.cards[cardCount]} 
                            count={cardCount++} 
                            panel={props.title}
                            styles="card-1-mobile card-1-tablet card-1-desktop"
                            >
                    </Card>
                </Col> : null
            }

            { props.cards[cardCount] ?
                <Col classes={["col-12", "col-md-4"]}>
                    <Card   cardHandler={
                            props.cardHandler} 
                            data={props.cards[cardCount]} 
                            count={cardCount++} 
                            panel={props.title}
                            styles="card-1-mobile card-1-tablet card-1-desktop"
                            >
                    </Card>
                </Col> : null
            }

            { props.cards[cardCount] ?
                <Col classes={["col-12", "col-md-4"]}>
                    <Card   cardHandler={
                            props.cardHandler} 
                            data={props.cards[cardCount]} 
                            count={cardCount++} 
                            panel={props.title}
                            styles="card-1-mobile card-1-tablet card-1-desktop"
                            >
                    </Card>
                </Col> : null
            }
        </Row>
    )
}

export default panel_1;