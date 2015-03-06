var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo';

describe('Auth0', function () {

  it('should fail to construct without a clientID', function () {
    var decoded = jwt_decode(token);
    expect(decoded.exp).to.equal(1393286893);
    expect(decoded.iat).to.equal(1393268893);
    expect(decoded.foo).to.equal('bar');
  });

  it('should work with utf8 tokens', function () {
    var utf8_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9zw6kiLCJpYXQiOjE0MjU2NDQ5NjZ9.1CfFtdGUPs6q8kT3OGQSVlhEMdbuX0HfNSqum0023a0";
    var decoded = jwt_decode(utf8_token);
    expect(decoded.name).to.equal('José');
  });

  it('should work with binary tokens', function () {
    var binary_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9z6SIsImlhdCI6MTQyNTY0NDk2Nn0.cpnplCBxiw7Xqz5thkqs4Mo_dymvztnI0CI4BN0d1t8";
    var decoded = jwt_decode(binary_token);
    expect(decoded.name).to.equal('José');
  });
});
