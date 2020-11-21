import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { playAudio } from './function';

const Player = ({ setCurrentSong, currentSong, songs, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, setSongs }) => {
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((targetSong) => {
            if (targetSong.id === nextPrev.id){
                return {
                    ...targetSong, 
                    active: true
                }
            }else{
                return {
                    ...targetSong, 
                    active: false
                }
            };
        })
        setSongs(newSongs)
    }
    const playSongHandler = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    }

    const getProperTime = (time) => {
        return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2))
    }
    const dragHandler = (e) => {
        setSongInfo({ ...songInfo, currentTime: e.target.value })
        audioRef.current.currentTime = e.target.value
    }
    const skipTrackHandler =  (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === 'skip-back'){
            if ((currentIndex - 1) % songs.length === -1){
                setCurrentSong(songs[songs.length - 1])
                activeLibraryHandler(songs[songs.length - 1])
            }else{
                setCurrentSong(songs[(currentIndex - 1) % songs.length])
                activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
            }
        }
        playAudio(isPlaying, audioRef)
    }
    const trackAnim = { transform:`translateX(${songInfo.animationPercentage }%)`};
    const bgDuration = { background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` };
    
    return (
        <div className="player">
            <div className="time-control">
                <p>{ getProperTime(songInfo.currentTime) }</p>
                <div style= { bgDuration } className="track">
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" onChange={dragHandler} /> 
                    <div style={ trackAnim } className="animate-track"></div>
                </div>
                <p>{ songInfo.duration ? getProperTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" icon={faAngleLeft}></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="play"
                    onClick={playSongHandler}
                    icon={isPlaying ? faPause : faPlay}
                    size="2x">

                </FontAwesomeIcon>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" icon={faAngleRight}></FontAwesomeIcon>
            </div>

        </div>
    )
};

export default Player;