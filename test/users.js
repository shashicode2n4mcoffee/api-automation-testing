import supertest from "supertest";
import { expect } from "chai";

import { ENDPOINTS } from "../configs/endpoints";

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
        return request.get(`${ENDPOINTS.USERS_BASE}/1440235?access-token=${process.env.TOKEN}`).then((res)=>{
            expect(res.body.id).to.be.equal(1440235)
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
})