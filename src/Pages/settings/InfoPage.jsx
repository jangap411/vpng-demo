import React from "react";

const InfoPage = () => {
  return (
    <div style={{ padding: "10px", margin: "5px" }}>
      <h2
        style={{
          margin: "5px",
          fontFamily: "serif, sans serif, cursive, fantasy, monospace.",
        }}
      >
        <u style={{ color: "grey" }}>Information</u>
      </h2>
      <p
        style={{
          fontFamily: "serif, sans serif, cursive, fantasy, monospace.",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        Copyright © {new Date().getFullYear()} FINCORP. All rights reserved.
        This application, including its design, code, and documentation, is the
        property of FINCORP IT Department, Application Development Unit (ADU)
        and is protected under international copyright laws. Unauthorized
        reproduction, distribution, or modification of this application, or any
        portion of it, may result in severe civil and criminal penalties, and
        will be prosecuted to the maximum extent possible under the law.
      </p>
    </div>
  );
};

export default InfoPage;
