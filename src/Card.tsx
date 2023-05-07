import "./Card.css"

export default () => {
  return <div className="current-weather">
    <div className="location">
      <div>
        <h1 className={"content"}>北京市</h1>
        <span className={"mini"}>北京市/中国</span>
      </div>
      <p className="mini">2023-05-07 09:24</p>
    </div>
    <div className="weather">
      <div className={"condition-container"}>
        <div className={"condition"}>AQI 优</div>
      </div>
      <div className="weather-data">
        <img src="/100.png" alt="QWeather"/>
        <div className={"weather-data-detail"}>
          <span className={"display"}>21°</span>
          <span>晴</span>
        </div>
      </div>
    </div>
    <div className="current-abstract content">
        今天白天晴，夜晚多云，比昨天热一些，现在21°，有风，空气不错。
    </div>
    <div className="current-basic">
       <div className={"current-basic-item"}>
         <p className={"title"}>3级</p>
         <p className={"content"}>东北风</p>
       </div>
      <div className={"current-basic-item"}>
        <p>21%</p>
        <p>相对湿度</p>
      </div>
      <div className={"current-basic-item"}>
        <p>强</p>
        <p>紫外线</p>
      </div>
    </div>
  </div>
}

