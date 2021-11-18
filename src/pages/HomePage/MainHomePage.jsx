import React from 'react'
import { Redirect,Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom'
import TheMusicPlayer from '../../components/Constant/TheMusicPlayer'
import FaceShowPage from '../FaceShowPage/FaceShowPage'
import MusicDetailPage from '../MusicPage/MusicDetailPage'
import NavList from '../../components/Constant/TheNavList'
// import WelcomePage from '../WelcomePage/WelcomePage'
import './MainHomePage.scss'

function MainHomePage(props) {
    return (
        <div id="all">
            <div id="header">
                <NavList></NavList>
            </div>
            <div id="main">
                <div id="main-block" key={props.location.key}>
                    <Router>
                        <Switch>
                            <Route path="/main/faceshow" component={FaceShowPage}></Route>
                            <Route path="/main/music" component={MusicDetailPage}></Route>
                            <Redirect to="/main/faceshow"></Redirect>
                        </Switch>
                    </Router>
                </div>
            </div>
            <div id="footer">
                <TheMusicPlayer></TheMusicPlayer>
            </div>
        </div>
    )
}
export default withRouter(MainHomePage)
