import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Switch
} from "react-native";
import {
    MaterialCommunityIcons,
    Feather,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
import { useTheme, ThemeName } from "../themes/ThemeProvider"; // Import ThemeProvider

// Sample user data
const userName = "User Name";
const userProfilePic = "https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?rs=1&pid=ImgDetMain";

const SettingsScreen = () => {
    const { userTheme, setUserTheme, colorScheme } = useTheme(); // Destructure updated values from context

    // Determine if dark mode is active based on the effective colorScheme
    const isDarkMode = colorScheme === "dark";

    // Toggle switch handler: true sets dark, false sets light
    const toggleSwitch = (value: boolean) => {
        setUserTheme(value ? "dark" : "light");
        Alert.alert("Theme Updated", `Switched to ${value ? "dark" : "light"} theme`);
    };

    // Dynamic styles based on the effective theme (colorScheme)
    const dynamicStyles = getDynamicStyles(colorScheme);

    return (
        <View style={[styles.container, dynamicStyles.background]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, dynamicStyles.text]}>Settings</Text>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={22} color={dynamicStyles.icon.color} />
                </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image source={{ uri: userProfilePic }} style={styles.profileImage} />
                <View>
                    <Text style={[styles.username, dynamicStyles.text]}>{userName}</Text>
                    <Text style={[styles.userTag, dynamicStyles.subText]}>#1451</Text>
                </View>
            </View>

            {/* Settings List */}
            <View style={styles.settingsList}>
                {/* Theme Toggle Option */}
                <View style={styles.option}>
                    <MaterialCommunityIcons name="palette" size={22} color={dynamicStyles.icon.color} />
                    <Text style={[styles.optionText, dynamicStyles.text]}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleSwitch}
                        thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        style={{ marginLeft: "auto" }}
                    />
                </View>

                {/* Other Options */}
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="map" size={22} color={dynamicStyles.icon.color} />
                    <Text style={[styles.optionText, dynamicStyles.text]}>Map Theme</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <FontAwesome5 name="exchange-alt" size={22} color={dynamicStyles.icon.color} />
                    <Text style={[styles.optionText, dynamicStyles.text]}>Switch Account</Text>
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logout}>
                    <Feather name="log-out" size={22} color="red" />
                    <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;

// Function to generate styles based on effective theme
const getDynamicStyles = (theme: "light" | "dark" | "blue" | "green") => {
    const themes = {
        light: { background: "#fff", text: "#000", subText: "#888", icon: "#000", modal: "#f9f9f9" },
        dark: { background: "#121212", text: "#fff", subText: "#bbb", icon: "#fff", modal: "#1e1e1e" },
        blue: { background: "#0044cc", text: "#fff", subText: "#ccc", icon: "#fff", modal: "#003399" },
        green: { background: "#008000", text: "#fff", subText: "#ddd", icon: "#fff", modal: "#006600" },
    };

    return {
        background: { backgroundColor: themes[theme].background },
        text: { color: themes[theme].text },
        subText: { color: themes[theme].subText },
        icon: { color: themes[theme].icon },
        modalBackground: { backgroundColor: themes[theme].modal },
    };
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
    },

    headerTitle: { fontSize: 22, fontWeight: "bold" },

    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingVertical: 10,
    },

    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },

    username: { fontSize: 20, fontWeight: "bold", marginRight: 8 },

    userTag: { fontSize: 16 },

    settingsList: { flex: 1, marginTop: 15 },

    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    optionText: { fontSize: 18, fontWeight: "500", marginLeft: 10 },

    logoutContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },

    logout: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
});
