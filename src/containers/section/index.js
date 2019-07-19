// Libraries
import React from 'react'

//Components
import Container            from '../../components/layout/container';
import PanelOne             from '../../components/panels/panel1';
import PanelTwo             from '../../components/panels/panel2';


const index = (props) => {
        console.log(props);
        return props.panels.map( (panel, i) => {
            const margin = i > 0 ? "70px": null;

            return (
                <Container key={i}>
                    {panel.template === "panel1" ?
                        <PanelOne 
                            cardHandler={props.cardHandler} 
                            title={panel.title} 
                            cards={panel.feed}
                            margin={margin}
                            linkHandler={props.linkHandler}
                            >
                        </PanelOne> :null}

                    {panel.template === "panel2" ?
                        <PanelTwo 
                            cardHandler={props.cardHandler} 
                            title={panel.title} 
                            cards={panel.feed}
                            margin={margin}
                            linkHandler={props.linkHandler}
                            >
                        </PanelTwo> :null}

                </Container>
            )

        });
}

export default index
