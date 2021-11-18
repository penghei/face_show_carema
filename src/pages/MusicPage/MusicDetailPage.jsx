import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import MusicLyrics from '../../components/Music/MusicLyrics'
import './MusicDetailPage.scss'
import {CloseOutlined} from "@ant-design/icons"

function MusicDetailPage(props) {
    const theSong = props.selectedSongFromStore

    function backToMain() {
        props.history.push('/main/faceshow')
    }

    return (
        <div className="music-detail-main">
            {
                theSong.cover ? (<>
                    <img className="song-cover"
                         src={theSong.cover || "https://i.loli.net/2021/11/03/CM6T9AamqOUgRzb.png"}
                         alt="网易云音乐"></img>
                    <div className="songLyrics">
                        
                        <MusicLyrics></MusicLyrics>
                    </div>
                </>):<div className="replace">暂时没有正在播放的音乐哦~</div>
            }

            <div className="close-btn" onClick={backToMain}><CloseOutlined/></div>
        </div>
    )
}

const MusicDetailPageUI = connect(
    state => ({
        selectedSongFromStore: state.playingSong
    }),
)(MusicDetailPage)
export default withRouter(MusicDetailPageUI)
