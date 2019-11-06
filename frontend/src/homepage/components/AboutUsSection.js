import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import CollaborateImg from '../../../images/resized1.jpg';

export default function AboutUsSection({ dark, id }) {
  const cardStyle = {
    minWidth: 275,
    textAlign: 'center',
    backgroundImage: `url(${CollaborateImg})`,
  }

  const paddingStyle = {
    paddingBottom: 5,
    paddingTop: 5,
  }

  return (
    // <div className={"section" + (dark ? " section-dark" : "")}>
    //   <div className="section-content" id={id}>
    //   <p>Test text</p>
        
    //   </div>
    // </div>
    <div style={paddingStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5" component="h2">
            About Us
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
