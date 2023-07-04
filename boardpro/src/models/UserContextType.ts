import {User} from "./User";

export type  UserContextType = {
    currentUser: User |null
    currentUserModifier: (user: User | null ) => void
}