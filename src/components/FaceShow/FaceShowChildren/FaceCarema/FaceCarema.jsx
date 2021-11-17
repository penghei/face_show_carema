import React, { useRef, useState } from 'react'
import { CameraOutlined } from '@ant-design/icons';
import './FaceCamera.scss'
import axios from 'axios';

export default function FaceCarema() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const StreamTrack = useRef(null)
    const [caremaOff, setCaremaOff] = useState('')
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
        getMedia({ video: { facingMode: "user", } }, success, error);//facingMode: "user" 为开启前置摄像头
    } else {
        setCaremaOff("您的设备不支持访问摄像头")
    }

    function getMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            navigator.webkitGetUserMedia(constraints).then(success).catch(error);
        }
    }
    function success(stream) {
        console.log("访问成功");
        // eslint-disable-next-line
        StreamTrack.current = typeof stream.stop === 'function' ? stream : stream.getVideoTracks()[0]; 
        try {
            videoRef.current.srcObject = stream;
        } catch (error) {
            var CompatibleURL = window.URL || window.webkitURL;
            videoRef.current.src = CompatibleURL.createObjectURL(stream);
        }
        videoRef.current.play();
    }
    function error(error) {
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    }

    function uploadImage() {
        // let context = canvasRef.current.getContext('2d');
        // canvasRef.current.width = videoRef.current.offsetWidth;
        // canvasRef.current.height = videoRef.current.offsetHeight;
        // context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height); //绘制当前画面，形成图片
        videoRef.current.pause(); //暂停摄像头视频流
        StreamTrack.current && StreamTrack.current.stop();    // 关闭摄像头 mediaStreamTrack 是上面setMediaStreamTrack方法存储得到的
        let imgURL = canvasRef.current.toDataURL('image/jpeg', 60 / 100);  
        let newUrl = imgURL.split(",")[1]
        getAIApi(newUrl)
    }
    function getAIApi(imgURL) {
        console.log(imgURL)
        axios({
            method:'POST',
            url:'/detect?access_token=24.ec99833ca00f0d306e38a1087097b69f.2592000.1639665443.282335-25166469',
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                image:imgURL,
                image_type:'BASE64'
            }
        }).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
        // axios.get(`/api/token?grant_type=client_credentials&client_id=YCEIn6FI8qnPPdnLOCdmcunR&client_secret=G5jnihAHylyOYPLXbxsgNk4ANq3QnXGR`)
        // .then(res=>{
        //     let access = res.data.access_token;
        //     console.log(access)
        //     // 24.ec99833ca00f0d306e38a1087097b69f.2592000.1639665443.282335-25166469
        //     if(access){
                
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }
    return (
        <div className="caremaMain">
            <video id="video" crossOrigin="anonymous" width="400" autoPlay ref={videoRef}>{caremaOff}</video>
            <canvas id="canvas" ref={canvasRef}></canvas>
            <span className="takePhoto" onClick={uploadImage}>
                <CameraOutlined style={{ fontSize: '50px' }} />
            </span>
        </div>
    )
}
