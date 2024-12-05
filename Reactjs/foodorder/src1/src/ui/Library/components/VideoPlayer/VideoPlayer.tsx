import React, { useState, useRef, useEffect } from 'react';
import styles from "./index.module.css";
import { MdClose } from 'react-icons/md';
import MicroLoader from '../../../components/loader/MicroLoader';
import { FaPlay, FaPause } from "react-icons/fa";
import { PiSpeakerSimpleHighFill, PiSpeakerSimpleXFill } from "react-icons/pi";
import { AiOutlineExpand } from "react-icons/ai"
import { MdOutlineForward10 } from "react-icons/md";
import { BiCollapse } from "react-icons/bi"
import backward from '../../../../resources/assets/Backward.svg';
import { Tooltip as ReactTooltip } from 'react-tooltip'; // Import ReactTooltip

interface IPlayer {
    width?: number;
    height?: number;
    url?: string;
    onClose?: () => void;
    videoName?: string;
}

const VideoPlayer = ({ width = 900, height = 650, url = "", onClose, videoName }: IPlayer) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [timeStamp, setTimeStamp] = useState("")
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('Key pressed:', event.key);
            if (event.key === 'Escape') {
                console.log('Escape key pressed');
                onClose?.();
            }
            if (event.code === 'Space') {
                event.preventDefault();
                togglePlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, isPlaying]);


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            videoRef.current.addEventListener('waiting', handleBufferStart);
            videoRef.current.addEventListener('canplay', handleBufferEnd);
          
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                videoRef.current.removeEventListener('waiting', handleBufferStart);
                videoRef.current.addEventListener('canplay', handleBufferEnd);
            }
        };
    }, []);

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(
                !!(document.fullscreenElement ||
                    (document as any).webkitFullscreenElement ||
                    (document as any).mozFullScreenElement ||
                    (document as any).msFullscreenElement)
            );
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if ((containerRef.current as any)?.webkitRequestFullscreen) {
                (containerRef.current as any).webkitRequestFullscreen();
            } else if ((containerRef.current as any)?.mozRequestFullScreen) {
                (containerRef.current as any).mozRequestFullScreen();
            } else if ((containerRef.current as any)?.msRequestFullscreen) {
                (containerRef.current as any).msRequestFullscreen();
            } else if ((containerRef.current as any)?.webkitEnterFullscreen) { // Added for Safari mobile
                (containerRef.current as any).webkitEnterFullscreen();
            }
            setIsTooltipVisible(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            } else if ((document as any).webkitExitFullscreen) { // Added for Safari mobile
                (document as any).webkitExitFullscreen();
            }
            setIsTooltipVisible(false);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current!.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current!.duration);
        handleBufferEnd()
    };

    const handleBufferStart = () => {
        setIsBuffering(true);
    };

    const handleBufferEnd = () => {
        setIsBuffering(false);
    };

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current!.pause();
        } else {
            videoRef.current!.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            videoRef.current!.volume = 1;
            setVolume(1)
        } else {
            videoRef.current!.volume = 0;
            setVolume(0)

        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const seekBarStyles = {
        background: `linear-gradient(to right, #ff0000 0%, #ff0000 ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.3) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.3) 100%)`,
    };

    const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedValue = (x / rect.width) * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = clickedValue;
        }
    };

    const volumeBarStyles = {
        background: `linear-gradient(to right, #FF0000 0%, #FF0000 ${volume * 100}%, #ffffff ${volume * 100}%, #ffffff 100%)`,
    };

    const handleBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const hoveredTime = (x / rect.width) * duration;
        setTimeStamp(formatTime(hoveredTime));
        setIsTooltipVisible(true);
        setTooltipPosition({ left: e.clientX - 20, top: e.clientY - 35 });
    };

    return (
        <div className='transparent-model'>
            <div className='bg-white' style={{ borderRadius: 12, width: "100%", maxWidth: 968 }} >
                <div ref={containerRef} className={`flex flex-column justify-between relative ${styles.container}`}>
                <div style={{paddingTop:!isFullscreen?".5rem":undefined}} className={`flex  items-center justify-between ${styles.title_wrapper}`} >
                    <h4 className={styles.video_title}> {videoName} </h4>
                    <button
                        className={styles.close_btn}
                        onClick={(e) => {
                            onClose?.()
                        }}
                    >
                        <MdClose color='#fff' size={32} />
                    </button>
                </div>
                    <div style={{marginBlock:isFullscreen?undefined:".5rem"}} className='flex items-center justify-center '>
                        <video
                            ref={videoRef}
                            className={styles.video}
                            src={url}
                            loop
                            autoPlay={false}
                            style={{maxHeight:isFullscreen?undefined:"70vh"}}
                            // playsInline={!isFullscreen}
                            onClick={() => {
                                if (!isBuffering) {
                                    togglePlay()
                                }
                            }}

                        />
                    </div>
                    {isBuffering && (
                        <div className={`flex  justify-center ${styles.loader_container}`}>
                            <MicroLoader />
                        </div>
                    )}
                    <div style={{paddingBottom:!isFullscreen?".5rem":undefined}} className={styles.controlsContainer}>
                        <div
                            className={styles.seekBar}
                            style={seekBarStyles}
                            onClick={handleBarClick}
                            onMouseOver={handleBarHover}
                            onMouseOut={() => setIsTooltipVisible(false)}
                        />

                        <div className={styles.flexRow}>
                            <div className={styles.flexCenter}>
                                <button onClick={() => { videoRef.current!.currentTime -= 10 }} className={styles.button}>
                                    <img src={backward} alt="" />
                                </button>
                                <button onClick={togglePlay} className={styles.button}>
                                    {isPlaying ? <FaPause color='#fff' /> : <FaPlay color='#fff' />}
                                </button>

                                <button onClick={() => { videoRef.current!.currentTime += 10 }} className={styles.button}>
                                    <MdOutlineForward10 size={24} color='#fff' />
                                </button>
                                <div className={styles.flexCenter}>
                                    <button onClick={toggleMute} className={styles.button}>
                                        {volume === 0 ? <PiSpeakerSimpleXFill color='#fff' /> : <PiSpeakerSimpleHighFill color='#fff' />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className={styles.volumeRange}
                                        style={volumeBarStyles}
                                    />
                                </div>
                                <span className={styles.timeDisplay}>{formatTime(currentTime)} / {formatTime(duration)}</span>
                            </div>
                            <button onClick={toggleFullscreen} className={styles.button}>
                                {isFullscreen ? <BiCollapse color='#fff' /> : <AiOutlineExpand color='#fff' />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {isTooltipVisible && <div className={styles.tooltip} style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                {timeStamp}
            </div>} */}
        </div>
    );
};


export default VideoPlayer;
