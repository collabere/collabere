import React from "react";

export default function HowItWorksSection({ dark, id }) {
  return (
    <div className={"section" + (dark ? " section-dark" : "")}>
      <div className="section-content" id={id}>
      <h1>How it works??
</h1>
        
      </div>
    </div>
  );
}
