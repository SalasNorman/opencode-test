import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { DURATIONS, DurationKey } from '../constants/durations';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const STORAGE_KEY = '@pomodoro_settings';

const defaultSettings: TimerSettings = {
  work: DURATIONS.work,
  shortBreak: DURATIONS.shortBreak,
  longBreak: DURATIONS.longBreak,
};

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState(1);
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [totalTime, setTotalTime] = useState(DURATIONS.work);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notificationShown = useRef(false);

  useEffect(() => {
    loadSettings();
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    setTotalTime(settings[mode]);
    if (!isRunning) {
      setTimeLeft(settings[mode]);
    }
  }, [mode, settings]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const requestNotificationPermissions = async () => {
    if (!Device.isDevice) return;
    
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Notification permission not granted');
    }
  };

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalizedSettings: TimerSettings = {
          work: parsed.work < 60 ? parsed.work * 60 : parsed.work,
          shortBreak: parsed.shortBreak < 60 ? parsed.shortBreak * 60 : parsed.shortBreak,
          longBreak: parsed.longBreak < 60 ? parsed.longBreak * 60 : parsed.longBreak,
        };
        setSettings(normalizedSettings);
        setTimeLeft(normalizedSettings[mode]);
        setTotalTime(normalizedSettings[mode]);
      } else {
        setTimeLeft(defaultSettings[mode]);
        setTotalTime(defaultSettings[mode]);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setTimeLeft(defaultSettings[mode]);
      setTotalTime(defaultSettings[mode]);
    }
  };

  const saveSettings = async (newSettings: TimerSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const sendNotification = async (title: string, body: string) => {
    if (!Device.isDevice) return;
    
    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: true },
      trigger: null,
    });
  };

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    notificationShown.current = false;
    
    const sessionText = mode === 'work' ? `Session ${session}` : 'Break';
    const nextModeText = mode === 'work' ? 'Time for a break!' : 'Time to work!';
    
    sendNotification('Pomodoro Timer', `${sessionText} complete! ${nextModeText}`);

    if (mode === 'work') {
      if (session >= DURATIONS.sessionsBeforeLongBreak) {
        setMode('longBreak');
        setTimeLeft(settings.longBreak);
        setTotalTime(settings.longBreak);
        setSession(1);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreak);
        setTotalTime(settings.shortBreak);
      }
    } else {
      if (mode === 'shortBreak' && session < DURATIONS.sessionsBeforeLongBreak) {
        setSession((prev) => prev + 1);
      }
      setMode('work');
      setTimeLeft(settings.work);
      setTotalTime(settings.work);
    }
  }, [mode, session, settings]);

  const start = () => {
    if (timeLeft === 0) {
      reset();
    }
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(settings[mode]);
    notificationShown.current = false;
  };

  const skipToNext = () => {
    handleTimerComplete();
  };

  const updateSettings = (newSettings: TimerSettings) => {
    saveSettings(newSettings);
    if (!isRunning) {
      setTimeLeft(newSettings[mode]);
    }
    setTotalTime(newSettings[mode]);
  };

  const convertToMinutes = (s: TimerSettings): TimerSettings => ({
    work: Math.round(s.work / 60),
    shortBreak: Math.round(s.shortBreak / 60),
    longBreak: Math.round(s.longBreak / 60),
  });

  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  return {
    mode,
    timeLeft,
    isRunning,
    session,
    progress,
    settings: convertToMinutes(settings),
    start,
    pause,
    reset,
    skipToNext,
    updateSettings,
    setMode: (newMode: TimerMode) => {
      setMode(newMode);
      setIsRunning(false);
      const newTime = settings[newMode];
      setTimeLeft(newTime);
      setTotalTime(newTime);
    },
  };
};
