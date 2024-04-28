let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../app")
const { describe } = require("mocha")
chai.use(chaiHttp)
const jwt = require("jsonwebtoken");

    //DELETION

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

    describe("/user/delete user", () => {
        it("shouldnt delete account without token", (done) => {
            const username = ""
           const token = jwt.sign({ username: "" }, process.env.JWT_SECRET); 
            chai.request(server)
            .delete("/user/delete/" + username)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
                done();
            })
        })
    })
    describe("/user/delete user without token", () => {
        it("shouldnt delete account", (done) => {
            const username = "jouni"
            chai.request(server)
            .delete("/user/delete/" + username)
            .end((err, res) => {
                chai.expect(res).to.have.status(403);
                done();
            })
        })
    })

        //REGISTERING

    describe("/user add", () => {
        it("should add account", (done) => {
            const accountname = "adfasdfasfas"
            const password = "asdfafdasfdasfsadfasf"
            chai.request(server)
            .post("/auth/add/" )
            .send({ password,accountname  })
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                done();
        })
    })
})

describe("/user add", () => {
    it("shouldnt add account with null credentials", (done) => {
        const accountname = ""
        const password = ""
        chai.request(server)
        .post("/auth/add/" )
        .send({ password,accountname  })
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            done();
    })
})
})

describe("/user add", () => {
    it("shouldnt add account with null credentials", (done) => {
        const accountname = ""
        const password = ""
        chai.request(server)
        .post("/auth/add/" )
        .send({ password,accountname  })
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            done();
    })
})
})

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

})

describe("/login user", () => {
    it("Should login",(done) => {
        const accountname= "jaska123"
        const password= "jaska123"
        chai.request(server)
        .post("/auth/login")
        .send({accountname, password})
        .end((err,res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body).to.have.property("jwtToken")
            done()
        })
    })

})
        //LOGIN

describe("/login user", () => {
    it("Shouldnt login with null credentials",(done) => {
        const accountname= ""
        const password= ""
        chai.request(server)
        .post("/auth/login")
        .send({accountname, password})
        .end((err,res) => {
            chai.expect(res).to.have.status(404)     
            done()
        })
    })

})

describe("/login user", () => {
    it("Shouldnt login with wrong credentials",(done) => {
        const accountname= "wrongusername"
        const password= "wrong password"
        chai.request(server)
        .post("/auth/login")
        .send({accountname, password})
        .end((err,res) => {
            chai.expect(res).to.have.status(404)     
            done()
        })
    })

})
describe("/login user", () => {
    it("Shouldnt login with wrong password",(done) => {
        const accountname= "jaska123"
        const password= "wrong password"
        chai.request(server)
        .post("/auth/login")
        .send({accountname, password})
        .end((err,res) => {
            chai.expect(res).to.have.status(401) 
            chai.expect(res.body).to.have.property('error').that.equals('Wrong password');
            done()
        })
    })

})