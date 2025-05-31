import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const EmptyContactsList: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text variant="headlineSmall">No contacts found</Text>
      <Text variant="bodyLarge">Add your first contact</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
