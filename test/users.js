import supertest from "supertest";
import { expect } from "chai";

import { ENDPOINTS } from "../configs/endpoints.js";

require('dotenv').config()

const request = supertest(ENDPOINTS.BASE_URL)

describe('Users',()=>{
    it('GET /users', (done)=>{
        request.get(`${ENDPOINTS.USERS}${process.env.TOKEN}`).end((err,res)=>{
            expect(res.body).to.not.be.empty;
            done()
        })
    })

    it('GET /users/:id',()=>{
        return request.get(`${ENDPOINTS.USERS_BASE}/2654?access-token=${process.env.TOKEN}`).then((res)=>{
            expect(res.body.id).to.be.equal(2654)
        })
    })

    it('GET /users with the query params',()=>{
        return request.get(`${ENDPOINTS.USERS}${process.env.TOKEN}&page=100&per_page=10&gender=female`).then(res=>{
            expect(res.body).to.be.not.empty;
            res.body.forEach(element => {
                expect(element.gender).to.be.equal('female')
            });
        })
    })

    it('POST /users', ()=>{
        const data = {
            email:`test-${Math.floor(Math.random()*100000)}@gmail.com`,
            name:'Ram',
            gender:'male',
            status:'inactive'
        }

        request.post(`${ENDPOINTS.USERS_BASE}`)
            .set('Authorization',`Bearer ${process.env.TOKEN}`)
            .send(data)
            .then(res=>{
                expect(res.body).to.deep.include(data);
            })
    })
})