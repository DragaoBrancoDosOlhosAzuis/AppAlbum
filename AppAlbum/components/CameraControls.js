import react from react
import { touchableopacity, text, view, stylesheet } from react-native

export default function cameracontrols({ onflipcamera, ontakepicture }) {
  return (
    <view style={styles.controlscontainer}>
      // botao para virar camera
      <touchableopacity style={styles.controlbutton} onpress={onflipcamera}>
        <text style={styles.controltext}>virar camera</text>
      </touchableopacity>
      
      // botao para tirar foto
      <touchableopacity style={styles.controlbutton} onpress={ontakepicture}>
        <text style={styles.controltext}>tirar foto</text>
      </touchableopacity>
    </view>
  )
}

const styles = stylesheet.create({
  controlscontainer: {
    flex: 1,
    flexdirection: "row", // organiza botoes lado a lado
    backgroundcolor: "transparent",
    margin: 64,
  },
  controlbutton: {
    flex: 1,
    alignitems: "center", // centraliza horizontal
    alignself: "flex-end", // posiciona no final
  },
  controltext: {
    fontsize: 18,
    fontweight: "bold",
    color: "#fff", // texto branco
  },
})
