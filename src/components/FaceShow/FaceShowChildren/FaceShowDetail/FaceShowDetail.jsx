<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import "./FaceShowDetail.scss"
import { Tag } from 'antd';
=======
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import "./FaceShowDetail.scss"
import {Tag} from 'antd';
>>>>>>> fba7083483c15454710956c0c6a09fdb045b72dd

const FaceShowDetail = (props) => {
    // eslint-disable-next-line
    const songListFromStore = props.songListFromStore
    const playingSongFromStore = props.playingSongFromStore
    const emotionFromStore = props.emotionFromStore
    const [userMsgObj, setUserMsgObj] = useState({})
<<<<<<< HEAD
    const emoTranslates = {
=======

    const emoDict = {
>>>>>>> fba7083483c15454710956c0c6a09fdb045b72dd
        angry: "生气",
        happy: "快乐",
        sad: "沮丧",
        neutral: "平静",
        fear: "害怕",
        disgust: "厌恶",
        surprise: "惊喜"
    }
<<<<<<< HEAD
    function translateEmo(emo){
        for(let key in emoTranslates){
            if(key === emo){
                return emoTranslates[key]
            }
        }
    }
=======

>>>>>>> fba7083483c15454710956c0c6a09fdb045b72dd
    useEffect(() => {
        setUserMsgObj({
            musicName: playingSongFromStore?.name,
            playList: null,
            emotion: translateEmo(emotionFromStore)
        })
    }, [playingSongFromStore, songListFromStore, emotionFromStore])
    return (
        <div className="face-show-detail">
            <div className="face-show-detail-content">
                <div>
                    您当前的情绪：<Tag color={userMsgObj.emotion ? "green" : "orange"}>{emoDict[userMsgObj.emotion] || "暂未识别"}</Tag>
                </div>
                <div>
                    推荐播放列表：<Tag
                    color={userMsgObj.emotion ? "magenta" : "orange"}>{userMsgObj.emotion ? "推荐成功" : "暂未识别"}</Tag>
                </div>
                <div>
                    当前播放歌曲：<Tag
                    color={userMsgObj.musicName ? "purple" : "orange"}>{userMsgObj.musicName || "暂未识别"}</Tag>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        songListFromStore: state.playingList,
        playingSongFromStore: state.playingSong,
        emotionFromStore: state.emotions
    }),
)(FaceShowDetail)
