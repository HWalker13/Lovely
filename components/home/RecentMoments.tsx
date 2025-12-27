import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TEXT_SIZE } from '../../constants/typography';
import { COLORS } from '../../constants/colors';

type RecentMoment = {
    id: string;
    timeLabel: string;
    text: string;
};

const H_PADDING = 20;
const CARD_SPACING = 12;
const PEEK = 24;
const CARD_WIDTH = 232;
const CARD_HEIGHT = 140;

// Temporary seed data
const recentMoments: RecentMoment[] = [
    { id: 'rm1', timeLabel: 'YESTERDAY', text: 'Brought her morning coffee before work.' },
    { id: 'rm2', timeLabel: 'LAST SUNDAY', text: 'Watched her favorite show together.' },
    { id: 'rm3', timeLabel: 'EARLIER THIS WEEK', text: 'Sent a short note before her meeting.' },
];

const RecentMoments = () => {
    const itemLayout = useMemo(() => {
        const interval = CARD_WIDTH + CARD_SPACING;
        return (_data: ArrayLike<RecentMoment> | null | undefined, index: number) => ({
            length: interval,
            offset: interval * index,
            index
        });
    }, []);
    const renderCard = ({ item }: { item: RecentMoment }) => (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
            onPress={() => {
                // Future: Open modal with moment details
            }}
        >
            <View style={styles.topRow}>
                <Ionicons
                    name="calendar"
                    size={20}
                    color={COLORS.textPrimary}
                />
                <Text style={styles.timeLabel}>{item.timeLabel}</Text>
            </View>

            <Text style={styles.mainText} numberOfLines={2} ellipsizeMode="tail">
                {item.text}
            </Text>
        </Pressable>
    );

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Moments</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recentMoments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                getItemLayout={itemLayout}
                renderItem={renderCard}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: H_PADDING,
        marginTop: 24,
    },
    sectionTitle: {
        ...TEXT_SIZE.S,
        color: COLORS.textSecondary,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingHorizontal: 5,
    },
    listContent: {
        paddingRight: H_PADDING,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeLabel: {
        ...TEXT_SIZE.XS,
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
        marginLeft: 8,
    },
    mainText: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
});

export default RecentMoments;
