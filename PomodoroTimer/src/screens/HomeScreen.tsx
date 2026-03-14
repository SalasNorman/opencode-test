import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTimer, TimerMode } from '../hooks/useTimer';
import ProgressRing from '../components/ProgressRing';
import TimerDisplay from '../components/TimerDisplay';
import Controls from '../components/Controls';
import SessionIndicator from '../components/SessionIndicator';
import SettingsModal from '../components/SettingsModal';
import { COLORS } from '../constants/colors';

const HomeScreenContent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    mode,
    timeLeft,
    isRunning,
    session,
    progress,
    settings,
    start,
    pause,
    reset,
    skipToNext,
    updateSettings,
    setMode,
  } = useTimer();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const colors = COLORS[mode];

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Text style={[styles.settingsIcon, { color: colors.text }]}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modeSelector}>
        {(['work', 'shortBreak', 'longBreak'] as const).map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.modeButton,
              mode === m && { backgroundColor: COLORS[m].primary },
            ]}
            onPress={() => handleModeChange(m)}
          >
            <Text
              style={[
                styles.modeButtonText,
                { color: mode === m ? COLORS.white : COLORS.gray.dark },
              ]}
            >
              {m === 'work' ? 'Work' : m === 'shortBreak' ? 'Short' : 'Long'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <SessionIndicator 
          session={session} 
          primaryColor={colors.primary}
          backgroundColor={colors.background}
          textColor={colors.text}
        />

        <View style={styles.timerContainer}>
          <ProgressRing progress={progress} mode={mode} colors={colors}>
            <TimerDisplay timeLeft={timeLeft} color={colors.text} />
          </ProgressRing>
        </View>

        <Controls
          isRunning={isRunning}
          primaryColor={colors.primary}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skipToNext}
        />
      </View>

      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        settings={settings}
        onSave={updateSettings}
        primaryColor={colors.primary}
        backgroundColor={colors.background}
      />
    </SafeAreaView>
  );
};

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <HomeScreenContent />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 32,
  },
  timerContainer: {
    marginVertical: 16,
  },
});

export default HomeScreen;
