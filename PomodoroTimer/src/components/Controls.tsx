import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface ControlsProps {
  isRunning: boolean;
  primaryColor: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isRunning,
  primaryColor,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.resetButton]}
        onPress={onReset}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, styles.resetText]}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: primaryColor }]}
        onPress={isRunning ? onPause : onStart}
        activeOpacity={0.8}
      >
        <Text style={styles.mainButtonText}>
          {isRunning ? 'Pause' : 'Start'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.skipButton]}
        onPress={onSkip}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, styles.skipText]}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  mainButton: {
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    minWidth: 160,
    alignItems: 'center',
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: COLORS.gray.light,
  },
  skipButton: {
    backgroundColor: COLORS.gray.light,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  resetText: {
    color: COLORS.gray.dark,
  },
  skipText: {
    color: COLORS.gray.dark,
  },
});

export default Controls;
