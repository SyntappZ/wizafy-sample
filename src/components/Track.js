import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
const Track = ({img, title, id, loadMoreTopTracks}) => {
    
    return (
        <div className="track">
            <div className="image-wrap" onClick={() => loadMoreTopTracks()}>
                {img ? <img src={img} alt={`${title} album art`} /> : 
                <div>
                    <FiPlusCircle className="plus-icon"  />
                    <p>Load More</p>
                </div>
                    
                }
                
            </div>
            <p>{title}</p>
        </div>
    )
}

export default Track
