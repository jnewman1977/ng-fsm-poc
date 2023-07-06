import { User } from "./user";

export interface UserGroup {
    id: string;
    name: string;
    users: User[];
}
