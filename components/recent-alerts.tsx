"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const alerts = [
  {
    name: "Emma Wilson",
    room: "207",
    event: "Fall detected",
    time: "2 hours ago",
    details: "Sensor detected a fall. Staff responded within 5 minutes. Resident is stable.",
  },
  {
    name: "Frank Thomas",
    room: "115",
    event: "Low stability score",
    time: "5 hours ago",
    details: "Stability score dropped from 7.2 to 6.1 over the past week. Recommend increased monitoring.",
  },
  {
    name: "Grace Lee",
    room: "301",
    event: "Decreased pink noise usage",
    time: "1 day ago",
    details: "Pink noise usage decreased by 30% over the past 3 days. Consider checking device functionality.",
  },
]

export function RecentAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<(typeof alerts)[0] | null>(null)

  return (
    <div className="space-y-8">
      {alerts.map((alert, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
            <AvatarFallback>
              {alert.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{alert.name}</p>
            <p className="text-sm text-muted-foreground">
              {alert.event} - Room {alert.room}
            </p>
          </div>
          <div className="ml-auto font-medium">{alert.time}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-4" onClick={() => setSelectedAlert(alert)}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedAlert?.event}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-bold">Resident:</div>
                  <div className="col-span-3">{selectedAlert?.name}</div>
                  <div className="font-bold">Room:</div>
                  <div className="col-span-3">{selectedAlert?.room}</div>
                  <div className="font-bold">Time:</div>
                  <div className="col-span-3">{selectedAlert?.time}</div>
                  <div className="font-bold">Details:</div>
                  <div className="col-span-3">{selectedAlert?.details}</div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  )
}

