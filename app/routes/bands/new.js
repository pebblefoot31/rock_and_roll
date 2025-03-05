import Route from '@ember/routing/route';

/*this ensures that the form for entering a new band is cleared once
 * the user navigates away from the page. It does so by setting the
 * name property on a controller to an empty string ''.
 */

export default class BandsNewRoute extends Route {
  resetController(controller) {
    controller.name = '';

    /*resetting this so that the user clicking 'ok' to
     * leave one page does not persist, it ensures that they are
     * warned each time.*/

    controller.confirmedLeave = false;
  }
}
