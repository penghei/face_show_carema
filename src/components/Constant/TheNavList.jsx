import React from 'react'
import { withRouter } from 'react-router';
import { Menu } from 'antd';
import './css/TheNavList.scss'

function TheNavList(props) {

    function handleClick(e) {
        let navKey = e.key
        props.history.push(`/${navKey}`)
    }
    return (
        <div className="navlistmain">
            <div className="nav-sider"></div>
            <div className="nav-main">
                <Menu mode="horizontal" onClick={handleClick}>
                    <Menu.Item key="main">
                        主页
                    </Menu.Item>
                    <Menu.Item key="music" >
                        正在播放
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}
export default withRouter(TheNavList);