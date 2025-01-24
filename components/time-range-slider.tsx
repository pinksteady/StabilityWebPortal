"use client"

import React from "react"
import * as Slider from "@radix-ui/react-slider"
import { Button } from "@/components/ui/button"

interface TimeRangeSliderProps {
  value: number
  onValueChange: (value: number) => void
}

export function TimeRangeSlider({ value, onValueChange }: TimeRangeSliderProps) {
  const handleReset = () => onValueChange(30)

  return (
    <div className="flex items-center space-x-4">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-[200px] h-5"
        defaultValue={[30]}
        value={[value]}
        onValueChange={(values) => onValueChange(values[0])}
        max={90}
        min={7}
        step={1}
        aria-label="Time Range"
      >
        <Slider.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary" />
      </Slider.Root>
      <span className="text-sm font-medium">{value} days</span>
      <Button variant="outline" size="sm" onClick={handleReset}>
        Reset to 30 days
      </Button>
    </div>
  )
}

