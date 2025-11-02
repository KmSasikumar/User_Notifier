import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeName = "system" | "light" | "dark";

export type Theme = {
    background: string;
    text: string;
    primary: string;
    modal: string;
    inputBackground: string;
    placeholder: string;
};

const availableThemes: Record<Exclude<ThemeName, "system">, Theme> = {
    light: {
        background: "#ffffff",
        text: "#000000",
        primary: "#007bff",
        modal: "#f9f9f9",
        inputBackground: "#f0f0f0",
        placeholder: "#a0a0a0",
    },
    dark: {
        background: "#000000",
        text: "#ffffff",
        primary: "#1e90ff",
        modal: "#1e1e1e",
        inputBackground: "#333333",
        placeholder: "#888888",
    },
};

type ThemeContextType = {
    theme: Theme;
    userTheme: ThemeName;
    setUserTheme: (theme: ThemeName) => void;
    colorScheme: Exclude<ThemeName, "system">;
};

const defaultContext: ThemeContextType = {
    theme: availableThemes.light,
    userTheme: "system",
    setUserTheme: () => { },
    colorScheme: "light",
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const systemPreference = (useColorScheme() as "light" | "dark") || "light";
    const [userTheme, setUserThemeState] = useState<ThemeName>("system");

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem("appTheme");
            if (storedTheme && ["system", "light", "dark"].includes(storedTheme)) {
                setUserThemeState(storedTheme as ThemeName);
            }
        };
        loadTheme();
    }, []);

    const setUserTheme = (selectedTheme: ThemeName) => {
        setUserThemeState(selectedTheme);
        AsyncStorage.setItem("appTheme", selectedTheme);
    };

    const effectiveTheme: Exclude<ThemeName, "system"> =
        userTheme === "system" ? systemPreference : userTheme;
    const theme = availableThemes[effectiveTheme];

    return (
        <ThemeContext.Provider value={{ theme, userTheme, setUserTheme, colorScheme: effectiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// ✅ Ensure `useTheme` is only exported once
export const useTheme = () => useContext(ThemeContext);
