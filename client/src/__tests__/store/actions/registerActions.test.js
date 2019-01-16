import * as actions from '../../../store/actions/registerActions';

describe('testing dbActions', () => {
  let payload;
  beforeAll(() => {
    return payload = {user: "data"};
  });
  
  it('testing regFormAction(data)', () => {
    const expectedAction = {
      type: "REGISTER_FORM_ACTION",
      payload
    }
    expect(actions.regFormAction(payload)).toEqual(expectedAction)
  });
  
  it('testing setNameRegister()', () => {
    const expectedAction = {
      type: "SET_NAME_REGISTER",
      payload
    }
    expect(actions.setNameRegister(payload)).toEqual(expectedAction)
  });
  
  it('testing setEmailRegister()', () => {
    const expectedAction = {
      type: "SET_EMAIL_REGISTER",
      payload
    }
    expect(actions.setEmailRegister(payload)).toEqual(expectedAction)
  });
  
  it('testing setPasswordRegister()', () => {
    const expectedAction = {
      type: "SET_PASSWORD_REGISTER",
      payload
    }
    expect(actions.setPasswordRegister(payload)).toEqual(expectedAction)
  });
  
  it('testing setGenderRegister()', () => {
    const expectedAction = {
      type: "SET_GENDER_REGISTER",
      payload
    }
    expect(actions.setGenderRegister(payload)).toEqual(expectedAction)
  });
  
  it('testing setBirthdayRegister()', () => {
    const expectedAction = {
      type: "SET_BIRTHDAY_REGISTER",
      payload
    }
    expect(actions.setBirthdayRegister(payload)).toEqual(expectedAction)
  });
 
  it('testing setBirthtimeRegister()', () => {
    const expectedAction = {
      type: "SET_BIRTHTIME_REGISTER",
      payload
    }
    expect(actions.setBirthtimeRegister(payload)).toEqual(expectedAction)
  });
 
  it('testing setWeightRegister()', () => {
    const expectedAction = {
      type: "SET_WEIGHT_REGISTER",
      payload
    }
    expect(actions.setWeightRegister(payload)).toEqual(expectedAction)
  });
 
  it('testing setRegError()', () => {
    const expectedAction = {
      type: "SET_REGISTER_ERROR",
      payload
    }
    expect(actions.setRegError(payload)).toEqual(expectedAction)
  });
 
  it('testing cleanRegError()', () => {
    const expectedAction = {
      type: "CLEAN_REGISTER_ERROR",
      payload
    }
    expect(actions.cleanRegError(payload)).toEqual(expectedAction)
  });
 
  it('testing setRegServerError()', () => {
    const expectedAction = {
      type: "SET_REGISTER_SERVER_ERROR",
      payload
    }
    expect(actions.setRegServerError(payload)).toEqual(expectedAction)
  });

  it('testing clearRegModel()', () => {
    const expectedAction = {
      type: "CLEAR_REGISTER_MODEL"
    }
    expect(actions.clearRegModel()).toEqual(expectedAction)
  });
  
 it('testing setLoading()', () => {
    const expectedAction = {
      type: "SET_LOADING",
      payload
    }
    expect(actions.setLoading(payload)).toEqual(expectedAction)
  });
  
 it('testing sendRegistryData()', () => {
    const expectedAction = {
      type: "ON_REGISTER_USER",
      payload
    }
    expect(actions.sendRegistryData(payload)).toEqual(expectedAction)
  });
  
 it('testing userRegisteredSuccess()', () => {
    const expectedAction = {
      type: "USER_REGISTERED_SUCCESS",
      payload
    }
    expect(actions.userRegisteredSuccess(payload)).toEqual(expectedAction)
  });
  
});
