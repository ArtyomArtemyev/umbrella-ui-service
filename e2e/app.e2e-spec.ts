import { UmbrellaUiServicePage } from './app.po';

describe('umbrella-ui-service App', () => {
  let page: UmbrellaUiServicePage;

  beforeEach(() => {
    page = new UmbrellaUiServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('wfm works!');
  });
});
