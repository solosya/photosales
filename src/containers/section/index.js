// Libraries
import React, { Component } from 'react'
import axios                from 'axios'

//Components
import Container            from '../../components/layout/container'
import PanelOne             from '../../components/panels/panel1'
import PanelTwo             from '../../components/panels/panel2'
import PanelThree           from '../../components/panels/panel3'

//Data
import {panels} from './data';

class Index extends Component {
        state = {
            panels: [],
        }

    componentDidMount () {
        // this.getPanels();
        // return;

        this.getThemeConfig().then( (r) => {

            const pages = r.data.data.page;
            const pagePanels = pages.photos || null;
            if (!pagePanels) return;

            let panelData = [];

            pagePanels.sections.map( (panel, i) => {
                
                const feed = this.props.feedHandler(panel).then( r => {
                    
                    panel.feed = r.data.articles.map(article => {

                        const media = article.featuredMedia;
                        return {
                            id          : article.articleId,
                            date        : article.publishedDate,
                            title       : article.title,
                            content     : article.excerpt,
                            editUrl     : article.editUrl,
                            publishDate : article.publishDate,
        
                            images: [{
                                id       : media.id,
                                url      : media.media.url,
                                type     : media.fileType,
                                width    : media.width,
                                height   : media.height,
                                filesize : media.fileSize,
                            }]
                        }
                    });

                    return panel;
                    // panelData.push(panel)
                    // const panels = [...this.state.panels, panel];
                });
                console.log(feed);
                return panelData.push(feed);

            });

            axios.all(panelData).then((results) => {
                console.log(results);
                // NEED TO ORDER PANELS
                this.setState({
                    panels: results
                }, () => {
                    console.log(this.state.panels);
                });

            });

            // this.setState({
            //     panels: panelData
            // }, () => {
            //     console.log(this.state.panels);
            // });


        }).catch(() => {
            this.getPanels();
        });

    }
    
    getThemeConfig = () => {
        return axios.get('/api/theme/get-config');
    }

    getPanels = () => {
        this.setState({panels: panels}, () => {
            console.log(this.state);
        });
    }

    showGallery = (card, panelName) => {
        let selected = null;
        const panel = this.state.panels.find((panel) => {
            return panel.title === panelName;
        });

        if (panel) {
            selected = panel.feed[card];
        }

        this.props.cardHandler(selected);
    }

    render() {

        return this.state.panels.map( (panel, i) => {

            const margin = i > 0 ? "70px": null;

            return (
                <Container key={i}>

                    {panel.template === "panel1" &&
                        <PanelOne 
                            cardHandler     = {this.showGallery} 
                            title           = {panel.title} 
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                        /> 
                    }

                    {panel.template === "panel2" &&
                        <PanelTwo 
                            cardHandler     = {this.showGallery} 
                            title           = {panel.title} 
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                        /> 
                    }

                    {panel.template === "panel3" &&
                        <PanelThree 
                            cardHandler     = {this.showGallery} 
                            title           = {panel.title} 
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                        /> 
                    }


                </Container>
            )

        });
    }
}

export default Index
