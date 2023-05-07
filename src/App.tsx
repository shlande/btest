import Temperature, {Prop as TemperaturePros} from "./Temperature";
import Card, {Data} from "./Card";
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
  }]

const current:Data = {
  detail: [{
    title: '2级',
    value: "北风"
  }],
  advice: "今天白天晴，夜晚多云，比昨天热一些，现在23°，空气不错。",
  condition: "AQI 优",
  country: "中国", location: "北京市", province: "北京", region: "北京市", temperature: "23", weather: "晴"
}

function App() {
  return (
    <div className={"container"}>
      <div className={"card-container"}><Card data={current}/></div>
      <div className={"temperature"}>
        <div className={"temperature-title title"}><span>7日温度湿度</span></div>
        <Temperature data={data}/>
      </div>
    </div>
  )
}

export default App
