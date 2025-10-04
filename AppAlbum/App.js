// Guilhermi Enrique da Silva & Hugo de Oliveira


import react from react
import { navigationcontainer } from @react-navigation/native
import { createnativestacknavigator } from @react-navigation/native-stack
import { statusbar } from expo-status-bar

import camerascreen from ./screens/camerascreen
import photolistscreen from ./screens/photolistscreen

const stack = createnativestacknavigator()

export default function app() {
  return (
    // container da navegacao
    <navigationcontainer>
      <statusbar style="auto" />
      <stack.navigator initialroutename="photolist">
        // tela do album de fotos
        <stack.screen 
          name="photolist" 
          component={photolistscreen} 
          options={{ title: "meu album de fotos" }} 
        />
        // tela da camera
        <stack.screen 
          name="camera" 
          component={camerascreen} 
          options={{ title: "tirar foto" }} 
        />
      </stack.navigator>
    </navigationcontainer>
  )
}
