import React, { useState } from "react";

function ChatHook() {
    const [user, setUser] = useState({});
    return [user, setUser];
}

export default ChatHook;
