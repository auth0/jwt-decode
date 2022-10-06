var token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo";

if (typeof jwt_decode === "undefined") {
    var jwt_decode = require("../build/jwt-decode.cjs.js");
}

if (typeof expect === "undefined") {
    var expect = require("expect.js");
}

describe("jwt-decode", function() {
    it("should fail to construct without a clientID", function() {
        var decoded = jwt_decode(token);
        expect(decoded.exp).to.equal(1393286893);
        expect(decoded.iat).to.equal(1393268893);
        expect(decoded.foo).to.equal("bar");
    });

    it("should return header information", function() {
        var decoded = jwt_decode(token, { header: true });
        expect(decoded.typ).to.equal("JWT");
        expect(decoded.alg).to.equal("HS256");
    });

    it("should work with utf8 tokens", function() {
        var utf8_token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9zw6kiLCJpYXQiOjE0MjU2NDQ5NjZ9.1CfFtdGUPs6q8kT3OGQSVlhEMdbuX0HfNSqum0023a0";
        var decoded = jwt_decode(utf8_token);
        expect(decoded.name).to.equal("José");
    });

    it("should work with binary tokens", function() {
        var binary_token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9z6SIsImlhdCI6MTQyNTY0NDk2Nn0.cpnplCBxiw7Xqz5thkqs4Mo_dymvztnI0CI4BN0d1t8";
        var decoded = jwt_decode(binary_token);
        expect(decoded.name).to.equal("José");
    });

    it("should work with double padding", function() {
        var utf8_token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpIiwiaWF0IjoxNTE2MjM5MDIyfQ.7A3F5SUH2gbBSYVon5mas_Y-KCrWojorKQg7UKGVEIA";
        var decoded = jwt_decode(utf8_token);
        expect(decoded.name).to.equal("José");
    });

    it("should work with single padding", function() {
        var utf8_token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpZSIsImlhdCI6MTUxNjIzOTAyMn0.tbjJzDAylkKSV0_YGR5xBJBlFK01C82nZPLIcA3JX1g";
        var decoded = jwt_decode(utf8_token);
        expect(decoded.name).to.equal("Josée");
    });

    it("should throw InvalidTokenError on nonstring", function() {
        var bad_token = null;
        expect(function() {
            jwt_decode(bad_token);
        }).to.throwException(function(e) {
            expect(e.name).to.be("InvalidTokenError");
        });
    });

    it("should throw InvalidTokenError on string that is not a token", function() {
        var bad_token = "fubar";
        expect(function() {
            jwt_decode(bad_token);
        }).to.throwException(function(e) {
            expect(e.name).to.be("InvalidTokenError");
        });
    });
});