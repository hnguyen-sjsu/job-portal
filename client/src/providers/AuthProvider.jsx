import React, { useState, createContext } from "react";
import { useEffect } from "react";
import AuthenticationServices from "../services/AuthenticationServices";

export const UserContext = createContext({ user: null });

export default (props) => {
	const [user, setUser] = useState(null);

	const signIn = async (data) => {
		console.log("Signing In...");
		console.log(data);
		AuthenticationServices.signIn(data).then((response) => {
			console.log(response);
			setUser({ ...response });
		});
	};

	const logOut = () => {
		console.log("Logging Out...");
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, signIn, logOut }}>
			{props.children}
		</UserContext.Provider>
	);
};
