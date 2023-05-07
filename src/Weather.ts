// 空气质量信息
export type TimeAir = {
  time: Date
  category: string  // 空气指数
  pm10: string  // pm10
  pm2p5: string // pm2.5
  so2: string   // 二氧化硫
  no2: string   // 二氧化氮
}

// 天气信息
export type TimeWeather = {
  time: Date
  weather: string // 天气情况
  temperature: string | number; // 温度
  humidity: string  // 湿度
}

export type Location = {
  id: string, // internal use only
  name: string,
  latitude: string,
  longitude: string,
}

const getGEO = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      return position;
    }, (positionError) => reject(positionError))
  })
}

export interface Provider {
  getLocation(): Promise<Location>

  // 获取当前的空气质量
  getAir(location: Location): Promise<TimeAir[]>

  // 获取当前的温度
  getWeather(location: Location): Promise<TimeWeather[]>
}

let provider:Provider
export const getProvider = ():Provider  => {
  if (provider == null) {
    console.log(import.meta.env.QWKEY)
    provider = new QWeather(import.meta.env.QWKEY)
  }
  return provider
}
export class QWeather implements Provider {
  private static weatherAPIUrl = "https://devapi.qweather.com/v7/weather/7d"
  private static geoAPIUrl = "https://geoapi.qweather.com/v2/city/lookup"
  private static airAPIUrl = "https://devapi.qweather.com/v7/air/5d"
  private args = {lang: "zh", key: ""}

  constructor(key: string) {
    this.args.key = key;
  }

  getAir = async (location: Location): Promise<TimeAir[]> => {
    const data = await fetch(QWeather.airAPIUrl + "?" + new URLSearchParams({"location": location.id, ...this.args}))
      .then(res => res.json())
    // TODO:数据处理
    return data
  }

  async getLocation(): Promise<Location> {
    const geo = await getGEO()
    const data = await fetch(QWeather.geoAPIUrl + "?" +
      new URLSearchParams({"location": this.geoToString(geo), ...this.args})
    ).then(res => res.json())
    // TODO:数据处理
    return data
  }

  getWeather = async (location: Location): Promise<TimeWeather[]> => {
    const data = await fetch(QWeather.weatherAPIUrl + "?" + new URLSearchParams({"location": location.id, ...this.args}))
      .then(res => res.json())
    // TODO:数据处理
    return data
  }

  private geoToString = (position: GeolocationPosition): string => {
    return position.coords.latitude + "," + position.coords.longitude;
  }
}