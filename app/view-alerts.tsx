import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Animated,
    Dimensions,
    TouchableOpacity,
    Easing,
    Platform,
    StatusBar,
} from 'react-native';
import { useTheme } from '../themes/ThemeProvider';

// Example accidents for today's ticker
const accidentsToday = [
    'Accident near Station Road at 9:15 AM',
    'Minor collision on Highway 22 at 10:30 AM',
    'Accident reported near Green Park at 11:05 AM',
    'Two-vehicle crash on Elm Street at 12:45 PM',
];

// Example quotes for random selection
const quotes = [
    '“Safety first is safety always.” – Charles M. Hayes',
    '“Better to be late than never.” – Traffic Adage',
    '“Accidents hurt, safety doesn’t.” – Unknown',
    '“Alert today – Alive tomorrow.” – Road Safety Slogan',
    '“Road safety is state of mind, accident is an absence of mind.” – Unknown',
];

export default function ViewAlerts() {
    const { theme } = useTheme();

    // For the ticker
    const screenWidth = Dimensions.get('window').width;
    const translateX = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);

    // Combine accidents into one string, separated by "   |   "
    const tickerText = accidentsToday.join('   |   ');

    // Randomize quote each time user accesses this page
    const [quoteIndex, setQuoteIndex] = useState(0);
    useEffect(() => {
        // Pick a random index
        const newIndex = Math.floor(Math.random() * quotes.length);
        setQuoteIndex(newIndex);
    }, []);

    const dailyQuote = quotes[quoteIndex];

    useEffect(() => {
        if (textWidth > 0) {
            startAnimation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textWidth]);

    const startAnimation = () => {
        translateX.setValue(screenWidth);
        // Animate from right (screenWidth) to left (-textWidth)
        Animated.timing(translateX, {
            toValue: -textWidth,
            duration: 20000, // Adjust speed (ms) as desired
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            // Loop the animation
            startAnimation();
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Auto-Scrolling Ticker */}
                <View style={[styles.tickerContainer, { backgroundColor: theme.modal }]}>
                    <Animated.Text
                        style={[styles.tickerText, { color: theme.primary, transform: [{ translateX }] }]}
                        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
                        numberOfLines={1}
                    >
                        {tickerText}
                    </Animated.Text>
                </View>

                {/* Accidents Nearby */}
                <TouchableOpacity style={[styles.alertBar, { backgroundColor: theme.modal }]}>
                    <Text style={[styles.alertBarTitle, { color: theme.text }]}>Accidents Nearby ▼</Text>
                    <Text style={[styles.alertBarSubtitle, { color: theme.text }]}>Tap to see details...</Text>
                </TouchableOpacity>

                {/* Accidents on the Way */}
                <TouchableOpacity style={[styles.alertBar, { backgroundColor: theme.modal }]}>
                    <Text style={[styles.alertBarTitle, { color: theme.text }]}>Accidents on the Way</Text>
                    <Text style={[styles.alertBarSubtitle, { color: theme.text }]}>Tap to see details...</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* "Cloud-like" quote container pinned at bottom */}
            <View style={[styles.cloudContainer, { backgroundColor: theme.primary }]}>
                <Text style={[styles.quoteText, { color: theme.background }]}>{dailyQuote}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 200,
    },
    tickerContainer: {
        height: 40,
        overflow: 'hidden',
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 20,
    },
    tickerText: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 16,
    },
    alertBar: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    alertBarTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    alertBarSubtitle: {
        fontSize: 12,
    },
    cloudContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        alignItems: 'center',
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});