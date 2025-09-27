import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import CameraComponent from "./CameraComponent";

const API = "http://10.110.12.39:3000/fotos";

export default function App() {
  const [fotos, setFotos] = useState([]);
  const [novaFoto, setNovaFoto] = useState({ titulo: "", descricao: "", uri: "" });

  async function carregarFotos() {
    try {
      const res = await axios.get(API);
      setFotos(res.data.reverse()); 
    } catch (err) {
      console.log("Erro ao carregar fotos:", err.message);
    }
  }

  async function adicionarFoto() {
    if (!novaFoto.uri || !novaFoto.titulo) return;
    await axios.post(API, { ...novaFoto, data_foto: new Date() });
    setNovaFoto({ titulo: "", descricao: "", uri: "" });
    carregarFotos();
  }

  async function removerFoto(id) {
    await axios.delete(`${API}/${id}`);
    carregarFotos();
  }

  useEffect(() => { carregarFotos(); }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>📸 App Álbum</Text>

      <CameraComponent onPhotoTaken={(uri) => setNovaFoto({ ...novaFoto, uri })} />

      {novaFoto.uri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: novaFoto.uri }} style={styles.preview} />
        </View>
      )}

      <TextInput
        placeholder="Título da foto"
        value={novaFoto.titulo}
        onChangeText={(t) => setNovaFoto({ ...novaFoto, titulo: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={novaFoto.descricao}
        onChangeText={(t) => setNovaFoto({ ...novaFoto, descricao: t })}
        style={[styles.input, { height: 60 }]}
        multiline
      />
      <Button title="Adicionar Foto" onPress={adicionarFoto} color="#4CAF50" />

      <Text style={styles.subtitulo}>Minhas Fotos</Text>
      <FlatList
        data={fotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.uri }} style={styles.img} />
            <View style={styles.cardTexto}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text style={styles.data}>{new Date(item.data_foto).toLocaleString()}</Text>
              <Button title="Remover" color="#E53935" onPress={() => removerFoto(item.id)} />
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f0f0f0" },
  titulo: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#333" },
  subtitulo: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff"
  },
  previewContainer: {
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden"
  },
  preview: { width: 300, height: 200 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3
  },
  img: { width: 100, height: 100 },
  cardTexto: { flex: 1, padding: 10 },
  cardTitulo: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  data: { fontSize: 10, color: "#888", marginVertical: 5 }
});
