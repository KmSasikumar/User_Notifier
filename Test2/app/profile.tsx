import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, API_KEY } from './config';

const ProfileScreen = () => {
    const [profileImage, setProfileImage] = useState(require('../assets/images/profile.png'));
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [profession, setProfession] = useState('');
    const [bio, setBio] = useState('');
    const [memberSince, setMemberSince] = useState('');
    const [membershipStatus, setMembershipStatus] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await fetch(`${API_URL}/auth/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'x-api-key': API_KEY,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setName(data.name || '');
                        setAge(data.age || '');
                        setBloodGroup(data.bloodGroup || '');
                        setPhoneNumber(data.phoneNumber || '');
                        setGender(data.gender || '');
                        setProfession(data.profession || '');
                        setBio(data.bio || '');
                        setMemberSince(data.memberSince || '');
                        setMembershipStatus(data.membershipStatus || '');
                    } else {
                        Alert.alert('Error', 'Failed to fetch profile.');
                    }
                } catch (error) {
                    Alert.alert('Error', 'Unable to connect to the server.');
                }
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': API_KEY,
                    },
                    body: JSON.stringify({
                        name,
                        age,
                        bloodGroup,
                        phoneNumber,
                        gender,
                        profession,
                        bio,
                        memberSince,
                        membershipStatus,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    Alert.alert('Success', 'Profile updated successfully.');
                    setIsEditing(false);
                } else {
                    Alert.alert('Error', 'Failed to update profile.');
                }
            } catch (error) {
                Alert.alert('Error', 'Unable to connect to the server.');
            }
        }
    };

    const handleSelectPhoto = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access the media library is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], // Square image
                quality: 1,
            });

            if (!result.canceled) {
                setProfileImage({ uri: result.assets[0].uri });
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.profileImageContainer}>
                <Image source={profileImage} style={styles.profileImage} />
                <TouchableOpacity style={styles.cameraButton} onPress={handleSelectPhoto}>
                    <Ionicons name="camera-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.profileCard}>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                    if (isEditing) {
                        handleSave();
                    } else {
                        setIsEditing(true);
                    }
                }}>
                    <Ionicons name={isEditing ? 'checkmark-outline' : 'create-outline'} size={24} color="black" />
                </TouchableOpacity>

                {/* Bio at the top */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Bio:</Text>
                    {isEditing ? (
                        <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Enter your bio" />
                    ) : (
                        <Text style={styles.profileText}>{bio}</Text>
                    )}
                </View>

                {[
                    { label: 'Age', value: age, setter: setAge },
                    { label: 'Blood Group', value: bloodGroup, setter: setBloodGroup },
                    { label: 'Phone No', value: phoneNumber, setter: setPhoneNumber },
                    { label: 'Gender', value: gender, setter: setGender },
                    { label: 'Profession', value: profession, setter: setProfession },
                    { label: 'Member Since', value: memberSince, setter: setMemberSince },
                    { label: 'Membership Status', value: membershipStatus, setter: setMembershipStatus },
                ].map(({ label, value, setter }, index) => (
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.label}>{label}:</Text>
                        {isEditing ? (
                            <TextInput style={styles.input} value={value} onChangeText={setter} placeholder={`Enter ${label}`} />
                        ) : (
                            <Text style={styles.profileText}>{value}</Text>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 180,
        backgroundColor: '#0052D4',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: -110, // Shifted slightly up
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: 'white',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#0052D4',
        width: 35,
        height: 35,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        elevation: 5,
        marginTop: 20,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        width: 150,
    },
    profileText: {
        fontSize: 18,
        color: '#333',
        flex: 1,
    },
    input: {
        fontSize: 16,
        flex: 1,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default ProfileScreen;
