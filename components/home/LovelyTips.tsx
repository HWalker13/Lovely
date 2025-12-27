import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TEXT_SIZE } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import TipCard from './TipCard';

type TipItem = {
    id: string;
    type: string;
    icon: string;
    text: string;
};

const { width } = Dimensions.get('window');
const H_PADDING = 20;
const CARD_SPACING = 12;
const PEEK = 24;
const CARD_WIDTH = width - (H_PADDING * 2) - PEEK;

// Temporary data
const lovelyTips: TipItem[] = [
    { id: '1', type: 'reflect', icon: 'thought', text: 'Notice what lifted their mood today—no need to label it.' },
    { id: '2', type: 'try', icon: 'lightbulb', text: 'If the week feels heavy, plan a quiet night in.' },
    { id: '3', type: 'observe', icon: 'thought', text: 'Ask what they’re proud of this week—then just listen.' },
];

const LovelyTips = () => {
    const itemLayout = useMemo(() => {
        const interval = CARD_WIDTH + CARD_SPACING;
        return (_data: ArrayLike<TipItem> | null | undefined, index: number) => ({
            length: interval,
            offset: interval * index,
            index
        });
    }, []);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lovely Tips</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={lovelyTips}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                getItemLayout={itemLayout}
                renderItem={({ item }: { item: TipItem }) => (
                    <TipCard
                        item={item}
                        width={CARD_WIDTH}
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

export default LovelyTips;
