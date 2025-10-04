import react from react
import { view, image, button, stylesheet } from react-native

export default function photopreview({ photo, onretake, onsave }) {
  return (
    <view style={styles.container}>
      // mostra a foto tirada
      <image source={{ uri: photo.uri }} style={styles.previewimage} />
      
      <view style={styles.buttonscontainer}>
        <view style={styles.button}>
          // botao para tirar outra foto
          <button title="tirar outra foto" onpress={onretake} />
        </view>
        
        <view style={styles.button}>
          // botao para salvar foto
          <button title="salvar foto" onpress={onsave} />
        </view>
      </view>
    </view>
  )
}

const styles = stylesheet.create({
  container: {
    flex: 1,
    justifycontent: "center", // centraliza vertical
  },
  previewimage: {
    flex: 1,
    resizemode: "contain", // ajusta imagem sem cortar
  },
  buttonscontainer: {
    padding: 20,
  },
  button: {
    marginvertical: 5, // espaco entre botoes
  },
})
