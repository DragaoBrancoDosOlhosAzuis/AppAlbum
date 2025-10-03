import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function CameraControls({ onFlipCamera, onTakePicture }) {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity style={styles.controlButton} onPress={onFlipCamera}>
        <Text style={styles.controlText}>Virar Câmera</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.controlButton} onPress={onTakePicture}>
        <Text style={styles.controlText}>Tirar Foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  controlButton: {
    flex: 1,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});