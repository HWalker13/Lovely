import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TEXT_SIZE } from '../../constants/typography';

const ICONS = {
    thought: 'bulb',
    lightbulb: 'bulb',
};

const LABELS = {
    reflect: 'Reflect',
    try: 'Try This',
    observe: 'Observation',
};

const TipCard = ({ item, width }) => {
    const iconName = ICONS[item.icon] || 'help-circle-outline';
    const labelText = LABELS[item.type] || 'Tip';

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                { width },
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Ionicons name={iconName} size={20} color={COLORS.textPrimary} />
                    <Text style={styles.label}>{labelText}</Text>
                </View>

                <Text style={styles.mainText}>{item.text}</Text>
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.readMore}>Read more...</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 20,
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
        gap: 8,
        marginBottom: 12,
    },
    content: {

    },
    label: {
        ...TEXT_SIZE.XS,
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    mainText: {
        ...TEXT_SIZE.M,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500',
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    footerRow: {
        marginTop: 8,
    },
    readMore: {
        ...TEXT_SIZE.S,
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 0.5,
    },
});

export default TipCard;