import React,  { Component } from "react";

export default class LabelBox extends Component {

  render = () => {
  
    let styles = {
                labelBox : {
                  display: "inline-flex",
                  flexDirection: "column",
                  verticalAlign: "top",
                  width: "100%"
                },
                label: {
                  transform: "translate(0, 1.5px) scale(0.85)",
                  transformOrigin: "top left",
                  color: "#3f51b5",
                  fontSize: "1rem",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "0.00938em"
                },
                value: {
                  minHeight: "20px",
                  padding: "3px 0px 0px 10px",
                  color: "#565656"
                }
              }

    return (
      <div style={styles.labelBox}>
        <label style={styles.label}>{this.props.label}</label>
        <div style={styles.value}>
          {this.props.value}
        </div>
      </div>
    );
  }
}