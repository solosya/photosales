// Libraries
import React, {Component}   from 'react';
import { Waypoint }         from 'react-waypoint';

//Components
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Card                 from '../../components/card/card.js'; 
import Header               from '../../components/partials/section_header.js';
import Container            from '../../components/layout/container';
import Button               from '../../components/button/button';

//Data
import {panels} from './data';


class Section extends Component {

    
    state = {
        galleries: [],
    }

    cardCount = 0;


    componentDidMount () {
        this.getPanels();
        return;
    }

    getPanels = () => {
        const panel = panels.filter((panel) => {
            return panel.title === this.props.title;
        });

        if (panel.length > 0) {
            this.setState({galleries: panel[0].feed}, () => {
                console.log(this.state);
            });

        }
    }


    showGallery = (index) => {
        const gallery = this.state.galleries[index];
        this.props.cardHandler(gallery);
    }

    loadMore = () => {
        const panel = panels.filter((panel) => {
            return panel.title === this.props.title;
        });
        const galleries = panel[0].feed;
        const more = this.state.galleries.concat(galleries);
        this.setState({galleries: more}, () => {
            console.log(this.state);
        });
    }


    render() {
        this.cardCount = 0;

        const panels = [this.state.galleries.slice(0,8), this.state.galleries.slice(8,16)];

        const bottomGalleries = this.state.galleries.slice(16);
    
        return (
            <Container>
    
                <Row key={this.props.title}  margin={this.props.margin || ""}>
                    <Col classes={["col-12"]}>
                        <Header 
                            linkHandler = {this.props.linkHandler} 
                            linkUrl     = { false }
                            title       = {this.props.title} />
                    </Col>
    

                    <Col classes={["col-12"]}>
                        {panels.map((panel, i) => {
                            return (
                                <Row key={i}>
                                    {panel.map((card, i) => {
                                        return (
                                    
                                            <Col key={i} classes={["col-12", "col-md-3"]} marginBottom="30px">
                                                <Card 
                                                    data        = {card} 
                                                    count       = {this.cardCount++}
                                                    panel       = {this.props.title}
                                                    cardHandler = {this.showGallery} 
                                                    styles      = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                                                    // styles      = "card-1-mobile card-1-tablet card-1-desktop"
                                                />
                                            </Col>
                                        )
                                    })}
                                </Row>
                            )
                        })}
    
                            
                        <Row margin="30px" style={{backgroundColor:"orange"}}>
                            
                            { bottomGalleries.map( (card, i) => {

                            return (
                                    <Col key={i} classes={["col-12", "col-md-3"]} marginBottom="30px">

                                        <Card 
                                            data        = {card} 
                                            count       = {this.cardCount++}
                                            panel       = {this.props.title}
                                            cardHandler = {this.showGallery}
                                            styles      = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                                            // styles      = "card-1-mobile card-1-tablet card-1-desktop"
                                        />

                                    </Col>

                                )
                            }) }

                        </Row>
    
                        <Waypoint onEnter={this.loadMore} />

                        <Row margin="30px">
                            <Col classes={["col-12"]}>
                                <Button handler={this.loadMore} classes={["button", "button--red", "button--top-30"]}>Load more {this.cardCount}</Button>
                            </Col>
                        </Row>



                    </Col>
    
                </Row>
            </Container>
        )

    }
}

export default Section
