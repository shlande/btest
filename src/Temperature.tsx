import {useEffect, useRef, useState} from "react";
import {Chart} from "chart.js/auto";

const data = {}

let chart: Chart

export default () => {
  const temperature = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    chart = new Chart(temperature.current!, {
      type: "line",
      options: {
        interaction: {
          intersect: false,
        }
      },
      data: {
        labels: ["1", "1", "1", "1", "1", "1", "1"],
        datasets: [{
          label: '当日温度',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    })
    console.log("创建chart")
    return () => {
      console.log("清理chart")
      chart.destroy();
    }
  }, [])


  return (
    <canvas ref={temperature} id={"temperature"}>
    </canvas>
  )
}