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

// function makeFakeProduct(){
//   return {name: 'lose weight',
//             description: 'lose five pounds',
//             price: 5.50,
//             inventoryQuantity: 5
//         };
// }

// function makeFakeProducts(){
//   return [{name: 'lose weight',
//             description: 'lose five pounds',
//             price: 5.50,
//             inventoryQuantity: 5
//           },
//           {
//             name: 'get a job after senior phase',
//             description: 'finished Grace Hopper yayyy need job',
//             price: 10.50,
//             inventoryQuantity: 22
//           }
//          ];
//}

describe('ProductFactory Collections', function () {
  /*------------------
      CONFIGURATION
  /------------------*/

  beforeEach(module('FullstackGeneratedApp'));  
  // the `Todo` factory will be loaded before each test
  // $httpBackend lets us "stub" $http responses
  // fakeResTodo is a modified copy of fakeReqTodo (a randomized todo object)
  var ProductFactory, $httpBackend, fakeReqCollection, fakeResCollection;

  beforeEach(inject(function ($injector) {
    ProductFactory = $injector.get('ProductFactory');
    $httpBackend = $injector.get('$httpBackend');
    fakeReqCollection = makeFakeCollection();
    fakeResCollection = {
      id: fakeReqCollection.id,
      name: fakeReqCollection.name
    };
  }));
  // checks that $httpBackend received and handled all expected calls
  // afterEach(function(){
  //   try {
  //     $httpBackend.verifyNoOutstandingExpectation(false);
  //     $httpBackend.verifyNoOutstandingRequest();
  //   } catch (err) {
  //     this.test.error(err);
  //   }
  // });

  /*------------------
      TEST SPECS
  /------------------*/


//GET one collection
  it('`.getOneCollection` fetches a backend collection by id', function (done) {
    $httpBackend
      .expect('GET', '/api/collections/' + fakeReqCollection.id)
      .respond(200, fakeResCollection);
    ProductFactory.getOneCollection(fakeReqCollection.id)
      .then(function (collection) {
        expect(collection).to.deep.equal(fakeResCollection);
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


// describe('ProductFactory Products', function () {
//   /*------------------
//       CONFIGURATION
//   /------------------*/

//   beforeEach(module('FullstackGeneratedApp'));  
//   // the `Todo` factory will be loaded before each test
//   // $httpBackend lets us "stub" $http responses
//   // fakeResTodo is a modified copy of fakeReqTodo (a randomized todo object)
//   var ProductFactory, $httpBackend, fakeReqCollection, fakeResCollection;

//   beforeEach(inject(function ($injector) {
//     ProductFactory = $injector.get('ProductFactory');
//     $httpBackend = $injector.get('$httpBackend');
//     fakeReqProduct = makeFakeProduct();
//     fakeResProduct = {
//       id: fakeReqProduct.id,
//       name: fakeReqProduct.name
//     };
//   }));
//   // checks that $httpBackend received and handled all expected calls
//   afterEach(function(){
//     try {
//       $httpBackend.verifyNoOutstandingExpectation(false);
//       $httpBackend.verifyNoOutstandingRequest();
//     } catch (err) {
//       this.test.error(err);
//     }
//   });

//   /*------------------
//       TEST SPECS
//   /------------------*/

// //GET one product
//   it('`.getOneProduct` fetches a backend product by id', function (done) {
//     $httpBackend
//       .expect('GET', '/api/products/' + fakeReqProduct.id)
//       .respond(200, fakeResProduct);
//     ProductFactory.getOneProduct(fakeReqProduct.id)
//       .then(function (product) {
//         expect(product).to.deep.equal(fakeResProduct);
//       })
//       .catch(done);
//     $httpBackend.flush();
//     done();
//   });

// //GET all products
// });