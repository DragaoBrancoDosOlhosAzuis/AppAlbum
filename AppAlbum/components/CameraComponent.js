import React, { useState, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import CameraControls from "./CameraControls";
import PhotoPreview from "./PhotoPreview";

export default function CameraComponent({ onPhotoCaptured, onSavePhoto }) {
  const [facing, setFacing] = useState("back");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  // Solicitar permissão ao montar o componente
  React.useEffect(() => {
    requestPermission();
  }, []);

  // Verificar permissões
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Precisamos da sua permissão para usar a câmera
        </Text>
        <Button title="Conceder Permissão" onPress={requestPermission} />
      </View>
    );
  }

  // Alternar entre câmera frontal e traseira
  const toggleCameraFacing = () => {
    setFacing(current => (current === "back" ? "front" : "back"));
  };

  // Capturar foto
  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
      onPhotoCaptured?.(photo);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível capturar a foto");
    }
  };

  // Salvar foto
  const handleSavePhoto = async () => {
    if (!capturedPhoto) return;

    try {
      await onSavePhoto(capturedPhoto);
      setCapturedPhoto(null);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a foto");
    }
  };

  // Retornar para a câmera
  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  // Renderizar preview da foto ou câmera
  if (capturedPhoto) {
    return (
      <PhotoPreview
        photo={capturedPhoto}
        onRetake={retakePhoto}
        onSave={handleSavePhoto}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <CameraControls
          onFlipCamera={toggleCameraFacing}
          onTakePicture={takePicture}
        />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});