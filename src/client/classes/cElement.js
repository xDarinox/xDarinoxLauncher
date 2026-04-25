import Structure from '../../../lib/classes/extends/Structures.js';

export default class Element extends Structure {
    constructor(tag) {
        super();
        if(tag !== '' && tag != 'root') this.element = document.createElement(tag);
        else if(tag == 'root') this.element = document.getElementById('root');
    }
}