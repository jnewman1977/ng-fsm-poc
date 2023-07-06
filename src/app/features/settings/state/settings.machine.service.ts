import { Injectable } from "@angular/core";
import { SettingsContext } from "./settings.context";
import { SettingsEvent } from "./settings.events";
import { assign, interpret, Machine, MachineOptions } from "xstate";
import { SettingsSchema } from "./settings.schema";
import { SettingsMachineConfig } from "./settings.machine";
import { filter, from, lastValueFrom, map } from "rxjs";
import { UserService } from "../../../shared/services";

@Injectable({
    providedIn: 'root'
})
export class SettingsMachineService {
    public machineOptions: Partial<MachineOptions<SettingsContext, SettingsEvent>> = {
        services: {
            loadUserGroups: async () => lastValueFrom(this.userService.loadUserGroups())
        },
        guards: {},
        actions: {
            initialize: assign({
                userGroups: () => [],
                showNoItemsMessage: () => false
            }),
            checkForNoItems: assign({
                showNoItemsMessage: (ctx) => ctx.userGroups.length === 0
            })
        }
    };

    private machine =
            Machine<SettingsContext, SettingsSchema, SettingsEvent>(SettingsMachineConfig)
                    .withConfig(this.machineOptions);

    private service = interpret(this.machine, { devTools: true }).start();

    public state$ = from(this.service)
            .pipe(filter(state => <boolean>state.changed));

    public context$ = from(this.state$)
            .pipe(map(state => state.context));

    public errors$ = from(this.context$).pipe(map(context => context.errors));

    public showNoItemsMessage$ = from(this.context$).pipe(map(context => context.showNoItemsMessage));

    public userGroups$ = from(this.context$).pipe(map(context => context.userGroups));

    send(event: SettingsEvent): void {
        this.service.send(event);
    }

    constructor(private userService: UserService) {
    }
}
