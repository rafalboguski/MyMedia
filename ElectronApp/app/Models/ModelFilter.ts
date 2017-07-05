export interface ModelFilter {

    ascending: boolean
    orderBy: string

    exists: any;
    exact: any;
    pattern: any;

    clear(): void;
}
