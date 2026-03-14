import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onSave: (settings: TimerSettings) => void;
  primaryColor: string;
  backgroundColor: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  settings,
  onSave,
  primaryColor,
  backgroundColor,
}) => {
  const [localSettings, setLocalSettings] = useState<TimerSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, visible]);

  const handleSave = () => {
    const newSettings = {
      work: localSettings.work * 60,
      shortBreak: localSettings.shortBreak * 60,
      longBreak: localSettings.longBreak * 60,
    };
    onSave(newSettings);
    onClose();
  };

  const minutesToInput = (minutes: number): string => {
    return minutes.toString();
  };

  const inputToMinutes = (value: string): number => {
    const num = parseInt(value, 10);
    return isNaN(num) ? 0 : num;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View style={[styles.modal, { backgroundColor: COLORS.white }]}>
                <Text style={[styles.title, { color: primaryColor }]}>
                  Settings
                </Text>

                <View style={styles.settingRow}>
                  <Text style={[styles.label, { color: COLORS.black }]}>
                    Work (minutes)
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: backgroundColor,
                        color: COLORS.black,
                      },
                    ]}
                    value={minutesToInput(localSettings.work)}
                    onChangeText={(text) =>
                      setLocalSettings({
                        ...localSettings,
                        work: inputToMinutes(text),
                      })
                    }
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>

                <View style={styles.settingRow}>
                  <Text style={[styles.label, { color: COLORS.black }]}>
                    Short Break (minutes)
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: backgroundColor,
                        color: COLORS.black,
                      },
                    ]}
                    value={minutesToInput(localSettings.shortBreak)}
                    onChangeText={(text) =>
                      setLocalSettings({
                        ...localSettings,
                        shortBreak: inputToMinutes(text),
                      })
                    }
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>

                <View style={styles.settingRow}>
                  <Text style={[styles.label, { color: COLORS.black }]}>
                    Long Break (minutes)
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: backgroundColor,
                        color: COLORS.black,
                      },
                    ]}
                    value={minutesToInput(localSettings.longBreak)}
                    onChangeText={(text) =>
                      setLocalSettings({
                        ...localSettings,
                        longBreak: inputToMinutes(text),
                      })
                    }
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>

                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onClose}
                  >
                    <Text style={[styles.buttonText, { color: COLORS.gray.dark }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.saveButton,
                      { backgroundColor: primaryColor },
                    ]}
                    onPress={handleSave}
                  >
                    <Text style={[styles.buttonText, { color: COLORS.white }]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 320,
    padding: 24,
    borderRadius: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.gray.light,
  },
  saveButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsModal;
