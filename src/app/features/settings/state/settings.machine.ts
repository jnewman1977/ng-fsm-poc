import { assign, MachineConfig } from 'xstate';
import { SettingsContext } from './settings.context';
import { SettingsSchema } from "./settings.schema";
import { SettingsEvent } from "./settings.events";

export const SettingsMachineConfig: MachineConfig<SettingsContext, SettingsSchema, SettingsEvent> = {
    id: 'settings',
    initial: 'Idle',

    states: {
        Idle: {},

        Loading: {
            entry: [
                'initialize',
                'showLoadingSpinner'
            ],
            invoke: {
                src: 'loadUserGroups',
                onDone: {
                    actions: assign({
                        userGroups: (_, ev) => ev.data
                    }),
                    target: 'DisplayItems'
                },
                onError: {
                    actions: assign({
                        errors: (ctx, ev) => [
                            ...ctx.errors,
                            {
                                message: 'A problem occurred while loading the data from the server.',
                                details: ev.data
                            }
                        ]
                    }),
                    target: 'Error'
                }
            }
        },

        Unloading: {
            entry: 'initialize'
        },

        DisplayItems: {
            entry: [
                'hideLoadingSpinner',
                'checkForNoItems'
            ]
        },

        Error: {
            entry: [
                'hideLoadingSpinner',
                'showNoItemsMessage'
            ]
        }
    },

    context: {
        errors: [],
        showLoadingSpinner: false,
        showNoItemsMessage: false,
        userGroups: []
    },

    on: {
        INIT: {
            target: 'Loading'
        },
        CLEANUP: {
            target: 'Unloading'
        },
        REFRESH: {
            target: 'Loading'
        }
    },

    predictableActionArguments: true,
    preserveActionOrder: true,
};
