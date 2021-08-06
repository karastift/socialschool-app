import React from "react";
import { UserTypes } from "../types/UserTypes";

export const Auth = React.createContext({
	setAuthenticated: undefined as unknown as (arg0: boolean) => void,
	setMe: undefined as unknown as (arg0: UserTypes) => void,
	user: undefined as unknown as UserTypes,
});