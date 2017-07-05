import * as App from '../../App'

export class KeywordFilter implements App.Models.ModelFilter {

    constructor() {
        this.clear();
    }

    ascending: boolean
    orderBy: string

    exists: KeywordProperties;
    exact: KeywordProperties;
    pattern: KeywordProperties;

    clear() {
        this.exists = new KeywordProperties;
        this.exact = new KeywordProperties;
        this.pattern = new KeywordProperties;

        this.ascending = false;
        this.orderBy = 'id';
    }
}

export class KeywordProperties {
    id: number | boolean | null = null;
    value: string | boolean | null = null;
}