import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    navigation: StackNavigationProp<any>;
};

const AboutScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>USERNOTIFIER</Text>
                <Text style={styles.subHeaderText}>Real-Time Incident Notification System</Text>
            </View>

            {/* Features Section */}
            <View style={[styles.card, styles.blueBackground]}>
                <Text style={styles.sectionTitle}>Key Features</Text>
                {[
                    { title: "Path Finder", desc: "Plan your route efficiently." },
                    { title: "Need Help Feature", desc: "Get 24/7 assistance." },
                    { title: "Statistics", desc: "View real-time accident and distance coverage stats." },
                    { title: "View Alerts", desc: "Stay notified about incidents in your area." }
                ].map((item, index) => (
                    <View key={index} style={styles.featureItem}>
                        <Text style={styles.featureTitle}>{item.title}</Text>
                        <Text style={styles.featureDesc}>{item.desc}</Text>
                    </View>
                ))}
            </View>

            {/* How It Works Section */}
            <View style={[styles.card, styles.blueBackground]}>
                <Text style={styles.sectionTitle}>How It Works</Text>
                {[
                    {
                        title: "Path Finder",
                        points: [
                            "Uses real-time traffic data and mapping algorithms to suggest the shortest and safest route.",
                            "Considers accident reports and congestion to reroute efficiently."
                        ]
                    },
                    {
                        title: "Need Help",
                        points: [
                            "Allows users to request emergency assistance instantly.",
                            "Connects with emergency services or nearby users who can help."
                        ]
                    },
                    {
                        title: "Statistics",
                        points: [
                            "Provides daily reports on accidents and distance covered.",
                            "Offers insights into emergency assistance provided."
                        ]
                    },
                    {
                        title: "View Alerts",
                        points: [
                            "Sends real-time notifications about accidents, roadblocks, and incidents.",
                            "Ensures users are informed before starting a trip."
                        ]
                    }
                ].map((section, index) => (
                    <View key={index} style={styles.featureItem}>
                        <Text style={styles.featureTitle}>{section.title}</Text>
                        {section.points.map((point, idx) => (
                            <Text key={idx} style={styles.bulletPoint}>• {point}</Text>
                        ))}
                    </View>
                ))}
            </View>

            {/* Get Started Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#1E1E1E",
        padding: 20,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "CascadiaMono-SemiBold", // Updated to Cascadia Mono SemiBold for headers
    },
    subHeaderText: {
        fontSize: 16,
        color: "#B0B0B0",
        textAlign: "center",
        marginTop: 5,
        fontFamily: "Candara-Light", // Updated to Candara Light for subheaders
    },
    card: {
        backgroundColor: "#2E2E2E",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    blueBackground: {
        backgroundColor: "#2E2E2E",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
        fontFamily: "CascadiaMono-SemiBold", // Updated to Cascadia Mono SemiBold for section titles
    },
    featureItem: {
        marginBottom: 15,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "CascadiaMono-SemiBold", // Updated to Cascadia Mono SemiBold for feature titles
    },
    featureDesc: {
        fontSize: 16,
        color: "#B0B0B0",
        fontFamily: "Candara-Light", // Updated to Candara Light for descriptions
    },
    bulletPoint: {
        fontSize: 16,
        color: "#B0B0B0",
        marginLeft: 10,
        fontFamily: "Candara-Light", // Updated to Candara Light for bullet points
    },
    button: {
        backgroundColor: "#2C6E49",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Candara-Light", // Updated to Candara Light for button text
    },
});

export default AboutScreen;