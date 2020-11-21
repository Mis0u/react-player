import React from 'react';
import LibrabySong from './LibrarySong'

const library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return(
        <div className={`library ${libraryStatus ? 'active' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                { songs.map((song) => 
                    <LibrabySong songs= { songs } setSongs= { setSongs } isPlaying= { isPlaying } audioRef= { audioRef } song={ song } setCurrentSong={ setCurrentSong } key={ song.id } />
                ) }
            </div>
        </div>
    )
}

export default library;