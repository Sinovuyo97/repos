import { Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Coachmark } from "@sinovuyo97/react-native-snowcoach";
import React from "react";

export default function HomeScreen() {
  const [step, setStep] = React.useState(0); // Track which coachmark is visible

  return (
    <ThemedView style={styles.stepContainer}>
      <Button title="Step 1" onPress={() => setStep(1)} />

      <Button title="Step 2" onPress={() => setStep(2)} />
      <Coachmark
        visible={step === 0}
        onHide={() => setStep(3)} // Hide after last step
        tooltipText="Final step, you're done!"
      >
        <Button title="Step 3" onPress={() => setStep(3)} />
      </Coachmark>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
