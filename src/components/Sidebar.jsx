import React, { useEffect } from "react";
import "./sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Sidebarchat from "./Sidebarchat";
import { useState } from "react";
import db from '../firebase';
import { useStateValue } from "../StateProvider";
function Sidebar({toggleMode, mode}) {
  const [rooms,setrooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    const unsuscribe = db.collection("rooms").onSnapshot((snapShot) => setrooms(
        snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
    )
    );

    return () => {
        unsuscribe();
    };
}, []);  
  return (
    <div className={`${mode === 'dark'? 'sidebard': 'sidebar'}`}>
      <div className={`sidebar__header`} >
        <Avatar src={user?.photoURL}/>
        <div className="sidebar__headerRight">
          <IconButton>
            {mode === 'dark' ? (
                 <WbSunnyTwoToneIcon onClick={toggleMode} style={{ color: 'white' }}/>
            ):(
               <Brightness4Icon style={{ color: 'black' }} onClick={toggleMode}/>
            )}
          </IconButton>
        </div>
      </div>
      <div className={`${mode === 'dark'?'sidebar__chatsd':'sidebar__chats'}`}>
      <Sidebarchat addNewChat />
         {
             rooms.map(room=>{
               return  <Sidebarchat userId id={room.id}  name={room.data.name} toggleMode={toggleMode} mode={mode}/>
             })

         }
      </div>
    </div>
  );
}

export default Sidebar;
