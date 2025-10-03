import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import CameraScreen from "./screens/CameraScreen";
import PhotoListScreen from "./screens/PhotoListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="PhotoList">
        <Stack.Screen 
          name="PhotoList" 
          component={PhotoListScreen} 
          options={{ title: "Meu Álbum de Fotos" }} 
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ title: "Tirar Foto" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}