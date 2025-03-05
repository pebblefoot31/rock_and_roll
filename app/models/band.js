import { tracked } from '@glimmer/tracking';

//redefining domain models in our models directory instead of in the route
export default class Band {
  @tracked name;
  @tracked songs;

  constructor({ id, name, songs, description }, relationships = {}) {
    this.id = id;
    this.name = name;
    this.songs = songs || [];
    this.relationships = relationships;
    this.description = description;
  }
}
