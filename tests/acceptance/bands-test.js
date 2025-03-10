import { module, test } from 'qunit';
import { visit, click, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getPageTitle } from 'ember-page-title/test-support';

module('Acceptance | bands', function (hooks) {
  setupApplicationTest(hooks); //ensures that each test runs on fresh slate
  setupMirage(hooks); //ensures that each test runs on fresh slate

  //testing if the bands page displays bands correctly
  test('List bands', async function (assert) {
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });

    await visit('/');
    assert.equal(getPageTitle(), 'Bands | Rock & Roll with Octane');
    let bandLinks = document.querySelectorAll('.mb-2 >a');
    assert.equal(bandLinks.length, 2, 'All band links are rendered');
    assert.ok(
      bandLinks[0].textContent.includes('Radiohead'),
      'First band link contains the band name'
    );
    assert.ok(
      bandLinks[1].textContent.includes('Long Distance Calling'),
      'The other band link contains the band name'
    );
  });

  //testing whether or not we can create a band, and if creating band
  //takes user to the songs page as expected
  test('Create a band', async function (assert) {
    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');
    await click('a[href="/bands/new"]');
    await fillIn('input', 'Caspian');
    await click('button');
    await waitFor('p.text-center');

    let bandLinks = document.querySelectorAll('.mb-2 > a');
    //checking if the band links are rendered
    assert.equal(bandLinks.length, 2, 'A new band link is rendered');
    assert.ok(
      bandLinks[1].textContent.includes('Caspian'),
      'The new band link is rendered as the last item'
    );
    assert.ok(
      document
        .querySelector('.border-b-4.border-purple-400')
        .textContent.includes('Songs'),
      'The songs tab is active'
    );
  });
});
