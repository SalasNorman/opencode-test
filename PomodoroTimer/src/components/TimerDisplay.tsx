import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/formatTime';

interface TimerDisplayProps {
  timeLeft: number;
  color: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, color }) => {
  return (
    <Text style={[styles.timer, { color }]}>
      {formatTime(timeLeft)}
    </Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 72,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
  },
});

export default TimerDisplay;
