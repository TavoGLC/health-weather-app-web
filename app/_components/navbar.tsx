"use client"

import { Button } from "@/components/ui/button"
import  Link  from "next/link"
import { ToDisplayMain } from "@/store/display-control"

export const Navbar = () => {
    
    const {toDisplay,onForecast,onCompare} = ToDisplayMain ((state) => state)

    return(
        <nav className="fixed top-0 w-full h-20 z-[49] bg-gradient-to-r from-[#080B38] to-[#133155]">
            <div className="flex flex-row justify-between items-center p-2">
                <div>
                    <p className="text-[50px]">
                        health weather app
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button onClick={onForecast}> Forecast </Button>
                    <Button onClick={onCompare}> Compare </Button>
                    
                    <Link href="https://www.buymeacoffee.com/tavoglc"  target="_blank" rel="noopener noreferrer">
                        <Button title="Donate :3">
                            Donate
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}