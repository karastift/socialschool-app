import React from "react";

export const Auth = React.createContext({
	setAuthenticated: undefined as unknown as (arg0: boolean) => void,
});