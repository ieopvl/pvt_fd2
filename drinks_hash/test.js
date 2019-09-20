describe("HashStorage", function() {

    describe("HashStorage методы", function() {

    var myHash = new HashStorage();
    myHash.addValue('hello', 'world');

    it("Метод addValue(key, value) и getValue(key)", function() {
      assert.strictEqual( myHash.getValue('hello'),'world' );
    });

    myHash.addValue('arr', [1,2,3]);
    it("Значение массив", function() {
      assert.strictEqual( myHash.getValue('arr').join(), [1,2,3].join() );
    });

    myHash.addValue( 'hash', {'testHash': true} );
    it("Значение хэш", function() {
      assert.strictEqual( myHash.getValue('hash')['testHash'],  true);
    });


    myHash.addValue('del', 'it');
    myHash.deleteValue('del');
    it("Метод deleteValue(key)", function() {
      assert.strictEqual( myHash.getValue('del'),undefined );
    });

    myHash.addValue('bonjure', 'fr');
    it("Метод deleteValue(key) удалил и возратил true", function() {
      assert.isTrue( myHash.deleteValue('bonjure'));
    });

   
    it("Метод deleteValue(key) не нашел, что удалить и возратил false", function() {
      assert.isFalse( myHash.deleteValue('привет'));
    });


    var myKeysHash = new HashStorage();
    for( let i = 1; i <= 5; i++) {
       myKeysHash.addValue('' + i, true);
    }

    it("Метод getKeys()", function() {
      assert.strictEqual( myKeysHash.getKeys().join(), ['1','2','3','4','5'].join() );
    });

  });


});