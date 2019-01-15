import * as actions from '../../../store/actions/dbActions';


describe('testing dbActions', () => {
  let payload;
  beforeAll(() => {
    return payload = {user: "data"};
  });
  
  it('testing setUserDataToStore(data)', () => {
    const expectedAction = {
      type: "FETCH_USER_SUCCESS",
      payload
    }
    expect(actions.setUserDataToStore(payload)).toEqual(expectedAction)
  });
  it('testing setUserLogedOut()', () => {
    const expectedAction = {
      type: "SET_USER_LOGED_OUT",
    }
    expect(actions.setUserLogedOut()).toEqual(expectedAction)
  });
});
