"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JoinRoomPage() {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState("")
  const [joinName, setJoinName] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get("error")
    const details = urlParams.get("details")

    if (error) {
      toast({
        title: "Error",
        description: details || "An unexpected error occurred.",
        variant: "destructive",
      })
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [toast])

  const handleJoinRoom = () => {
    if (roomCode.trim() && joinName.trim()) {
      router.push(`/room/${roomCode.toUpperCase()}?name=${encodeURIComponent(joinName)}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
      <Card className="w-full max-w-md border-2 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Join a Room</CardTitle>
          <CardDescription>Enter a room code to join an existing music session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-code">Room Code</Label>
            <Input
              id="room-code"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="uppercase"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-name">Your Name</Label>
            <Input
              id="join-name"
              placeholder="Enter your name"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
            />
          </div>
          <Button
            onClick={handleJoinRoom}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!roomCode.trim() || !joinName.trim()}
          >
            Join Room
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 