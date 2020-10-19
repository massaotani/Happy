import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
// Para trabalhar com ícones:
import { Feather } from "@expo/vector-icons";
// Se der erro, criar o @types > index.d.ts para importar o .png como módulo.
import mapMarker from "../images/Icon.png";
// Import da biblioteca de navegação de tela.
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  // Necessário para se realizar a navegação entre as páginas a partir de uma ação.
  const navigation = useNavigation();
  // Parâmetro do mesmo tipo que o const <-
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);

  // Ao inves de useEffect, usar useFocusEffect:
  // Ação disparada sempre que a dada tela receber o foco (se o usuário sair e voltar, dispara de novo, não precisa renderizar novamente)
  useFocusEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });

  // Deve-se criar uma função para navegar passando ID. Não funciona com ARROW FUNCTION!!!
  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  return (
    // View: Representa um bloco que se quer estilizar, ex: <div></div>.
    // Text: Faz a função do <p>, <h1> etc.
    // {{}}: Signifca que vai inserir um código JS e dentro desse código terá um obj.
    // tooltip: Quero criar minha estilização (do CallOut, no caso) do zero.
    // calloutAnchor: ajusta o posicionamento do callout com relação à tag que se encontra tal comando.
    // TouchableOpacity: botão que quando aperta nele, perde-se opacidade.
    // RectButton: Botão customizado de acordo com o sistema que o usuário está utilizando.
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.8,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
              >
                <View style={styles.callOutContainer}>
                  <Text style={styles.callOutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageBtn}
          onPress={() => navigation.navigate("SelectMapPosition")}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// Afeta diretamente na tag que se encontra tal constante.
// todos os elementos já tem display: 'flex'. Nao precisa adicionar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  map: {
    // Ambos width e height alinham 100% da tela
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutStyle: {
    marginHorizontal: 45,
    marginVertical: 15,
  },
  callOutContainer: {
    width: 160,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },
  callOutText: {
    color: "#0089A5",
    fontSize: 14,
    fontFamily: "nunito700",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 28,
    height: 46,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // Fazer sombra para Android
    elevation: 10,

    // Para iOS
    // shadowColor:,
    // shadowOpacity:,
    // etc
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "nunito700",
  },
  createOrphanageBtn: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d3",
    borderRadius: 28,

    justifyContent: "center",
    alignItems: "center",
  },
});
