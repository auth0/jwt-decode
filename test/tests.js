var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo';

describe('Auth0', function () {

  it('should fail to construct without a clientID', function () {
    var decoded = jwt_decode(token);
    expect(decoded.exp).to.equal(1393286893);
    expect(decoded.iat).to.equal(1393268893);
    expect(decoded.foo).to.equal('bar');
  });

});
