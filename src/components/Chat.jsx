import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Picker from "emoji-picker-react";
import firebase from "firebase";
import db from "../firebase";
import { useRef } from "react";
const Chat = ({toggleMode , mode}) => {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const ref = useRef(null);
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [showEmojis, setShowEmojis] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const { selectionStart, selectionEnd } = ref.current;
    // replace selected text with clicked emoji
    const newValue =
      input.slice(0, selectionStart) +
      emojiObject.emoji +
      input.slice(selectionEnd);
    setinput(newValue);
  };

  const onClickClear = async () => {
    console.log("Clear");
    db.collection('rooms')
      .doc(roomId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Typed", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };
  return (
    <div className={`${mode === 'dark' ? 'chatd' : 'chat'}`}>
      <div className={`${mode === 'dark' ? 'chat__headerd' : 'chat__header'}`}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={`${mode === 'dark' ? 'chat__headerInfod' : 'chat__headerInfo'}`}>
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className={`${mode === 'dark'? 'chat__headerRightd': 'chat__headerRight' }`}>
          <IconButton>
            {mode === 'dark'? (
              <DeleteForeverIcon onClick={onClickClear} style={{ color: 'white' }}/>
            ):(
              <DeleteForeverIcon onClick={onClickClear} style={{ color: 'black' }}/>
            )}
          </IconButton>
        </div>
      </div>

      <div className={`${mode === 'dark'? 'chat__bodyd': 'chat__body'}`}>
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat__reciver"
            }`}
          >
            <span className={`${mode === 'dark'? 'chat__named':'chat__name'}`}>{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon onClick={() => setShowEmojis(!showEmojis)} style={{ cursor:"pointer" }}/>
        {showEmojis && (
          <div className="drop">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <form>
          <input
            type="text"
            placeholder="Type a message"
            ref={ref}
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <button type="sumbit" onClick={sendMessage}>
            send a message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
