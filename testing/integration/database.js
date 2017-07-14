const {expect} = require('chai')
const query = require ('../../database.js')

describe('createContacts()', function(){

  it('should return all contacts', function(done){
    query.getContacts()
      .then((results) => {
        expect(results).to.be.an('array')
        expect(results).to.have.lengthOf(3)
        expect(results).to.equal([{
          id: 1,first_name:"Jared",
          last_name:"Grippie"
        },{
          id: 2, first_name:"Tanner",
          last_name:"Welsh"
        },{
          id: 3, first_name:"NeEddra",
          last_name:"James"
        }
      ])
        done()
      })
      .catch((error) => {
        expect(error).to.be.a('object')
        done()
      })
  })
})
describe('getContact()', function(){
  it('should return NeEddras contacts', function(done){
    query.getContact(3)
      .then((results) => {
          expect(results).to.be.an('object')
        expect(results).to.equal({id: 3, first_name:"NeEddra",last_name:"James"})
        done()
      })
      .catch((error) => {
        expect(error).to.be.a('object')
        done()
      })
  })
})
describe('searchForContact()', function(){
  it('should return James contacts', function(done){
    query.searchForContact('James')
      .then((results) => {
        expect(results).to.equal({id: 3, first_name:"NeEddra",last_name:"James"})
        done()
      })
      .catch((error) => {
        expect(error).to.be.a('object')
        done()
      })
  })
})


describe('searchForContact()', function(){
  it('should return Tanner contacts', function(done){
    query.searchForContact('Tanner')
      .then((results) => {
        expect(results).to.equal({id: 2, first_name:"Tanner",last_name:"Welsh"})
        done()
      })
      .catch((error) => {
        expect(error).to.be.a('object')
        done()
      })
  })
})
describe('deleteContact()', function(){
  it('should remove Tanner contacts', function(done){
    query.deleteContact(2)
      .then((results) => {
        expect(results).to.equal({id: 2, first_name:"Tanner",last_name:"Welsh"})
        done()
      })
      .catch((error) => {
        expect(error).to.be.a('object')
        done()
      })
  })
})
describe('createContact()', function(){
  it('should create Jeff contacts', function(done){
    query.createContact({first_name:"Jeff",last_name:"Ware"})
      .then((results) => {
        expect(results).to.equal({id: 3, first_name:"Jeff",last_name:"Ware"})
        done()
      })
      .catch((error) => {
        expect(error).to.be.a('object')
        done()
      })
  })
})
