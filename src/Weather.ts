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
  temperature: number; // 温度
  humidity: number  // 湿度
}

export type Location = {
  id: string, // internal use only
  country: string,
  province: string
  name: string
  latitude: number,
  longitude: number,
}

const getGEO = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, (positionError) => {
      reject(positionError)
    })
  })
}

export interface Provider {
  getLocation(): Promise<Location>

  // 获取当前的空气质量
  getAir(location: Location): Promise<TimeAir>

  // 获取当前的温度
  getWeather(location: Location): Promise<TimeWeather[]>

  getIndices(location: Location): Promise<string>
}

let provider: Provider
export const getProvider = (): Provider => {
  if (provider == null) {
    provider = new QWeather(import.meta.env.VITE_QWKEY)
  }
  return provider
}

export class QWeather implements Provider {
  private static weatherAPIUrl = "https://devapi.qweather.com/v7/weather/7d"
  private static geoAPIUrl = "https://geoapi.qweather.com/v2/city/lookup"
  private static airAPIUrl = "https://devapi.qweather.com/v7/air/now"
  private static indicesAPIUrl = "https://devapi.qweather.com/v7/indices/1d"
  private args = {lang: "zh", key: ""}

  constructor(key: string) {
    this.args.key = key;
  }

  getIndices = async (location: Location): Promise<string> => {
    const data = await fetch(QWeather.indicesAPIUrl + "?" + new URLSearchParams({
      location: location.id,
      type: "1,2", ...this.args
    }))
      .then(res => res.json())
    if (data.code != "200") {
      return Promise.reject("无法获取信息")
    }
    return data.daily[0].text;
  }

  getAir = async (location: Location): Promise<TimeAir> => {
    const data = await fetch(QWeather.airAPIUrl + "?" + new URLSearchParams({"location": location.id, ...this.args}))
      .then(res => res.json())
    if (data.code != "200") {
      return Promise.reject("无法获取信息")
    }
    // {"code":"200","updateTime":"2023-05-07T12:59+08:00","fxLink":"https://www.qweather.com/air/chang'an-101110102.html","now":{"pubTime":"2023-05-07T12:00+08:00","aqi":"42","level":"1","category":"优","primary":"NA","pm10":"42","pm2p5":"16","no2":"22","so2":"7","co":"0.5","o3":"66"},"refer":{"sources":["QWeather","CNEMC"],"license":["CC BY-SA 4.0"]}}
    return {
      category: data.now.category,
      no2: data.now.no2,
      pm10: data.now.pm10,
      pm2p5: data.now.pm2p5,
      so2: data.now.so2,
      time: data.updateTime
    }
  }

  async getLocation(): Promise<Location> {
    const geo = await getGEO()
    const data = await fetch(QWeather.geoAPIUrl + "?" +
      new URLSearchParams({"location": this.geoToString(geo), ...this.args})
    ).then(res => res.json())
    if (data.code != "200") {
      return Promise.reject("无法获取信息")
    }
    const location = data.location[0]
    // TODO:数据处理
    return {
      country: location.country,
      province: location.adm1,
      id: location.id, latitude: Number(location.lat), longitude: Number(location.lon), name: location.name
    }
  }

  getWeather = async (location: Location): Promise<TimeWeather[]> => {
    const data = await fetch(QWeather.weatherAPIUrl + "?" + new URLSearchParams({"location": location.id, ...this.args}))
      .then(res => res.json())
    if (data.code != "200") {
      return Promise.reject("无法获取信息")
    }
    const res: TimeWeather[] = []
    // @ts-ignore
    data.daily.forEach(item => {
      res.push({
        humidity: Number(item.humidity),
        temperature: (Number(item.tempMax) + Number(item.tempMin)) / 2,
        time: new Date(item.fxDate),
        weather: item.textDay,
      })
    })
    return res
  }

  private geoToString = (position: GeolocationPosition): string => {
    return position.coords.longitude.toFixed(2) + "," + position.coords.latitude.toFixed(2);
  }
}