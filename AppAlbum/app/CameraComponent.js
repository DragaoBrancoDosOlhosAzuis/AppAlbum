import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera";

function CameraComponent({ onPhotoTaken }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => { requestPermission(); }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Preciso de permissão!</Text>
        <Button onPress={requestPermission} title="Conceder Permissão!" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
      onPhotoTaken(photo.uri); // passa a URI para o app principal
    }
  }

  return (
    <View style={styles.container}>
      {capturedPhoto ? (
        <View>
          <Image source={{ uri: capturedPhoto.uri }} style={styles.preview} />
          <Button title="Tirar outra foto" onPress={() => setCapturedPhoto(null)} />
        </View>
      ) : (
        <CameraView facing={facing} ref={cameraRef} style={styles.camera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
              <Text>Virar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Tirar</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

export default CameraComponent;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  button: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonContainer: { flex: 1, flexDirection: 'row', margin: 64 },
  text: { fontSize: 18, color: 'white' },
  preview: { width: 300, height: 400, alignSelf: 'center', margin: 20 }
});
