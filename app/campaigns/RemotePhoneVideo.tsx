"use client";

import { useRef, useState } from "react";

type RemotePhoneVideoProps = {
  title: string;
  src: string;
  poster: string;
};

export function RemotePhoneVideo({ title, src, poster }: RemotePhoneVideoProps) {
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
    <div className="case-remote-video">
      <video
        ref={videoRef}
        className="case-native-video case-remote-native-video"
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
        aria-label={`高表现视频：${title}`}
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
