import {UserContextType} from "../models/UserContextType";
import {User} from "../models/User";
import React, {createContext, useState} from "react";

const defalutSettings: UserContextType={
    currentUser: null,
    currentUserModifier: ( user: User | null) =>{}
}

export const UserContext = createContext<UserContextType>(defalutSettings)

export const UserContextProvider = ({children}: React.PropsWithChildren) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const currentUserModifier = ( user: User | null) => {
        setCurrentUser(user)
    }

    return(
        <UserContext.Provider value={{currentUser, currentUserModifier}}>{children}</UserContext.Provider>
    )

}