import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
  permissionGranted: boolean;
  onRequestPermissions: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  permissionGranted,
  onRequestPermissions,
}) => {
  if (!permissionGranted) {
    return (
      <View style={styles.centerContent}>
        <Text variant="headlineSmall">Permission Required</Text>
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          This app needs permission to access contacts and phone state.
        </Text>
        <Button
          icon="refresh"
          onPress={onRequestPermissions}
          mode="contained"
          labelStyle={{ fontSize: 16 }}
          style={{ paddingVertical: 5, borderRadius: 50 }}
        >
          Grant Permissions
        </Button>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
        <Button
          icon="refresh"
          onPress={onRetry}
          mode="contained"
          labelStyle={{ fontSize: 16 }}
          style={{ paddingVertical: 5, borderRadius: 50 }}
        >
          Retry
        </Button>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    padding: 16,
  },
});
