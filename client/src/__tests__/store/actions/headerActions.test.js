import * as actions from '../../../store/actions/headerActions';


describe('testing headerActions', () => {
  
  it('testing setHeaderButtonsMode(data)', () => {
    const
      payload = "mode",
      expectedAction = {
        type: "SET_HEADER_BUTTON_MODE",
        payload
      }
    expect(actions.setHeaderButtonsMode(payload)).toEqual(expectedAction)
  });
});
