---
title: WeChat App Game 2048
date: 2017-03-08 22:19:25
tags:
---

#微信小程序2048写作

##绘制游戏的界面（wxss）
###4*4的方格
#### 方格原始的颜色
#####方格的背景
######各个数字所带的颜色和数字的大小属性

```css
 .origin{
	width: 150rpx;
    min-height: 150rpx;
    margin: 10rpx;
    text-shadow: 0 0px 0px rgba(0, 0, 0, .3);
    border-radius:0px;
    text-align: center;
    color: white;
    line-height: 150rpx; 
    background: #ccc0b2;
}
```

##将游戏的界面绘制到界面中（wxml）
####4个方格为一个view框架 横向排列 

```css
.view_row{
	display:flex;
	flex_direction:row;
}
```
####以js中data的数据做为方块的数字并且动态的显示数字的方块的颜色


```css
<view class = "view_row">
<view class = "{{num_color[num[0][0]]}}">{{num[0][0]}}</view>
<view class = "{{num_color[num[0][1]]}}">{{num[0][1]}}</view>
<view class = "{{num_color[num[0][2]]}}">{{num[0][2]}}</view>
<view class = "{{num_color[num[0][3]]}}">{{num[0][3]}}</view>
</view>
```

#### 将页面的整体作为一个view使得手指或鼠标触控时可以使用整个布局


```css
<view class = "BGC" bindtouchstart = 'mytouchstart' bindtouchend = "mytouchend">
```

####整体架构

```html
<BGC>

<ROW1>
<block1>
<block2>
<block3>
<block4>
</ROW1>

<ROW2>...</ROW2>
<ROW3>...</ROW3>
<ROW4>...</ROW4>
</BGC>
```
    
## 函数执行框架文件（js）
#### data定义：
1 num : 作为整个2048的数组
2 tempnum ： 作为代替的数组（可实现功能：撤销功能）
3 startpoint,endpoint : 鼠标或手指的接触的起点和结束点的坐标
####判断移动方向函数：mytouchend( )

```javascript
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
        var move_y = endPoint[1] - startPoint[1]
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
```
####生成随机数和随机位置
1 rnd 生成随机数（min~max之间的随机整数）
2 rndpoint 生成随机点和随机数（生成2和4的比例为4:1）

```javascript
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
```
####移动数组的变化函数
1 leftmove( ):
2 rightmove( ):
3 ...
 

```javascript
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
```

####判断游戏的状态：gamestatu（）

```javascript
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
```

