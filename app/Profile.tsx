import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'library'>('library');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Top bar: back, title, settings */}
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.push('Homescreen')}
                    >
                        <Ionicons name="chevron-back" size={22} color="#ff8c00" />
                    </TouchableOpacity>

                    <Text style={styles.screenTitle}>Profile</Text>

                    <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
                        <Ionicons name="settings-outline" size={22} color="#ff8c00" />
                    </TouchableOpacity>
                </View>

                {/* Avatar + name + dates */}
                <View style={styles.headerSection}>
                    <View style={styles.avatarCircle} />

                    <Text style={styles.partnerName}>Partner Name</Text>

                    <Text style={styles.metaText}>
                        Anniversary: June 11, 2021 | Birthday: Feb 3
                    </Text>
                </View>

                {/* Segmented control */}
                <View style={styles.segmentRow}>
                    <TouchableOpacity
                        style={[
                            styles.segmentButton,
                            activeTab === 'overview' && styles.segmentButtonActive,
                        ]}
                        onPress={() => setActiveTab('overview')}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                activeTab === 'overview' && styles.segmentTextActive,
                            ]}
                        >
                            Overview
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.segmentButton,
                            activeTab === 'library' && styles.segmentButtonActive,
                        ]}
                        onPress={() => setActiveTab('library')}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                activeTab === 'library' && styles.segmentTextActive,
                            ]}
                        >
                            Library
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Preferences card */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardTitle}>PREFERENCES</Text>
                        <TouchableOpacity>
                            <Text style={styles.cardLink}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={styles.fieldLabel}>Food:</Text>
                        <Text style={styles.fieldValue}>Italian, sushi, brunch dates</Text>

                        <Text style={[styles.fieldLabel, styles.fieldLabelSpacing]}>
                            Music:
                        </Text>
                        <Text style={styles.fieldValue}>
                            Indie, acoustic, movie scores
                        </Text>

                        <Text style={[styles.fieldLabel, styles.fieldLabelSpacing]}>
                            Colors:
                        </Text>
                        <Text style={styles.fieldValue}>
                            Soft lavender, deep blue
                        </Text>
                    </View>
                </View>

                {/* Sizes card */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardTitle}>SIZES</Text>
                        <TouchableOpacity>
                            <Text style={styles.cardLink}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={styles.fieldLabel}>Clothing:</Text>
                        <Text style={styles.fieldValue}>Small</Text>

                        <Text style={[styles.fieldLabel, styles.fieldLabelSpacing]}>
                            Shoe:
                        </Text>
                        <Text style={styles.fieldValue}>7</Text>
                    </View>
                </View>

                {/* Spacer at bottom so content isn't tight to tab bar */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000', // dark gradient-ish base
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginBottom: 16,
    },
    partnerName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
    },
    metaText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
    },
    segmentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 24,
    },
    segmentButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        marginHorizontal: 4,
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    segmentButtonActive: {
        backgroundColor: 'rgba(255,255,255,0.18)',
    },
    segmentText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        fontWeight: '600',
    },
    segmentTextActive: {
        color: '#ffffff',
    },
    card: {
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 18,
        paddingVertical: 16,
        marginBottom: 16,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 13,
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.8)',
    },
    cardLink: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
    },
    cardBody: {
        marginTop: 4,
    },
    fieldLabel: {
        fontSize: 13,
        color: 'rgba(255, 140, 0, 1)',
    },
    fieldLabelSpacing: {
        marginTop: 10,
    },
    fieldValue: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
    },
});
