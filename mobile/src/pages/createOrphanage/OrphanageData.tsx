import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import api from "../../services/api";

interface OrphanagePositionParams {
  latitude: number;
  longitude: number;
}

export default function OrphanageData() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekend] = useState(true);
  const [image, setImage] = useState<string[]>([]);

  // Para pegar os parametros advindas da tela anterior.
  // Para não perder lat e long selecionados
  const route = useRoute();

  const params = route.params as OrphanagePositionParams;

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params;

    // Para passar para o servidor o objeto formado pelos inputs.
    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    image.map((img, index) => {
      // Para passar img para o servidor precisa passar um obj com 3 parâmetros, segue:
      // 'as any' no final para consertar o erro que aparece quando add as propriedades.
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: img,
      } as any);
    });

    await api.post("orphanages", data);

    navigation.navigate("OrphanagesMap");
  }

  return (
    // Switch: Funciona como um checkbox no html.
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={(txt) => setName(txt)}
        value={name}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        onChangeText={(about) => setAbout(about)}
        value={about}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} /> */}

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadImagesContainer}>
        {image.map((img) => {
          return (
            <Image
              source={{ uri: img }}
              style={styles.uploadedImage}
              key={img}
            />
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.imagesInput}
        onPress={async () => {
          const {
            status,
          } = await ImagePicker.requestCameraRollPermissionsAsync();

          if (status !== "granted") {
            alert("Eita! Precisamos de acesso às suas fotos.");
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            // permitir que o usuário edite a imagem antes de enviar.
            allowsEditing: true,
            quality: 1,
            // para pegar somente imagens e não vídeos.
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });

          if (result.cancelled) {
            return;
          }

          const { uri: img } = result;

          // Para não ter que carregar tudo do zero novamente.
          setImage([...image, img]);
        }}
      >
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        onChangeText={(inst) => setInstructions(inst)}
        value={instructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        onChangeText={(openingHours) => setOpeningHours(openingHours)}
        value={opening_hours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          onValueChange={(openOnWeekend) => setOpenOnWeekend(openOnWeekend)}
          value={open_on_weekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "nunito700",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#8fa7b3",
    fontFamily: "nunito600",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  uploadImagesContainer: {
    flexDirection: "row",
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 28,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "nunito800",
    fontSize: 16,
    color: "#FFF",
  },
});
