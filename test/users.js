import supertest from "supertest";

const request = supertest('https://gorest.co.in/public/v2')

import { expect } from "chai";

const TOKEN = 'ee25f68e742989d5b7b2bc11f20a768a5101520ead1f1d3b3070ba01e71afead';

describe('Users',()=>{
    it('GET /users', (done)=>{
        request.get(`/users?access-token=${TOKEN}`).end((err,res)=>{
            expect(res.body).to.not.be.empty;
            done()
        })
    })
})