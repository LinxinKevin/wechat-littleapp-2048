var num = new Array();
var tempnum = new Array();
for (var k=0;k<4;k++){
    num[k] = new Array();
    tempnum[k] = new Array();
    for(var j=0;j<4;j++){
        num[k][j] = 0;
        tempnum[k][j] = 0;
    }
    }
// num[0][2] = 32
// num[1][1] = 16
// num[2][2] = 2
// num[3][3] = 4
// num[1][2] = 8
var num_color = new Array();
num_color[0] = 'origin';
num_color[2] = 'num_2'; 
num_color[4] = 'num_4';
num_color[8] = 'num_8';
num_color[16] = 'num_16';
num_color[32] = 'num_32';
num_color[64] = 'num_64';
num_color[128] = 'num_128';
num_color[256] = 'num_256';
num_color[512] = 'num_512';
num_color[1024] = 'num_1024';
num_color[2048] = 'num_2048';
Page({

    data:{
    	origin:'origin',
        num_2:'num_2',
        num_4:'num_4',
        num_8:'num_8',
        num_16:'num_16',
        num_32:'num_32',
        num_64:'num_64',
        num_128:'num_128',
        num_256:'num_256',
        num_512:'num_512',
        num_1024:'num_1024',
        num_2048:'num_2048',
        score:0,
        num,
        tempnum,
        num_color,
        startPoint:[0,0],
        endPoint:[0,0]
        },
    //获取触摸时的起点坐标
    

    rnd:function(min,max){
        return min + Math.floor(Math.random()*(max - min + 1));
    },

    rndpoint:function(){
        var x = this.rnd(0,3)
        // console.log(x)
        var y = this.rnd(0,3)
        // console.log(y)
        var z = this.rnd(0,100)<80?2:4
        // console.log(z)
        var t = this.data.num;
        while(t[x][y]!=0){
            x = this.rnd(0,3);
            y = this.rnd(0,3);
            // console.log('cunzai'+ x + y)
            }
        t[x][y] = z
        this.setData({num:t})
    },  
    gamestart:function(){
        var nonum = new Array();
        for (var k=0;k<4;k++){
            nonum[k] = new Array();
            for(var j=0;j<4;j++){
                nonum[k][j] = 1024;
            }
        }
        this.setData({num:nonum});
        this.setData({tempnum:nonum});
        // this.rndpoint();
        // this.rndpoint();
        console.log('gamestart')
        // console.log(num)    
    },

    //左移函数。。。。。。。。。。。。。。。。。。。。
    leftight:function(row){
        var newrow = [0,0,0,0];
        var count = 0;
        for(var i=0;i<4;i++){
            if(row[i]!=0){
                newrow[count] = row[i];
                count++;
            }
        }
        for (var j=0;j<4;j++){
            row[j] = newrow[j];
        }
        
    },
    leftmove:function(){
        var addscore = 0;
        var cscore = this.data.score;
        var copynum = this.data.num;
        for(var i=0;i<4;i++ ){
            this.leftight(copynum[i]);
            for(var j=0;j<4;j++){
                if(copynum[i][j]!=0){
                    if(copynum[i][j]==copynum[i][j+1]){copynum[i][j]+=copynum[i][j+1];copynum[i][j+1]=0; addscore+=num[i][j];}
                }
            }
            this.leftight(copynum[i]);
        }
        cscore+=addscore;
        this.setData({score:cscore});
        this.setData({num:copynum})
        console.log('addscore:' +  addscore);
    },
//左移函数结束。。。。。。。。。。。。。。。。。。。。。。。。。

//右移函数。。。。。。。。。。。。。。。。。。。。。。。。。。。
    rightight:function(row){
         var newrow = [0,0,0,0];
        var count = 3;
        for(var i=3;i>=0;i--){
            if(row[i]!=0){
                newrow[count] = row[i];
                count--;
            }
        }
        for (var j=0;j<4;j++){
            row[j] = newrow[j];
        }
    },
    rightmove:function(){
        var addscore = 0;
        var cscore = this.data.score;
        var copynum = this.data.num;
        for(var i=0;i<4;i++ ){
            this.rightight(copynum[i]);
            for(var j=3;j>=0;j--){
                if(copynum[i][j]!=0){
                    if(copynum[i][j]==copynum[i][j-1]){copynum[i][j]+=copynum[i][j-1];copynum[i][j-1]=0; addscore+=num[i][j];}
                }
            }
            this.rightight(copynum[i]);
        }
        cscore+=addscore;
        this.setData({score:cscore});
        this.setData({num:copynum});
         console.log('addscore:' +  addscore);
    },
//右移函数结束。。。。。。。。。。。。。。。。。。。。。。。。。。。

//上移函数。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
    
    upmove:function(){
        var copynum = this.data.num;
        for(var i=0;i<4;i++)
        {
            for(var j=i;j<4;j++){
                var temp;
                temp = copynum[i][j];
                copynum[i][j] = copynum[j][i];
                copynum[j][i] = temp;
            }
        }
        var addscore = 0;
        var cscore = this.data.score;
        
        for(var i=0;i<4;i++ ){
            this.leftight(copynum[i]);
            for(var j=0;j<4;j++){
                if(copynum[i][j]!=0){
                    if(copynum[i][j]==copynum[i][j+1]){copynum[i][j]+=copynum[i][j+1];copynum[i][j+1]=0; addscore+=num[i][j];}
                }
            }
            this.leftight(copynum[i]);
        }
        cscore+=addscore;
        for(var i=0;i<4;i++)
        {
            for(var j=i;j<4;j++){
                var temp;
                temp = copynum[i][j];
                copynum[i][j] = copynum[j][i];
                copynum[j][i] = temp;
            }
        }
        this.setData({num:copynum}); 
        this.setData({score:cscore});   
         console.log('addscore:' +  addscore);
    },
//上移函数结束。。。。。。。。。。。。。。。。。。。。。。。。。。。

//下移函数。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
 
    downmove:function(){
        var copynum = this.data.num;
         for(var i=0;i<2;i++){
            for(j=0;j<4;j++){
                var temp;
                temp = copynum[i][j];
                copynum[i][j] = copynum[3-i][j];
                copynum[3-i][j] = temp;
            }
        }
        for(var i=0;i<4;i++)
        {
            for(var j=i;j<4;j++){
                var temp;
                temp = copynum[i][j];
                copynum[i][j] = copynum[j][i];
                copynum[j][i] = temp;
            }
        }
        var addscore = 0;
        var cscore = this.data.score;
        
        for(var i=0;i<4;i++ ){
            this.leftight(copynum[i]);
            for(var j=0;j<4;j++){
                if(copynum[i][j]!=0){
                    if(copynum[i][j]==copynum[i][j+1]){copynum[i][j]+=copynum[i][j+1];copynum[i][j+1]=0; addscore+=num[i][j];}
                }
            }
            this.leftight(copynum[i]);
        }
        cscore+=addscore;
        for(var i=0;i<4;i++)
        {
            for(var j=i;j<4;j++){
                var temp;
                temp = copynum[i][j];
                copynum[i][j] = copynum[j][i];
                copynum[j][i] = temp;
            }
        }
        for(var i=0;i<2;i++){
            for(j=0;j<4;j++){
                var temp;
                temp = copynum[i][j];
                copynum[i][j] = copynum[3-i][j];
                copynum[3-i][j] = temp;
            }
        }
        this.setData({num:copynum});  
        this.setData({score:cscore});
         console.log('addscore:' +  addscore);
        },
//下移函数结束。。。。。。。。。。。。。。。。。。。。。。。。。。。

//判断游戏是否结束
    gamestatu:function(){
        var copynum = this.data.num;
        var move=0;
        var i,j;
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
            if(copynum[i][j]==0) move=1;
            else if(j<3&&copynum[i][j]==copynum[i][j+1]) move=1;
            }
        }	
        
        for(j=0;j<4;j++)
        {
            for(i=0;i<3;i++)
            {
            if(copynum[i][j]==copynum[i+1][j]) move=1;	
            }
        }
        return move;
    },
    //获取触摸结束的终点坐标
    mytouchstart:function(e){
        this.setData({startPoint:[e.changedTouches[0].pageX,e.changedTouches[0].pageY]})
        var copynum = this.data.num;
        this.setData({tempnum:copynum});
    },

    mytouchend:function(e){
        
        this.setData({endPoint:[e.changedTouches[0].pageX,e.changedTouches[0].pageY]});
        var startPoint = this.data.startPoint;
        var endPoint = this.data.endPoint ;
        var startnum = this.data.tempnum;
        console.log(startnum);
        var ismove = 0;
        //坐标变化量以结束点的坐标减去起点的坐标
        //move_x表示横坐标变化量
        var move_x = endPoint[0] - startPoint[0];
        //move_y表示纵坐标变化量
        var move_y = endPoint[1] - startPoint[1];
        // console.log('X坐标：' + move_x)
        // console.log('Y坐标: ' + move_y)
        //判断移动的方向
        // console.log(e.changedTouches[0])
        if(Math.abs(move_x) > 20||Math.abs(move_y) > 20)
        {
            if(Math.abs(move_x) > Math.abs(move_y)){
                if(move_x > 0){
                    console.log('touch right move')
                    this.rightmove();
                }else {
                    console.log('touch left move')
                    this.leftmove();
                }
            }else {
                if(move_y > 0){
                    console.log('touch down move')
                    this.downmove();
                }
                else{
                    console.log('touch up move')
                    this.upmove();
                }
            }
        }else {
            console.log('no move')
        }
        var endnum = this.data.num;
        console.log(endnum);
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++){
                if(startnum[i][j]!=endnum[i][j]){
                    ismove = 1 ;
                    break;
                }
            }
        }
        var gamestatu = this.gamestatu();
        console.log("gamestatu: " + gamestatu);
        console.log("ismove: " + ismove);
        if(ismove&&gamestatu){
            this.rndpoint();
        }else{
            if(gamestatu){
                console.log("no move");
            }
            else{
                console.log("game over");
            }
        }
        console.log('score' + this.data.score)
        
    } 
})