import { Conteiner } from "@/components/conteiner";
import { H1 } from "@/components/text/headings";
import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  return (
    <Conteiner>
      <Conteiner.Box>
        <MaterialCommunityIcons
          size={36}
          name="crown-outline"
          color={colors.primary["400"]}
        />
        <H1>COSAGRADO</H1>
      </Conteiner.Box>
    </Conteiner>
  );
}
