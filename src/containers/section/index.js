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
// console.log(panels);
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
                            isPinned    : parseInt( article.isPinned ),
                            pinnedAt    : parseInt( article.pinnedAt ),

                            images: [{ // featured media only
                                id       : media.id,
                                url      : media.media.url,
                                guid     : media.guid,
                                type     : media.fileType,
                                title    : media.title,
                                width    : media.width,
                                height   : media.height,
                                caption  : media.caption,
                                filesize : media.fileSize,
                            }]
                        }
                    });

                    return panel;
                    // panelData.push(panel)
                    // const panels = [...this.state.panels, panel];
                });
                return panelData.push(feed);

            });

            axios.all(panelData).then((results) => {

                // NEED TO ORDER PANELS
                this.setState({
                    panels: results
                }, () => {
                    // console.log(this.state.panels);
                });

            });

            // this.setState({
            //     panels: panelData
            // }, () => {
            //     console.log(this.state.panels);
            // });


        }).catch(() => {
            console.log('getting panels');
            this.getPanels();
        });

    }
    
    getThemeConfig = () => {
        return axios.get('/api/theme/get-config');
    }

    getPanels = () => {
        this.setState({panels: panels}, () => {
            // console.log(this.state);
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

        this.props.showGallery(selected);
    }

    render() {

        return this.state.panels.map( (panel, i) => {

            const margin = i > 0 ? "70px": null;

            return (
                <Container key={i}>

                    {panel.template === "panel1" &&
                        <PanelOne 
                            showGallery     = {this.showGallery} 
                            title           = {panel.title} 
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                            admin           = {this.props.admin}
                        /> 
                    }

                    {panel.template === "panel2" &&
                        <PanelTwo 
                            showGallery     = {this.showGallery} 
                            title           = {panel.title} 
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                            admin           = {this.props.admin}
                        /> 
                    }

                    {panel.template === "panel3" &&
                        <PanelThree 
                            showGallery     = {this.showGallery} 
                            title           = {panel.title} 
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                            admin           = {this.props.admin}
                        /> 
                    }


                </Container>
            )

        });
    }
}

export default Index
