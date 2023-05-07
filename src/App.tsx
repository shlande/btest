import Temperature, {Prop as TemperaturePros} from "./Temperature";
import Card, {Data} from "./Card";
import React, {useEffect, useState} from "react";
import "./App.css"
import {Location, TimeAir} from "./Weather";
import {getProvider, TimeWeather} from "./Weather";

const data: TemperaturePros[] = [
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

const current: Data = {
  name: "未知",
  detail: [],
  advice: "",
  condition: "AQI 优",
  country: "未知", province: "未知", temperature: 23, weather: "晴"
}

// const QWeatherToTempData = (data: TimeWeather[]):TemperaturePros[] => {
//   const res:TemperaturePros[] = []
//   data.forEach(item => {
//     res.push({humidity: item.humidity, temperature: item.temperature, time: item.time})
//   })
//   return res;
// }

const generateDetail = (data: TimeAir):Data["detail"] => {
  return [{
    title: "二氧化硫",
    value: data.so2
   }, {
    title: "二氧化氮",
    value: data.no2,
  }, {
    title: "PM10",
    value: data.pm10
  },{
    title: "PM2.5",
    value: data.pm2p5
  }]
}

function App() {
  const [temp, setTemp] = useState<TemperaturePros[]>([])
  const [data,setData] = useState<Data>(current)
  useEffect(() => {
    const provider = getProvider()
    provider.getLocation().then(res => {
      const data_ = {...data, ...res} as Data
      // setData(data_)
      return {res,data_}
    }).then(({res,data_: data}) => {
      Promise.all([
        // 获取到温度，直接根系温度
        provider.getWeather(res).then(res => {
          data = {...data,temperature:res[0].temperature, weather: res[0].weather}
          setData(data)
          setTemp(res)
        }),
        // 获取到空气质量，更新data
        provider.getAir(res).then(res => {
          data = {...data,detail: generateDetail(res)}
          setData(data)
        })
      ])
    })
  },[])

  useEffect(() => {
    console.log(data)
  },[data])

  return (
    <div className={"container"}>
      <div className={"card-container"}><Card data={data}/></div>
      <div className={"temperature"}>
        <div className={"temperature-title title"}><span>7日温度湿度</span></div>
        <Temperature data={temp}/>
      </div>
    </div>
  )
}

export default App
