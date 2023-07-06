
export class SettingsInit {
    readonly type = 'INIT';
}

export class SettingsCleanup {
    readonly type = 'CLEANUP';
}

export class SettingsRefresh {
    readonly type = 'REFRESH';
}

export type SettingsEvent = SettingsInit | SettingsCleanup | SettingsRefresh;
