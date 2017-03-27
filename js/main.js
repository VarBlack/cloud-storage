//所有的文件数据
var data = dataFiles.files;
//获取侧边栏的父级
var liftList = document.querySelector('.liftList');
//获取文件的父级
var box = document.querySelector('.folders');

//获取导航栏的父级
var navs = document.querySelector('.rightContent-left');

//获取所有的文件夹
var folders = box.getElementsByClassName('folder');
//获取导航栏的li
var lis = navs.children;
//获取树状菜单的li
var leftLis = liftList.getElementsByTagName('li');

var create = 0;
//获取切换样式按钮
var thumbnail = document.querySelector('.thumbnail');
//获取新建文件夹按钮
var newFolder = document.getElementById('new');

//获取删除
var _delete = document.getElementById('delete');



//获取全选按钮
var quanxuan = document.getElementById('quanxuan');
//获取文件夹的选中图标
var ems = box.getElementsByTagName('em');
//获取选中的文件
var folderCheckeds = box.getElementsByClassName('active');

var folderNames = box.getElementsByTagName('span');
//获取弹出框
var text = document.querySelector('.text');

//获取移动
var move = document.getElementById('move');
//获取移动盒子
var moveBox = document.getElementById('move-list');
//获取移动列表
var moveList = document.querySelector('#move-list .liftList');
//获取移动按钮
var moveBtns = document.querySelectorAll('#move-list a');
var moveHead = document.querySelector('#move-list header');

//点击重命名
var mingMing = document.getElementById('mingming');


//获取覆盖提示框
var repetition = document.getElementById('repetition');
//获取覆盖按钮
var repetitionBtns = repetition.querySelectorAll('button');


//弹出提示
function alertText(value,color){
	text.innerHTML=value;
	text.style.backgroundColor=color;
	fq.animate(text,{top:0},1000,function(){
		setTimeout(function(){
			fq.animate(text,{top:-100},1000)
		},1000)
			
	})
}

//获取ID
function getDataSetId(obj){
	return obj.dataset.id * 1;
}


var onOff = true;

var currentData = null;


currentData = view(data,create);

var moveTarget = null; //获取移动目标
var moveTargetParent = null;//获取移动目标的所有父级
var n = null; //获取移动目标的id;



