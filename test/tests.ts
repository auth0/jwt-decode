import { jwtDecode, InvalidTokenError, JwtPayload } from "./../lib/index.js";
import { describe, expect, it } from "@jest/globals";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo";

describe("jwt-decode", () => {
  it("should return default and custom claims", () => {
    const decoded = jwtDecode<JwtPayload & { foo: string }>(token);
    expect(decoded.exp).toEqual(1393286893);
    expect(decoded.iat).toEqual(1393268893);
    expect(decoded.foo).toEqual("bar");
  });

  it("should return header information", () => {
    const decoded = jwtDecode(token, { header: true });
    expect(decoded.typ).toEqual("JWT");
    expect(decoded.alg).toEqual("HS256");
  });

  it("should work with utf8 tokens", () => {
    const utf8Token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9zw6kiLCJpYXQiOjE0MjU2NDQ5NjZ9.1CfFtdGUPs6q8kT3OGQSVlhEMdbuX0HfNSqum0023a0";
    const decoded = jwtDecode<JwtPayload & { name: string }>(utf8Token);
    expect(decoded.name).toEqual("José");
  });

  it("should work with binary tokens", () => {
    const binaryToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9z6SIsImlhdCI6MTQyNTY0NDk2Nn0.cpnplCBxiw7Xqz5thkqs4Mo_dymvztnI0CI4BN0d1t8";
    const decoded = jwtDecode<JwtPayload & { name: string }>(binaryToken);
    expect(decoded.name).toEqual("José");
  });

  it("should work with double padding", () => {
    const utf8Token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpIiwiaWF0IjoxNTE2MjM5MDIyfQ.7A3F5SUH2gbBSYVon5mas_Y-KCrWojorKQg7UKGVEIA";
    const decoded = jwtDecode<JwtPayload & { name: string }>(utf8Token);
    expect(decoded.name).toEqual("José");
  });

  it("should work with single padding", () => {
    const utf8Token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpZSIsImlhdCI6MTUxNjIzOTAyMn0.tbjJzDAylkKSV0_YGR5xBJBlFK01C82nZPLIcA3JX1g";
    const decoded = jwtDecode<JwtPayload & { name: string }>(utf8Token);
    expect(decoded.name).toEqual("Josée");
  });

  it("should throw InvalidTokenError on nonstring", () => {
    const badToken = null;
    expect(() => {
      jwtDecode(badToken as any);
    }).toThrow(InvalidTokenError);
  });

  it("should throw InvalidTokenError on string that is not a token", () => {
    const badToken = "fubar";
    expect(() => {
      jwtDecode(badToken);
    }).toThrow(InvalidTokenError);
  });

  it("should throw InvalidTokenErrors when token is null", () => {
    const badToken = null;
    expect(() => {
      jwtDecode(badToken as any, { header: true });
    }).toThrow(
      new InvalidTokenError("Invalid token specified: must be a string")
    );
  });

  it("should throw InvalidTokenErrors when missing part #1", () => {
    const badToken = ".FAKE_TOKEN";
    expect(() => {
      jwtDecode(badToken, { header: true });
    }).toThrow(/Invalid token specified: invalid json for part #1/);
  });

  it("should throw InvalidTokenErrors when part #1 is not valid base64", () => {
    const badToken = "TOKEN";
    expect(() => {
      jwtDecode(badToken, { header: true });
    }).toThrow(/Invalid token specified: invalid base64 for part #1/);
  });

  it("should throw InvalidTokenErrors when part #1 is not valid JSON", () => {
    const badToken = "FAKE.TOKEN";
    expect(() => {
      jwtDecode(badToken, { header: true });
    }).toThrow(/Invalid token specified: invalid json for part #1/);
  });

  it("should throw InvalidTokenErrors when missing part #2", () => {
    const badToken = "FAKE_TOKEN";
    expect(() => {
      jwtDecode(badToken);
    }).toThrow(
      new InvalidTokenError("Invalid token specified: missing part #2")
    );
  });

  it("should throw InvalidTokenErrors when part #2 is not valid base64", () => {
    const badToken = "FAKE.TOKEN";
    expect(() => {
      jwtDecode(badToken);
    }).toThrow(/Invalid token specified: invalid base64 for part #2/);
  });

  it("should throw InvalidTokenErrors when part #2 is not valid JSON", () => {
    const badToken = "FAKE.TOKEN2";
    expect(() => {
      jwtDecode(badToken);
    }).toThrow(/Invalid token specified: invalid json for part #2/);
  });
});
