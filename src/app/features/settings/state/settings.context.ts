import { UserGroup } from "../../../shared/models";

export interface SettingsContext {
    errors: { message: string }[];
    showNoItemsMessage: boolean;
    showLoadingSpinner: boolean;
    userGroups: UserGroup[];
}

