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
            entry: 'initialize',
            invoke: {
                src: 'loadUserGroups',
                onDone: {
                    actions: assign({
                        userGroups: (_, ev) => ev.data
                    }),
                    target: 'Ready'
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

        Unloading: {},

        Ready: {
            entry: 'checkForNoItems'
        },

        Error: {
            entry: assign({
                showNoItemsMessage: () => true
            }),
            type: 'final'
        }
    },

    context: {
        errors: [],
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
