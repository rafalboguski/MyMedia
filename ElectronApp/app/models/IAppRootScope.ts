interface IAppRootScope extends ng.IRootScopeService {

    settings: Settings;
    settingsPromise: Promise<Settings>;
    
    alerts?: Alert[];
}