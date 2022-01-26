import axios from "axios";

export class StudiosDataProvider {
  static mainURL = "https://filmography-backend.herokuapp.com"
  static studiosURL = this.mainURL + "/studios"

  static getAllStudiosShortInfo = () => 
    axios.get(this.studiosURL)

  static getStudioByID = (id) =>
    axios.get(this.studiosURL + `/${id}`)

  // Обновить существующего
  static updateStudio = (newStudioData) =>
    axios.put(this.studiosURL, newStudioData)

  // Добавить нового
  static putStudio = (newStudio) =>
    axios.post(this.studiosURL, newStudio)

  // Удалить 
  static deleteStudio = (id) =>
    axios.delete(this.studiosURL + `/${id}`)



  // static studios = Studios();

  // static findStudioByIdPredicate = (studio, id) => studio.id === id;

  // static getAllStudiosShortInfo = () =>
  //   Promise.resolve(
  //     this.studios.map((studio) => ({ id: studio.id, name: studio.name }))
  //   );

  // static getStudioByID = (id) =>
  //   new Promise((resolve, reject) => {
  //     const result = this.studios.find((studio) =>
  //       this.findStudioByIdPredicate(studio, id)
  //     );

  //     if (!result) {
  //       reject(`Киностудии с id ${id} не найдено`);
  //     }

  //     resolve(result);
  //   }); 
    
  // static getStudioByName = (name) => {
  //   return new Promise((resolve, reject) => {
  //       const result = this.studios.filter((studio) => studio.name === name);
  
  //       if (result.length === 0) {
  //         reject(`Студии с именем ${name} нет в списке`);
  //       }
  
  //       resolve(result);
  //     });
  //   };    


  // // Обновить данные о существующей киностудии
  // static updateStudio = (newStudioData) => {
  //   return new Promise((resolve, reject) => {
  //     const studioIndex = this.studios.findIndex((studio) =>
  //       this.findStudioByIdPredicate(studio, newStudioData.id)
  //     );

  //     if (studioIndex < 0) {
  //       reject(`Студии с id ${newStudioData.id} нет в списке`);
  //     }

  //     this.studios[studioIndex] = newStudioData;
  //     resolve(studioIndex);
  //   });
  // };


  // // Добавить новую киностудию
  // static putStudio = (newStudio) => {
  //   const newStudioIndex = this.studios.push({
  //     ...newStudio,
  //     id: this.studios.length +1,
  //   });

  //   return Promise.resolve(newStudioIndex);
  // };


  // // Удалить киностудию
  // static deleteStudio = (id) => {
  //   return new Promise((resolve, reject) => {
  //     const index = this.studios.findIndex((studio) =>
  //       this.findStudioByIdPredicate(studio, id)
  //     );

  //     if (index < 0) {
  //       reject(`Студии с id ${id} нет в списке`);
  //     }

  //     this.studios.splice(index, 1);
  //     resolve(this.studios.length);
  //   });
  // };
}