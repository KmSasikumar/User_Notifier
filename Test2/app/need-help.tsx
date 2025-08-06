import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "../themes/ThemeProvider"; // ✅ Import the theme

export default function NeedHelp() {
    const { theme } = useTheme(); // ✅ Get theme from context

    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [showSelectModal, setShowSelectModal] = useState(false);
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [otherText, setOtherText] = useState("");

    const handleSend = () => {
        let optionToSend = selectedOption;
        if (selectedOption === "Other") {
            optionToSend = otherText;
        }
        Alert.alert("Help Request", `Message: ${message}\nOption: ${optionToSend}`);
        setMessage("");
        setSelectedOption("");
        setOtherText("");
        setIsOtherSelected(false);
    };

    const options = [
        "Police",
        "Doctor",
        "Fire Department",
        "Ambulance",
        "Mechanic",
        "Roadside Assistance",
        "Electrician",
        "Insurance",
        "Counseling",
        "Other",
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Need Help?</Text>

            <TextInput
                style={[styles.input, { backgroundColor: theme.modal, color: theme.text }]}
                placeholder="Your Message"
                placeholderTextColor={theme.text}
                multiline
                value={message}
                onChangeText={setMessage}
            />

            <TouchableOpacity style={[styles.selectBox, { backgroundColor: theme.modal }]} onPress={() => setShowSelectModal(true)}>
                <Text style={[styles.selectText, { color: theme.text }]}>{selectedOption ? selectedOption : "Select an option"}</Text>
            </TouchableOpacity>

            {isOtherSelected && (
                <TextInput
                    style={[styles.input, { backgroundColor: theme.modal, color: theme.text }]}
                    placeholder="Please specify"
                    placeholderTextColor={theme.text}
                    multiline
                    value={otherText}
                    onChangeText={setOtherText}
                />
            )}

            <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.primary }]} onPress={handleSend}>
                <Text style={styles.sendButtonText}>SEND</Text>
            </TouchableOpacity>

            <Modal visible={showSelectModal} transparent animationType="fade" onRequestClose={() => setShowSelectModal(false)}>
                <TouchableWithoutFeedback onPress={() => setShowSelectModal(false)}>
                    <View style={styles.selectModalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.selectModalContent, { backgroundColor: theme.modal }]}>
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.selectOption}
                                        onPress={() => {
                                            setSelectedOption(option);
                                            setShowSelectModal(false);
                                            setIsOtherSelected(option === "Other");
                                        }}
                                    >
                                        <Text style={[styles.selectOptionText, { color: theme.text }]}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    selectBox: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    selectText: {
        fontSize: 16,
    },
    sendButton: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 20,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    selectModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    selectModalContent: {
        width: "80%",
        borderRadius: 8,
        paddingVertical: 20,
    },
    selectOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    selectOptionText: {
        fontSize: 16,
    },
});
