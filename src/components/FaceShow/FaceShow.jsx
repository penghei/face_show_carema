import React from 'react'
import "./FaceShow.scss"
import { withRouter } from 'react-router'
import FaceCamera from './FaceShowChildren/FaceCamera/FaceCamera'
import FaceShowDetail from './FaceShowChildren/FaceShowDetail/FaceShowDetail'

function FaceShow(props) {
    return (
        <div className="faceShowMain">
            <div className="cameraBlock">
                <FaceCamera></FaceCamera>
            </div>
            <div className="exceptionBlock">
                <FaceShowDetail></FaceShowDetail>
            </div>
        </div>
    )
}
export default withRouter(FaceShow)
