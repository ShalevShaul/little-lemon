import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Loader from '../components/Loader/Loader';

interface LoaderContextType {
    setLoaderOn: () => void;
    setLoaderOff: () => void;
}

interface LoaderContextProviderProps {
    children: ReactNode;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: LoaderContextProviderProps) => {
    const [isLoaderOn, setIsLoaderOn] = useState<boolean>(false)

    const setLoaderOn = () => {
        setIsLoaderOn(true);
    }

    const setLoaderOff = () => {
        setIsLoaderOn(false);
    }

    const value: LoaderContextType = {
        setLoaderOn,
        setLoaderOff
    }

    return (
        <LoaderContext.Provider value={value}>
            {children}
            {isLoaderOn && <Loader />}
        </LoaderContext.Provider>
    )
}

export const useLoader = (): LoaderContextType => {
    const context = useContext(LoaderContext);

    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider')
    }
    return context;
}