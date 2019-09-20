'use strict'

function HashStorage() {

 let self = this;

 var hash = {};

 self.addValue = function(key, value) {
   hash[key] = value;
 }

 self.getValue = function(key) {
   return hash[key];
 }

 self.deleteValue = function(key) {
   return key in hash ? delete hash[key] : false;
 }
 
 self.getKeys = function() {
   return Object.keys(hash);
 }

}
