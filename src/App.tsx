import Temperature from "./Temperature";
import Card from "./Card";
import React from "react";
import "./App.css"
function App() {

  return (
    <div className={"container"}>
      <div className={"card-container"}><Card/></div>
      <div className={"temperature"}>
        <div className={"temperature-title title"}><span>7日温度湿度</span></div>
        <Temperature/>
      </div>
    </div>
  )
}

export default App
