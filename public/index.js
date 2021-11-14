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
    fenxi = document.querySelector("#fenxi"),
    beauty_button = document.querySelector("#beauty"),
    yanzhi=document.querySelector("#yanzhi");
    jingzhui=document.querySelector("#jingzhui");
    imgData = "";

	fenxi.addEventListener("click", function() {
		window.location.href="face-anays.html";
	});
	beauty_button.addEventListener("click", function() {
		window.location.href="data-anays.html";
	});
	yanzhi.addEventListener("click", function() {
		window.location.href="beauty.html";
	});
	jingzhui.addEventListener("click", function() {
		window.location.href="health1.html";
	});
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
		       var subscriptionKey ="24.bd656dfd4dd9d53fcbfbb030ab0309ad.2592000.1639486259.282335-25166469";
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
			           	face_field:"emotion,age,beauty,gender,landmark,expression,quality,face_type,race,face_shape",
			            image: str,
		            }
		           
		        })
		        .done(function(data) {
		        	console.log(data.result);
		        	var d=JSON.stringify(data.result);
		        	console.log(d);
		        	localStorage.setItem('returnData', d);
		        	document.getElementById("beauty").style.display = "flex";
		        	document.getElementById("fenxi").style.display = "flex";
		        	document.getElementById("yanzhi").style.display = "flex";
		        	document.getElementById("jingzhui").style.display = "flex";
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
		              var colorList={
		              	angry: "#F08080",//红色
			            happy: "#FFB6C1",//粉色
			            sad: "#8B8378",//灰色
			            neutral: "#ADD8E6",//白色
			            fear: "#8A2BE2",//黑色
			            disgust: "#7FFFAA",//蓝色
			            surprise: "#F0E68C"//黄色
		              };
		              var sexList={
		              	male:"帅哥",
		              	female:"美女"
		              }
		              Sex=sexList[trueSex];
		              Emotion=emotionList[trueEmotion];
		              age=data.result.face_list[0].age;
		              color=colorList[trueEmotion];
		              document.querySelector(
		              "#particles-js"
		            ).style.backgroundColor=color;
	
		            document.querySelector(
		              "#emotion"
		            ).textContent = ` ${Sex}，你的情绪被识别为: ${Emotion}`;
		                document.querySelector(
		              "#face_age"
		            ).textContent = `你的年龄大概为: ${age}`;

		              particlesJS(
							  "particles-js",

							  {
							    particles: {
							      number: {
							        value: 45,
							        density: {
							          enable: true,
							          value_area: 800
							        }
							      },
							      color: {
							        value: "#ababab"
							      },
							      shape: {
							        type: "circle",
							        stroke: {
							          width: 0,
							          color: "#0000CD"
							        },
							        polygon: {
							          nb_sides: 5
							        },
							        image: {
							          src: "img/github.svg",
							          width: 100,
							          height: 100
							        }
							      },
							      opacity: {
							        value: 0.8,
							        random: false,
							        anim: {
							          enable: false,
							          speed: 1,
							          opacity_min: 0.1,
							          sync: false
							        }
							      },
							      size: {
							        value: 5,
							        random: true,
							        anim: {
							          enable: false,
							          speed: 40,
							          size_min: 0.1,
							          sync: false
							        }
							      },
							      line_linked: {
							        enable: true,
							        distance: 150,
							        color: "#000",
							        opacity: 0.4,
							        width: 1
							      },
							      move: {
							        enable: true,
							        speed: 6,
							        direction: "none",
							        random: false,
							        straight: false,
							        out_mode: "out",
							        attract: {
							          enable: false,
							          rotateX: 600,
							          rotateY: 1200
							        }
							      }
							    },
							    interactivity: {
							      detect_on: "canvas",
							      events: {
							        onhover: {
							          enable: true,
							          mode: "repulse"
							        },
							        onclick: {
							          enable: true,
							          mode: "push"
							        },
							        resize: true
							      },
							      modes: {
							        grab: {
							          distance: 400,
							          line_linked: {
							            opacity: 1
							          }
							        },
							        bubble: {
							          distance: 400,
							          size: 40,
							          duration: 2,
							          opacity: 8,
							          speed: 3
							        },
							        repulse: {
							          distance: 200
							        },
							        push: {
							          particles_nb: 4
							        },
							        remove: {
							          particles_nb: 2
							        }
							      }
							    },
							    retina_detect: true,
							    config_demo: {
							      hide_card: false,
							      background_color: "#b61924",
							      background_image: "",
							      background_position: "50% 50%",
							      background_repeat: "no-repeat",
							      background_size: "cover"
							    }
							  }
							);
		              
		              
		          } else {
		            alert("照片没有拍好，请重新拍!");
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
		              //从歌单随机抽取歌曲播放
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
		                  var musciURL = res.data[0].url;
		                  audioObj = document.querySelector("#audio");
		                  document.getElementById("music_cover").style.display = "flex";
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
})
