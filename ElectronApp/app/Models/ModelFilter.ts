export class ModelFilter<T> {

    constructor() {
        this.pagination = new PaginationFilter()
        this.clear();
    }

    ascending: boolean
    orderBy: string

    exists: T
    exact: T
    pattern: T

    pagination: PaginationFilter

    clear(): void {
        this.ascending = false;
        this.pagination.clear();
    };
}

export enum PaginationMode {
    Disabled,
    Enabled,
    Scroll
}

export class PaginationFilter {

    mode: PaginationMode

    page: number
    pageSize: number

    ItemsCount: number
    pages: number

    public calculatePages(): number {
        this.pages = Math.ceil(this.ItemsCount / this.pageSize);
        return this.pages;
    }

    clear() {
        this.mode = PaginationMode.Enabled;
        this.page = 1;
        this.pageSize = 4;
        this.ItemsCount = 0;
    }
}
