import React from "react";

export default function InfluencerSection({ dark, id }) {
  return (
    <div className={"section" + (dark ? " section-dark" : "")}>
      <div className="section-content" id={id}>
        <h1>Collaborations made easy</h1>
        <p>
          Collabere helps influencers and brands connect, manage and track your
          collaborations on single platform and grow
        </p>
        <hr />
        <h1>Product for influencers</h1>
        <p>Collaboration requests at one place No emails, No DMs</p>
        <p>
          Manage your projects with stages 4 collaboration projects worth $2000
          2 projects worth $800 in negotiation 3 projects worth $1250 ready to
          start
        </p>
        <p>
          Track and visualize your metrics Earnings per month and deal Earnings
          vs engagement
        </p>
        <p>Know where you stand with our research in Industry and grow</p>
      </div>
    </div>
  );
}
