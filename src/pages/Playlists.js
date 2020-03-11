import React, {useEffect, useContext} from 'react'
import {PlaylistStore} from '../context/ContextProvider'

const Playlists = () => {
    const contextStore = useContext(PlaylistStore)
    
    const getData = () => {
            console.log(contextStore)
    }
    return (
        <div>
            <h1>Playlists page</h1>
            <button onClick={getData}>get data</button>
        </div>
    )
}

export default Playlists
