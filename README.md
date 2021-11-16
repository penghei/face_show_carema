# 基于react+redux+react-router音乐播放器
## 组件概况
- page文件夹下是页面组件,主要是路由的页面:主要有欢迎页/主页/歌词组成
- constant文件夹下是一些固定组件,比如导航栏,侧边栏,音乐播放器和播放列表
- faceShow文件夹下是主要要编写的地方,faceCarema是摄像头组件展示的地方;faceShowDetail(随便取的名字)是详细信息展示,两个合成Faceshow组件,整体布局可以在FaceShow里边调整
- myStyle.scss是自己写的一个外部引入文件,基本可以无视
- TimeToMinute是播放器的自定义hook,也可以无视
- redux是redux文件夹,里边主要是播放列表和当前播放这几个reducer

## 一点点注意
如果会用hooks的话,尽量用函数组件+hooks
通过人脸识别ApI拿到返回值筛选之后先不写怎么调用歌曲,可以把筛选出的接口数据和对应的歌曲要求先写在文档里,后面我再调用更改