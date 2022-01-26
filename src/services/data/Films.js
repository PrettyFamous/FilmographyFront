export const Films = () => 
  [
    {
      filmName: "Какой-то фильм",
      country: "Казахстан",
      studio: 1,
      director: 1
    },
    {
      filmName: "Бумер 22",
      country: "USA",
      studio: 2,
      director: 1
    },
    {
      filmName: "Бумер 222",
      country: "USA",
      studio: 2,
      director: 3
    }
  ].map((item,index) => ({
    id: index+1,
    ...item
  }))
