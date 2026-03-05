import { createContext, useContext, useMemo, useState } from "react";
import { SoundStatus, Theme } from "../types/game";
import { themes } from "../theme/theme";


type SettingsContextType = {
    soundStatus: SoundStatus;
    setSoundStatus: (status: SoundStatus) => void;

    theme: Theme;
    setTheme: (theme: Theme) => void;

    colors: typeof themes.dark;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [soundStatus, setSoundStatus] = useState<SoundStatus>("on");
    const [theme, setTheme] = useState<Theme>("dark");

    const colors = themes[theme];

    const value = useMemo(
        () => ({
            soundStatus,
            setSoundStatus,
            theme,
            setTheme,
            colors,
        }),
        [soundStatus, theme]
    );

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }

    return context;
}