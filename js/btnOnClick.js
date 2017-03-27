//点击事件

//点击侧边栏进入文件夹
liftList.addEventListener('click',function(e){
	var target = e.target
	fnIn(target,'title')
})
//点击文件夹进入文件夹
box.addEventListener('dblclick',function(e){
	var target = e.target
	fnIn(target,'folder','flie-img')
})
//点击面包屑进入文件夹
navs.addEventListener('click',function(e){
	var target = e.target
	fnIn(target,'navs')
})

//进入文件
function fnIn(target,cls1,cls2){
	
	if(!onOff) return;
		removeChecked();
		if(target.classList.contains(cls1)||target.classList.contains(cls2)){
			
			var n = Number(target.parentNode.dataset.id||target.dataset.id);
			if(create == n) return;	
			create = n;
			currentData = view(data,create)
			
		}
		
	
	
}



//点击删除
_delete.onclick = function(){
	if(!onOff) return;
	if(folderCheckeds.length==0){
		alertText('请选中文件','#ef8989')
	}else{
		delete_()
	}
		
	
}
//删除
function delete_(){
	for(var i = 0;i<currentData.length;i++){
		if(currentData[i].checked){
			currentData.splice(i,1);
			i--;
		}
	}
	currentData = view(data,create);
	removeChecked();
	alertText('删除成功','#20f2cd');
}

//点击重命名
mingMing.onclick = function(){
	if(!onOff) return;
		
		if(!folderCheckeds.length){
			alertText('请选中文件','#ef8989')
		}
		if(folderCheckeds.length>1){
			
			alertText('请选中一个文件','#ef8989')
		}
		if(folderCheckeds.length==1){
			var id = getDataSetId(folderCheckeds[0])
			console.log(id)
			names(folderCheckeds[0],id,currentData)
		}
	
	
}



//命名函数
function names(item,id,currentData){
		onOff = false;
		item.classList.add('mingming');
		var input = item.querySelector('input');
		var span = item.querySelector('span');
		
		var a = wy.getDataById(currentData,id);
		
		input.focus();
		input.select();
		
		input.onblur = function(){
			this.value = this.value.trim();
			if(this.value == ''|| this.value==a.name){
				this.value = span.innerHTML;
				alertText('取消重命名','#ef8989');
			}else if(!canUseName(currentData,this.value)){
				input.focus();
				input.select();
				alertText('名字重复了','#ef8989');
				return;
			}else{
				wy.getDataById(data,id).name = span.innerHTML = this.value;
			}
			
			item.classList.remove('mingming');
			a.checked = false;
			currentData = view(data,create)
			alertText('重命名成功','#20f2cd');
			onOff = true;
			console.log(currentData)
		}	
}

//点击名字重命名
box.addEventListener('dblclick',function(e){
	if(!onOff) return;
	removeChecked();
	var target = e.target;
	
	if(target.nodeName.toUpperCase() ==='SPAN'){
		var parent = target.parentNode.parentNode;
		var id = getDataSetId(parent)
		names(parent,id,currentData)
	}
	
	
	
})
var prev=null;
//点击移动
move.onclick = function(){

	if(folderCheckeds.length==0){
		alertText('请选中文件');
	}else if(create == 0 & folderCheckeds.length == currentData.length){
		alertText('没有可以移动的位置','#ef8989');
	}else {
		moveList.innerHTML = createTrees(data,create);
		onOff = false;
		fq.animate(moveBox,{top:130},1000,'elasticOut')
		prev = moveList.firstElementChild.firstElementChild;
	}
	
}
drapEle(moveHead, moveBox, true)

//点击移动列表
moveList.addEventListener('click',function(e){
	var target = e.target;
	if(target.nodeName.toUpperCase() ==='H2'){
//		prev.classList.remove('active');
//		target.classList.add('active');
//		prev = target;
		
//		if(target.nextElementSibling){
//			target.nextElementSibling.classList.toggle('hid');
//		}
		n = getDataSetId(target.parentNode)
		moveList.innerHTML = createTrees(data,n);
		moveTarget = wy.getDataById(data,n);
		moveTargetParent = wy.getParentsByid(data,n);
		console.log(moveTarget)
	}
})

//点击确定
moveBtns[0].onclick = function(){
	if(!moveTarget){
		alertText('请选择移动位置','#ef8989');
	}else if(!move1(currentData,moveTargetParent)){
		alertText('不能移动到自己或自己的子级','#ef8989');
	}else if(n==create){
		alertText('不能移动到本来的位置','#ef8989');
	}else if(!moveName(currentData,moveTarget.child)){ //有同名文件
		repetition.style.display = 'block';
		//点击确定覆盖文件
		repetitionBtns[0].onclick = function(){
			fugaiFolder(currentData,moveTarget.child);
			moveFolder(currentData,moveTarget);
			currentData = view(data,create);
			fq.animate(moveBox,{top:-450},500,function(){
				moveBox.style.left='';
				alertText('移动完成','#20f2cd');
			})
			repetition.style.display = '';
			onOff = true;
			moveTarget = moveTargetParent = null;
		}
		//点击取消移动
		repetitionBtns[1].onclick = function(){
			repetition.style.display = '';
			fq.animate(moveBox,{top:-450},500,function(){
				moveBox.style.left='';
				alertText('取消','#ef8989');
			});
			onOff = true;
			removeChecked();
			moveTarget = moveTargetParent = null;
		}
		
	}else{
		moveFolder(currentData,moveTarget);//移动文件
		currentData = view(data,create);
		fq.animate(moveBox,{top:-450},500,function(){
				moveBox.style.left='';
				alertText('移动完成','#20f2cd');
			})
		onOff = true;
		moveTarget = moveTargetParent = null;
	}
	
	
}

//点击取消{
	moveBtns[1].onclick = function(){
		fq.animate(moveBox,{top:-450},500,function(){
				moveBox.style.left='';
				alertText('取消','#ef8989');
			})
		onOff = true;
}
	
//判断移动的是自身的子级吗
function move1(currentData,moveTargetParent){
	for(var i =0;i<currentData.length;i++){
		if(currentData[i].checked){
			for(var j = 0;j<moveTargetParent.length;j++){
				if(currentData[i] == moveTargetParent[j]){
					return false;
				}
			}
		}
	}
	return true;
}

function moveName(currentData,moveTarget){
	for(var i =0;i<currentData.length;i++){
		if(currentData[i].checked){
			if(!canUseName(moveTarget,currentData[i].name)){
				return false;
			}
		}
	}
	return true;
}
//移动文件
function moveFolder(currentData,obj){
	for(var i = 0;i<currentData.length;i++){
		if(currentData[i].checked){
			currentData[i].pid = obj.id;
			currentData[i].checked = false;
			moveTarget.child.push(currentData.splice(i,1)[0]);
			i--;
		}
	}
	
}

//覆盖文件
	function fugaiFolder(currentData,objChildren){
		for(var i=0;i<currentData.length;i++){
			if(currentData[i].checked){
				for(var j =0;j<objChildren.length;j++){
					if(currentData[i].name === objChildren[j].name){
						currentData[i].pid = objChildren[j].pid;
						currentData[i].checked = false;
						objChildren[j] = currentData.splice(i,1)[0];
						i--;
						break;
					}
				}
			}
		}
	}

//清除选中
function removeChecked(){
	quanxuan.checked =false;
	for(var i=0;i<currentData.length;i++){
		folders[i].classList.remove('active')
		currentData[i].checked = false;
	}
}



//鼠标选框
box.onmousedown = function(e){
	
	if(!onOff) return;
	if(e.buttons!==1) return;
	e.preventDefault();
	
	var target = e.target;
	if(!target.classList.contains('folders')){
		return ;
	}
	var x = e.pageX;
	var y = e.pageY;
	var div = document.createElement('div');
	div.className = 'xuankuang';
	box.appendChild(div);
	box.onmousemove = function(e){
		
		div.style.width = Math.abs(e.pageX - x) +'px';
		div.style.height = Math.abs(e.pageY - y) +'px';
		div.style.left = Math.min(e.clientX - fq.getRect(box,'left'),x - fq.getRect(box,'left'))+'px';
		div.style.top = Math.min(e.clientY - fq.getRect(box,'top'),y - fq.getRect(box,'top'))+'px';
		
		//碰到文件时
		pengzhuang(div,folders,currentData)
		
	}
	document.onmouseup = function(e){
		box.onmousemove = this.onmouseup = null;
		box.removeChild(div);
	}
}
//碰撞检测
function pengzhuang(div,folders,data){
	for(var i =0;i<folders.length;i++){
		if(fq.duang(div,folders[i])){
			folders[i].classList.add('active');
			data[i].checked = true;
		}else{
			if(folders[i].classList.contains('active')){
				folders[i].classList.remove('active');
				data[i].checked = false;
			}
			
		}
	}
	if(checkeds(data)){
		quanxuan.checked=true;
	}else{
		quanxuan.checked=false;
	}
}





//拖拽文件
function drapEle(eleDown, eleMove, scope){
      eleDown.onmousedown = function (e){
        e.preventDefault();
        var dx = e.pageX - fq.getRect(eleMove, 'left');
        var dy = e.pageY - fq.getRect(eleMove, 'top');
        document.onmousemove = function (e){
          var l = e.pageX - dx - fq.getRect(eleMove.offsetParent, 'left');
          var t = e.pageY - dy - fq.getRect(eleMove.offsetParent, 'top');
          
          if(scope){
            l = l <=0 ? 0 : l;
            t = t <=0 ? 0 : t;
            l = l > eleMove.offsetParent.clientWidth - eleMove.offsetWidth ? eleMove.offsetParent.clientWidth - eleMove.offsetWidth : l;
            t = t > eleMove.offsetParent.clientHeight - eleMove.offsetHeight ? eleMove.offsetParent.clientHeight - eleMove.offsetHeight : t;
          }
          
          eleMove.style.left = l + 'px';
          eleMove.style.top = t + 'px';
        };
        document.onmouseup = function (){
          this.onmouseup = this.onmousemove = null;
        }
      };
    }
console.log(thumbnail)
thumbnail.onclick = function(){
	if(box.classList.contains('box')){
		box.classList.remove('box');
		box.classList.add('box-time');
	}else{
		box.classList.remove('box-time');
		box.classList.add('box');
	}
}
