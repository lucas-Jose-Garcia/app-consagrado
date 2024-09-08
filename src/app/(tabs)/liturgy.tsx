import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack } from "@/components/conteineres/stacks";
import { CardReading } from "@/components/liturgy/cardReading";
import { H3 } from "@/components/text/headings";
import { ResponseLiturgyProps, useLiturgy } from "@/hooks/liturgy";
import { colors } from "@/styles/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { format } from "date-fns";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const Tab = createMaterialTopTabNavigator();

export default function Liturgy() {
  const { getLiturgy } = useLiturgy();
  const [data, setData] = useState<ResponseLiturgyProps | null>(null);

  async function updateLiturgy() {
    const { response } = await getLiturgy();

    setData(response);
  }

  useFocusEffect(
    useCallback(() => {
      updateLiturgy();
    }, [])
  );

  const FirstReading = () => <CardReading title="1ª Leitura" data={data?.primeiraLeitura} />;
  const Psalm = () => <CardReading title="Salmo" data={data?.salmo} />;
  const SecondReading = () => (
    <CardReading title="2ª Leitura" data={typeof data?.segundaLeitura != "string" ? data?.segundaLeitura : undefined} />
  );
  const Gospel = () => <CardReading title="Evangelho" data={data?.evangelho} />;

  const formattedDate = format(new Date(), "dd.MM.yyyy");

  return (
    <Conteiner>
      <Conteiner.Header icone="book-outline" title="Liturgia" />
      <XStack className="w-100 justify-center pb-3 -mt-3">
        <H3 className="text-gray-400">{formattedDate}</H3>
      </XStack>
      <NavigationContainer independent>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorContainerStyle: {
              backgroundColor: colors.gray["900"],
            },
            tabBarLabelStyle: { fontSize: 12 },
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
