
import * as d3 from 'd3'
import { useRef } from 'react'

type DataProps = {
    xdata: number[],
    ydata: number[],
    PlotLabel:string,
    margin: string,
    plotWidth:number,
    plotHeight:number,
    xlabel:string,
    ylabel:string
}

export const LinePlot = (props:DataProps) => {

    const svgRef = useRef(null) as any 

    function MakeLinePlot(funcprops:DataProps,ref:any){

        const xdata = funcprops.xdata
        const ydata = funcprops.ydata
        const w = funcprops.plotWidth
        const h = funcprops.plotHeight
        const margin = funcprops.margin

        const localdata = []

        for (let i=0; i< xdata.length-1; i++) {
            localdata.push({
                'xval': xdata[i],
                'yval': ydata[i]
                })
            }
            
        const maxY = Math.max(...ydata)
        const minY = Math.min(...ydata)

        const maxYRange = 1.01*maxY
        const minYRange = 0.99*minY

        const maxX = Math.max(...xdata)
        const minX = Math.min(...xdata)

        const maxXRange = 1.0005*maxX
        const minXRange = 0.9995*minX

        const svg = d3.select(ref.current)
            .attr("width",w)
            .attr("height",h)
            .style("margin-top",margin)
            .style("overflow","visible")

        const xScale = d3.scaleLinear()
            .domain([minXRange,maxXRange])
            .range([0,w])

        const yScale  = d3.scaleLinear()
            .domain([minYRange,maxYRange])
            .range([h,0])

        const xAxis = d3.axisBottom(xScale)
                .ticks(10)
        
        const yAxis = d3.axisLeft(yScale)
                .ticks(2)

        svg.selectAll('g').remove()
        svg.selectAll('path').remove()

        svg.append('g')
            .call(xAxis)
            .attr("transform",`translate(0,${h})`)
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", w)
            .attr("y", h*0.125)
            .text(funcprops.xlabel)
        
        svg.append('g')
        .attr('class', 'grid-lines')
        .selectAll('line')
        .data(xScale.ticks())
        .join('line')
        .attr('x1', d => xScale(d))
        .attr('x2', d => xScale(d))
        .attr('y1', h)
        .attr('y2', 0)
        .style("stroke", "#a0a0a0")
        .style("stroke-opacity", "0.075")
        
        svg.append('g')
            .call(yAxis)
            .append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", -h*0.125)
            .text(funcprops.ylabel)

        svg.append('g')
            .attr('class', 'grid-lines')
            .selectAll('line')
            .data(yScale.ticks())
            .join('line')
            .attr('x1', w)
            .attr('x2', 0)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .style("stroke", "#a0a0a0")
            .style("stroke-opacity", "0.075")
            
        svg.selectAll('text')
            .attr("stroke-width","0")
            .attr("fill","#a7a8b3")
            .style("font-size",'14px')
            .style("font-weight",'bold')
        
        svg.selectAll("line")
            .style("stroke", "#a7a8b3");

        const makeLine = d3.line()
            .x((d:any)=>xScale(d.xval))
            .y((d:any)=>yScale(d.yval))
            .curve(d3.curveCardinal)
        
        const curveFunc = d3.area()
            .x((d:any)=>xScale(d.xval)+2)     
            .y1((d:any)=>yScale(d.yval))    
            .y0(h-1)                          
        
        svg.selectAll('.line')
            .data([localdata])
            .join("path")
            .attr('d', (d:any) => makeLine(d))
            .attr("fill","#121E2C")
            .attr("fill-opacity","0.25")
            .attr("stroke","#121E2C")
            .attr("stroke-width", "2.5")
            .attr('d', (d:any) =>curveFunc(d))
        
    }
    
    MakeLinePlot(props,svgRef)

    return (
        <div className='justify-center p-5'>
            <svg ref={svgRef}/>
        </div>
    )
}