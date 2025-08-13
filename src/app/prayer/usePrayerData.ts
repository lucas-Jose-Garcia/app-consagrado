import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { DataPrayersProps, getPrayer, getPrayers } from "@/data/prayers";
import { GroupMysteriesProps, getRosary } from "@/data/rosary";
import { DataConsecrationProps, getStageConsecration } from "@/data/consecration";
import { PrayersProps } from "@/data/global";

export function usePrayerData() {
  const { id, type, current } = useLocalSearchParams<{
    id: string;
    type?: "simple" | "rosary" | "consecration";
    current?: "ativo" | "inativo";
  }>();

  const [player, setPlayer] = useState<DataPrayersProps | null>(null);
  const [rosary, setRosary] = useState<GroupMysteriesProps | null>(null);
  const [consecration, setConsecration] = useState<DataConsecrationProps | null>(null);
  const [infoConsecration, setInfoConsecration] = useState<PrayersProps[] | null>(null);
  const [cover, setCover] = useState<{ image: string; title: string } | null>(null);
  const [youtubeId, setYoutubeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          setIsLoading(true);
          setError(null);

          if (!id) {
            setError("ID não fornecido");
            return;
          }

          if (type === "simple") {
            const data = getPrayer(id);
            if (!data) {
              setError("Oração não encontrada");
              return;
            }
            setPlayer(data);
            setCover({ image: data.image, title: data.title });
          }

          if (type === "rosary") {
            const data = getRosary(id);
            if (!data) {
              setError("Rosário não encontrado");
              return;
            }
            setRosary(data);
            setCover({ image: data.image, title: data.title });
          }

          if (type === "consecration") {
            const data = getStageConsecration(id);
            if (!data) {
              setError("Consagração não encontrada");
              return;
            }
            setConsecration(data);
            setCover({ image: data.image, title: data.title });

            const players = data.prayers.map((x) => x.prayerId);
            const info = getPrayers(players);
            setInfoConsecration(info);
          }
        } catch (err) {
          setError("Erro ao carregar dados");
          console.error("Erro ao carregar dados:", err);
        } finally {
          setIsLoading(false);
        }
      }

      loadData();
    }, [id, type])
  );

  function toggleYoutube(id: string) {
    setYoutubeId((prevState) => (prevState === id ? "" : id));
  }

  return {
    id,
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
  };
}
