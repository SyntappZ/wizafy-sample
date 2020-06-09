class Animation {
  constructor(initial, animate, transition) {
    this.initial = initial;
    this.animate = animate;
    this.transition = transition;
  }
}

const fadeIn = new Animation({ opacity: 0 }, { opacity: 1 }, {duration: 1});
const fadeInDelay = new Animation({ opacity: 0 }, { opacity: 1 }, {duration: 1, delay: 1});

export { fadeIn, fadeInDelay };
