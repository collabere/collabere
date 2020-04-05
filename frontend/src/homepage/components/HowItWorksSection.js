import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import CollaborateImg from "../../../images/resized1.jpg";

export default function HowItWorksSection({ dark, id }) {
  const cardStyle = {
    minHeight: 400,
    minWidth: 275,
    textAlign: "center",
    backgroundImage: `url(${CollaborateImg})`
  };

  const paddingStyle = {
    paddingBottom: 5,
    paddingTop: 5
  };

  return (
    <div style={paddingStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5" component="h2">
            How It Works ?
          </Typography>
        </CardContent>
        <iframe
          src="https://www.youtube.com/watch?v=PGJ284wFgmk"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          width="60%"
          height="400"
        />
      </Card>
    </div>
  );
}
