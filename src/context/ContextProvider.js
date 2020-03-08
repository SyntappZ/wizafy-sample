import React, {createContext, useEffect, useState} from 'react';


export const PlaylistStore = createContext();

const ContextProvider = ({children}) => {

    const data = {}

    return (
        <PlaylistStore.Provider value={data}>{children}</PlaylistStore.Provider>
      );
}

export default ContextProvider;