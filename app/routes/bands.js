import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

//class for creating new band
export default class BandsRoute extends Route {
  @service catalog;

  model() {
    return this.catalog.fetchAll('bands');
  }
}
