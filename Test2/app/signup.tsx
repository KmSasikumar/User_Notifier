import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { API_URL, API_KEY } from './config';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const bubbles = [...Array(8)].map(() => new Animated.Value(Math.random() * height));

    useEffect(() => {
        bubbles.forEach((bubble, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bubble, {
                        toValue: -50,
                        duration: 5000 + index * 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bubble, {
                        toValue: height + 50,
                        duration: 0,
                        useNativeDriver: true,
                    })
                ])
            ).start();
        });
    }, []);

    const handleSignup = async () => {
        if (!name || !location || !email || !password) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY
                },
                body: JSON.stringify({ name, location, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Signup Successful', data.message || `Token: ${data.token}`);
            } else {
                Alert.alert('Signup Failed', data.message || 'An error occurred during signup');
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert('Error', 'Unable to connect to the server');
        }
    };

    return (
        <LinearGradient colors={['#FFD700', '#FFD700', '#007AFF', '#007AFF']} style={styles.container}>
            {bubbles.map((bubble, index) => (
                <Animated.View
                    key={index}
                    style={[styles.bubble, { left: Math.random() * width, transform: [{ translateY: bubble }] }]}
                />
            ))}
            <Text style={styles.title}>Sign Up🚀</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.toggleText}>
                Already have an account? <Link href="/login" style={styles.link}>Login</Link>
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '015551',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    toggleText: {
        fontSize: 16,
        color: '#fff',
    },
    link: {
        color: '#FFD700',
    },
    bubble: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        opacity: 0.7,
    }
});
