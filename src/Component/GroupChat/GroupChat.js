import React, { useEffect, useState } from "react";
import { GroupChatField } from "./GroupChatField";
import { getLocalStorage, setLocalStorage } from "../../Common/Storage";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setGroupChat } from "../../Redux/Slice";

const GroupChat = () => {
    const dispatch = useDispatch();


    const loggedInUser = useSelector((state) => state.user.loggedInUser);
    const GroupChat = useSelector((state) => state.user.groupChat);
    const [userName, setUserName] = useState("");
    const [text, setText] = useState("");

    // const GroupChat = getLocalStorage('groupchat') ? JSON.parse(getLocalStorage('groupchat')) : [];

    const [allChat, setAllChat] = useState(GroupChat.length > 0 ? GroupChat : []);
    const [userNameId, setUserNameId] = useState(loggedInUser ? loggedInUser : 0);
    // getLocalStorage('loggedInUser') ? JSON.parse(getLocalStorage('loggedInUser')) : 0




    useEffect(() => {
        // const loggedInUser = getLocalStorage('loggedInUser') ? JSON.parse(getLocalStorage('loggedInUser')) : [];
        setUserName(loggedInUser[0]?.username)
        // const users = getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')) : [];
        // if (users.length > 0) {
        //     let currentUser = users.filter((val) => val.id === id);
        //     setUserName(currentUser[0]?.username);
        // }
    }, []);


    const handleChange = (e) => {
        setText(e.target.value);
    };


    const handleSend = () => {
        let date = new Date();
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const formattedTime = moment(date).format('HH:mm:ss');
        const data = {
            id: userNameId,
            username: userName,
            text: text,
            time: formattedTime,
            date: formattedDate
        };
        allChat.push({ ...data });
        // setLocalStorage("groupchat", allChat)
        dispatch(setGroupChat(allChat));
        setAllChat([...allChat]);
        setText("");
    };

    const handleRefresh = () => {
        setText("");
    };

    return (
        <div>
            <GroupChatField
                userName={userName}
                text={text}
                handleChange={handleChange}
                allChat={allChat}
                handleSend={handleSend}
                handleRefresh={handleRefresh}
            />
        </div>
    )
}

export default GroupChat;