import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DURATIONS } from '../constants/durations';

interface SessionIndicatorProps {
  session: number;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
}

const SessionIndicator: React.FC<SessionIndicatorProps> = ({ 
  session, 
  primaryColor,
  backgroundColor,
  textColor 
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.modeLabel, { color: textColor }]}>
        Session {session}/{DURATIONS.sessionsBeforeLongBreak}
      </Text>
      <View style={styles.dotsContainer}>
        {Array.from({ length: DURATIONS.sessionsBeforeLongBreak }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index < session ? primaryColor : backgroundColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  modeLabel: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default SessionIndicator;
