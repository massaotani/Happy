import React from "react";

// Para usar as fonts do google-fonts
import { useFonts } from "expo-font";

// Tamanhos da fonte que se quer utilizar
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    nunito600: Nunito_600SemiBold,
    nunito700: Nunito_700Bold,
    nunito800: Nunito_800ExtraBold
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <Routes/>
  );
}