import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import wait from '@rarwe/utils/wait';

//class for creating new band
export default class BandsRoute extends Route {
  @service catalog;

  /*  model() {*/
  async model() {
    await wait(3000);
    return this.catalog.fetchAll('bands');
  }
}
