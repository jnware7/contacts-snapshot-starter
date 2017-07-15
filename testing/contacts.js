const {expect} = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const contacts = require('../server/routes/contacts')
const {initdb} = require('./test_utilities')
let should = chai.should()
chai.use(chaiHttp);

beforeEach(() =>
  initdb()
)

describe('Contacts ', (done)=>{
  context('/', ()=>{
    it('GET route to render contacts page', (done)=>{
      chai.request('http://localhost:3000')
        .get('/')
        .end((err,res)=>{
          // console.log('res.text===>',res.text)
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        })
    })

    it('contains all contacts', (done)=>{
      chai.request('http://localhost:3000')
      .get('/')
      .end((err,res)=>{
        // console.log('res.text==>',res.text)
        expect(res.text).contains('NeEddra');
        expect(res.text).contains('Jared');
        expect(res.text).contains('Tanner');
        done();
      })
    })

    it('post route saves contact data to db with status code 200', (done) => {
       chai.request('http://localhost:3000')
         .post('/contacts')
         .set('content-type', 'application/x-www-form-urlencoded')
         .send({
           'first_name':'Jeff',
           'last_name': 'Ware'
         })
         .end( (error, res) => {
           expect(res).to.have.status(200)
           done()
         })
     })
  })

  context('/contacts/new',()=>{
    it('GET route to render /contacts/new page',(done)=>{
      chai.request('http://localhost:3000')
      .get('/contacts/new')
      .end((err,res)=>{
        expect(res).to.have.status(200);
        done();
      })
    })
    it('GET route to render /contacts/new page',(done)=>{
      chai.request('http://localhost:3000')
      .get('/contacts/new')
      .end((err,res)=>{
        expect(res.text).contains('<h1>New Contact</h1>');
        done();
      })
    })
  })

  context('/contacts/:contactId',()=>{
    it('GET route to render /contacts/:contactId page',(done)=>{
      chai.request('http://localhost:3000')
      .get('/contacts/:contactId')
      .end((err,res)=>{
        expect(res).to.have.status(200);
        done();
      })
    })
    it('GET route to render /contacts/:contactId page',(done)=>{
      chai.request('http://localhost:3000')
      .get('/contacts/1')
      .end((err,res)=>{
        expect(res.text).contains('Jared');
        expect(res.text).to.not.contain('Jim')
        done();
      })
    })
  })

  context('/contacts/:contactId/delete',()=>{
    it('GET route to render /contacts/:contactId page',(done)=>{
      chai.request('http://localhost:3000')
      .get('/contacts/1/delete')
      .end((err,res)=>{
        // expect(res.text).contains('NeEddra');
        expect(res.text).to.not.contain('Jared')
        done();
      })
    })

  })
  it('GET route to render /contacts/:contactId/delete page',(done)=>{
    chai.request('http://localhost:3000')
    .get('/contacts/:contactId')
    .end((err,res)=>{
      expect(res).to.have.status(200);
      done();
    })
  })

  context('/search',()=>{
    it(' 1. GET route to render /search page',(done)=>{
      chai.request('http://localhost:3000')
      .get('/Jeff')
      .end((err,res)=>{
      expect(res).to.have.status(200);
      expect(res.text).contains('<h3>Sorry, the page you have requested was not found :/</h3>');
        done();
      })
    })

  })
  it('2. GET route to render /search page',(done)=>{
    chai.request('http://localhost:3000')
    .get('/contacts/search?q=Jared')
    .end((err,res)=>{
     expect(res).to.have.status(200);
     expect(res.text).contains('<div class="contact-list">');
      done();
    })
  })

})
