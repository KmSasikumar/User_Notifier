import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ContactScreen() {
    const [message, setMessage] = useState('');
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Contact Us Title */}
            <Text style={styles.modalTitle}>Contact Us</Text>

            {/* Extra Gap */}
            <View style={{ height: 10 }} />

            {/* Query Input Section */}
            <TextInput
                style={styles.input}
                placeholder="Enter your query here..."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
            />

            {/* Extra Gap */}
            <View style={{ height: 20 }} />

            {/* Image Section */}
            {/* <View style={styles.imageContainer}>
                <Image
                    source={require('C:/Users/91949/MySettingPage/myApp/assets/images/dfvt-removebg-preview.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View> */}

            {/* Send Button */}
            <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                    console.log(`Message Sent: ${message}`);
                    router.back();
                }}
            >
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 120,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        color: '#000',
        fontSize: 16,
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    sendButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
