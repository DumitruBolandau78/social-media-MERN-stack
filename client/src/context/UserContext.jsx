import React, { useState } from "react";

export const UserContext = React.createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, useFavorites] = useState(localStorage.favorites ? JSON.parse(localStorage.favorites) : []);

    return (
        <UserContext.Provider value={{ user, setUser, favorites, useFavorites }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;