import React from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import CameraComponent from "../components/CameraComponent";
import { apiService } from "../services/api";

export default function CameraScreen() {
  // Salvar foto no servidor
  const handleSavePhoto = async (photo) => {
    try {
      // Criar nome único para a foto
      const fileName = `photo_${Date.now()}.jpg`;
      const newPath = FileSystem.documentDirectory + fileName;
      
      // Mover foto do cache temporário para armazenamento persistente
      await FileSystem.moveAsync({
        from: photo.uri,
        to: newPath,
      });

      // Criar objeto da foto
      const photoData = {
        titulo_foto: "Sem Título",
        descricao_foto: "",
        data_foto: new Date().toISOString(),
        uri: newPath,
      };

      // Salvar no JSON Server
      await apiService.addPhoto(photoData);
      
      Alert.alert("Sucesso", "Foto salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar foto:", error);
      Alert.alert("Erro", "Não foi possível salvar a foto");
    }
  };

  return (
    <CameraComponent onSavePhoto={handleSavePhoto} />
  );
}