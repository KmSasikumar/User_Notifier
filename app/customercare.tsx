import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomerCare() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => router.push('./contactpage')}>
                {/* <Image source={require('assets/images/phonesymbol.jpg')} style={styles.icon} /> */}
                <Text style={styles.title}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/describe')}>
                {/* <Image source={require('assets/images/customer-care-page.jpg')} style={styles.icon} /> */}
                <Text style={styles.title}>Describe Issue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/helppage')}>
                {/* <Image source={require('assets/images/customer-care-page2.jpg')} style={styles.icon} /> */}
                <Text style={styles.title}>Get Help</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/donepage')}>
                {/* <Image source={require('assets/images/customer-care-page3.png')} style={styles.icon} /> */}
                <Text style={styles.title}>Done! Issue Resolved</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F0FA',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'flex-start', // Move content higher
        paddingTop: 50, // Adjust this value to move everything up
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        width: '90%',
        elevation: 4,
        flexDirection: 'row',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginBottom: -5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});