import axios from "axios";

export class DirectorsDataProvider {
  static mainURL = "https://filmography-backend.herokuapp.com"
  static directorsURL = this.mainURL + "/directors"

  static getAllDirectorsShortInfo = () => 
    axios.get(this.directorsURL)
  
  static getDirectorByID = (id) =>
    axios.get(this.directorsURL + `/${id}`)

  // Обновить существующего
  static updateDirector = (newDirectorData) =>
    axios.put(this.directorsURL, newDirectorData)

  // Добавить нового
  static putDirector = (newDirector) =>
    axios.post(this.directorsURL, newDirector)

  // Удалить 
  static deleteDirector = (id) =>
    axios.delete(this.directorsURL + `/${id}`)

    
  // static directors = Directors();

  // static findDirectorByIdPredicate = (director, id) => director.id === id;

  // static getAllDirectorsShortInfo = () => 
  //   Promise.resolve(
  //     this.directors.map((director) => ({ id: director.id, fullName: director.fullName }))
  //   );

  // static getDirectorByName = (fullName) => {
  //   return new Promise((resolve, reject) => {
  //       const result = this.directors.filter((director) => director.fullName === fullName);
  
  //       if (result.length === 0) {
  //         reject(`Режиссёра с именем ${fullName} нет в списке`);
  //       }
  
  //       resolve(result);
  //     });
  //   };    

// // Обновить данные о существующем режиссёре
// static updateDirector = (newDirectorData) => {
//   return new Promise((resolve, reject) => {
//     const directorIndex = this.directors.findIndex((director) =>
//       this.findDirectorByIdPredicate(director, newDirectorData.id)
//     );

//     if (directorIndex < 0) {
//       reject(`Режиссёра с id ${newDirectorData.id} нет в списке`);
//     }

//     this.directors[directorIndex] = newDirectorData;
//     resolve(directorIndex);
//   });
// };

  // // Добавить нового режиссёра
  // static putDirector = (newDirector) => {
  //   const newDirectorIndex = this.directors.push({
  //     ...newDirector,
  //     id: this.directors.length +1,
  //   });

  //   return Promise.resolve(newDirectorIndex);
  // };


  // // Удалить режиссёра
  // static deleteDirector = (id) => {
  //   return new Promise((resolve, reject) => {
  //     const index = this.directors.findIndex((director) =>
  //       this.findDirectorByIdPredicate(director, id)
  //     );

  //     if (index < 0) {
  //       reject(`Режиссёра с id ${id} нет в списке`);
  //     }

  //     this.directors.splice(index, 1);
  //     resolve(this.directors.length);
  //   });
  // };
}