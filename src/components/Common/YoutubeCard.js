import React from 'react'
import './help.css';

export default function YoutubeCard(props) {
    const { video } = props;
    function navigateToVideo(videoId) {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
    return (
        <div className="youtube-card" onClick={() => navigateToVideo(video.id.videoId)}>
            <img className="thumbnail" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <p className='video-title'>{video.snippet.title}</p>
        </div>
    )
}
