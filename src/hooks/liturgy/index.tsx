import axios from "axios";

const liturgy = axios.create({
  baseURL: "https://feed.evangelizo.org/v2/reader.php",
});

interface ReadingProps {
  book: string;
  path: string;
  text: string[];
}

interface LiturgyProps {
  liturgicTitle: string;
  firstReading: ReadingProps;
  psalm: ReadingProps;
  secondReading?: ReadingProps;
  gospel: ReadingProps;
}

export function useLiturgy() {
  function extractReadings(text: string) {
    const matches: number[] = [];
    const readings: ReadingProps[] = [];

    const data = text.split("\n");
    console.log(data);

    data.forEach((item, index) => {
      if (item.includes('<font dir="ltr">')) matches.push(index);
    });

    matches.forEach((position, index) => {
      const lastIndex =
        index == matches.length - 1 ? data.length - 1 : matches[index + 1];
      const split = data[position].split('<font dir="ltr">');
      const item: ReadingProps = {
        book: split[0].trim(),
        path: split[1].replace("</font>", ""),
        text: data.slice(position + 1, lastIndex).filter((x) => x !== ""),
      };

      readings.push(item);
    });

    const response: LiturgyProps = {
      liturgicTitle: data[0].trim(),
      firstReading: readings[0],
      psalm: readings[1],
      gospel: readings[readings.length - 1],
    };

    if (readings.length > 3) {
      response.secondReading = readings[3];
    }

    return response;
  }

  async function getLiturgy() {
    const result = await liturgy.get("", {
      params: {
        date: "20240630",
        type: "all",
        lang: "PT",
        content: "FR",
      },
    });

    const dataResult = result.data.replace(/<br \/>/g, "\n");
    const response = extractReadings(dataResult);
    console.log(response);
  }

  return { getLiturgy };
}
