'use strict'

class HashStorage {
  constructor() {
    this.hash = {};
  }

  addValue(key, value) {
    console.log("hashaddval");
    this.hash[key] = value;
  }

  getValue(key) {
    return this.hash[key];
  }

  deleteValue(key) {
    return  this.getValue(key) ? delete this.hash[key] : false;
  }

  getKeys() {
    return Object.keys(this.hash);
  }
}
