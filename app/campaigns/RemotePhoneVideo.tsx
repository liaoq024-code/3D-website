type RemotePhoneVideoProps = {
  title: string;
  embedUrl: string;
};

export function RemotePhoneVideo({ title, embedUrl }: RemotePhoneVideoProps) {
  return (
    <div className="case-remote-video">
      <iframe
        className="case-remote-video-frame"
        src={embedUrl}
        title={title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        scrolling="no"
        tabIndex={-1}
      />
    </div>
  );
}
