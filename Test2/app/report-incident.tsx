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
import { API_URL, API_KEY } from './config';

export default function ReportAccidentScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    // State variables for location, message, and priority
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('');

    // Handle form submission
    const handleSubmit = async () => {
        if (!location.trim() || !message.trim()) {
            Alert.alert('Error', 'Please fill in both location and message.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/incidents/report-incident`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify({
                    location,
                    description: message,
                    priority: priority || 'low',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Incident reported successfully.');
                setLocation('');
                setMessage('');
                setPriority('');
            } else {
                Alert.alert('Error', data.message || 'Failed to report incident.');
            }
        } catch (error) {
            console.error('Report incident error:', error);
            Alert.alert('Error', 'Unable to connect to the server.');
        }
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
