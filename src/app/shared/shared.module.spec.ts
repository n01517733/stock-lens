import { SharedModule } from './shared.module';

describe('SharedModule', () => {
  const module: SharedModule = new SharedModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
