import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BandsNewController extends Controller {
  @service catalog;
  @service router;

  @tracked name;

  //checking with the user if they want to leave with unsaved changes
  //this warns them so there is no unwanted loss of data!
  constructor() {
    super(...arguments);
    this.router.on('routeWillChange', (transition) => {
      //case where we hit 'cancel' to adding a new band
      if (transition.isAborted) {
        return;
      }

      //case where it is okay to leave
      if (this.confirmedLeave) {
        return;
      }

      if (transition.from.name === 'bands.new') {
        if (this.name) {
          let leave = window.confirm(
            'You have unsaved changes. Are you sure you want to leave?'
          );
          if (leave) {
            this.confirmedLeave = true;
          } else {
            transition.abort();
          }
        }
      }
    });
  }

  @action
  updateName(event) {
    this.name = event.target.value;
  }

  @action
  async saveBand() {
    let band = await this.catalog.create('band', { name: this.name });
    this.confirmedLeave = true; //no more unsaved changes if you save-- warning won't be triggered
    this.router.transitionTo('bands.band.songs', band.id);
  }
}
