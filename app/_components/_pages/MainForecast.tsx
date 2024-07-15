"use client"

import { ToGenome } from "@/app/_utilities/formatGenomeData"
import { LinePlot } from "@/app/_utilities/LineGraph"
import { GenomeModel } from "@/app/_utilities/loadgenomeData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRing } from "lucide-react"
import { useState, useEffect } from "react"

import { ToastButtonSimple } from "../toastButton"

export const ForecastScreen = () =>{

    /* 
    handle window size 
    */
    function getWindowDimensions() {
        var width = 500
        var height = 550
        var isSmall = width < 600 || height < 600
        var isVertical = width < height
        if (typeof window !== "undefined"){
            var { innerWidth: width, innerHeight: height } = window
            isSmall = width < 600 || height < 600
            isVertical = width < height
        }
        return {width,height,isSmall,isVertical};
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    /* 
    Current day
    */ 
    function daysIntoYear(date:Date){
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }
    const currentDate = new Date() 
    const today_doy = daysIntoYear(currentDate)
    const forecast30_Date = new Date(currentDate.valueOf() + 30 * 24 * 60 * 60 * 1000)
    const forecast30_doy = daysIntoYear(forecast30_Date)
    const xdata = Array.from({ length: 30 }, (_, i) => i + 1)
    const ydata = Array.from({ length: 30 }, (_, i) => 1)
    const initData = {xdata:xdata,ydata:ydata,genome:"test genome please wait"}
    const [forecastData, setForecast] = useState(initData)

    /* 
    latent data
    */ 
    const datax = require('./datax.json');
    const datay = require('./datay.json');

    /* 
    scores data
    */ 
    const scores = require('./dailyScores.json');

    /* 
    messages
    */ 
    function percentage(number:number){
        return Math.floor(number).toString() + "%"
    }

    function alerts(number:number){
        let message

        if (number > 1 && number <= 25){
            message = "The current forecast is low."
        }
        else if (number > 25 && number <= 50){
            message = "The current forecast is trending up, beware of sudden changes"
        }
        else if (number > 50 && number <= 75){
            message = "The current forecast is high and trending up, please take precautions."
        }
        else if (number > 75 && number <= 100){
            message = "The current forecast is high, please take precautions and limit your activity if possible."
        }
        return message
    }

    useEffect(()=>{
        const FetchData = async () => {

            const coordinatesToday = [[datax[today_doy-1],datay[today_doy-1]]]
            const genomeDataToday = await GenomeModel({data:coordinatesToday})
            const genome = ToGenome(genomeDataToday)

            let counter = 0
            for(let val of genomeDataToday){
                if (val===0)
                    counter = counter +1
            }
            
            const finalscore = 50*((counter - 8823)/(9109 - 8823))
            console.log(finalscore)

            const xvals = []
            const yvals = []
            for(let i=today_doy; i< today_doy+30; i++){
                let innerscore = 100*scores[i] + finalscore
                if (innerscore>=100){
                    innerscore = 100
                }
                xvals.push(i)
                yvals.push(innerscore)
            }
            
            const finaldata =  {xdata:xvals,ydata:yvals,genome:genome}
            setForecast(finaldata)
            
        }
        FetchData()}
        ,[])

    return(
        <div className="flex p-10">
            <div className="flex flex-row justify-between space-x-10">
                <div>
                    <Card className="flex flex-col justify-between w-[500px] h-[580px] bg-[#0b284b] border-4 border-gray-600/[.55]  ">
                        <CardHeader className="felx space-y-10">
                            <CardTitle className="flex justify-center items-center text-gray-400">Daily Forecast</CardTitle>
                            <CardDescription className="flex justify-center items-center text-gray-400" >The COVID-19 Prevalence For Today Is</CardDescription>
                        </CardHeader>
                        <div className="flex justify-center items-center">
                            <p className="text-8xl text-gray-400">
                                {percentage(forecastData.ydata[0])}
                            </p>
                        </div>

                        <CardContent className="grid gap-4">
                            <div className=" flex items-center space-x-10 rounded-md border p-4">
                            <BellRing />
                            <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground text-gray-400">{alerts(forecastData.ydata[0])}</p>
                            </div>
                            </div>
                        </CardContent>
                    <CardFooter>
                        <ToastButtonSimple genome={forecastData.genome} description="Forecasted SARS-Cov2 genome for today copied to clipboard"/>
                    </CardFooter>
                </Card>
            </div>
                <div className="p-5">
                    <LinePlot 
                        xdata={forecastData.xdata} 
                        ydata={forecastData.ydata} 
                        ylabel="prevalence" 
                        xlabel="day of year" 
                        PlotLabel="test" 
                        plotHeight={windowDimensions.height/2} 
                        plotWidth={windowDimensions.width/2} 
                        margin="5"/> 
                </div>
            </div>
        </div>
    )
}