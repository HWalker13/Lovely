import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TEXT_SIZE } from '../../constants/typography';

type MomentItem = {
    id: string;
    title: string;
    dateTime?: string;
    location?: string;
    note?: string;
    icon?: string;
};

type MomentCardProps = {
    item: MomentItem;
    width: number;
    spacingRight?: number;
    onPressDetails?: (item: MomentItem) => void;
    onPressEdit?: (item: MomentItem) => void;
    onPressMenu?: (item: MomentItem) => void;
};

/**
 * Uniform event card for Upcoming Moments carousel
 */
const CARD_HEIGHT = 184;

const MomentCard = ({
    item,
    width,
    spacingRight = 12,
    onPressDetails,
    onPressEdit,
    onPressMenu
}: MomentCardProps) => {
    const iconName = (item.icon || 'calendar') as keyof typeof Ionicons.glyphMap;

    return (
        <View style={[styles.card, { width, marginRight: spacingRight, height: CARD_HEIGHT }]}>
            {/* Top Row: Icon + Title */}
            <View style={styles.topRow}>
                <Ionicons name={iconName} size={24} color={COLORS.textPrimary} />
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
            </View>

            {/* Middle: Date/Time and Location */}
            <View style={styles.middle}>
                {!!item.dateTime && (
                    <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">{item.dateTime}</Text>
                )}
                {!!item.location && (
                    <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">{item.location}</Text>
                )}
            </View>

            {/* Bottom: Personal note */}
            {!!item.note && (
                <Text style={styles.note} numberOfLines={2} ellipsizeMode="tail">{item.note}</Text>
            )}

            {/* Footer: Actions */}
            <View style={styles.footerRow}>
                <TouchableOpacity onPress={() => onPressDetails && onPressDetails(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.linkPrimary}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressEdit && onPressEdit(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.linkSecondary}>Edit</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => onPressMenu && onPressMenu(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textMuted} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    title: {
        ...TEXT_SIZE.M,
        color: COLORS.textPrimary,
        flexShrink: 1,
    },
    middle: {
        gap: 6,
        marginBottom: 12,
    },
    metaText: {
        ...TEXT_SIZE.S,
        color: COLORS.textMuted,
    },
    note: {
        ...TEXT_SIZE.S,
        color: 'rgba(255, 255, 255, 0.7)',
        fontStyle: 'italic',
        marginBottom: 12,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 12,
    },
    linkPrimary: {
        ...TEXT_SIZE.S,
        color: COLORS.textPrimary,
        marginRight: 16,
    },
    linkSecondary: {
        ...TEXT_SIZE.S,
        color: COLORS.textMuted,
    },
});

export default MomentCard;
