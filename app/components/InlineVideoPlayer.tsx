"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";

type InlineVideoPlayerProps = {
  src: string;
  poster: string;
  label: string;
  active?: boolean;
  playLabel?: string;
  onPlay?: (video: HTMLVideoElement) => void;
  onPause?: () => void;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
};

export function InlineVideoPlayer({
  src,
  poster,
  label,
  active = true,
  playLabel,
  onPlay,
  onPause,
}: InlineVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (active) return;
    videoRef.current?.pause();
    setPlaying(false);
  }, [active]);

  useEffect(() => {
    if (!started || !active) return;
    videoRef.current?.play().catch(() => setPlaying(false));
  }, [active, started]);

  const togglePlayback = async () => {
    if (!started) {
      setStarted(true);
      return;
    }
    const video = videoRef.current;
    if (!video || !active) return;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const mediaActive = active;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`inline-video-player${mediaActive ? " is-active" : ""}`}>
      {started ? (
        <video
          ref={videoRef}
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={label}
          onClick={togglePlayback}
          onCanPlay={() => setReady(true)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={(event) => {
            setPlaying(true);
            onPlay?.(event.currentTarget);
          }}
          onPause={() => {
            setPlaying(false);
            onPause?.();
          }}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {!started || !ready ? (
        <img className="inline-video-poster" src={poster} alt={`${label}封面`} loading="eager" decoding="async" />
      ) : null}

      {!playing && mediaActive ? (
        <button className={`inline-video-center-play${playLabel ? " has-label" : ""}`} type="button" onClick={togglePlayback} aria-label={`播放${label}`}>
          <Play aria-hidden="true" />
          {playLabel ? <span>{playLabel}</span> : null}
        </button>
      ) : null}

      <div className="inline-video-controls" aria-hidden={!mediaActive}>
        <button type="button" onClick={togglePlayback} tabIndex={mediaActive ? 0 : -1} aria-label={playing ? "暂停视频" : "播放视频"}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.05"
          value={Math.min(currentTime, duration || 0)}
          tabIndex={mediaActive ? 0 : -1}
          aria-label="视频进度"
          style={{ "--video-progress": `${progress}%` } as CSSProperties}
          onChange={(event) => {
            const nextTime = Number(event.currentTarget.value);
            if (videoRef.current) videoRef.current.currentTime = nextTime;
            setCurrentTime(nextTime);
          }}
        />
        <span>{formatTime(duration)}</span>
        <button
          type="button"
          tabIndex={mediaActive ? 0 : -1}
          aria-label={muted ? "打开声音" : "静音"}
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = !video.muted;
            setMuted(video.muted);
          }}
        >
          {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        </button>
        <button
          type="button"
          tabIndex={mediaActive ? 0 : -1}
          aria-label="全屏播放"
          onClick={() => videoRef.current?.requestFullscreen?.()}
        >
          <Maximize2 aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
