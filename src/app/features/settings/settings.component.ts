import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsCleanup, SettingsInit, SettingsMachineService, SettingsRefresh } from "./state";
import { from, map } from "rxjs";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    public state$ = from(this.settingsMachine.state$);

    public showNoItemsMessage$ = from(this.settingsMachine.showNoItemsMessage$);
    public userGroups$ = from(this.settingsMachine.userGroups$);

    public errors$ = from(this.settingsMachine.errors$);
    public hasErrors$ = from(this.errors$).pipe(map(errors => (errors || []).length > 0));


    constructor(private settingsMachine: SettingsMachineService) {
    }

    ngOnInit(): void {
        this.settingsMachine.send(new SettingsInit());
    }

    ngOnDestroy(): void {
        this.settingsMachine.send(new SettingsCleanup());
    }

    refresh(): void {
        this.settingsMachine.send(new SettingsRefresh());
    }
}
