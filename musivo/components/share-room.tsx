'use client'

import { Copy, Share2, QrCode, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useTheme } from 'next-themes'
import { useRef, useState, useEffect } from 'react'
import * as htmlToImage from 'html-to-image'
import dynamic from 'next/dynamic'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// Dynamically import QRCode to avoid SSR issues
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false })

export function ShareRoom({ roomId }: { roomId: string }) {
  const { theme } = useTheme()
  const [showQrDialog, setShowQrDialog] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const [roomUrl, setRoomUrl] = useState('')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRoomUrl(`${window.location.origin}/participant/join?room=${roomId}`)
    }
  }, [roomId])

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    try {
      const success = document.execCommand('copy')
      toast({
        title: success ? 'Room link copied!' : 'Copy failed',
        variant: success ? 'default' : 'destructive',
      })
    } catch (err) {
      toast({
        title: 'Copy not supported',
        description: 'Please copy the link manually.',
        variant: 'destructive',
      })
    }

    document.body.removeChild(textarea)
  }

  const copyUrl = async () => {
    if (document.hasFocus() && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(roomUrl)
        toast({ title: 'Room link copied to clipboard!' })
      } catch (err) {
        fallbackCopy(roomUrl)
      }
    } else {
      fallbackCopy(roomUrl)
    }
  }

  const shareNative = async () => {
    try {
      await navigator.share({
        title: 'Join my music room',
        text: `Join my music room on Musivo: ${roomId}`,
        url: roomUrl
      })
    } catch (err) {
      copyUrl()
    }
  }

  const downloadQr = async (format: 'png' | 'svg') => {
    if (!qrRef.current) return

    try {
      const dataUrl = format === 'png'
        ? await htmlToImage.toPng(qrRef.current)
        : await htmlToImage.toSvg(qrRef.current)

      const link = document.createElement('a')
      link.download = `Musivo-Room-${roomId}.${format}`
      link.href = dataUrl
      link.click()
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Could not generate QR code image',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Room
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={copyUrl}>
            <Copy className="mr-2 h-4 w-4" />
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowQrDialog(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            QR Code
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareNative}>
            <Share2 className="mr-2 h-4 w-4" />
            Share via...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Room</DialogTitle>
          </DialogHeader>
          <div ref={qrRef} className="flex flex-col items-center space-y-4">
            <QRCode
              value={roomUrl}
              size={256}
              bgColor={theme === 'dark' ? '#020817' : '#ffffff'}
              fgColor={theme === 'dark' ? '#ffffff' : '#020817'}
            />
            <p className="text-sm font-medium">Room Code: {roomId}</p>
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => downloadQr('png')}
              >
                <Download className="h-4 w-4" />
                PNG
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => downloadQr('svg')}
              >
                <Download className="h-4 w-4" />
                SVG
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
