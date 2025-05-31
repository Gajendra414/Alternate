import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="headlineSmall">{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
