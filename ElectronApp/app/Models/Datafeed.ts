import { Models } from '../App'

export class Datafeed {

    _id: number;

    name: string = null;

    stars_ids: Array<number> = [];
    tags_ids: Array<number> = [];

    linkFrom: string = null;
    linkTo: string = null;
    rangeFrom: number = null;
    rangeTo: number = null;
    dateFrom: Date = null;
    dateTo: Date = null;
    textFrom: string = null;
    textTo: string = null;
    text: string = null;
    rank: number = null; // <0;5>

    marked: boolean = null;
    done: boolean = null;

    timestamp: Date = null;

    //tmp
    stars: Array<Models.Star> = [];
}