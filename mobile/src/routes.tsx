import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import das páginas para serem linkadas
import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import SelectMapPosition from "./pages/createOrphanage/SelectMapPosition";
import OrphanageData from "./pages/createOrphanage/OrphanageData";
import Header from "./components/Header";

// Navegador: precisa ficar em todas as telas
// Screen: uma tela
const { Navigator, Screen } = createStackNavigator();

//Nao esquecer de importar no App.tsx
export default function Routes() {
  return (
    // screenOptions: Estilização da tela
    // headerShown: false: Desabilita o header em todas as páginas
    // Caso queira desabilitar em uma página: <Screen ... options={{ headerShown: false }} />
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#F2F3F5" },
        }}
      >
        <Screen name="OrphanagesMap" component={OrphanagesMap} />

        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            // Se as propriedades da Tag que representa uma View derem erro,
            // adicioná-las na Interface do componente ou pág.
            header: () => <Header showCancel={false} title={"Detalhes do Orfanato"} />,
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            // Se as propriedades da Tag que representa uma View derem erro,
            // adicioná-las na Interface do componente ou pág.
            header: () => <Header title={"Selecione no mapa"} />,
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            // Se as propriedades da Tag que representa uma View derem erro,
            // adicioná-las na Interface do componente ou pág.
            header: () => <Header title={"Informe os dados"} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
