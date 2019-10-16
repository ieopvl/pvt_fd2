"use strict"

class LocalStorage {

    constructor(name) {
      this.storage = new HashStorage();
      this.name = name;

      const localData = JSON.parse(window.localStorage.getItem(this.name));

      if(localData) {
        for (let key in localData) {
          this.storage.addValue(key, localData[key]);
        }
      }
      console.log(this.storage);
    }

    addValue(key,value ) {
      this.storage.addValue(key, value);
      this.saveStorage();
      console.log(JSON.parse(window.localStorage.getItem(this.name)));
    }

    getValue(key) {
      let value = this.storage.getValue(key);
      return value;
    }

    deleteValue(key){
      let deleted = this.storage.deleteValue(key);
      this.saveStorage();
      return deleted;
    }

    getKeys() {
      return this.storage.getKeys();
    }

    saveStorage() {
      let keys = this.storage.getKeys();
      let hash = {};
      for( let key of keys) {
        hash[key] = this.storage.getValue(key);
      }
      window.localStorage.setItem(this.name, JSON.stringify(hash));
    }

}
