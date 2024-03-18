import { AuthGuard } from './roles.guard';

describe('AuthguardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
