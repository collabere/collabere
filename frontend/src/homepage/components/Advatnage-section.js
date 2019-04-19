import React from "react";

export default function AdvantageSection({ title, subtitle, dark, id }) {
  return (
    <div className={"section" + (dark ? " section-dark" : "")}>
      <div className="advatnage-section-content" id={id}>
        <h1>{title}</h1>
        <table>
          <tr>
            <td>
            
            </td>
            <td>
              <p>{subtitle}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
