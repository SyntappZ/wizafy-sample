import React, {useContext, useState, useEffect} from 'react'
import Search from '../components/Search'
import TrackScroller from '../components/TrackScroller'
import { PlaylistStore } from "../context/ContextProvider";


const Explore = () => {
    const [isSearch, setIsSearch] = useState(false)
    const contextStore = useContext(PlaylistStore);
    const {loadMoreTracks, dispatch, state } = contextStore
    const {newReleaseAlbums, moreNewAlbums, playlistMessage} = state
    


   const loadMoreAlbums = () => {
       
     loadMoreTracks(moreNewAlbums, "setNewReleases");
   }
    return (
        <div className="explore">
            <Search />
            <TrackScroller loadMoreTracks={loadMoreAlbums}
            tracks={newReleaseAlbums}
            title={`${playlistMessage} Album's`}
            album={true} />
        </div>
    )
}

export default Explore
