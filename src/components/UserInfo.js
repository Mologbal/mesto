export default class UserInfo {
    constructor({ profileName, profileAbout }) {
     this._name = profileName
     this._about = profileAbout
    }
   
    //возвращает объект с данными пользователя
    getUserInfo() {
     const data = {
      name: this._name.textContent,
      about: this._about.textContent,
     };
     return data;
    }
   
    //принимет и добавит на страницу
    setUserInfo(name, about) {
     this._name.textContent = name;
     this._about.textContent = about;
    }
   }