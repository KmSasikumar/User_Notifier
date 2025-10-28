import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Animated, Dimensions, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { API_URL, API_KEY } from './config';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const isValid = email.length > 0 && password.length >= 8;

    // Button Animation
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleLogin = async () => {
        if (!isValid) {
            Alert.alert('Error', 'Please enter a valid email and password (min. 8 characters).');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('authToken', data.token);
                router.push('/mainpage');
            } else {
                Alert.alert('Login Failed', data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Unable to connect to the server');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topHalf} />
            <View style={styles.bottomHalf} />

            <View style={styles.splashContainer}>
                <View style={styles.whiteCircle}>
                    <Image source={require('../assets/images/icon-modified.png')} style={styles.logo} />
                </View>
                <Text style={styles.appTitle}>Login to proceed😊</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Your email address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleLogin} disabled={!isValid}>
                        <LinearGradient colors={['#6B7EE3', '#5A4D9B']} style={[styles.button, !isValid && styles.disabledButton]}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <Text style={styles.orText}>or</Text>

                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Google Sign-In')}>
                        <Image source={require('../assets/images/google_icon.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Facebook Sign-In')}>
                        <Image source={require('../assets/images/fb-logo.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topHalf: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '50%',
        backgroundColor: '#FFB433',
    },
    bottomHalf: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundColor: '#B4EBE6',
    },
    splashContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    whiteCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 90,
        height: 90,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C387E',
        marginTop: 20,
    },
    formContainer: {
        width: '90%',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        width: 250,
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orText: {
        fontSize: 16,
        color: '#666',
        marginVertical: 15,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 10,
    },
    socialButton: {
        width: 50,
        height: 50,
        margin: 2,
        borderWidth: 1,  // Adjust thickness (increase for a thicker border)
        borderColor: '#000',  // Change to desired color
        borderRadius: 20,  // Optional: for rounded corners
        alignItems: 'center',
        justifyContent: 'center',
    }
    ,
    socialIcon: {
        width: 40,
        height: 40,
    },
});