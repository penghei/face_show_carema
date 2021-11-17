import React, { useState } from 'react';

const Faceshowdetail = (props) => {
    // eslint-disable-next-line
    const [userMsgObj,setUserMsgObj] = useState({})
    return (
        <div className="faceShowDetail">
            <div>
               <div>您当前的情绪:{userMsgObj.emotion || "暂未识别"}</div> 
               <div>您的面部年龄:{userMsgObj.faceAge || "暂未识别"}</div> 
               <div>已选择适合您的播放列表:{userMsgObj.musicList || "暂未识别"}</div> 
               <div>当前为您播放歌曲:{userMsgObj.musicName || "暂未识别"}</div> 
            </div>
        </div>
    );
}

export default Faceshowdetail;
