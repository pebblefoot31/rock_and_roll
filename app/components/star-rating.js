import Component from '@glimmer/component';

/*  The functions below get the rating of the song, as passed in through the
    songs.hbs line StarRating @rating={{song.rating}}. This is then
    assigned to 'maxRating' with the get maxRating function, which sets
    the default to 5 stars if it is not provided. A stars array is initialized
    and rendered using star-rating.hbs code. */

export default class StarRatingComponent extends Component {
  get maxRating() {
    return this.args.maxRating ?? 5;
  }

  //here, we initialize an array that holds all stars and then return it
  get stars() {
    let stars = [];
    for (let i = 1; i <= this.maxRating; i++) {
      stars.push({
        rating: i,
        full: i <= this.args.rating,
      });
    }
    return stars;
  }
}
