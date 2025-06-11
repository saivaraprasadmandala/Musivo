"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Users, Headphones, Mic2, Share2, ListMusic, Key, Vote, LogIn, Speaker } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen text-white dark:text-black flex flex-col justify-center items-center p-4">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 text-transparent bg-clip-text dark:from-gray-100 dark:to-blue-500 mb-4">Music Isn't Solo Anymore</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
        No more playlist wars—just simple, smart sharing powered by your group's collective rhythm
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Host Room Card */}
          <Card className="border-2 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 hover:scale-[1.02] p-6 flex flex-col justify-between group">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                <Speaker className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-colors duration-300 group-hover:text-purple-300" />
              </div>
              <CardTitle className="text-2xl mb-4 transition-colors duration-300 group-hover:text-purple-300">Host</CardTitle>
              <CardDescription className="text-lg font-medium text-purple-600 dark:text-purple-400 transition-colors duration-300 group-hover:text-purple-300">Take charge of the playlist and manage the vibe</CardDescription>
            </CardHeader>
            <div className="text-left space-y-6 mb-6">
              <div className="flex items-center space-x-3">
                <Music className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-purple-300 group-hover:translate-x-1 group-hover:scale-[1.01]">Start a music room for your event.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-purple-300 group-hover:translate-x-1 group-hover:scale-[1.01]">Share your room code and bring everyone in.</p>
              </div>
              <div className="flex items-center space-x-3">
                <ListMusic className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-purple-300 group-hover:translate-x-1 group-hover:scale-[1.01]">View, add, and prioritize audience songs.</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button
                onClick={() => router.push("/host/create")}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Create Room
              </Button>
            </div>
          </Card>

          {/* Join Room Card */}
          <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:scale-[1.02] p-6 flex flex-col justify-between group">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
              </div>
              <CardTitle className="text-2xl mb-4 transition-colors duration-300 group-hover:text-blue-300">Participant</CardTitle>
              <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-blue-300">Join the vibe, vote the tracks, and jam together</CardDescription>
            </CardHeader>
            <div className="text-left space-y-6 mb-6">
              <div className="flex items-center space-x-3">
                <LogIn className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1 group-hover:scale-[1.01]">Enter the room code provided by the host.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Music className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1 group-hover:scale-[1.01]">Add your favorite songs or vote for bangers.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Vote className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1 group-hover:scale-[1.01]">Help shape the playlist with your votes</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button
                onClick={() => router.push("/participant/join")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Join Room
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit mx-auto mb-4">
              <Music className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Add Songs</h3>
            <p className="text-gray-600 dark:text-gray-300">Search and add your favorite songs to the queue</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Vote Together</h3>
            <p className="text-gray-600 dark:text-gray-300">Everyone can upvote songs to influence the play order</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mx-auto mb-4">
              <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Real-time Sync</h3>
            <p className="text-gray-600 dark:text-gray-300">All changes sync instantly across all connected devices</p>
          </div>
        </div>
      </div>
    </div>
  )
}