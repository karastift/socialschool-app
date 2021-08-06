import React from "react";
import { User } from "../types/User";

export const Auth = React.createContext({
	setAuthenticated: undefined as unknown as (arg0: boolean) => void,
	setMe: undefined as unknown as (arg0: User) => void,
	user: undefined as unknown as User,
});