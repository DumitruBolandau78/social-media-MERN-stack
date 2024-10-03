import React, { useState } from "react";

export const UserContext = React.createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [postID, setPostID] = useState(null);
    const [following, setFollowing] = useState([]);

    function toggleFollow(uid) {
        const newFollowerList = following.includes(uid)
            ? following.filter((u) => u !== uid)
            : [...following, uid];
        setFollowing(newFollowerList ?? []);
    }

    return (
        <UserContext.Provider value={{ user, setUser, postID, setPostID, following, setFollowing, toggleFollow }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;