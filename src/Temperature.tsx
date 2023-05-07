import {useEffect, useRef, useState} from "react";
import {Chart} from "chart.js/auto";

export type Prop = {
  time: Date
  temperature: number
  humidity: number
}

const generateLabel = (data: Prop[]): string[] => {
  const result: string[] = []
  for (const i of data) {
    result.push(i.time.getDate() + "号")
  }
  return result
}

const generateTemperature = (data: Prop[]): number[] => {
  const result: number[] = []
  for (const i of data) {
    result.push(Number(i.temperature))
  }
  return result
}

const generateHumidity = (data: Prop[]) => {
  const result: number[] = []
  for (const i of data) {
    result.push(Number(i.humidity))
  }
  return result
}

let chart:Chart
export default (props: { data: Prop[] }) => {
  const temperature = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    chart && chart.destroy()
    chart = new Chart(temperature.current!, {
      type: "line",
      options: {
        interaction: {
          intersect: false,
        },
        scales: {
          y: {
            grid: {
              display: false,
            },
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            grid: {
              display: false,
            },
            type: 'linear',
            display: true,
            position: 'right',
          }
        }
      },
      data: {
        labels: generateLabel(props.data),
        datasets: [{
          yAxisID: "y",
          label: '当日温度',
          data: generateTemperature(props.data),
          fill: false,
          borderColor: 'rgb(234,112,112)',
          tension: 0.1
        }, {
          yAxisID: "y1",
          label: '当日湿度',
          data: generateHumidity(props.data),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    })
    return () => {
      chart && chart.destroy();
    }
  }, [props.data])
  return (
    <canvas ref={temperature} id={"temperature"}>
    </canvas>
  )
}