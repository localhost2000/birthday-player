import { useEffect, useRef, useState } from 'react'
import Sign from './components/Sign'
import { data } from './tracks'

export default function App() {
  const baseUrl = import.meta.env.BASE_URL
  const trackRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const currentTrack = data[currentTrackIndex]

  const handlePlay = () => {
    if (!trackRef.current) return

    if (trackRef.current.paused) {
      trackRef.current.play()
    } else {
      trackRef.current.pause()
    }
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (!trackRef.current) return

    trackRef.current.src = `${baseUrl}/tracks/${currentTrack.name}.mp3`

    trackRef.current.play()
  }, [currentTrackIndex])

  useEffect(() => {
    if (!trackRef.current) return

    if (isPlaying) {
      trackRef.current.play()
    } else {
      trackRef.current.pause()
    }
  }, [isPlaying])

  return (
    <main>
      <img
        src={`${baseUrl}/covers/${currentTrack.name}.png`}
        alt={currentTrack.name}
        className={`backdrop-cover ${
          isPlaying ? 'scale-[2.5] opacity-100' : 'scale-[2.1] opacity-50'
        }`}
      />

      <div className='controls'>
        <button className='control-button size-14' onClick={handlePrev}>
          <img
            src={`${baseUrl}/prev-icon.svg`}
            alt='Prev Track'
            className='absolute left-[47%] size-6 -translate-x-1/2'
          />
        </button>
        <button className='control-button size-22' onClick={handlePlay}>
          {isPlaying ? (
            <img
              src={`${baseUrl}/pause-icon.svg`}
              alt='Pause Track'
              className='absolute left-[50%] size-8 -translate-x-1/2'
            />
          ) : (
            <img
              src={`${baseUrl}/play-icon.svg`}
              alt='Play Track'
              className='absolute left-[53%] size-8 -translate-x-1/2'
            />
          )}
        </button>
        <button className='control-button size-14' onClick={handleNext}>
          <img
            src={`${baseUrl}/next-icon.svg`}
            alt='Next Track'
            className='absolute left-[53%] size-6 -translate-x-1/2'
          />
        </button>
      </div>

      <div className='cover'>
        <img
          src={`${baseUrl}/covers/${currentTrack.name}.png`}
          alt={currentTrack.name}
          className='size-full object-cover max-[1400px]:max-w-[700px]'
        />
      </div>

      <div className='playlist'>
        {data.map((track, index) => (
          <button
            key={track.id}
            className={index === currentTrackIndex ? 'underline' : ''}
            onClick={() => setCurrentTrackIndex(index)}
          >
            {track.id + '. ' + track.name}
          </button>
        ))}
      </div>

      <audio
        ref={trackRef}
        onEnded={handleNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Sign />
    </main>
  )
}
