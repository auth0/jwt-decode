import { jwtDecode, InvalidTokenError, JwtPayload } from "./../lib/index";
import { describe, expect, it } from "@jest/globals";

var token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo";

describe("jwt-decode", function () {
  it("should return default and custom claims", function () {
    var decoded = jwtDecode<JwtPayload & { foo: string }>(token);
    expect(decoded.exp).toEqual(1393286893);
    expect(decoded.iat).toEqual(1393268893);
    expect(decoded.foo).toEqual("bar");
  });

  it("should return header information", function () {
    var decoded = jwtDecode(token, { header: true });
    expect(decoded.typ).toEqual("JWT");
    expect(decoded.alg).toEqual("HS256");
  });

  it("should work with utf8 tokens", function () {
    var utf8_token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9zw6kiLCJpYXQiOjE0MjU2NDQ5NjZ9.1CfFtdGUPs6q8kT3OGQSVlhEMdbuX0HfNSqum0023a0";
    var decoded = jwtDecode<JwtPayload & { name: string }>(utf8_token);
    expect(decoded.name).toEqual("José");
  });

  it("should work with binary tokens", function () {
    var binary_token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9z6SIsImlhdCI6MTQyNTY0NDk2Nn0.cpnplCBxiw7Xqz5thkqs4Mo_dymvztnI0CI4BN0d1t8";
    var decoded = jwtDecode<JwtPayload & { name: string }>(binary_token);
    expect(decoded.name).toEqual("José");
  });

  it("should work with double padding", function () {
    var utf8_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpIiwiaWF0IjoxNTE2MjM5MDIyfQ.7A3F5SUH2gbBSYVon5mas_Y-KCrWojorKQg7UKGVEIA";
    var decoded = jwtDecode<JwtPayload & { name: string }>(utf8_token);
    expect(decoded.name).toEqual("José");
  });

  it("should work with single padding", function () {
    var utf8_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpZSIsImlhdCI6MTUxNjIzOTAyMn0.tbjJzDAylkKSV0_YGR5xBJBlFK01C82nZPLIcA3JX1g";
    var decoded = jwtDecode<JwtPayload & { name: string }>(utf8_token);
    expect(decoded.name).toEqual("Josée");
  });

  it("should throw InvalidTokenError on nonstring", function () {
    var bad_token = null;
    expect(function () {
      jwtDecode(bad_token as any);
    }).toThrow(InvalidTokenError);
  });

  it("should throw InvalidTokenError on string that is not a token", function () {
    var bad_token = "fubar";
    expect(function () {
      jwtDecode(bad_token);
    }).toThrow(InvalidTokenError);
  });

  it("should throw InvalidTokenErrors when token is null", function () {
    var bad_token = null;
    expect(function () {
      jwtDecode(bad_token as any, { header: true });
    }).toThrow(
      new InvalidTokenError("Invalid token specified: must be a string")
    );
  });

  it("should throw InvalidTokenErrors when missing part #1", function () {
    var bad_token = ".FAKE_TOKEN";
    expect(function () {
      jwtDecode(bad_token, { header: true });
    }).toThrow(/Invalid token specified: invalid json for part #1/);
  });

  it("should throw InvalidTokenErrors when part #1 is not valid base64", function () {
    var bad_token = "TOKEN";
    expect(function () {
      jwtDecode(bad_token, { header: true });
    }).toThrow(/Invalid token specified: invalid base64 for part #1/);
  });

  it("should throw InvalidTokenErrors when part #1 is not valid JSON", function () {
    var bad_token = "FAKE.TOKEN";
    expect(function () {
      jwtDecode(bad_token, { header: true });
    }).toThrow(/Invalid token specified: invalid json for part #1/);
  });

  it("should throw InvalidTokenErrors when missing part #2", function () {
    var bad_token = "FAKE_TOKEN";
    expect(function () {
      jwtDecode(bad_token);
    }).toThrow(
      new InvalidTokenError("Invalid token specified: missing part #2")
    );
  });

  it("should throw InvalidTokenErrors when part #2 is not valid base64", function () {
    var bad_token = "FAKE.TOKEN";
    expect(function () {
      jwtDecode(bad_token);
    }).toThrow(/Invalid token specified: invalid base64 for part #2/);
  });

  it("should throw InvalidTokenErrors when part #2 is not valid JSON", function () {
    var bad_token = "FAKE.TOKEN2";
    expect(function () {
      jwtDecode(bad_token);
    }).toThrow(/Invalid token specified: invalid json for part #2/);
  });
});
