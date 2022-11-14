import React, { useState, createContext, useEffect } from "react";

import AuthenticationServices from "../services/AuthenticationServices";

export const UserContext = createContext({ user: null });

export default (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        const myUser = AuthenticationServices.getCurrentUser();
        setUser(myUser);
    }, []);

    const signIn = async (data) => {
        try {
            const response = await AuthenticationServices.signIn(data);
            console.log(response);
            if (response.status === 200) {
                const userInfo = response.data.user_info;
                AuthenticationServices.getProfile(userInfo.role).then(
                    (response) => {
                        console.log(response);
                        if (userInfo.role === "candidate") {
                            const profile = {
                                ...userInfo,
                                ...response.data.profile,
                            };
                            localStorage.setItem(
                                "user",
                                JSON.stringify(profile)
                            );
                            if (profile.fullName === "") {
                                window.location.href =
                                    "/candidate/build-profile";
                            } else {
                                window.location.href = "/";
                            }
                        }
                        if (userInfo.role === "recruiter") {
                            const profile = {
                                ...userInfo,
                                ...response.data,
                            };
                            localStorage.setItem(
                                "user",
                                JSON.stringify(profile)
                            );
                            if (profile.companyName === "") {
                                window.location.href =
                                    "/recruiter/build-profile";
                            } else {
                                window.location.href = "/";
                            }
                        }
                    }
                );
            }
            console.log(response);
            return response;
        } catch (e) {
            console.error(e);
        }
    };

    const signOut = () => {
        AuthenticationServices.signOut();
        window.location.href = "/";
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            {props.children}
        </UserContext.Provider>
    );
};
