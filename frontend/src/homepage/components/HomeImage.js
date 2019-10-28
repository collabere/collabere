import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LogoImg from '../../../images/infyHome.jpg';

export default class HomeImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imgStyle = {
            width: '100%',
            height: 500
        }
        return (
            <Card>
                <CardMedia>
                    <img src={LogoImg} style={imgStyle}/>
                </CardMedia>
                <CardActions>
                    <Button size='small' color='primary'>Influencer</Button>
                    <Button size='small' color='primary'>Brand</Button>
                </CardActions>
            </Card>
        );
    }
}