import { useMemo } from "react";
import { Text, ActivityIndicator } from "react-native";
import { Conteiner } from "@/components/conteineres/conteiner";
import { IndividualPrayer } from "@/components/individualPrayer";
import { RosaryDetails } from "@/components/rosaryDetails";
import { ConsecrationDetails } from "@/components/consecrationDetails";
import { Conver } from "@/components/cover";
import { usePrayerData } from "./usePrayerData";
import { Message } from "@/components/message/Message";

type PrayerType = "simple" | "rosary" | "consecration";
type CurrentStatus = "ativo" | "inativo";

export default function Prayer() {
  const {
    type,
    current,
    player,
    rosary,
    consecration,
    infoConsecration,
    cover,
    youtubeId,
    toggleYoutube,
    isLoading,
    error,
  } = usePrayerData();

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <Conteiner.Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
          <Text className="text-gray-100 mt-4">Carregando...</Text>
        </Conteiner.Box>
      );
    }

    if (error) {
      return <Message message={error} />;
    }

    switch (type as PrayerType) {
      case "simple":
        if (!player) return <Message message="Oração não encontrada" />;
        return <IndividualPrayer prayer={player} totleYoutube={toggleYoutube} />;

      case "rosary":
        if (!rosary) return <Message message="Rosário não encontrado" />;
        return <RosaryDetails rosary={rosary} id={rosary.id} />;

      case "consecration":
        if (!consecration || !infoConsecration) {
          return <Message message="Consagração não encontrada" />;
        }
        return (
          <ConsecrationDetails
            consecration={consecration}
            infoConsecration={infoConsecration}
            current={(current as CurrentStatus) === "ativo"}
          />
        );

      default:
        return <Message message="Tipo de oração não reconhecido" />;
    }
  }, [type, current, player, rosary, consecration, infoConsecration, toggleYoutube, isLoading, error]);

  return (
    <Conteiner>
      {cover && <Conver image={cover.image} title={cover.title} youtubeId={youtubeId} />}
      {renderContent}
    </Conteiner>
  );
}
