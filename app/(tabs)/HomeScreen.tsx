// app/(tabs)/Homescreen.js
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CompletionMessage from '../../components/home/CompletionMessage';
import HomeHeader from '../../components/home/HomeHeader';
import LovelyTips from '../../components/home/LovelyTips';
import RecentMoments from '../../components/home/RecentMoments';
import TodaysGesture from '../../components/home/TodaysGesture';
import UpcomingMoments from '../../components/home/UpcomingMoments';

import { COMPLETION_PHRASES } from '../../constants/completionPhrases';
import { canUndoToday, getOrCreateTodaysGesture } from '../../utils/gestureUtils';
import {
  calculateStreak,
  getDailyCompletion,
  getDateString,
  saveDailyCompletion,
  saveStreak,
} from '../../utils/storageUtils';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/auth';

type Gesture = {
  id: string;
  text: string;
};

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [todaysGesture, setTodaysGesture] = useState<Gesture | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionPhrase, setCompletionPhrase] = useState('');
  const [canUndo, setCanUndo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const upcomingMoments = [
    {
      id: '1',
      title: 'Anniversary Dinner',
      dateTime: 'Sat, Nov 8 · 7:30 PM',
      location: 'Le Petit Coeur, SF',
      note: 'She loves the corner table.',
      icon: 'restaurant',
    },
    {
      id: '2',
      title: 'Weekend Getaway',
      dateTime: 'Nov 15–17',
      location: 'Carmel-by-the-Sea',
      note: 'Pack her favorite sweater.',
      icon: 'airplane',
    },
    {
      id: '3',
      title: "Maya's Birthday",
      dateTime: 'Fri, Nov 21 · 6:00 PM',
      location: 'Home — game night',
      note: 'Get the polaroid film.',
      icon: 'gift',
    },
  ];

  const gestureOpacity = useRef(new Animated.Value(1)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadTodaysData();
  }, []);

  const loadTodaysData = async () => {
    try {
      setIsLoading(true);

      const gesture = await getOrCreateTodaysGesture();
      setTodaysGesture(gesture);

      const todayStr = getDateString();
      const completion = await getDailyCompletion(todayStr);

      if (completion?.completed) {
        setIsCompleted(true);
        const randomPhrase =
          COMPLETION_PHRASES[Math.floor(Math.random() * COMPLETION_PHRASES.length)];
        setCompletionPhrase(randomPhrase);
      }

      setCanUndo(canUndoToday());

      const streak = await calculateStreak();
      setTasksCompleted(streak);
      await saveStreak(streak);

      setIsLoading(false);

      if (completion?.completed) {
        gestureOpacity.setValue(0);
        messageOpacity.setValue(1);
      } else {
        gestureOpacity.setValue(1);
        messageOpacity.setValue(0);
      }
    } catch (error) {
      console.error("Error loading today's data:", error);
      setIsLoading(false);
    }
  };

  const handleMarkDone = async () => {
    try {
      Animated.timing(gestureOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(async () => {
        const randomPhrase =
          COMPLETION_PHRASES[Math.floor(Math.random() * COMPLETION_PHRASES.length)];
        setCompletionPhrase(randomPhrase);
        setIsCompleted(true);

        try {
          const todayStr = getDateString();
          const gestureId = (todaysGesture as Gesture).id;
          await saveDailyCompletion(todayStr, gestureId, true);
          const newStreak = await calculateStreak();
          setTasksCompleted(newStreak);
          await saveStreak(newStreak);
          setCanUndo(canUndoToday());
        } catch (persistError) {
          console.error('Persist error:', persistError);
        }

        messageOpacity.setValue(0);
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error('Error marking done:', error);
    }
  };

  const handleUndo = async () => {
    try {
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(async () => {
        setIsCompleted(false);
        setCompletionPhrase('');

        try {
          const todayStr = getDateString();
          const gestureId = (todaysGesture as Gesture).id;
          await saveDailyCompletion(todayStr, gestureId, false);
          const newStreak = await calculateStreak();
          setTasksCompleted(newStreak);
          await saveStreak(newStreak);
        } catch (persistError) {
          console.error('Persist error:', persistError);
        }

        gestureOpacity.setValue(0);
        Animated.timing(gestureOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error('Error undoing:', error);
    }
  };

  const handlePlanPress = () => {
    router.push('/ChatPage');
  };

  // Keep handleLogout function in case Profile screen needs it
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/Splash?fromLogout=1");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screenFull}>
        <HomeHeader
          tasksCompleted={tasksCompleted}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screenFull}>
      <HomeHeader
        tasksCompleted={tasksCompleted}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* Removed the logout button completely */}

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {!isCompleted ? (
          <Animated.View style={{ opacity: gestureOpacity }}>
            <TodaysGesture
              gesture={todaysGesture}
              onPlanPress={handlePlanPress}
              onMarkDone={handleMarkDone}
            />
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: messageOpacity }}>
            <CompletionMessage
              gesture={todaysGesture}
              phrase={completionPhrase}
              visible={isCompleted}
              onUndo={handleUndo}
              canUndo={canUndo}
            />
          </Animated.View>
        )}

        <UpcomingMoments
          moments={upcomingMoments}
          onDetails={() => {}}
          onEdit={() => {}}
          onMenu={() => {}}
        />
        <LovelyTips />
        <RecentMoments />
      </ScrollView>

      {/* Floating Flame */}
      <View style={styles.flameContainer}>
        <TouchableOpacity
          onPress={() => router.push('/ChatPage')}
          activeOpacity={0.8}
          style={styles.floatingFlame}
        >
          <Image
            source={require('../../assets/images/flame.png')}
            style={{ width: 38, height: 38 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ORANGE = '#FF8C00';

const styles = StyleSheet.create({
  screenFull: { flex: 1, width: '100%' },
  scrollContent: { flex: 1 },
  contentContainer: { flexGrow: 1 },

  flameContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    zIndex: 999,
  },
  floatingFlame: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 8,
  },
});

export default HomeScreen;
