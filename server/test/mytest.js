let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../app")
const { describe } = require("mocha")
chai.use(chaiHttp)
const jwt = require("jsonwebtoken");

describe("/GET users", () => {
    it("Should get all users",(done) => {
        chai.request(server)
        .get("/user/all")
        .end((err,res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body).to.be.a("array")
            done()
        })
    })

    describe("/user/delete user", () => {
        it("should delete account", (done) => {
            const username = "jouni"
           const token = jwt.sign({ username: "jouni" }, process.env.JWT_SECRET); 
            chai.request(server)
            .delete("/user/delete/" + username)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            })
        })
    })

    describe("/user add", () => {
        it("should add account", (done) => {
            const accountname = "asdsd"
            const password = "sssds"
            chai.request(server)
            .post("/auth/add/" )
            .send({ password,accountname  })
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                done();
        })
    })
})
})