import Service from '@ember/service';
import { later, schedule } from "@ember/runloop";

export default Service.extend({
  init: function() {
    this._super(...arguments);

    let els = $('[data-name="preloader"]');

    if (els.length) {
      this.set('els', els);
      schedule('afterRender', this, 'addLoadedClass');
      schedule('afterRender', this, 'removePreloader');
    }
  },

  options: null,

  addLoadedClass(className) {
    let loadedClass = this.get('options.loadedClass');

    if ('undefined' === typeof className && loadedClass === false) {
      return;
    } else {
      className = ('string' === typeof className) ? className : (loadedClass || '');
    }

    let div = this.get('els').filter('div');

    return div && div.addClass && div.addClass(className);
  },

  removePreloader(delay) {
    let removeDelay = this.get('options.removeDelay');

    if ('undefined' === typeof delay && removeDelay === false) {
      return;
    } else {
      delay = isNaN(delay) ? (removeDelay || 0) : delay;
    }

    later(this, function() {
      let els = this.get('els');
      if (els && els.remove) {
        this.get('els').remove();
        this.set('els', null);
      }
    }, delay);
  }

});
