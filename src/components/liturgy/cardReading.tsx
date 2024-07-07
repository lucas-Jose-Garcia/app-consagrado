import { ItemLiturgyProps } from "@/hooks/liturgy";
import { Card } from "../card/Card";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";

export type ReadingsOptions =
  | "1ª Leitura"
  | "Salmo"
  | "2ª Leitura"
  | "Evangelho";

interface CardReadingProps {
  title: ReadingsOptions;
  data: ItemLiturgyProps;
  VisibleCardTitle: string;
}

export function CardReading({
  title,
  data,
  VisibleCardTitle,
}: CardReadingProps) {
  if (title !== VisibleCardTitle) {
    return;
  }

  const completion =
    title == "Evangelho" ? "- Palavra da Salvação." : "- Palavra do Senhor.";
  const finalAnwser =
    title == "Evangelho" ? "- Glória a vós, Senhor." : "- Graças a Deus.";

  return (
    <Card>
      <H2>{title}</H2>
      <Paragraph text={data.referencia} />
      {data.titulo && (
        <Paragraph className="pt-3 pb-2 text-lg" text={data.titulo} />
      )}
      {data.refrao && (
        <>
          <Paragraph className="pt-3 pb-2 text-lg" text={data.refrao}>
            <Paragraph className="text-lg font-bold" text={"R: "} />
          </Paragraph>
        </>
      )}
      <Paragraph className="text-lg" text={data.texto} />
      {title != "Salmo" && (
        <>
          <Paragraph className="pt-3 text-lg" text={completion} />
          <Paragraph className="pt-3 text-lg font-bold" text={finalAnwser} />
        </>
      )}
    </Card>
  );
}
