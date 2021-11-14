$(function() {
  var videoProps = {
    video: {}
  };
  var p = navigator.mediaDevices.getUserMedia(videoProps);
  p.then(function(mediaStream) {
    var video = document.querySelector("video");
    console.log(mediaStream);
    video.srcObject=mediaStream;
  });
  p.catch(function(err) {
    console.log(err.name);
  });

  var canvas = document.querySelector("#canvas"),
    context = canvas.getContext("2d"),
    snap = document.querySelector("#snap"),
    imgData = "";

  snap.addEventListener("click", function() {
    document.getElementById("cover").style.display = "flex";
    context.drawImage(video, 0, 0, 640, 480);
    // 获取情绪
    canvas.toBlob(function(blob) {
      	console.log(blob);
      	function blobToDataURL(blob, callback) {
		    let a = new FileReader();
		    a.onload = function (e) { callback(e.target.result); }
		    a.readAsDataURL(blob);
		}
		blobToDataURL(blob, function (dataurl) {
		//console.log(dataurl);
		//return dataurl
				var str=dataurl.slice(22);
		
				console.log(str);
		       var subscriptionKey = "24.bd656dfd4dd9d53fcbfbb030ab0309ad.2592000.1639486259.282335-25166469";
		        var uriBase =
		            "https://aip.baidubce.com/rest/2.0/face/v3/detect";
		         var params = {
		            "returnFaceId": "true",
		            "returnFaceLandmarks": "false",
		            "returnFaceAttributes":
		                "age,gender,headPose,smile,facialHair,glasses,emotion," +
		                "hair,makeup,occlusion,accessories,blur,exposure,noise"
		        };
		          $.ajax({
		            url: uriBase + "?access_token=" + subscriptionKey,

		            // Request headers.
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    

		            type: "POST",
		             // Request body.
		            data:{
			           	image_type:"BASE64",
			           	face_field:"emotion,age,beauty,gender",

			           
			            image: str,

		            }
		           
		        })
		        .done(function(data) {
		        	console.log(data.result);
		          document.getElementById("cover").style.display = "none";
		          if (data.result) {
		            console.log(data.result.face_list[0].emotion.type);
		 
		              trueEmotion = data.result.face_list[0].emotion.type;
		              trueSex=data.result.face_list[0].gender.type;
		              var beauty=data.result.face_list[0].beauty;
		              var emotionList={
			             angry: "生气",
			            happy: "高兴",
			            sad: "伤心",
			            neutral: "平静",
			            fear: "害怕",
			            disgust: "反感",
			            surprise: "惊讶"

		              };
		              var sexList={
		              	male:"帅哥",
		              	female:"美女"
		              }
		              Sex=sexList[trueSex];
		              Emotion=emotionList[trueEmotion];
		              age=data.result.face_list[0].age;
	
		            document.querySelector(
		              "#emotion"
		            ).textContent = ` 颜值${beauty}分的${Sex}，你的情绪被识别为: ${Emotion}`;
		                document.querySelector(
		              "#face_age"
		            ).textContent = `你的年龄大概为: ${age}`;
		          } else {
		            alert("Please take photo agian!");
		          }
          

          //情绪对应歌单
		          var playList = {
		            angry: "2670463218",
		            happy: "2456961456", 
		            sad: "2385384236",
		            neutral: "2674050419",
		            fear: "313617826",
		            disgust: "402924168",
		            surprise: "996728953"
		          };

	//获取情绪歌单详情
		          var emotionPL = playList[trueEmotion];

		          $.ajax({
		            url: `/playlist/detail?id=${emotionPL}`,
		            type: "GET",
		            success: function(res) {
		              var data = JSON.parse(res);
		              var musicList = data.playlist.tracks;
		              var tags=data.playlist.tags;

		              var randomNumber = Math.random();
		              var randomMusicIndex = Math.floor(
		                randomNumber * (musicList.length - 1)
		              );
		              var musicName = musicList[randomMusicIndex].name,
		                musicId = musicList[randomMusicIndex].id;
		              document.querySelector(
		                "#musicsort"
		              ).textContent = `为你推荐歌单: ${tags}`;
		              document.querySelector(
		                "#musicname"
		              ).textContent = `正在为你播放: ${musicName}`;
		              // 获取歌曲url
		              $.ajax({
		                url: `/music/url?id=${musicId}`,
		                type: "GET",
		                success: function(res) {
		                  var musciURL = res.data[0].url,
		                    audioObj = document.querySelector("#audio");
		                  console.log(musciURL);
		                  audioObj.src = musciURL;
		                  audioObj.addEventListener("loadeddata", function(e) {
		                    audioObj.play();
		                  });
		                }
		              });
		              console.log(musicName, musicId);
		            }
		          });
		        })
		        .fail(function(err) {
		          alert("Error: " + JSON.stringify(err));
		        });
        });
    });
  });
});
