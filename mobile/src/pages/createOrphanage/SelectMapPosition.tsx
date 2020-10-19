import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../images/Icon.png";

export default function SelectMapPosition() {
  const navigation = useNavigation();
  // Para definir o tipo que está sendo manipulado:
  // Quando quer receber -> useState<Interface>
  // Quando quer setar -> useState({obj})
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function setPositionOnMap(event: MapEvent) {
    // Salva a latitude e longitude que o usuário clicou
    setPosition(event.nativeEvent.coordinate);
    console.log(position.latitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={setPositionOnMap} // Função para setar o marker no local clicado. NÃO FUNCIONA COM ARROW FUNC.
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton
          style={styles.nextButton}
          onPress={() => navigation.navigate("OrphanageData", position)}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: "nunito800",
    fontSize: 16,
    color: "#FFF",
  },
});
