import { Link } from "expo-router";
import { Conteiner } from "../conteineres/conteiner";
import { Paragraph } from "../text/paragraph";

interface MessageProps {
  message: string;
  showReturnLink?: boolean;
  returnPath?: string;
  returnText?: string;
}

export function Message({ 
  message, 
  showReturnLink = true, 
  returnPath = "/", 
  returnText = "Retornar" 
}: MessageProps) {
  return (
    <Conteiner.Box className="flex-1 justify-center items-center">
      <Paragraph text={message} className="text-gray-100 text-center mb-4" />
      {showReturnLink && (
        <Link href={returnPath} className="text-blue-500">
          <Paragraph text={returnText} className="text-blue-500" />
        </Link>
      )}
    </Conteiner.Box>
  );
}
