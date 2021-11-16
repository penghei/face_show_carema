import React from 'react'
import { withRouter } from 'react-router'
import FaceCarema from './FaceShowChildren/FaceCarema/FaceCarema'
import FaceShowDetail from './FaceShowChildren/FaceShowDetail/FaceShowDetail'

function FaceShow(props) {
    return (
        <div>
            <div className="cameraBlock">
                <FaceCarema></FaceCarema>
            </div>
            <div className="exceptionBlock">
                <FaceShowDetail></FaceShowDetail>
            </div>
        </div>
    )
}
export default withRouter(FaceShow)