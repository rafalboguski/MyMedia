import { myApp } from '../App'

export class DatafeedsRepository {

    static $incject = ['$q'];

    constructor(
        private $q: ng.IQService, ) {
    }

    public dupa: string;

}

//myApp.service('DatafeedsRepository', DatafeedsRepository);


