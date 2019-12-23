import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CollaborateImg from '../../../images/resized1.jpg';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  leftAlign: {
    textAlign: 'left',
    width: '50%',
  },
  rightAlign: {
    textAlign: 'right',
  },
  centerAlign: {
    textAlign: 'center'
  },
  backgroundSetup: {
    backgroundImage: `url(${CollaborateImg})`
  },
  backgroundColorStyle: {
    backgroundColor: '#ebeddc'
  }
});

export default function InfluencerSection({ dark, id }) {
  const classes = useStyles();
  const paddingStyle = {
    paddingBottom: 5,
    paddingTop: 5,
  }

  const leftPaddingStyle = {
    paddingLeft: '50%',
  }
  return (
    <div>
      <div style={paddingStyle}>
        <Card className={`${classes.card} ${classes.backgroundSetup}`}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Collaborate effectively with a business portfolio
            </Typography>
            <Typography variant="body2" component="p">
            Why limit yourself with conducting business on Instagram when you can actually have a business portfolio?<br/>
    Collabere helps influencers and brands connect, manage and track your collaborations on single platform and grow
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div style={paddingStyle}>
        <Card className={classes.backgroundSetup}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.centerAlign}>
            Product for influencers
            </Typography>
            <Typography variant="body2" component="p" className={classes.leftAlign}>
              <Card className={classes.backgroundColorStyle}>
                <CardContent>
                  <Typography>
                  Own a business portfolio
                  helping you post referral links,
                  Photography content, videos etc..
                  </Typography>
                </CardContent>
              </Card>
            </Typography>
            <Typography variant="body2" component="p" className={classes.rightAlign}>
              <div style={leftPaddingStyle}>
                <Card className={classes.backgroundColorStyle}>
                  <CardContent>
                    <Typography>
                    Collaboration requests
                    at one place
                    No emails, No DMs
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Typography>
            <Typography variant="body2" component="p" className={classes.leftAlign}>
              <Card className={classes.backgroundColorStyle}>
                <CardContent>
                  <Typography>
                  A comfortable interface
                  for interacting in form of
                  chat interface
                  </Typography>
                </CardContent>
              </Card>
            </Typography>
            <Typography variant="body2" component="p" className={classes.rightAlign}>
              <div style={leftPaddingStyle}>
                  <Card className={classes.backgroundColorStyle}>
                    <CardContent>
                      <Typography>
                      Track and visualize your metrics
                      Earnings per month and deal
                      Earnings vs engagement
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
            </Typography>
            <Typography variant="body2" component="p" className={classes.leftAlign}>
              <Card className={classes.backgroundColorStyle}>
                <CardContent>
                  <Typography>
                  Know where you stand
                  with our research in
                  Industry and grow
                  </Typography>
                </CardContent>
              </Card>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
