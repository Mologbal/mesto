export default class UserInfo {
    constructor({
        profileName,
        profileAbout,
        avatar,
    }) {
        this._name = profileName;
        this._about = profileAbout;
        this._avatar = avatar;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        const data = {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
        };
        return data;
    }

    //принимет и добавит на страницу
    setUserInfo({ name, about, avatar, _id }) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
    }
}