import React from 'react'
import {withRouter} from 'react-router';
// import { Menu } from 'antd';
import './css/TheNavList.scss'

function TheNavList(props) {

    function handleClick(e) {
        let navKey = e.target.getAttribute("href")
        props.history.push(`/${navKey}`)
    }

    return (
        <div className="nav-outer">
            {/*<div className="nav-aside"></div>*/}
            <div className="nav-main">
                <span href="home" className="nav-btn" onClick={handleClick}><i className="iconfont icon-home-fill"></i>&nbsp;回到首页</span>
                <h2 className="nav-title">音乐心情</h2>
                <span href="music" className="nav-btn" onClick={handleClick}>正在播放&nbsp;<i className="iconfont icon-voice"></i></span>
                {
                    /*
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="main">
                            主页
                        </Menu.Item>
                        <Menu.Item key="music">
                            正在播放
                        </Menu.Item>
                    </Menu>
                     */
                }
            </div>
        </div>
    )
}

export default withRouter(TheNavList);
