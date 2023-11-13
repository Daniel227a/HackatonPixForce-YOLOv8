import * as React from 'react';

import { createContext, useState } from "react";
import models from "../../public/mocks/modelos";

export const ModelsContext = createContext({})

export function ModelsProvider ( {children} ) {
    const [modelos, setModelos] = useState(models.lista)
    return (
        <ModelsContext.Provider value={{
            modelos,
            setModelos
        }}>
            {children}
        </ModelsContext.Provider>
    )
}