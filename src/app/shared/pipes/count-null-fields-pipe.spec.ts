import { CountNullFieldsPipe } from './count-null-fields-pipe';

describe('CountNullFieldsPipe', () => {
  it('create an instance', () => {
    const pipe = new CountNullFieldsPipe();
    expect(pipe).toBeTruthy();
  });
});
