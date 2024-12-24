import React from 'react';

interface YouTubePlayerProps {
  linkVideo: string;  // Nhận videoId từ props
  width?: string;
  height?: string;
}

function convertToEmbedUrl(url: string): string | null {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get('v');

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return "";
}
const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  linkVideo,
  width = '640',
  height = '360',
}) => {
  return (
    <div className="youtube-container">
      <iframe
        width={width}
        height={height}
        src={convertToEmbedUrl(linkVideo)}
        title="YouTube video player"
        frameborder="0"
        // referrerpolicy="strict-origin-when-cross-origin"
        // allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
