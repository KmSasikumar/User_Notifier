import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../themes/ThemeProvider';

export default function ReportAccidentScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { incidentType } = useLocalSearchParams();

    // State variables for location, message, and priority
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async () => {
        if (!location.trim() || !message.trim()) {
            Alert.alert('Error', 'Please fill in both location and message.');
            return;
        }

        try {
            const response = await fetch('http://172.25.245.203:5000/api/incidents/report-incident', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da837f630ad1c5eac399915414a99aa00c75ce2628bebaa3692645b7e2127b62',
                },
                body: JSON.stringify({ type: incidentType, location, message }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Incident reported successfully.');
                router.push('/mainpage');
            } else {
                Alert.alert('Error', data.error || 'Failed to report incident.');
            }
        } catch (error) {
            console.error('Report incident error:', error);
            Alert.alert('Error', 'Unable to connect to the server.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Report Incident: {incidentType}</Text>

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
