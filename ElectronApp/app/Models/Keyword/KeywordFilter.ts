import { ModelFilter } from '../ModelFilter'

export class KeywordFilter extends ModelFilter<KeywordProperties> {

    constructor() {
         super()
        this.clear();
    }

    clear() {
        super.clear();
        this.exists = new KeywordProperties();
        this.exact = new KeywordProperties();
        this.pattern = new KeywordProperties();

        this.orderBy = 'id';
    }
}
 
export class KeywordProperties {
    id: number | boolean | null = null;
    value: string | boolean | null = null;
}