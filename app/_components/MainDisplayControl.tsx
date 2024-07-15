"use client"
import { ToDisplayMain } from "@/store/display-control"
import { ForecastScreen } from "./_pages/MainForecast"
import { ComparisonScreen } from "./_pages/GenomeComparison"

export const MainDisplayControl = () => {

    const {toDisplay,onForecast,onCompare} = ToDisplayMain ((state) => state)

    return(
        <>
        {toDisplay==="forecast" && (
            <ForecastScreen/>
        )}

        {toDisplay==="compare" && (
            <ComparisonScreen/>
        )}
        </>
    )
}