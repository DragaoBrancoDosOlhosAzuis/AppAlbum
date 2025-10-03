import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { apiService } from "../services/api";

export default function PhotoListScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ titulo: "", descricao: "" });

  // Carregar fotos
  const loadPhotos = async () => {
    try {
      const photosData = await apiService.getPhotos();
      setPhotos(photosData);
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
      Alert.alert("Erro", "Não foi possível carregar as fotos");
    }
  };

  // Recarregar quando a tela ganhar foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadPhotos);
    return unsubscribe;
  }, [navigation]);

  // Deletar foto
  const handleDeletePhoto = async (id) => {
    try {
      await apiService.deletePhoto(id);
      loadPhotos();
      Alert.alert("Sucesso", "Foto deletada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a foto");
    }
  };

  // Iniciar edição
  const startEditing = (photo) => {
    setEditingId(photo.id);
    setEditForm({
      titulo: photo.titulo_foto,
      descricao: photo.descricao_foto,
    });
  };

  // Cancelar edição
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ titulo: "", descricao: "" });
  };

  // Salvar edição
  const saveEditing = async (id) => {
    try {
      const photoToUpdate = photos.find(photo => photo.id === id);
      const updatedPhoto = {
        ...photoToUpdate,
        titulo_foto: editForm.titulo,
        descricao_foto: editForm.descricao,
      };

      await apiService.updatePhoto(id, updatedPhoto);
      
      setEditingId(null);
      setEditForm({ titulo: "", descricao: "" });
      loadPhotos();
      
      Alert.alert("Sucesso", "Foto atualizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a foto");
    }
  };

  // Renderizar item da lista
  const renderPhotoItem = ({ item }) => (
    <View style={styles.photoCard}>
      <Image source={{ uri: item.uri }} style={styles.photoImage} />
      
      {editingId === item.id ? (
        // Modo edição
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            value={editForm.titulo}
            onChangeText={(text) => setEditForm(prev => ({ ...prev, titulo: text }))}
            placeholder="Título da foto"
          />
          <TextInput
            style={styles.input}
            value={editForm.descricao}
            onChangeText={(text) => setEditForm(prev => ({ ...prev, descricao: text }))}
            placeholder="Descrição da foto"
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() => saveEditing(item.id)}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={cancelEditing}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Modo visualização
        <View style={styles.photoInfo}>
          <Text style={styles.photoTitle}>{item.titulo_foto}</Text>
          <Text style={styles.photoDescription}>{item.descricao_foto}</Text>
          <Text style={styles.photoDate}>
            {new Date(item.data_foto).toLocaleDateString()}
          </Text>
          
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => startEditing(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => handleDeletePhoto(item.id)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={styles.addButtonText}>+ Nova Foto</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPhotoItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    alignItems: "center",
    margin: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContent: {
    padding: 10,
  },
  photoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  photoImage: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  photoInfo: {
    padding: 5,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  photoDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  photoDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editForm: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFA000",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#9E9E9E",
  },
});