import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

export default function PhotoPreview({ photo, onRetake, onSave }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.previewImage} />
      
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Tirar Outra Foto" onPress={onRetake} />
        </View>
        
        <View style={styles.button}>
          <Button title="Salvar Foto" onPress={onSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  previewImage: {
    flex: 1,
    resizeMode: "contain",
  },
  buttonsContainer: {
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
});