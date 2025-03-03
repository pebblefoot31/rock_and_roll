import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Song from 'rarwe/models/song';
import fetch from 'fetch';

export default class BandsBandSongsRoute extends Route {
  @service catalog;

  /* Here we query the url to retrieve the songs from the backend.
   * We then go through each item in the data of the response, and create
   * a song instance from each.
   * The created songs are assigned to songs attribute of the correct band instance
   * This is necessary because we still display @model.songs in the template
   */

  async model() {
    let band = this.modelFor('bands.band');
    let url = band.relationships.songs;
    let response = await fetch(url);
    let json = await response.json();
    let songs = [];
    for (let item of json.data) {
      let { id, attributes, relationships } = item;
      let rels = {};
      for (let relationshipName in relationships) {
        rels[relationshipName] = relationships[relationshipName].links.related;
      }
      let song = new Song({ id, ...attributes }, rels);
      songs.push(song);
      this.catalog.add('song', song);
    }
    band.songs = songs;
    return band;
  }

  resetController(controller) {
    controller.title = '';
    controller.showAddSong = true;
  }
}
