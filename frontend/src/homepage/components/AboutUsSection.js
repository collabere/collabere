import React from "react";

export default function AboutUsSection({ dark, id }) {
  return (
    <div className={"section" + (dark ? " section-dark" : "")}>
      <div className="section-content" id={id}>
      <p>Test text</p>
        
      </div>
    </div>
  );
}
