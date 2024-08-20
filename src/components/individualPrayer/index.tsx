import { colors } from "@/styles/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { PrayerText } from "../prayerText";
import { DataPrayersProps } from "@/data/prayers";

interface IndividualPrayer {
  prayer: DataPrayersProps;
  totleYoutube: (id: string) => void;
}

const Tab = createMaterialTopTabNavigator();

export function IndividualPrayer({ prayer, totleYoutube }: IndividualPrayer) {
  const PrayerTextPtBr = () => (
    <PrayerText
      content={prayer?.content["pt-br"]}
      setYoutube={() => totleYoutube(prayer?.content["pt-br"].media?.youtubeId ?? "")}
    />
  );

  const PrayerTextLa = () => (
    <PrayerText
      content={prayer?.content["la"]}
      setYoutube={() => totleYoutube(prayer?.content["la"]?.media?.youtubeId ?? "")}
    />
  );
  return prayer && prayer.content.la ? (
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
        <Tab.Screen name="Português" component={PrayerTextPtBr} />
        {prayer && prayer.content.la && <Tab.Screen name="Latim" component={PrayerTextLa} />}
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <PrayerTextPtBr />
  );
}
