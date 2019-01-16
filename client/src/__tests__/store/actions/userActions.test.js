import * as actions from '../../../store/actions/userActions';


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
  
  it('testing fetchUser()', () => {
    const expectedAction = {
      type: "FETCH_USER",
    }
    expect(actions.fetchUser()).toEqual(expectedAction)
  });
  
});
