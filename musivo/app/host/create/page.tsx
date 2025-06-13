"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Headphones, CheckCircle, Loader2 } from "lucide-react"
import { getSpotifyAuthUrl } from "@/lib/spotify"
import { useSpotifyAuth } from "@/hooks/use-spotify-auth"
import { useToast } from "@/hooks/use-toast"

export default function HostRoomPage() {
  const router = useRouter()
  const [hostName, setHostName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { isAuthenticated, clearTokens } = useSpotifyAuth()
  const { toast } = useToast()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get("error")
    const details = urlParams.get("details")

    if (error) {
      if (error === "spotify_auth_failed" || error === "token_failed") {
        clearTokens()
        toast({
          title: "Spotify Setup Required",
          description: "Please check the setup instructions below",
          variant: "destructive",
        })
      }
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [toast, clearTokens])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const spotifyConnected = urlParams.get("spotify_connected")
    const returnedHostName = urlParams.get("host_name")

    if (spotifyConnected) {
      window.history.replaceState({}, document.title, window.location.pathname)
      toast({ title: "Spotify Connected!", description: "You can now create rooms with music playback." })

      if (returnedHostName) {
        setHostName(returnedHostName)
        setTimeout(() => {
          const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
          router.push(`/room/${newRoomCode}?host=true&name=${encodeURIComponent(returnedHostName)}&spotify=true`)
        }, 50)
      }
    }
  }, [toast])

  const handleHostRoom = () => {
    if (!hostName.trim() || isProcessing) return
    setIsProcessing(true)

    if (!isAuthenticated) {
      router.push(getSpotifyAuthUrl(hostName.trim()))
      return
    }

    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    router.push(`/room/${newRoomCode}?host=true&name=${encodeURIComponent(hostName)}&spotify=true`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
      <div className="relative w-full max-w-md">
        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        <Card className="w-full border-2 hover:border-purple-200 dark:hover:border-purple-700 transition-colors">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Headphones className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-2xl">Create a Room</CardTitle>
            <CardDescription>Create a new music room and invite your audience to join</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="host-name">Your Name</Label>
              <Input
                id="host-name"
                placeholder="Enter your name"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
              />
            </div>
            <Button
              onClick={handleHostRoom}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!hostName.trim() || isProcessing}
            >
              {isAuthenticated ? "Create Room" : "Connect Spotify & Create Room"}
            </Button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                Spotify Connected (Premium required for full playback)
              </div>
            ) : (
              <div className="text-xs text-gray-500 mt-2">
                Spotify Premium required for full song playback
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}