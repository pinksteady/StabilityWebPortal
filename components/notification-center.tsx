"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { allResidents, type Notification, generateNotification } from "@/lib/data"

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(
    allResidents.flatMap((resident) => resident.notifications),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const randomResident = allResidents[Math.floor(Math.random() * allResidents.length)]
      const newNotification = generateNotification(randomResident)
      setNotifications((prev) => [newNotification, ...prev])
    }, 30000) // Generate a new notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className={`h-[1.2rem] w-[1.2rem] ${unreadCount > 0 ? "text-blue-500" : ""}`} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
            Clear All
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <DropdownMenuItem key={notification.id} onSelect={() => markAsRead(notification.id)}>
              <div className={`flex flex-col ${notification.read ? "text-muted-foreground" : "font-bold"}`}>
                <span>{notification.message}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

