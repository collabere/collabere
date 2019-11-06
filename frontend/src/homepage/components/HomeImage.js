import React, { Component } from "react";
import influencerImg from '../../../images/influencer.png';
import brandImg from '../../../images/brand.jpg';

import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Modal, Card } from "@material-ui/core";
import LoginModal from "../../login/loginModal";

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
    loginCardStyle: {
      width: 20,
      height: 20,
      textAlign: '-webkit-center',
    },
    modalStyle: {
      textAlign: '-webkit-center',
    }
  }));

  function influencerClick() {
      console.log("Influncer Clicked");
  }

  function brandClick() {
      console.log("Brand Clicked");
  }

export default function HomeImage(props) {
        const classes = useStyles();

        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
          };
        
          const handleClose = () => {
            setOpen(false);
          };

        return (
            <div className={classes.root}>
                <ButtonBase
                focusRipple
                key="Influencer"
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: "50%",
                }}
                onClick={handleOpen}
                >
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${influencerImg})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                    >
                    Influencer
                    <span className={classes.imageMarked} />
                    </Typography>
                </span>
                </ButtonBase>
                <ButtonBase
                focusRipple
                key="Brand"
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: '50%',
                }}
                onClick={brandClick}
                >
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${brandImg})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                    >
                    Brand
                    <span className={classes.imageMarked} />
                    </Typography>
                </span>
                </ButtonBase>
                <div className={classes.loginCardStyle}>
                  <Modal
                      aria-labelledby="login-modal"
                      aria-describedby="login-modal"
                      open={open}
                      onClose={handleClose}
                      className={classes.modalStyle}
                  >
                      <LoginModal/>
                  </Modal>
                </div>
            </div>
        );
}
