import react, { usestate, useref } from react
import { view, stylesheet, alert } from react-native
import { cameraview, usecamerapermissions } from expo-camera
import cameracontrols from ./cameracontrols
import photopreview from ./photopreview

export default function cameracomponent({ onphotocaptured, onsavephoto }) {
  // estado da camera (frontal ou traseira)
  const [facing, setfacing] = usestate("back")
  // foto que foi tirada
  const [capturedphoto, setcapturedphoto] = usestate(null)
  // referencia da camera
  const cameraref = useref(null)
  // permissao de usar camera
  const [permission, requestpermission] = usecamerapermissions()

  // pede permissao quando o componente monta
  react.useeffect(() => {
    requestpermission()
  }, [])

  // se nao tiver permissao ainda, mostra view vazia
  if (!permission) return <view />

  // se permissao negada, mostra mensagem
  if (!permission.granted) {
    return (
      <view style={styles.permissioncontainer}>
        <text style={styles.permissiontext}>precisamos da sua permissao para usar a camera</text>
        <button title="conceder permissao" onpress={requestpermission} />
      </view>
    )
  }

  // alterna camera frente/traseira
  const togglecamerafacing = () => {
    setfacing(current => (current === "back" ? "front" : "back"))
  }

  // tira a foto
  const takepicture = async () => {
    if (!cameraref.current) return
    try {
      const photo = await cameraref.current.takepictureasync()
      setcapturedphoto(photo)
      onphotocaptured?.(photo)
    } catch (error) {
      alert.alert("erro", "nao foi possivel capturar a foto")
    }
  }

  // salva a foto
  const handlesavephoto = async () => {
    if (!capturedphoto) return
    try {
      await onsavephoto(capturedphoto)
      setcapturedphoto(null)
    } catch (error) {
      alert.alert("erro", "nao foi possivel salvar a foto")
    }
  }

  // volta pra camera, descarta a foto tirada
  const retakephoto = () => {
    setcapturedphoto(null)
  }

  // se ja tirou foto, mostra preview
  if (capturedphoto) {
    return (
      <photopreview
        photo={capturedphoto}
        onretake={retakephoto}
        onsave={handlesavephoto}
      />
    )
  }

  // renderiza camera com controles
  return (
    <view style={styles.container}>
      <cameraview style={styles.camera} ref={cameraref} facing={facing}>
        <cameracontrols
          onflipcamera={togglecamerafacing}
          ontakepicture={takepicture}
        />
      </cameraview>
    </view>
  )
}

const styles = stylesheet.create({
  container: {
    flex: 1,
    justifycontent: "center", // centraliza vertical
  },
  camera: {
    flex: 1,
  },
  permissioncontainer: {
    flex: 1,
    justifycontent: "center",
    alignitems: "center",
    padding: 20,
  },
  permissiontext: {
    fontsize: 16,
    textalign: "center",
    marginbottom: 20,
  },
})
