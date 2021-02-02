// Libraries
import React, { Component } from 'react'
import axios                from 'axios'

//Components
import Container            from '../../components/layout/container'
import PanelOne             from '../../components/panels/panel1'
import PanelTwo             from '../../components/panels/panel2'
import PanelThree           from '../../components/panels/panel3'
import PanelFour            from '../../components/panels/panel4'

// import devFeed              from '../../store/devData/feed'        

//Data
import {panels} from './data';

class Index extends Component {
    state = {
        panels: [],
    }

    componentDidMount () {

        this.getThemeConfig().then( (r) => {
            const pages = r.data.data.page;
            const pagePanels = pages.photos || null;
            if (!pagePanels) return;

            let panelData = [];

            pagePanels.sections.map( (panel, i) => {

                if (typeof panel.active !== 'undefined' && panel.active === false ) {
                    return false;
                }

                const feed = this.props.feedHandler(panel).then( r => {

                    panel.title = r.data.blog ? r.data.blog.title : panel.title;

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
                            publishDate : article.publishDate,

                            images: [{ // featured media only
                                id       : media.id,
                                url      : media.media.url,
                                path     : media.path,
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

                }).catch(() => {
                    return false;
                });

                return panelData.push(feed);

            });

            axios.all(panelData).then((results) => {
                this.setState({panels: results});
            });


        }).catch((e) => {
            // console.log(e);
            console.log('Index error panels/feeds');
            this.setState({panels: panels});
        });

    }
    
    getThemeConfig = () => {
        return axios.get('/api/theme/get-config');
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

            if (panel === false) return null;

            // first panel doens't have top margin
            let margin = (i>0) ? "70px": null;

            return (
                <Container key={i}>

                    {panel.template === "panel1" &&
                        <PanelOne 
                            showGallery     = {this.showGallery}
                            title           = {panel.title}
                            blog            = {panel.blog}
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
                            blog            = {panel.blog}
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
                            blog            = {panel.blog}
                            cards           = {panel.feed}
                            margin          = {margin}
                            linkHandler     = {this.props.linkHandler}
                            admin           = {this.props.admin}
                        /> 
                    }
                    {panel.template === "panel4" &&
                        <PanelFour 
                            showGallery     = {this.showGallery}
                            title           = {panel.title}
                            blog            = {panel.blog}
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
