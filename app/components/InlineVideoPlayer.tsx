"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";

type InlineVideoPlayerProps = {
  src: string;
  poster: string;
  label: string;
  active?: boolean;
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
  onPlay,
  onPause,
}: InlineVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (active) return;
    videoRef.current?.pause();
    setPlaying(false);
  }, [active]);

  const togglePlayback = async () => {
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

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`inline-video-player${active ? " is-active" : ""}`}>
      <video
        ref={videoRef}
        playsInline
        preload={active ? "metadata" : "none"}
        poster={poster}
        aria-label={label}
        onClick={togglePlayback}
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

      {!playing && active ? (
        <button className="inline-video-center-play" type="button" onClick={togglePlayback} aria-label={`播放${label}`}>
          <Play aria-hidden="true" />
        </button>
      ) : null}

      <div className="inline-video-controls" aria-hidden={!active}>
        <button type="button" onClick={togglePlayback} tabIndex={active ? 0 : -1} aria-label={playing ? "暂停视频" : "播放视频"}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.05"
          value={Math.min(currentTime, duration || 0)}
          tabIndex={active ? 0 : -1}
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
          tabIndex={active ? 0 : -1}
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
          tabIndex={active ? 0 : -1}
          aria-label="全屏播放"
          onClick={() => videoRef.current?.requestFullscreen?.()}
        >
          <Maximize2 aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
