import React from 'react';
import { playAudio } from './function';

const LibrarySong = ({ song, setCurrentSong, audioRef, isPlaying, setSongs, songs }) => {
    const songSelectHandler = () => {
        const selectedSong = song;
        setCurrentSong(selectedSong)
        
        const newSongs = songs.map((targetSong) => {
            if (targetSong.id === song.id){
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
        playAudio(isPlaying, audioRef)
    }
    return (
        <div onClick={ songSelectHandler } className={`library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
};

export default LibrarySong;