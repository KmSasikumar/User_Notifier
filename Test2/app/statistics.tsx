import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '../themes/ThemeProvider';
import { getStatistics } from '../../data/services/statisticsService';

export default function Statistics() {
    const { theme } = useTheme();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const data = await getStatistics();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.text} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Top Card: "User Stats" */}
                <View style={[styles.statsCard, { backgroundColor: theme.modal }]}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>User Stats</Text>

                    {/* Headings in a single column for spacing */}
                    <View style={styles.headingsContainer}>
                        {/* Accidents Total */}
                        <View style={styles.headingItem}>
                            <View style={[styles.colorDot, { backgroundColor: '#f97316' }]} />
                            <Text style={[styles.headingText, { color: theme.text }]}>Accidents (Total): {stats?.totalAccidents ?? 'N/A'}</Text>
                        </View>

                        {/* Helps Today */}
                        <View style={styles.headingItem}>
                            <View style={[styles.colorDot, { backgroundColor: '#4ade80' }]} />
                            <Text style={[styles.headingText, { color: theme.text }]}>Helps (Today): {stats?.helpsToday ?? 'N/A'}</Text>
                        </View>

                        {/* Distance Today */}
                        <Text style={[styles.headingText, { color: theme.text }]}>Distance Today</Text>
                        <View style={styles.headingItem}>
                            <View style={[styles.colorDot, { backgroundColor: '#60a5fa' }]} />
                            <Text style={[styles.headingText, { color: theme.text }]}>Distance (Today): {stats?.distanceToday ?? 'N/A'} km</Text>
                        </View>

                        {/* Badge */}
                        <View style={styles.headingItem}>
                            <View style={[styles.colorDot, { backgroundColor: '#facc15' }]} />
                            <Text style={[styles.headingText, { color: theme.text }]}>Badge: {stats?.badge ?? 'N/A'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    statsCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    headingsContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    headingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    headingText: {
        fontSize: 14,
    },
});
