"use client";

import { useState } from "react";

type RemotePhoneVideoProps = {
  title: string;
  poster: string;
  embedUrl: string;
};

export function RemotePhoneVideo({ title, poster, embedUrl }: RemotePhoneVideoProps) {
  const [started, setStarted] = useState(false);

  return (
    <div className="case-remote-video">
      {started ? (
        <iframe
          className="case-remote-video-frame"
          src={`${embedUrl}&autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          className="case-external-video-preview"
          type="button"
          onClick={() => setStarted(true)}
          aria-label={`播放视频：${title}`}
        >
          <img src={poster} alt={`${title}视频封面`} />
          <span className="case-external-video-play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
