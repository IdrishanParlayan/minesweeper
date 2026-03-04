import { createContext, useContext, useState, useMemo } from "react";
import { SoundStatus } from "../types/game";

type SoundContextType = {
    soundStatus: SoundStatus;
    setSoundStatus: (status: SoundStatus) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [soundStatus, setSoundStatus] = useState<SoundStatus>("on");

    const value = useMemo(() => ({
            soundStatus,
            setSoundStatus,
        }),
        [soundStatus]
    );


    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
}