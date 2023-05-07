import Temperature, {Prop as TemperaturePros} from "./Temperature";
import Card from "./Card";
import React from "react";
import "./App.css"

const data:TemperaturePros[]=  [
  {
    humidity: 12, temperature: 36, time: new Date(),
  },
  {
    humidity: 19, temperature: 48, time: new Date(),
  },
  {
    humidity: 22, temperature: 29, time: new Date(),
  },
  {
    humidity: 18, temperature: 50, time: new Date(),
  },
  {
    humidity: 19, temperature: 60, time: new Date(),
  }
]

function App() {


  return (
    <div className={"container"}>
      <div className={"card-container"}><Card/></div>
      <div className={"temperature"}>
        <div className={"temperature-title title"}><span>7日温度湿度</span></div>
        <Temperature data={data}/>
      </div>
    </div>
  )
}

export default App
