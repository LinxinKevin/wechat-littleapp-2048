Page({
	data:{
		//初始化touchstart坐标
		startPoint:[0,0],
		endPoint:[0,0]	
	},
    mytouchstart:function(e){
    	//开始触摸，获取触摸坐标点并放入数组中
    	// this.setData({startPoint:[e.changedTouches[0]["x"],e.changedTouches[0]["y"]]});
    	// this.setData({startPoint:[e.touches[0].pageX,e.touches[0].pageY]});
        // var startPoint = this.data.startPoint;
		// console.log(startPoint[0])
		this.setData({startPoint:[e.changedTouches[0].pageX,e.changedTouches[0].pageY]});
        console.log(e.changedTouches[0].pageX)
	    // console.log(e)
	  
    },
    mytouchend:function(e){
    	//结束触摸，获取触摸结束点坐标并放入数组中
    	// this.setData({endPoint:[e.changedTouches[0].pageX,e.changedTouches[0].pageY]});
    	// this.setData({endPoint:[e.changedTouches[0]["x"],e.changedTouches[0]["y"]]})
    	this.setData({endPoint:[e.changedTouches[0].pageX,e.changedTouches[0].pageY]});
      var startPoint = this.data.startPoint;
      var endPoint = this.data.endPoint ;
      //坐标变化量以结束点的坐标减去起点的坐标
      //move_x表示横坐标变化量
      var move_x = endPoint[0] - startPoint[0];
      //move_y表示纵坐标变化量
      var move_y = endPoint[1] - startPoint[1];
    	console.log('X坐标：' + move_x)
    	console.log('Y坐标: ' + move_y)
      //判断移动的方向
      console.log(e.changedTouches[0])
	  // console.log(e)
      if(move_x <= 0 ){
    		if(Math.abs(move_x)){
    			console.log('touch left move')
    		}else{
    			if(move_y >=0){
    				console.log('touch down move')
    			}
    			else{
    				console.log('touch up move')
    			}
    		}
    	}else{
    		if(Math.abs(move_x) >= Math.abs(move_y)){
    			console.log('touch right move')
    		}else{
    			if(move_y >= 0){
    				console.log('touch down move')
    			}else{
    				console.log('touch up move')
    			}
    		}
    	}

    } 
})