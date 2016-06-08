'use strict';
/* globals module inject chai */
var expect = chai.expect;

function makeFakeCollection(){
  return {
    id: 1,
    name: 'Career'
  };
}

function makeFakeCollections(){
  return [{id: 1, name: 'Career'},
          {id: 2, name: 'Health'}];
}

function makeFakeProduct(){
  return {name: 'lose weight',
            id: 1,
            description: 'lose five pounds',
            price: 5.50,
            inventoryQuantity: 5
        };
}

function makeFakeProducts(){
  return [{name: 'lose weight',
            id: 1,
            description: 'lose five pounds',
            price: 5.50,
            inventoryQuantity: 5
          },
          {
            name: 'get a job after senior phase',
            id: 2,
            description: 'finished Grace Hopper yayyy need job',
            price: 10.50,
            inventoryQuantity: 22
          }
         ];
}

describe('ProductFactory Collections', function () {
  /*------------------
      CONFIGURATION
  /------------------*/

  beforeEach(module('FullstackGeneratedApp'));  
  // the `Todo` factory will be loaded before each test
  // $httpBackend lets us "stub" $http responses
  // fakeResTodo is a modified copy of fakeReqTodo (a randomized todo object)
  var ProductFactory, $httpBackend, fakeCollection;

  beforeEach(inject(function ($injector) {
    ProductFactory = $injector.get('ProductFactory');
    $httpBackend = $injector.get('$httpBackend');
    fakeCollection = makeFakeCollection();
  }));
  // checks that $httpBackend received and handled all expected calls
  afterEach(function(){
    try {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    } catch (err) {
      this.test.error(err);
    }
  });

  /*------------------
      TEST SPECS
  /------------------*/


//GET one collection
  it('`.getOneCollection` fetches a backend collection by id', function (done) {
    $httpBackend
      .expect('GET', '/api/collections/' + fakeCollection.id)
      .respond(200, fakeCollection);
    ProductFactory.getOneCollection(fakeCollection.id)
      .then(function (collection) {
        expect(collection).to.deep.equal(fakeCollection);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });


//GET all collections
  it('`.getAllCollections` fetches all collections', function (done) {
    var fakeCollections = makeFakeCollections();
    $httpBackend
      .expect('GET', '/api/collections')
      .respond(200, fakeCollections);
    ProductFactory.getAllCollections()
      .then(function (collections) {
        expect(collections).to.deep.equal(fakeCollections);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

});


describe('ProductFactory Products', function () {
  /*------------------
      CONFIGURATION
  /------------------*/

  beforeEach(module('FullstackGeneratedApp'));  
  // the `Todo` factory will be loaded before each test
  // $httpBackend lets us "stub" $http responses
  // fakeResTodo is a modified copy of fakeReqTodo (a randomized todo object)
  var ProductFactory, $httpBackend, fakeProduct;

  beforeEach(inject(function ($injector) {
    ProductFactory = $injector.get('ProductFactory');
    $httpBackend = $injector.get('$httpBackend');
    fakeProduct = makeFakeProduct();
  }));
  // checks that $httpBackend received and handled all expected calls
  afterEach(function(){
    try {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    } catch (err) {
      this.test.error(err);
    }
  });

  /*------------------
      TEST SPECS
  /------------------*/

//GET one product
  it('`.getOneProduct` fetches a backend product by id', function (done) {
    $httpBackend
      .expect('GET', '/api/products/' + fakeProduct.id)
      .respond(200, fakeProduct);
    ProductFactory.getOneProduct(fakeProduct.id)
      .then(function (product) {
        expect(product).to.deep.equal(fakeProduct);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

//GET all products
  it('`.getAllProducts` fetches a backend for products', function (done) {
    var fakeProducts = makeFakeProducts();
    $httpBackend
      .expect('GET', '/api/products')
      .respond(200, fakeProducts);
    ProductFactory.getAllProducts()
      .then(function (products) {
        expect(products).to.deep.equal(fakeProducts);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

});