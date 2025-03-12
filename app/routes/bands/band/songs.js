import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import wait from 'rarwe/utils/wait';

export default class BandsBandSongsRoute extends Route {
  @service catalog;

  queryParams = {
    sortBy: {
      as: 's',
    },

    searchTerm: {
      as: 'q',
    },
  };

  /* Here we query the url to retrieve the songs from the backend.
   * We then go through each item in the data of the response, and create
   * a song instance from each.
   * The created songs are assigned to songs attribute of the correct band instance
   * This is necessary because we still display @model.songs in the template
   */

  async model() {
    let band = this.modelFor('bands.band');
    await wait(3000);
    await this.catalog.fetchRelated(band, 'songs');
    return band;
  }

  resetController(controller) {
    controller.title = '';
    controller.showAddSong = true;
  }
}
