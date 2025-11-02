import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function DoneScreen() {
    const [doneMessage, setDoneMessage] = useState('');
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>task done</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Task Completed</Text>

                {/* Input Field */}
                <TextInput
                    style={styles.input}
                    placeholder="Leave a comment or feedback..."
                    placeholderTextColor="#999"
                    value={doneMessage}
                    onChangeText={setDoneMessage}
                    multiline
                />

                {/* Image */}
                {/* <Image
                    source={require('C:/Users/91949/MySettingPage/myApp/assets/images/qvthgg3s.png')} // Ensure this path is correct
                    style={styles.image}
                    resizeMode="contain"
                /> */}

                {/* Done Button */}
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => console.log(`Feedback Submitted: ${doneMessage}`)}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        fontSize: 18,
        color: '#333',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'lowercase',
    },
    content: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '90%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        fontSize: 16,
        color: '#333',
    },
    image: {
        width: 150,
        height: 100,
        marginVertical: 20,
    },
    doneButton: {
        width: '90%',
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
