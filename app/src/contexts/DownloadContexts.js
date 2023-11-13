import * as React from 'react';

import { createContext, useState } from "react";

export const DownloadContext = createContext({})

export function DownloadProvider ( {children} ) {
    const [download, setDownload] = useState({})
    return (
        <DownloadContext.Provider value={{
            download,
            setDownload
        }}>
            {children}
        </DownloadContext.Provider>
    )
}