import React, { useState } from "react";

export const UserContext = React.createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [postID, setPostID] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser, postID, setPostID }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;