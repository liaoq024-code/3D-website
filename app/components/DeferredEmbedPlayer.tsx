"use client";

import { Play } from "lucide-react";
import { useState } from "react";

type DeferredEmbedPlayerProps = {
  src: string;
  poster: string;
  label: string;
};

export function DeferredEmbedPlayer({ src, poster, label }: DeferredEmbedPlayerProps) {
  const [started, setStarted] = useState(false);

  return (
    <div className={`deferred-embed-player${started ? " is-started" : ""}`}>
      {started ? (
        <iframe
          className="deferred-embed-frame"
          src={`${src}&autoplay=1`}
          title={label}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <img src={poster} alt={`${label}封面`} loading="eager" decoding="async" />
          <button type="button" className="deferred-embed-hitarea" onClick={() => setStarted(true)} aria-label={`播放${label}`}>
            <span className="content-video-camera-a11y">播放{label}</span>
          </button>
          <div className="deferred-embed-controls" aria-hidden="true">
            <span><Play /></span>
            <b>0:00</b>
            <i />
          </div>
        </>
      )}
    </div>
  );
}
