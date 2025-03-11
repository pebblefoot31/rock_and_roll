import { click, fillIn } from '@ember/test-helpers';

//helping to translate the steps in a test into the language of the app
//instead of saying: "go here, click this, then fill that out"
//we say: "create a band with this name" and it can perform the correct actions
export async function createBand(name) {
  await click('[data-test-rr="new-band-button"]');
  await fillIn('[data-test-rr="new-band-name"]', name);
  await click('[data-test-rr="save-band-button"]');
}
