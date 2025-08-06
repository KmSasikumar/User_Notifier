import React, { useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Animated,
    Easing, Dimensions, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function StartupScreen() {
    const router = useRouter();
    const scaleValue = useRef(new Animated.Value(1)).current;
    const bellRotate = useRef(new Animated.Value(0)).current;
    const bellTranslateY = useRef(new Animated.Value(0)).current;
    const bellOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        animateBell();
        animateLogo();
    }, []);

    const animateBell = () => {
        Animated.sequence([
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bellRotate, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bellRotate, {
                        toValue: -1,
                        duration: 400,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]), { iterations: 6 }
            ),
            Animated.parallel([
                Animated.timing(bellTranslateY, {
                    toValue: height / 2,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(bellOpacity, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: true,
                })
            ])
        ]).start();
    };

    const animateLogo = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.1,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const rotateBell = bellRotate.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-15deg', '15deg'],
    });

    return (
        <View style={styles.container}>
            {/* Background Split */}
            <View style={styles.topHalf} />
            <View style={styles.bottomHalf} />

            {/* Animated Bell */}
            <Animated.View style={[styles.bellContainer, { transform: [{ rotate: rotateBell }, { translateY: bellTranslateY }], opacity: bellOpacity }]}>
                <Image source={require('../assets/images/bell.png')} style={styles.bellIcon} resizeMode="contain" />
            </Animated.View>

            {/* Logo Container */}
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleValue }] }]}>
                <View style={styles.whiteCircle}>
                    <Image source={require('../assets/images/icon-modified.png')} style={styles.logo} resizeMode="contain" />
                </View>
            </Animated.View>

            {/* Text Content */}
            <Text style={styles.title}>UserNotifier</Text>
            <Text style={styles.subtitle}>Stay Notified, Stay Ahead</Text>

            {/* Let's Get Started Heading */}
            <Text style={styles.heading}>Let’s Get Started!🚀</Text>

            {/* Create Account Button */}
            <TouchableOpacity onPress={() => router.push('/signup')}>
                <LinearGradient colors={['#6B7EE3', '#5A4D9B']} style={styles.button}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={() => router.push('./login')} style={styles.loginLink}>
                <Text style={styles.linkText}>
                    Already have an account? <Text style={[styles.linkHighlight, { fontSize: 16 }]}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    topHalf: { position: 'absolute', top: 0, width: '100%', height: '50%', backgroundColor: '#B4EBE6' },
    bottomHalf: { position: 'absolute', bottom: 0, width: '100%', height: '50%', backgroundColor: '#FFB433' },
    bellContainer: { position: 'absolute', top: 100, alignSelf: 'center' },
    bellIcon: { width: 60, height: 60 },
    logoContainer: { marginBottom: 25, zIndex: 1 },
    whiteCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    logo: { width: 90, height: 90 },
    title: { fontSize: 32, color: '#2C387E', fontWeight: '800', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#2C387E', marginBottom: 40, opacity: 0.8 },
    heading: { fontSize: 24, color: '#2C387E', fontWeight: '600', marginBottom: 40 },
    button: { width: 250, paddingVertical: 16, borderRadius: 25, alignItems: 'center', marginBottom: 20 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
    loginLink: { marginTop: 15 },
    linkText: { color: '#2C387E', fontSize: 14, opacity: 0.8 },
    linkHighlight: { color: '#5A4D9B', fontWeight: '600' },
});