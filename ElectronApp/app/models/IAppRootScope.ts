interface IAppRootScope extends ng.IRootScopeService {

    settings: Settings;
    settingsPromise: Promise<Settings>;

    activeController;

    alerts?: Alert[];
}