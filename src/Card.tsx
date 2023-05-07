import { ReactElement} from "react"
import "./Card.css"

export type Data = {
  location: string,
  country: string,
  province: string
  region: string
  condition: string
  temperature: string
  weather: "阴" | "晴" | "雨" | "雪"
  advice: string
  detail: {
    title: string
    value: string
  }[]
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${formatInt(date.getMonth() + 1)}-${formatInt(date.getDate())} ${formatInt(date.getHours())}:${formatInt(date.getMinutes())}`
}

const formatInt = (num: number): string => {
  return ("0" + num).slice(-2)
}

const generateWeatherImg = (weather: Data["weather"]) => {
  switch (weather) {
    case "晴":
      return "/100.png"
    case "阴":
      return "/101.png"
    case "雨":
      return "/305.png"
    case "雪":
      return "/101.png"
  }
}

export default (props: { data: Data }) => {
  const {region, province, country, condition, temperature, weather, advice, detail} = props.data

  const Detail: ReactElement[] = []
  detail && detail.forEach((item,index) => {
    Detail.push(<div key={index} className={"current-basic-item"}>
      <p className={"title"}>{item.title}</p>
      <p className={"content"}>{item.value}</p>
    </div>)
  })
  return <div className="current-weather">
    <div className="location">
      <div>
        <h1 className={"content"}>{region}</h1>
        <span className={"mini"}>{province}/{country}</span>
      </div>
      <p className="mini">{formatDate(new Date())}</p>
    </div>
    <div className="weather">
      <div className={"condition-container"}>
        <div className={"condition"}>{condition}</div>
      </div>
      <div className="weather-data">
        <img src={generateWeatherImg(weather)} alt="Weather"/>
        <div className={"weather-data-detail"}>
          <span className={"display"}>{temperature}°</span>
          <span>{weather}</span>
        </div>
      </div>
    </div>
    <div className="current-abstract content">
      {advice}
    </div>
    <div className="current-basic">
      {Detail}
    </div>
  </div>
}

