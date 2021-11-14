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
		        	
		          	if (data.result) {
		          		localStorage.setItem('returnData3', d);
		   /*     	document.getElementById("beauty").style.display = "flex";
		        	document.getElementById("fenxi").style.display = "flex";*/
		         	 document.getElementById("cover").style.display = "none";
		          		window.location.href="health3.html";
		           	
		           
	
		
			 

			
			          


		              

		    
		           
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
