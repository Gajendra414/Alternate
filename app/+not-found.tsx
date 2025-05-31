import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Page Not Found
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          The page you're looking for doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Button mode="contained" style={styles.button}>
            Go back to Home
          </Button>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 30,
    textAlign: "center",
    opacity: 0.7,
  },
  button: {
    marginTop: 10,
  },
});
