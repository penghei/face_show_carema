import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { CheckOutlined } from '@ant-design/icons';

const Faceshowdetail = (props) => {
    // eslint-disable-next-line
    const songListFromStore = props.songListFromStore
    const playingSongFromStore = props.playingSongFromStore
    const emotionFromStore = props.emotionFromStore
    const [userMsgObj, setUserMsgObj] = useState({})
    useEffect(() => {
        setUserMsgObj({
            musicName: playingSongFromStore?.name,
            emotion: emotionFromStore
        })
    }, [playingSongFromStore, songListFromStore,emotionFromStore])
    // },[])
    return (
        <div className="faceShowDetail">
            <div>
                <div>您当前的情绪:{userMsgObj.emotion || "暂未识别"}</div>
                <div>已选择适合您的播放列表<CheckOutlined /></div>
                <div>当前为您播放歌曲:{userMsgObj.musicName || "暂未识别"}</div>
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
)(Faceshowdetail)