import React from 'react'

const Album = ({img, title}) => {
    
    return (
        <div className="track">
            <div className="image-wrap">
                <img src={img} alt={`${title} album art`} />
            </div>
            <p>{title}</p>
        </div>
    )
}

export default Album
