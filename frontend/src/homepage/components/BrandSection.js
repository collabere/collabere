import React from "react";
import { Input } from 'antd';

export default function BrandSection({ dark, id }) {
  return (
    <div className={"section" + (dark ? " section-dark" : "")}>
      <div className="section-content" id={id}>
      <h1>Product for brands
</h1>
        <p>Drop your email here to know
</p>
<Input placeholder="Enter email here" />
      </div>
    </div>
  );
}
