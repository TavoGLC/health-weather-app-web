import { create } from "zustand"

interface MainDisplayControl {
    toDisplay: "forecast" | "compare";
    onForecast: () => void;
    onCompare: () => void;
}

export const ToDisplayMain = create<MainDisplayControl>( (set) => ({
    toDisplay: "forecast",
    onForecast: () => set(() => ({toDisplay:"forecast"})),
    onCompare: () => set(() => ({toDisplay:"compare"})),
}))