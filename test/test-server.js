var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../web/server');
var should = chai.should();
const chaiJWT = require('chai-jwt');
const faker = require('faker') ;
chai.use(chaiJWT);
chai.use(chaiHttp);
const baseURL =  'http://localhost:3005';



 const HeadersLocal ={
    host: 'localhost:3005',
    connection: 'keep-alive',
    accept: 'application/json',
    authorization: '',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/68.0.3440.75 Chrome/68.0.3440.75 Safari/537.36',
    lan: 'en',
    referer: 'http://localhost:3005/documentation',
    referer: 'http://localhost:3005',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9' 
  } 



////////////////payload
const phoneNumber =  (Math.floor(Math.random()*9999999999)+1000000000).toString();

const payload =  {
                        userName:faker.internet.userName(),
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        email: faker.internet.email(),
                        phone:phoneNumber,
                        password:"password" 
                    }


const updatedPayload =  {
  userName: payload.userName,
  firstName: payload.firstName,
  lastName: payload.lastName,
  email: payload.email,
  phone: (Math.floor(Math.random()*9999999999)+1000000000).toString(),
}
//////////////login creds
const loginCreds = {
    userName : payload.userName,
    password : "password"
}

let token = '';

console.log("executed1");

it('should return 200 + data entered with +info',(done)=>{
    chai.request(baseURL)
    .post('/test/profile/signup')
    .send(payload)
    .end((err,res)=>{
      console.log("executed2");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.data.should.have.property('insertedCount');
      res.body.data.should.have.property('ops');
      res.body.should.have.property('code');
      res.body.code.should.equal(200)




      chai.request(baseURL)
      .post('/test/profile/login')
      .send(loginCreds)
      .end((err,res)=>{
      HeadersLocal.authorization=res.body.data;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('code');
        res.body.code.should.equal(200);
        token = res.body.data;



        chai.request(baseURL)
        .get('/test/profile/gain')
        .set('authorization',token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('code');
          res.body.code.should.equal(200);


          chai.request(baseURL)
          .get('/test/profile/gain/id')
          .set('authorization',token)
          .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.should.have.property('code');
            res.body.code.should.equal(200);


            chai.request(baseURL)
          .put('/test/profile/edit')
          .set('authorization',token)
          .send(updatedPayload)
          .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.should.have.property('code');
            res.body.code.should.equal(200);
            


            chai.request(baseURL)
            .delete('/test/profile/obliterate')
            .set('authorization',token)
            .end((err,res)=>{
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.should.have.property('code');
              console.log("executed");
              res.body.code.should.equal(200);
            })


          })

          })
  

        })


      })

      done();
      
    });
});