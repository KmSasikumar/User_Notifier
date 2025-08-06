import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../themes/ThemeProvider'; // Import your custom theme hook

export const PageOptions = {
    headerShown: false,
};

export default function MainPage() {
    // State for side menu visibility
    const [showSideMenu, setShowSideMenu] = useState(false);
    const router = useRouter();

    // Get the current theme's color scheme from context
    const { colorScheme } = useTheme(); // colorScheme is one of: 'light' | 'dark' | 'blue' | 'green'

    // Animated value for side menu slide
    const [menuAnim] = useState(new Animated.Value(-300)); // off-screen left

    // Animate side menu when showSideMenu changes
    useEffect(() => {
        Animated.timing(menuAnim, {
            toValue: showSideMenu ? 0 : -300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showSideMenu, menuAnim]);

    // Handlers using Expo Router
    const handleProfile = () => {
        router.push('/profile');
    };

    const handleCustomerCare = () => {
        router.push('./customercare');
    };

    const handleSuggestions = () => {
        router.push('/info');
    };

    // Generate dynamic styles based on the current theme
    const styles = createStyles(colorScheme);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                {/* Side Menu Button */}
                <TouchableOpacity style={styles.hamburgerContainer} onPress={() => setShowSideMenu(true)}>
                    <Image
                        source={require('../assets/images/menu.png')}
                        style={styles.floatingButtonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Center Title */}
                <Text style={styles.headerTitle}>UserNotifier</Text>

                {/* Settings (gear) icon */}
                <TouchableOpacity onPress={() => router.push('/setting')}>
                    <Image
                        source={require('../assets/images/gear.png')}
                        style={styles.gearIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* SCROLLABLE CONTENT */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Greeting & Subtext */}
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hello, User</Text>
                    <Text style={styles.subGreeting}>Ready for Today’s Trip?☺️</Text>
                </View>

                {/* Quick Stats / Cards */}
                <View style={styles.cardsRow}>
                    <TouchableOpacity style={styles.statCard} onPress={() => router.push('/path-explorer')}>
                        <Text style={styles.statCardTitle}>Path Explorer</Text>
                        <Text style={styles.statCardSub}>Plan route 🚀</Text>
                        <Image
                            source={require('../assets/images/route-finder.png')}
                            style={styles.statCardIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statCard} onPress={() => router.push('/need-help')}>
                        <Text style={styles.statCardTitle}>Need help?</Text>
                        <Text style={styles.statCardSub}>24/7</Text>
                        <Image
                            source={require('../assets/images/helper.png')}
                            style={styles.statCardIcon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardsRow}>
                    <TouchableOpacity style={styles.statCard} onPress={() => router.push('/statistics')}>
                        <Text style={styles.statCardTitle}>Statistics</Text>
                        <Text style={styles.statCardSub}></Text>
                        <Image
                            source={require('../assets/images/stats.png')}
                            style={styles.statCardIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statCard} onPress={() => router.push('/view-alerts')}>
                        <Text style={styles.statCardTitle}>View Alerts</Text>
                        <Text style={styles.statCardSub}>Be notified.</Text>
                        <Image
                            source={require('../assets/images/view-alerts.png')}
                            style={styles.statCardIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Additional Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Statistics</Text>
                </View>

                <TouchableOpacity onPress={() => router.push('/statistics')}>
                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>01</Text>
                            <Text style={styles.statBoxLabel}>Accidents</Text>
                            <Text style={styles.statBoxLabel}>today</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>7km</Text>
                            <Text style={styles.statBoxLabel}>D.covered</Text>
                            <Text style={styles.statBoxLabel}>today</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>6</Text>
                            <Text style={styles.statBoxLabel}>Helps</Text>
                            <Text style={styles.statBoxLabel}>today</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Extra Spacer */}
                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Floating Button */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/report-incident')}>
                <Image
                    source={require('../assets/images/report-incident.png')}
                    style={styles.floatingButtonImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Side Menu Modal with Animated Slide-In */}
            <Modal visible={showSideMenu} transparent animationType="slide" onRequestClose={() => setShowSideMenu(false)}>
                <TouchableWithoutFeedback onPress={() => setShowSideMenu(false)}>
                    <View style={styles.sideMenuOverlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}>
                                {/* Top Section: Logo/Title */}
                                <View style={styles.sideMenuTop}>
                                    <Image
                                        source={require('../assets/images/icon-modified.png')}
                                        style={styles.sideMenuLogo}
                                    />
                                    <Text style={styles.sideMenuBrand}>UserNotifier</Text>
                                </View>

                                {/* Middle Section: Menu Items */}
                                <ScrollView style={styles.menuItemsContainer}>
                                    <TouchableOpacity style={styles.sideMenuItem} onPress={handleProfile}>
                                        <Image
                                            source={require('../assets/images/profile.png')}
                                            style={styles.sideMenuItemIcon}
                                        />
                                        <Text style={styles.sideMenuItemText}>Profile</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.sideMenuItem} onPress={handleSuggestions}>
                                        <Image
                                            source={require('../assets/images/info.png')}
                                            style={styles.sideMenuItemIcon}
                                        />
                                        <Text style={styles.sideMenuItemText}>Info</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.sideMenuItem} onPress={handleCustomerCare}>
                                        <Image
                                            source={require('../assets/images/customer-care.png')}
                                            style={styles.sideMenuItemIcon}
                                        />
                                        <Text style={styles.sideMenuItemText}>Customer Care</Text>
                                    </TouchableOpacity>
                                </ScrollView>

                                {/* Bottom Section: User Info */}
                                <View style={styles.sideMenuBottom}>
                                    <View style={styles.userInfo}>
                                        <Image
                                            source={require('../assets/images/profile.png')}
                                            style={styles.userAvatar}
                                        />
                                        <View>
                                            <Text style={styles.userName}>User</Text>
                                            <Text style={styles.userEmail}>user@example.com</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

function createStyles(colorScheme: 'light' | 'dark' | 'blue' | 'green') {
    const isDark = colorScheme === 'dark';

    // Light theme colors
    const LIGHT_BG = '#F8F9FD';
    const LIGHT_HEADER = '#FFFFFF';
    const LIGHT_TEXT = '#000000';
    const LIGHT_CARD = '#FFFFFF';
    const LIGHT_ACCENT = '#00C58E';
    const LIGHT_SUBTEXT = '#666';
    const LIGHT_BORDER = '#DDD';

    // Dark theme colors
    const DARK_BG = '#1E2329';
    const DARK_HEADER = 'rgba(255,255,255,0.05)';
    const DARK_TEXT = '#FFF';
    const DARK_CARD = 'rgba(255,255,255,0.1)';
    const DARK_ACCENT = '#30d158';
    const DARK_SUBTEXT = '#AAA';
    const DARK_BORDER = '#444';

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? DARK_BG : LIGHT_BG,
        },
        scrollContainer: {
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 10,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 50,
            paddingBottom: 16,
            backgroundColor: isDark ? DARK_HEADER : LIGHT_HEADER,
        },
        hamburgerContainer: {
            marginRight: 16,
        },
        hamburgerIcon: {
            fontSize: 24,
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
        },
        headerTitle: {
            flex: 1,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
        },
        gearIcon: {
            width: 26,
            height: 26,
        },
        greetingContainer: {
            marginTop: 20,
            marginBottom: 10,
        },
        greetingText: {
            fontSize: 26,
            fontWeight: 'bold',
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
        },
        subGreeting: {
            fontSize: 16,
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
            marginTop: 4,
        },
        cardsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            ...(isDark
                ? {}
                : {
                    backgroundColor: '#ECFDF5',
                    padding: 10,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    elevation: 2,
                }),
        },
        statCard: {
            width: '48%',
            backgroundColor: isDark ? DARK_CARD : LIGHT_CARD,
            borderRadius: 12,
            padding: 16,
            alignItems: 'flex-start',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            elevation: 2,
        },
        statCardTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
            marginBottom: 2,
        },
        statCardSub: {
            fontSize: 14,
            color: isDark ? DARK_TEXT : LIGHT_SUBTEXT,
            marginBottom: 8,
        },
        statCardIcon: {
            width: 32,
            height: 32,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: 20,
            marginBottom: 10,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
        },
        sectionDate: {
            fontSize: 12,
            color: isDark ? DARK_SUBTEXT : LIGHT_SUBTEXT,
        },
        statsContainer: {
            backgroundColor: isDark ? DARK_CARD : LIGHT_CARD,
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-around',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            elevation: 2,
        },
        statBox: {
            alignItems: 'center',
        },
        statBoxValue: {
            fontSize: 20,
            fontWeight: 'bold',
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
        },
        statBoxLabel: {
            fontSize: 14,
            color: isDark ? DARK_SUBTEXT : LIGHT_SUBTEXT,
            marginTop: 4,
        },
        floatingButton: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: isDark ? '#333' : '#fff',
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
        },
        floatingButtonImage: {
            width: 35,
            height: 35,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: '80%',
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 16,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            alignSelf: 'center',
            color: '#000',
        },
        modalItem: {
            paddingVertical: 12,
        },
        modalItemText: {
            fontSize: 16,
            color: '#000',
        },
        closeButton: {
            marginTop: 20,
            alignSelf: 'center',
            backgroundColor: '#007AFF',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
        },
        closeButtonText: {
            color: '#fff',
            fontSize: 16,
        },
        sideMenuOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            flexDirection: 'row',
        },
        sideMenu: {
            width: '70%',
            backgroundColor: isDark ? '#2c2c2c' : '#fff',
            paddingTop: 40,
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
        },
        sideMenuTop: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        sideMenuLogo: {
            width: 75,
            height: 75,
            marginRight: 10,
        },
        sideMenuBrand: {
            fontSize: 20,
            fontWeight: 'bold',
            color: isDark ? '#fff' : '#000',
        },
        menuItemsContainer: {
            flex: 1,
            marginBottom: 20,
        },
        sideMenuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? '#444' : '#DDD',
        },
        sideMenuItemIcon: {
            width: 20,
            height: 20,
            marginRight: 10,
        },
        sideMenuItemText: {
            fontSize: 16,
            color: isDark ? '#fff' : '#000',
        },
        sideMenuBottom: {
            marginTop: 10,
            borderTopWidth: 1,
            borderTopColor: isDark ? '#444' : '#DDD',
            paddingTop: 20,
        },
        userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        userAvatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
        },
        userName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDark ? '#fff' : '#000',
        },
        userEmail: {
            fontSize: 14,
            color: isDark ? '#AAA' : '#666',
        },
        sideMenuSettings: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: isDark ? '#444' : '#DDD',
        },
    });
}
