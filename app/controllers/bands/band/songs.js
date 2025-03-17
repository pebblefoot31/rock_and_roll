import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { capitalize } from 'rarwe/helpers/capitalize';
/* Defining event handlers for actions to help us add a new song,
   save the song, or cancel the process. */

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @tracked sortBy = 'title';
  @tracked searchTerm = '';

  @service catalog;

  get newSongPlaceholder() {
    let bandName = this.model.name;
    return `New ${capitalize([bandName])} song`;
  }

  get matchingSongs() {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.songs.filter((song) => {
      return song.title.toLowerCase().includes(searchTerm);
    });
  }

  get sortedSongs() {
    console.log('Sorting by:', this.sortBy);
    console.log('Songs:', this.model.songs);

    let sortBy = this.sortBy;
    let isDescendingSort = false;

    //checking if there is - sign present in the sort category to determine asc/desc sort order
    if (sortBy.charAt(0) === '-') {
      sortBy = this.sortBy.slice(1);
      isDescendingSort = true;
    }

    return this.matchingSongs.sort((song1, song2) => {
      console.log('Songs: ', this.model.songs);

      if (song1[sortBy] < song2[sortBy]) {
        return isDescendingSort ? 1 : -1;
      }

      if (song1[sortBy] > song2[sortBy]) {
        return isDescendingSort ? -1 : 1;
      }
      return 0;
    });
  }

  @action
  async updateRating(song, rating) {
    song.rating = rating;
    this.catalog.update('song', song, { rating });
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

  @action
  async saveSong() {
    let song = await this.catalog.create(
      'song',
      { title: this.title },
      { band: { data: { id: this.model.id, type: 'bands ' } } }
    );

    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  }

  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
