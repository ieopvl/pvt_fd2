"use strict"

class LocalStorage {

    constructor(name) {
      this.storage = {};
      this.name = name;

      const localData = JSON.parse(window.localStorage.getItem(this.name));

      if(localData) {
        for (let key in localData) {
          this.storage[key] = localData[key] ;
        }
      }
      console.log(this.storage);
    }

    addValue(key, value) {
      this.storage[key] = value;
      this.saveStorage();
      console.log(JSON.parse(window.localStorage.getItem(this.name)));
    }

    getValue(key) {
      let value = this.storage[key];
      return value;
    }

    deleteValue(key){
      let deleted = key in this.storage ? delete this.storage[key] : false;
      this.saveStorage();
      return deleted;
    }

    getKeys() {
      return Object.keys(this.storage);
    }

    saveStorage() {
      let keys = this.getKeys();
      let hash = {};
      for( let key of keys) {
        hash[key] = this.getValue(key);
      }
      window.localStorage.setItem(this.name, JSON.stringify(hash));
    }
}
