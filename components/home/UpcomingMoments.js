import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TEXT_SIZE } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import MomentCard from './MomentCard';

const { width } = Dimensions.get('window');
const H_PADDING = 20;    // align with other sections
const CARD_SPACING = 12; // equal spacing between cards
const PEEK = 24;         // show a sliver of the next card
const CARD_WIDTH = width - (H_PADDING * 2) - PEEK;

const UpcomingMoments = ({ moments = [], onDetails, onEdit, onMenu }) => {
    const itemLayout = useMemo(() => {
        const interval = CARD_WIDTH + CARD_SPACING;
        return (_data, index) => ({ length: interval, offset: interval * index, index });
    }, []);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Moments</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={moments}
                keyExtractor={(m) => m.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                getItemLayout={itemLayout}
                renderItem={({ item }) => (
                    <MomentCard
                        item={item}
                        width={CARD_WIDTH}
                        spacingRight={0}
                        onPressDetails={onDetails}
                        onPressEdit={onEdit}
                        onPressMenu={onMenu}
                    />
                )}
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
});

export default UpcomingMoments;