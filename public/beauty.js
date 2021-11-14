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
 /*   fenxi = document.querySelector("#fenxi"),
    beauty_button = document.querySelector("#beauty"),*/
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
		       var subscriptionKey ="24.bd656dfd4dd9d53fcbfbb030ab0309ad.2592000.1639486259.282335-25166469"
		       ;
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
		   /*     	document.getElementById("beauty").style.display = "flex";
		        	document.getElementById("fenxi").style.display = "flex";*/
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
		              	angry: "#8B0000",//红色
			            happy: "#FFB6C1",//粉色
			            sad: "#8B8378",//灰色
			            neutral: "#fff",//白色
			            fear: "#1C1C1C",//黑色
			            disgust: "#1874CD",//蓝色
			            surprise: "#FFFF00"//黄色
		              };
		              var sexList={
		              	male:"帅哥",
		              	female:"美女"
		              };
	
		              var face_shapeListhair={
					        heart:"适合的发型有 •斜刘海 •有层次感的刘海 •短发",
					        square:"总体来说发式应该遮住部分额头和脸颊，使发丝垂向两边，造成脸部窄而柔和的效果：•柔软浪漫的卷发•放弃贴头皮的超短发•长长的碎直发•长度超过下巴的BOB头也可以尝试•大侧分",
							round:"简单来说，你的目标就是让脸部看起来修长，可以消除令人不快的“短和圆”:•薄薄的、削得略尖的BOB头 •柔顺服帖、有层次感的直长发•Rihanna的锥形BOB造型•长刘海与侧分刘海",
							triangle:"适合的发型有•直发的齐刘海，•长款BOB为分不少，重要的是其长度适中。•脸部不能出现过多的垂直线条，打理时两侧要制造出蓬松卷曲，以加宽脸颊，突出圆润感•",
							oval:"可以尝试有棱角的BOB头。•斜刘海•丸子头，露出光洁的额头吧，有很优雅的女神范儿有些椭圆形脸从某个角度看上去越看越长，",
				            };

				      var face_shapeList={
				      	heart:"心形脸",
				      	square:"方形脸",
				      	round:"圆脸",
				      	triangle:"长形脸",
				      	oval:"椭圆脸",

				      }
		              Sex=sexList[trueSex];
		              Emotion=emotionList[trueEmotion];
		              age=data.result.face_list[0].age;
		              face_shape=data.result.face_list[0].face_shape.type;
		              left_weight=data.result.face_list[0].landmark72[50].x-data.result.face_list[0].landmark72[2].x;
		              left_height=data.result.face_list[0].landmark72[4].y-data.result.face_list[0].landmark72[19].y;
		              var bili=left_weight/left_height;
		              console.log(11);
		              console.log(bili);

		             document.querySelector(
		              "#haircut"
		            ).textContent = '您的脸型是'+face_shapeList[face_shape]+','+face_shapeListhair[face_shape];


		              if(Math.abs(bili.toFixed(2)*2-1)<0.1)
		              {
			             document.querySelector(
			              "#bizi"
			            ).textContent = `您的鼻脸比例非常完美，鼻翼到侧脸框的距离：眼睛正下方到下脸框的距离的黄金比例是1:2 您的比例是${(bili*2).toFixed(2)}:2`;
			           }
			          else if(bili.toFixed(2)*2-1>0.1)
			          {
			          	document.querySelector(
			              "#bizi"
			            ).textContent = `您的鼻子稍窄，鼻翼到侧脸框的距离：眼睛正下方到下脸框的距离的黄金比例是1:2 您的比例是${(bili*2).toFixed(2)}:2，请通过鼻梁高光和鼻翼鼻影调整，鼻侧影打成峭壁状`;
			          }
			          else
			          {
			          	document.querySelector(
			              "#bizi"
			            ).textContent = `您的鼻子稍宽，鼻翼到侧脸框的距离：眼睛正下方到下脸框的距离的黄金比例是1:2 您的比例是${(bili*2).toFixed(2)}:2，请通过高光调整，高光分别分布在额头的T字区域、眼眶周围和眼部下方`;
			          }
			          var meimao_head=data.result.face_list[0].landmark72[26];
			          var meimao_end=data.result.face_list[0].landmark72[22];
			          var bizi_end=data.result.face_list[0].landmark72[50];
			          var yanjiao=data.result.face_list[0].landmark72[13];
			          var meimao_endx=(bizi_end.y-meimao_head.y)*(yanjiao.x-bizi_end.x)/(bizi_end.y-yanjiao.y)+meimao_head.x;
			          console.log(22);
			          console.log(meimao_endx-meimao_end.x);
			          console.log(0.1*(meimao_head.x-meimao_end.x));
			           if(Math.abs(meimao_endx-meimao_end.x)<0.1*(meimao_head.x-meimao_end.x))
		              {
			             document.querySelector(
			              "#meimao"
			            ).textContent = `您的眉尾非常完美，鼻翼、眼角、眉尾在一条直线上`;
			           }
			          else if(meimao_endx<meimao_end.x)
			          {
			          	document.querySelector(
			              "#meimao"
			            ).textContent = `您的眉毛稍长，完美的眉尾是鼻翼、眼角、眉尾成一条直线，请通过眉笔修剪${((meimao_end.x-meimao_endx)*10/(meimao_head.x-meimao_end.x)).toFixed(2)}/10的眉尾长度`;
			          }
			          else
			          {
			          	document.querySelector(
			              "#meimao"
			            ).textContent = `您的眉毛稍短，完美的眉尾是鼻翼、眼角、眉尾成一条直线，请通过眉笔增加${((meimao_endx-meimao_end.x)*10/(meimao_head.x-meimao_end.x)).toFixed(2)}/10的眉尾长度`;
			          }

			          var yantou=data.result.face_list[0].landmark72[17];
			          var yantop=data.result.face_list[0].landmark72[15];
			          var yanfloor=data.result.face_list[0].landmark72[19];
			          var yanjiao=data.result.face_list[0].landmark72[13];
			          var yan_width=yantou.x-yanjiao.x;
			          var yan_height=yanfloor.y-yantop.y;
			          var y_bili=yan_height/yan_width;
			          console.log("眼睛比例");
			          console.log(y_bili);
			           if(Math.abs(y_bili.toFixed(2)*3-1)<0.1)
		              {
			             document.querySelector(
			              "#yanjing"
			            ).textContent = `您的眼睛比例非常完美，眼睛的上下高度：眼睛左右宽度的黄金比例是1:3 您的比例是${(y_bili*3).toFixed(2)}:3`;
			           }
			          else if(y_bili.toFixed(2)*3-1>0)
			          {
			          	document.querySelector(
			              "#yanjing"
			            ).textContent = `您的眼睛稍大，眼睛的上下高度：眼睛左右宽度的黄金比例是1:3您的比例是${(y_bili*3).toFixed(2)}:3，请通过美瞳美化`;
			          }
			          else
			          {
			          	document.querySelector(
			              "#yanjing"
			            ).textContent = `您的眼睛稍小，眼睛的上下高度：眼睛左右宽度的黄金比例是1:3 您的比例是${(y_bili*3).toFixed(2)}:3，请通过增加眼线和假睫毛增大眼睛`;
			          }

			          var mouse_top1=data.result.face_list[0].landmark72[60];
			          var mouse_top2=data.result.face_list[0].landmark72[67];
			          var mouse_floor1=data.result.face_list[0].landmark72[70];
			          var mouse_floor2=data.result.face_list[0].landmark72[64];
			          var m_bili=(mouse_top2.y-mouse_top1.y)/(mouse_floor2.y-mouse_floor1.y);
			          
			          console.log("嘴唇比例");
			          console.log(m_bili);
			           if(Math.abs(m_bili.toFixed(2)*1.4-1)<0.1)
		              {
			             document.querySelector(
			              "#zuichun"
			            ).textContent = `您的嘴唇比例非常完美，上嘴唇：下嘴唇的黄金比例是1:1.4  您的比例是${(m_bili*1.4).toFixed(2)}:1.4`;
			           }
			          else if(m_bili.toFixed(2)*1.4-1>0)
			          {
			          	document.querySelector(
			              "#zuichun"
			            ).textContent = `您的下嘴唇稍小，上嘴唇：下嘴唇的黄金比例是1:1.4 您的比例是${(m_bili*1.4).toFixed(2)}:1.4，请通过口红增加下嘴唇的厚度`;
			          }
			          else
			          {
			          	document.querySelector(
			              "#zuichun"
			            ).textContent = `您的上嘴唇稍小，上嘴唇：下嘴唇的黄金比例是1:1.4 您的比例是${(m_bili*1.4).toFixed(2)}:1.4，请通过口红增加上嘴唇的厚度`;
			          }



		              

		    
		           
		          } else {
		            alert("照片没有拍好，请重新拍!");
		          }

		          
		           
		     
          

          //情绪对应歌单
		        

	//获取情绪歌单详情
		         
		
		        })
		        .fail(function(err) {
		          alert("Error: " + JSON.stringify(err));
		        });
        });
    });
  });
})
