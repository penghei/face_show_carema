import React, { useEffect, useRef, useState } from 'react'
import { CameraOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';
import { connect } from 'react-redux'
import './FaceCamera.scss'
import PubSub from 'pubsub-js';
import axios from 'axios';

function FaceCamera(props) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const StreamTrack = useRef(null)
    const [ifCarema, setIfCarema] = useState(true)
    // eslint-disable-next-line
    const [refresh,getRefresh] = useState(true)
    const playingListSelect = {
        angry: "2670463218",
        happy: "2456961456",
        sad: "2385384236",
        neutral: "2674050419",
        fear: "313617826",
        disgust: "402924168",
        surprise: "996728953"
    };
    const uploadPic = useRef(null)

    useEffect(() => {
        if (navigator.mediaDevices?.getUserMedia || navigator?.getUserMedia || navigator?.webkitGetUserMedia || navigator?.mozGetUserMedia) {
            getMedia({ video: { facingMode: "user", } }, success, error);//facingMode: "user" 为开启前置摄像头
        } else {
            message.error("您的设备不支持访问摄像头,可以直接上传图片哦")
            setIfCarema(false)
        }
    }, [])
    useEffect(()=>{
        console.log("updated")
    })
    function getMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            navigator.webkitGetUserMedia(constraints).then(success).catch(error);
        }
    }
    function success(stream) {
        StreamTrack.current = typeof stream.stop === 'function' ? stream : stream.getVideoTracks()[0];
        try {
            videoRef.current.srcObject = stream;
        } catch (error) {
            var CompatibleURL = window.URL || window.webkitURL;
            videoRef.current.src = CompatibleURL.createObjectURL(stream);
        }
        videoRef.current.play().catch(err => { })
    }
    function error(error) {
        message.error('访问摄像头失败，请检查是否授权')
    }
    function handleUpload() {
        uploadPic.current.click()
    }
    function uploadImage() {
        let context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.offsetWidth;
        canvasRef.current.height = videoRef.current.offsetHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height); //绘制当前画面，形成图片
        videoRef.current.pause(); //暂停摄像头视频流
        StreamTrack.current && StreamTrack.current.stop();
        let imgURL = canvasRef.current.toDataURL('image/jpeg', 60 / 100);
        let newUrl = imgURL.split(",")[1]
        getAIApi(newUrl)
    }
    function picToBase64() {
        let file = uploadPic.current.files[0]
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file)
        oFReader.onload = (e) => {
            let res = e.target.result
            console.log(res)
            let newUrl = res.split(",")[1]
            getAIApi(newUrl)
        }
    }
    function getAIApi(imgURL) {
        axios({
            method: 'POST',
            url: '/api/detect?access_token=24.ec99833ca00f0d306e38a1087097b69f.2592000.1639665443.282335-25166469',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                image: imgURL,
                image_type: 'BASE64',
                face_field: 'emotion'
            }
        }).then(res => {
            let emo = res.data.result.face_list[0]?.emotion.type
            if (emo) {
                for (let key in playingListSelect) {
                    if (key === emo) {
                        PubSub.publish("selectedListId", playingListSelect[key])
                        props.setEmotions(emo)
                    }
                }
            }
        }).catch(err => {
            console.log(err)
            message.error('未识别到人脸或图片拍摄错误,尝试一下重拍')
            getRefresh(!refresh)
        })
    }
    return (
        <div className="camera-main">
            {
                ifCarema
                    ? (
                    <>
                        <div className="camera-box">
                            <video id="video" crossOrigin="anonymous" autoPlay ref={videoRef}></video>
                            <span className="takePhoto" onClick={uploadImage}>
                                <CameraOutlined className="camera-btn" />
                            </span>
                        </div>
                        <canvas id="canvas" ref={canvasRef}></canvas>
                    </>)
                    :(
                    <>
                        <input type="file" ref={uploadPic} onChange={picToBase64} style={{ display: 'none' }} />
                        <Button onClick={handleUpload}>上传图片</Button>
                    </>)
            }
        </div>
    )
}

export default connect(
    state => ({
        songListFromStore: state.playingList,
    }),
    dispatch => ({
        setEmotions: (value) => dispatch({ type: 'setEmotions', data: value }),
    })
)(FaceCamera)
