"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { useSpotifyAuth } from "@/hooks/use-spotify-auth"

export default function SpotifySuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyTokensImmediately } = useSpotifyAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = searchParams.get("access_token")
      const refreshToken = searchParams.get("refresh_token")
      const expiresIn = searchParams.get("expires_in")
      const hostName = searchParams.get("host_name")

      if (!accessToken || !refreshToken || !expiresIn) {
        setError("Missing authentication tokens")
        router.push("/host/create?error=missing_tokens")
        return
      }

      try {
        const success = await verifyTokensImmediately({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: Number(expiresIn),
        })

        if (!success) throw new Error("Failed to verify token storage")

        const redirectUrl = new URL("/host/create", window.location.origin)
        redirectUrl.searchParams.set("spotify_connected", "true")
        if (hostName) redirectUrl.searchParams.set("host_name", hostName)

        router.push(redirectUrl.toString())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed")
        setTimeout(() => {
          router.push("/host/create?error=auth_failed")
        }, 2000)
      }
    }

    handleAuth()
  }, [searchParams, verifyTokensImmediately])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border-red-500">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle>Connection Failed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-sm text-gray-600">
              You'll be redirected back to the home page...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle>Spotify Connected!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Successfully connected to Spotify. Redirecting you...
          </p>
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
        </CardContent>
      </Card>
    </div>
  )
}