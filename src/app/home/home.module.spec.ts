import { HomeModule } from './home.module';

describe('HomeModule', () => {
  const module: HomeModule = new HomeModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
