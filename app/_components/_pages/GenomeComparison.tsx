"use client"

import { HammingDistance } from "@/app/_utilities/compareGenomeData"
import { LinePlot } from "@/app/_utilities/LineGraph"
import { GenomeModel } from "@/app/_utilities/loadgenomeData"
import { MovingAverage } from "@/app/_utilities/movingAverage"
import { useState, useEffect } from "react"

export const ComparisonScreen = () =>{

    /* 
    is client
    */
    const [isClient, setIsClient] = useState(false)
    useEffect(()=>{setIsClient(true)},[])

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
    const forecast15Date = new Date(currentDate.valueOf() + 15 * 24 * 60 * 60 * 1000)
    const forecast15_doy = daysIntoYear(forecast15Date)
    const forecast30_Date = new Date(currentDate.valueOf() + 30 * 24 * 60 * 60 * 1000)
    const forecast30_doy = daysIntoYear(forecast30_Date)

    /* 
    Current day
    */ 
    const fixedXdata = Array.from({ length: 29700 }, (_, i) => i + 1)
    const fixedYdata = Array.from({ length: 29700 }, (_, i) => 1)

    const init_data = {forecast15:fixedYdata,forecast30:fixedYdata}
    const [comparisonData, setComparisont] = useState(init_data)

    /* 
    Current day
    */ 
    const datax = require('./datax.json');
    const datay = require('./datay.json');

    useEffect(()=>{
        const FetchData = async () => {

            const coordinatesToday = [[datax[today_doy-1],datay[today_doy-1]]]
            const coordinates15 = [[datax[forecast15_doy-1],datay[forecast15_doy-1]]]
            const coordinates30 = [[datax[forecast30_doy-1],datay[forecast30_doy-1]]]
    
            const genomeDataToday = await GenomeModel({data:coordinatesToday}) 
            const genomeData15 = await GenomeModel({data:coordinates15}) 
            const genomeData30 = await GenomeModel({data:coordinates30})

            const forecast15Comparison = HammingDistance(genomeDataToday,genomeData15)
            const forecast30Comparison = HammingDistance(genomeDataToday,genomeData30)

            const rollingComparison15 = MovingAverage(forecast15Comparison,500)
            const rollingComparison30 = MovingAverage(forecast30Comparison,500)
            
            const forecastedComparison = {forecast15:rollingComparison15,forecast30:rollingComparison30}
            
            setComparisont(forecastedComparison)
        }
        FetchData()}
        ,[])

    return(
        <div className="flex p-10">
            <div className="flex flex-col justify-between items-center space-y-10">
                <div className="flex flex-col justify-between items-center space-y-5 ">
                    <p className="text-xl"> Genome Comparison 15 Day Forecast </p>
                    <LinePlot 
                            xdata={fixedXdata} 
                            ydata={comparisonData.forecast15} 
                            ylabel="relative number of mutations" 
                            xlabel="genome location" 
                            PlotLabel="" 
                            plotHeight={windowDimensions.height/4} 
                            plotWidth={0.85*windowDimensions.width} 
                            margin="5"/> 
                </div>
                <div className="flex flex-col justify-between items-center space-y-5">
                    <p className="text-xl"> Genome Comparison 30 Day Forecast </p>
                    <LinePlot 
                            xdata={fixedXdata} 
                            ydata={comparisonData.forecast30} 
                            ylabel="relative number of mutations" 
                            xlabel="genome location" 
                            PlotLabel="" 
                            plotHeight={windowDimensions.height/4} 
                            plotWidth={0.85*windowDimensions.width} 
                            margin="5"/> 
                </div>
            </div>
        </div>
    )
}