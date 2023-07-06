export interface SettingsContext {
    errors: { message: string }[];
    showNoItemsMessage: boolean;
    userGroups: UserGroup[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    lastName: string;
    firstName: string;
}

export interface UserGroup {
    id: string;
    name: string;
    users: User[];
}
