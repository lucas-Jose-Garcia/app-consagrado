export interface DateConsecrationItem {
  id: string;
  title: string;
  month: number;
  day: number;
  year: number;
}

export const consecrationDates: DateConsecrationItem[] = [
  { id: "1", title: "Santa Maria, Mãe de Deus", month: 1, day: 1, year: 0 },
  { id: "2", title: "Nossa Senhora da Luz", month: 2, day: 2, year: 0 },
  { id: "3", title: "Nossa Senhora de Lourdes", month: 2, day: 11, year: 0 },
  { id: "4", title: "Nossa Senhora da Anunciação", month: 3, day: 25, year: 0 },
  { id: "5", title: "Nossa Senhora do Desterro", month: 4, day: 2, year: 0 },
  { id: "6", title: "Nossa Senhora do Bom Conselho", month: 4, day: 26, year: 0 },
  { id: "7", title: "Nossa Senhora de Fátima", month: 5, day: 13, year: 0 },
  { id: "8", title: "Nossa Senhora Auxiliadora", month: 5, day: 24, year: 0 },
  { id: "9", title: "Nossa Senhora da Visitação", month: 5, day: 31, year: 0 },
  { id: "10", title: "Nossa Senhora Rainha da Paz", month: 6, day: 25, year: 0 },
  { id: "11", title: "Nossa Senhora do Perpétuo Socorro", month: 6, day: 27, year: 0 },
  { id: "12", title: "Nossa Senhora da Rosa Mística", month: 7, day: 13, year: 0 },
  { id: "13", title: "Nossa Senhora do Carmo", month: 7, day: 16, year: 0 },
  { id: "14", title: "Nossa Senhora dos Anjos", month: 8, day: 2, year: 0 },
  { id: "15", title: "Nossa Senhora Desatadora dos Nós", month: 8, day: 15, year: 0 },
  { id: "16", title: "Nossa Senhora Rainha", month: 8, day: 22, year: 0 },
  { id: "17", title: "Nossa Senhora de Czestochowa", month: 8, day: 26, year: 0 },
  { id: "18", title: "Nossa Senhora Menina", month: 9, day: 8, year: 0 },
  { id: "19", title: "Nossa Senhora das Dores", month: 9, day: 15, year: 0 },
  { id: "20", title: "Nossa Senhora de La Salette", month: 9, day: 19, year: 0 },
  { id: "21", title: "Nossa Senhora das Mercês", month: 9, day: 24, year: 0 },
  { id: "22", title: "Nossa Senhora do Rosário", month: 10, day: 7, year: 0 },
  { id: "23", title: "Nossa Senhora da Conceição Aparecida", month: 10, day: 12, year: 0 },
  { id: "24", title: "Nossa Senhora do Bom Sucesso", month: 11, day: 1, year: 0 },
  { id: "25", title: "Nossa Senhora Medianeira", month: 11, day: 8, year: 0 },
  { id: "26", title: "Nossa Senhora da Apresentação e Nossa Senhora dos Impossíveis", month: 11, day: 21, year: 0 },
  { id: "27", title: "Nossa Senhora das Graças e da Medalha Milagrosa", month: 11, day: 27, year: 0 },
  { id: "28", title: "Imaculada Conceição", month: 12, day: 8, year: 0 },
  { id: "29", title: "Nossa Senhora de Guadalupe", month: 12, day: 12, year: 0 },
  { id: "30", title: "Nossa Senhora das Brotas", month: 12, day: 27, year: 0 },
];

export function getConsecrationDatesByProximity(): DateConsecrationItem[] {
  const today = new Date();
  const currentYear = today.getFullYear();

  return [...consecrationDates]
    .map((item) => {
      const dateInCurrentYear = new Date(currentYear, item.month - 1, item.day);
      const year = dateInCurrentYear < today ? currentYear + 1 : currentYear;

      return {
        ...item,
        year,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1, a.day);
      const dateB = new Date(b.year, b.month - 1, b.day);

      return dateA.getTime() - dateB.getTime();
    });
}
