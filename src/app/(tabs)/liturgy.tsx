import { Conteiner } from "@/components/conteineres/conteiner";
import { CardReading, ReadingsOptions } from "@/components/liturgy/cardReading";
import { ResponseLiturgyProps, useLiturgy } from "@/hooks/liturgy";
import { colors } from "@/styles/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const LEITURAS: ReadingsOptions[] = ["1ª Leitura", "Salmo", "2ª Leitura", "Evangelho"];

const Tab = createMaterialTopTabNavigator();

export default function Liturgy() {
  const { getLiturgy } = useLiturgy();
  const [readings, setReadings] = useState<ReadingsOptions[]>([]);
  const [data, setData] = useState<ResponseLiturgyProps | null>(null);
  const [currentReading, setCurrentReading] = useState<string>(LEITURAS[0]);

  function handleSelectReading(reading: string) {
    setCurrentReading(reading);
  }

  async function updateLiturgy() {
    const { response, listReadings } = await getLiturgy();

    setData(response);
    setReadings(listReadings);
  }

  useFocusEffect(
    useCallback(() => {
      updateLiturgy();
    }, [])
  );

  const FirstReading = () => <CardReading title="1ª Leitura" data={data?.primeiraLeitura} />;
  const Psalm = () => <CardReading title="1ª Leitura" data={data?.salmo} />;
  const SecondReading = () => (
    <CardReading title="1ª Leitura" data={typeof data?.segundaLeitura != "string" ? data?.segundaLeitura : undefined} />
  );
  const Gospel = () => <CardReading title="1ª Leitura" data={data?.evangelho} />;

  return (
    <Conteiner>
      <Conteiner.Header icone="book-outline" title="Liturgia" />
      <NavigationContainer independent>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorContainerStyle: {
              backgroundColor: colors.gray["900"],
            },
            tabBarActiveTintColor: colors.primary["400"],
            tabBarInactiveTintColor: colors.gray["200"],
            tabBarIndicatorStyle: {
              backgroundColor: colors.primary["400"],
            },
          }}
        >
          <Tab.Screen name="1ª Leitura" component={FirstReading} />
          <Tab.Screen name="Salmo" component={Psalm} />
          {data && typeof data.segundaLeitura !== "string" && (
            <Tab.Screen name="2ª Leitura" component={SecondReading} />
          )}
          <Tab.Screen name="Evangelho" component={Gospel} />
        </Tab.Navigator>
      </NavigationContainer>
    </Conteiner>
  );
}
