import react from react
import { alert } from react-native
import * as filesystem from expo-file-system/legacy
import cameracomponent from ../components/cameracomponent
import { apiservice } from ../services/api

export default function camerascreen() {
  // funcao para salvar foto
  const handlesavephoto = async (photo) => {
    try {
      // cria nome unico pra foto
      const filename = `photo_${Date.now()}.jpg`
      const newpath = filesystem.documentdirectory + filename
      
      // move foto do cache temporario pro armazenamento
      await filesystem.moveasync({
        from: photo.uri,
        to: newpath,
      })

      // objeto com info da foto
      const photodata = {
        titulo_foto: "sem titulo",
        descricao_foto: "",
        data_foto: new Date().toISOString(),
        uri: newpath,
      }

      // salva no servidor
      await apiservice.addphoto(photodata)
      
      alert.alert("sucesso", "foto salva com sucesso!")
    } catch (error) {
      console.error("erro ao salvar foto:", error)
      alert.alert("erro", "nao foi possivel salvar a foto")
    }
  }

  return (
    // renderiza camera component passando funcao de salvar
    <cameracomponent onsavephoto={handlesavephoto} />
  )
}
