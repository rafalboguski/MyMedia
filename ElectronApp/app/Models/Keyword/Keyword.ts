export class Keyword {

    constructor(value: string) {
        this.value = value.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // remove whitesppaces at start and end
    }

    id: number = null;
    value: string = null;
}