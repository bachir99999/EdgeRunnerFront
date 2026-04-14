/**
 * Session Creation Component
 */

import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

interface SessionCreationProps {
  visible: boolean;
  onCreate: (name: string, description?: string) => void;
  onClose: () => void;
}

export function SessionCreation({
  visible,
  onCreate,
  onClose,
}: SessionCreationProps) {
  const colors = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name, description);
      setName("");
      setDescription("");
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      width: "85%",
      backgroundColor: colors.surface,
      borderRadius: 15,
      borderColor: colors.magenta,
      borderWidth: 2,
      overflow: "hidden",
    },
    header: {
      backgroundColor: colors.accent,
      borderBottomColor: colors.magenta,
      borderBottomWidth: 1,
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.magenta,
      textShadowColor: colors.magenta,
      textShadowRadius: 5,
    },
    content: {
      padding: 20,
    },
    label: {
      color: colors.textSecondary,
      fontSize: 14,
      marginBottom: 8,
      fontWeight: "600",
    },
    input: {
      backgroundColor: colors.background,
      borderColor: colors.magenta,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      color: colors.text,
      fontSize: 14,
      marginBottom: 15,
    },
    descriptionInput: {
      minHeight: 80,
      textAlignVertical: "top",
      paddingTop: 12,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
    },
    createButton: {
      backgroundColor: colors.magenta,
      borderColor: colors.magenta,
    },
    cancelButton: {
      backgroundColor: colors.background,
      borderColor: colors.textSecondary,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    createText: {
      color: colors.background,
    },
    cancelText: {
      color: colors.textSecondary,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Nouvelle Session</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Nom de la Session</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Upper Body"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Description (Optionnel)</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Décrivez votre session..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setName("");
                  setDescription("");
                  onClose();
                }}
              >
                <Text style={[styles.buttonText, styles.cancelText]}>
                  Annuler
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.createButton,
                  !name.trim() && { opacity: 0.5 },
                ]}
                onPress={handleCreate}
                disabled={!name.trim()}
              >
                <Text style={[styles.buttonText, styles.createText]}>
                  Créer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
