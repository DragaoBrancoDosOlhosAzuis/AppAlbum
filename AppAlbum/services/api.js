// Serviço centralizado para API
const BASE_URL = "http://10.110.12.26:3000";

export const apiService = {
  // GET - Buscar todas as fotos
  async getPhotos() {
    const response = await fetch(`${BASE_URL}/photos`);
    if (!response.ok) throw new Error("Erro ao carregar fotos");
    return await response.json();
  },

  // POST - Adicionar nova foto
  async addPhoto(photoData) {
    const response = await fetch(`${BASE_URL}/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photoData),
    });
    if (!response.ok) throw new Error("Erro ao salvar foto");
    return await response.json();
  },

  // PUT - Atualizar foto
  async updatePhoto(id, photoData) {
    const response = await fetch(`${BASE_URL}/photos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photoData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar foto");
    return await response.json();
  },

  // DELETE - Remover foto
  async deletePhoto(id) {
    const response = await fetch(`${BASE_URL}/photos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar foto");
    return await response.json();
  },
};