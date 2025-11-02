import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../themes/ThemeProvider';

export default function ReportAccidentScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    // State variables for location, message, and priority
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('');

    // Handle form submission
    const handleSubmit = () => {
        if (!location.trim() || !message.trim()) {
            Alert.alert('Error', 'Please fill in both location and message.');
            return;
        }

        Alert.alert(
            'Accident Report',
            `Location: ${location}\nMessage: ${message}\nPriority: ${priority || 'None selected'}`
        );

        setLocation('');
        setMessage('');
        setPriority('');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Report Incident</Text>

            {/* Location Input */}
            <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder="Enter location"
                placeholderTextColor={theme.placeholder}
                value={location}
                onChangeText={setLocation}
            />

            {/* Message Input (multiline) */}
            <TextInput
                style={[styles.input, { height: 80, backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder="Describe what happened..."
                placeholderTextColor={theme.placeholder}
                value={message}
                onChangeText={setMessage}
                multiline
            />

            {/* Priority Selection */}
            <Text style={[styles.label, { color: theme.text }]}>Select Priority:</Text>
            <View style={styles.priorityContainer}>
                <TouchableOpacity
                    style={[styles.priorityButton, priority === 'high' && styles.priorityHigh]}
                    onPress={() => setPriority('high')}
                >
                    <Text style={styles.priorityText}>High</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.priorityButton, priority === 'medium' && styles.priorityMedium]}
                    onPress={() => setPriority('medium')}
                >
                    <Text style={styles.priorityText}>Medium</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.priorityButton, priority === 'low' && styles.priorityLow]}
                    onPress={() => setPriority('low')}
                >
                    <Text style={styles.priorityText}>Low</Text>
                </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
                <Text style={[styles.submitButtonText, { color: theme.background }]}>Submit Report</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 50,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '600',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    priorityButton: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#eee',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    priorityText: {
        fontSize: 16,
        fontWeight: '600',
    },
    priorityHigh: {
        backgroundColor: 'red',
    },
    priorityMedium: {
        backgroundColor: 'orange',
    },
    priorityLow: {
        backgroundColor: 'green',
    },
    submitButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
