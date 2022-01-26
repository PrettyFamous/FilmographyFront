import axios from "axios";

export class FilmsDataProvider {
  static mainURL = "https://filmography-backend.herokuapp.com"
  static filmsURL = this.mainURL + "/films"

  static getAllFilmsShortInfo = () => 
    axios.get(this.filmsURL)

  static getFilmByID = (id) =>
    axios.get(this.filmsURL + `/${id}`)

  // Обновить существующего
  static updateFilm = (newFilmData) =>
    axios.put(this.filmsURL, newFilmData)

  // Добавить нового
  static putFilm = (newFilm) =>
    axios.post(this.filmsURL, newFilm)

  // Удалить 
  static deleteFilm = (id) =>
    axios.delete(this.filmsURL + `/${id}`)


  // static films = Films();

  // static findFilmByIdPredicate = (film, id) => film.id === id;

  // static getAllFilmsShortInfo = () =>
  //   Promise.resolve(
  //     this.films.map((film) => ({ id: film.id, filmName: film.filmName }))
  //   );

  // static getFilmByID = (id) =>
  //   new Promise((resolve, reject) => {
  //     const result = this.films.find((film) =>
  //       this.findFilmByIdPredicate(film, id)
  //     );

  //     if (!result) {
  //       reject(`Фильма с id ${id} не найдено`);
  //     }

  //     resolve(result);
  //   }); 
    
  // static getFilmByName = (filmName) => {
  //   return new Promise((resolve, reject) => {
  //       const result = this.films.filter((film) => film.filmName === filmName);
  
  //       if (result.length === 0) {
  //         reject(`Фильма с именем ${filmName} нет в списке`);
  //       }
  
  //       resolve(result);
  //     });
  //   };    


  // // Обновить данные о существующем фильме
  // static updateFilm = (newFilmData) => {
  //   return new Promise((resolve, reject) => {
  //     const filmIndex = this.films.findIndex((film) =>
  //       this.findFilmByIdPredicate(film, newFilmData.id)
  //     );

  //     if (filmIndex < 0) {
  //       reject(`Фильма с id ${newFilmData.id} нет в списке`);
  //     }

  //     this.films[filmIndex] = newFilmData;
  //     resolve(filmIndex);
  //   });
  // };


  // // Добавить новый фильм
  // static putFilm = (newFilm) => {
  //   const newFilmIndex = this.films.push({
  //     ...newFilm,
  //     id: this.films.length +1,
  //   });

  //   return Promise.resolve(newFilmIndex);
  // };


  // // Удалить фильм
  // static deleteFilm = (id) => {
  //   return new Promise((resolve, reject) => {
  //     const index = this.films.findIndex((film) =>
  //       this.findFilmByIdPredicate(film, id)
  //     );

  //     if (index < 0) {
  //       reject(`Фильма с id ${id} нет в списке`);
  //     }

  //     this.films.splice(index, 1);
  //     resolve(this.films.length);
  //   });
  // };
}