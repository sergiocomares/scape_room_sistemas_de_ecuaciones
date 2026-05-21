// ── App — main application controller ──
import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { AppPhase, RoomPhase, Method } from './types'
import { ROOMS } from './data/rooms'
import StartScreen from './components/StartScreen'
import ProgressBar from './components/ProgressBar'
import RoomCard from './components/RoomCard'
import VictoryScreen from './components/VictoryScreen'
import { playErrorSound, playSuccessSound } from './utils/sound'

const START_PREVIEW_SECONDS = 7
const ROOM_SOLVED_PREVIEW_SECONDS = 20

export default function App() {
  // ── Application state ──
  const [appPhase, setAppPhase]   = useState<AppPhase>('start')
  const [roomIndex, setRoomIndex] = useState(0)
  const [roomPhase, setRoomPhase] = useState<RoomPhase>('intro')
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null)
  const [badges, setBadges]       = useState<string[]>([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [musicNeedsUnlock, setMusicNeedsUnlock] = useState(false)
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const solvedPreviewTimeoutRef = useRef<number | null>(null)
  const appPhaseRef = useRef<AppPhase>('start')

  useEffect(() => {
    appPhaseRef.current = appPhase
  }, [appPhase])

  // ── Background music (main + final screens) ──
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/final-song.mp3`)
    audio.loop = true
    audio.volume = 0.55
    audio.preload = 'auto'
    musicRef.current = audio

    return () => {
      if (solvedPreviewTimeoutRef.current !== null) {
        window.clearTimeout(solvedPreviewTimeoutRef.current)
        solvedPreviewTimeoutRef.current = null
      }
      audio.pause()
      audio.currentTime = 0
      musicRef.current = null
    }
  }, [])

  const tryPlayMusic = useCallback(() => {
    const audio = musicRef.current
    if (!audio) return
    audio.play()
      .then(() => setMusicNeedsUnlock(false))
      .catch(() => setMusicNeedsUnlock(true))
  }, [])

  const handleEnableMusic = useCallback(() => {
    tryPlayMusic()
  }, [tryPlayMusic])

  const playSolvedRoomPreview = useCallback(() => {
    const audio = musicRef.current
    if (!audio || appPhaseRef.current !== 'playing') return

    if (solvedPreviewTimeoutRef.current !== null) {
      window.clearTimeout(solvedPreviewTimeoutRef.current)
      solvedPreviewTimeoutRef.current = null
    }

    audio.pause()
    audio.loop = false
    audio.currentTime = 0

    audio.play().catch(() => {
      // If autoplay is blocked, silently keep game flow.
    })

    solvedPreviewTimeoutRef.current = window.setTimeout(() => {
      const currentAudio = musicRef.current
      if (!currentAudio) return
      if (appPhaseRef.current !== 'playing') return

      currentAudio.pause()
      currentAudio.currentTime = ROOM_SOLVED_PREVIEW_SECONDS
      solvedPreviewTimeoutRef.current = null
    }, ROOM_SOLVED_PREVIEW_SECONDS * 1000)
  }, [])

  useEffect(() => {
    if (appPhase !== 'playing' && solvedPreviewTimeoutRef.current !== null) {
      window.clearTimeout(solvedPreviewTimeoutRef.current)
      solvedPreviewTimeoutRef.current = null
    }

    const audio = musicRef.current
    if (!audio) return

    const shouldPlay = appPhase === 'start' || appPhase === 'victory'
    if (shouldPlay) {
      if (appPhase === 'start') {
        audio.loop = false
        audio.currentTime = 0
      } else {
        audio.loop = true
        audio.currentTime = 0
      }
      tryPlayMusic()
      return
    }

    audio.pause()
    audio.currentTime = 0
    setMusicNeedsUnlock(false)
  }, [appPhase, tryPlayMusic])

  // On start screen, only allow a short music preview.
  useEffect(() => {
    const audio = musicRef.current
    if (!audio) return
    if (appPhase !== 'start') return

    const stopAtPreviewEnd = () => {
      if (audio.currentTime >= START_PREVIEW_SECONDS) {
        audio.pause()
        audio.currentTime = START_PREVIEW_SECONDS
      }
    }

    audio.addEventListener('timeupdate', stopAtPreviewEnd)
    return () => audio.removeEventListener('timeupdate', stopAtPreviewEnd)
  }, [appPhase])

  useEffect(() => {
    if (!musicNeedsUnlock) return
    if (!(appPhase === 'start' || appPhase === 'victory')) return

    const onUserGesture = () => {
      tryPlayMusic()
    }

    window.addEventListener('pointerdown', onUserGesture, { once: true })
    return () => window.removeEventListener('pointerdown', onUserGesture)
  }, [musicNeedsUnlock, appPhase, tryPlayMusic])

  // ── Timer ──
  useEffect(() => {
    if (!timerActive) return
    const id = setInterval(() => setElapsedTime((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [timerActive])

  // ── Handlers ──
  const handleStart = useCallback(() => {
    setAppPhase('playing')
    setRoomIndex(0)
    setRoomPhase('intro')
    setSelectedMethod(null)
    setBadges([])
    setElapsedTime(0)
    setTimerActive(true)
  }, [])

  const handleRestart = useCallback(() => {
    setAppPhase('start')
    setTimerActive(false)
    setElapsedTime(0)
  }, [])

  // Method selected → show feedback  
  const handleChooseMethod = useCallback((method: Method) => {
    const quality = ROOMS[roomIndex].methodFeedback[method].quality
    if (quality === 'best') playSuccessSound()
    if (quality === 'wrong') playErrorSound()
    setSelectedMethod(method)
    // roomPhase stays at 'choose_method' to show feedback
  }, [roomIndex])

  // Phase transitions
  const handleContinueToSolve = useCallback(() => {
    if (roomPhase === 'intro') {
      const currentRoom = ROOMS[roomIndex]
      setRoomPhase(currentRoom.type === 'word' ? 'write_system' : 'choose_method')
    } else if (roomPhase === 'write_system') {
      setRoomPhase('choose_method')
    } else {
      setRoomPhase('solve')
    }
  }, [roomPhase, roomIndex])

  const handleSystemWritten = useCallback(() => {
    setRoomPhase('choose_method')
  }, [])

  // Solve success → success phase
  const handleSolveSuccess = useCallback(() => {
    playSolvedRoomPreview()
    const room = ROOMS[roomIndex]
    setBadges((prev) => [...prev, room.badge])
    setRoomPhase('success')
  }, [roomIndex, playSolvedRoomPreview])

  // Next room
  const handleNextRoom = useCallback(() => {
    const nextIndex = roomIndex + 1
    if (nextIndex >= ROOMS.length) {
      setTimerActive(false)
      setAppPhase('victory')
    } else {
      setRoomIndex(nextIndex)
      setRoomPhase('intro')
      setSelectedMethod(null)
    }
  }, [roomIndex])

  const currentRoom = ROOMS[roomIndex]
  const completedRooms = badges.length

  // ── Render ──
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-dark)' }}>
      <AnimatePresence mode="wait">

        {/* START SCREEN */}
        {appPhase === 'start' && (
          <StartScreen
            key="start"
            onStart={handleStart}
            musicNeedsUnlock={musicNeedsUnlock}
            onEnableMusic={handleEnableMusic}
          />
        )}

        {/* PLAYING */}
        {appPhase === 'playing' && currentRoom && (
          <div key="playing" className="min-h-screen grid-bg flex flex-col">
            {/* Progress bar */}
            <ProgressBar
              total={ROOMS.length}
              completed={completedRooms}
              badges={badges}
              elapsedTime={elapsedTime}
            />

            {/* Room content */}
            <div className="flex-1 flex items-start justify-center px-4 py-8">
              <AnimatePresence mode="wait">
                <RoomCard
                  key={`${currentRoom.id}-${roomPhase}`}
                  room={currentRoom}
                  phase={roomPhase}
                  selectedMethod={selectedMethod}
                  isLastRoom={roomIndex === ROOMS.length - 1}
                  onChooseMethod={handleChooseMethod}
                  onContinueToSolve={handleContinueToSolve}
                  onSystemWritten={handleSystemWritten}
                  onSolveSuccess={handleSolveSuccess}
                  onNextRoom={handleNextRoom}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* VICTORY */}
        {appPhase === 'victory' && (
          <VictoryScreen
            key="victory"
            badges={badges}
            elapsedTime={elapsedTime}
            rooms={ROOMS}
            onRestart={handleRestart}
            musicNeedsUnlock={musicNeedsUnlock}
            onEnableMusic={handleEnableMusic}
          />
        )}

      </AnimatePresence>
    </div>
  )
}
