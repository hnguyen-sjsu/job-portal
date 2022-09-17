import React, { useState, createContext, useEffect } from "react";

import AuthenticationServices from "../services/AuthenticationServices";

export const UserContext = createContext({ user: null });

export default (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const myUser = AuthenticationServices.getCurrentUser();
		setUser(myUser);
	}, []);

	const signIn = async (data) => {
		try {
			const response = await AuthenticationServices.signIn(data);
			setUser({ ...response });
			console.log(response);
			return response;
		} catch (e) {
			console.error(e);
		}
	};

	const signOut = () => {
		AuthenticationServices.signOut();
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, signIn, signOut }}>
			{props.children}
		</UserContext.Provider>
	);
};
