class Animation {
  constructor(initial, animate, transition) {
    this.initial = initial;
    this.animate = animate;
    this.transition = transition;
  }
}

const fadeIn = new Animation({ opacity: 0 }, { opacity: 1 }, {duration: 1});
const fadeInFast = new Animation({ opacity: 0 }, { opacity: 1 }, {duration: 0.3});
const fadeInLeft = new Animation({ opacity: 0, x: '-100px' }, { opacity: 1, x: 0 }, {duration: 1});
const fadeInRight = new Animation({ opacity: 0, x: '100px' }, { opacity: 1, x: 0 }, {duration: 1});
const fadeInUp = new Animation({ opacity: 0, y: '50px' }, { opacity: 1, y: 0 }, {duration: 1});
const fadeInDown = new Animation({ opacity: 0, y: '10vh' }, { opacity: 1, y: 0 }, {duration: 1});
const fadeInDelay = new Animation({ opacity: 0 }, { opacity: 1 }, {duration: 1, delay: 1});
const scaleUp = new Animation({ scale: 0.4 }, { scale: 1 }, {type: 'spring'});

export { fadeIn, fadeInFast, fadeInDelay, fadeInLeft, fadeInRight, fadeInUp, fadeInDown, scaleUp };
