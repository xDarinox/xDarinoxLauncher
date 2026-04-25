import fmt from '../../utils/libfmt.js';

let Animation = class {
    fadeInColor() {
        return 'setPopupShadow'
    }

    fadeOutColor() {
        return 'unsetPopupShadow'
    }

    fadeInFromLeft() {
        return 'setMoveFromLeft'
    }

    fadeInToLeft() {
        return 'setMoveToLeft'
    }

    fadeInScale() {
        return 'setPopupScale'
    }

    fadeOutScale() {
        return 'unsetPopupScale'
    }

    fadeInFromTop(tag) {
        return fmt('setMoveFromTop%03i', tag)
    }

    fadeInToTop(tag) {
        return fmt('setMoveToTop%03i', tag)
    }
}
export default new Animation