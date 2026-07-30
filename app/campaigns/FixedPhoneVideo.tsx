"use client";

import { useRef, useState } from "react";

type FixedPhoneVideoProps = {
  index: string;
  title: string;
  src: string;
  poster: string;
};

export function FixedPhoneVideo({
  index,
  title,
  src,
  poster,
}: FixedPhoneVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <div className="case-video-viewport">
      <video
        ref={videoRef}
        className="case-native-video"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        disablePictureInPicture
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        draggable={false}
        onEnded={() => setIsPlaying(false)}
        onContextMenu={(event) => event.preventDefault()}
        aria-label={`BOP 高表现视频 ${index}：${title}`}
      />
      <button
        className={`case-video-play-toggle${isPlaying ? " is-playing" : ""}`}
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? `暂停视频：${title}` : `播放视频：${title}`}
        aria-pressed={isPlaying}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
