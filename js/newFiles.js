//新建文件夹


newFolder.onclick = function(){
	
	
	if(!onOff) return;
	console.log(currentData)
		onOff = false;
		
		removeChecked();
		
		var div = document.createElement('div');
		div.className='folder mingming';
		div.innerHTML=`
			<em class="icon"></em>
			<div class = "flie-img"></div>
			<div class = "file-name">
				<input type="text"  value="" />
			</div>
			<time>${time()}</time>
		`;
		
		box.insertBefore(div,box.firstElementChild)
		var input_ = div.querySelector('input');
		input_.focus();//获取焦点
		//当失去焦点时
		input_.onblur = function(){
			this.value = this.value.trim();
			var length = this.value.length;
			var n = 1;
			if(this.value===''){
				box.removeChild(div);
				onOff = true;
			}else{
				newFolders(currentData,this.value,n,length)
			}
		}
	
	
	
	
}	
//判断名字是否重复
function canUseName(data,value){
	
	for(var i=0;i<data.length;i++){
		if(value === data[i].name){
			return false;
		}
	}
	return true;
}


function newFolders(currentData,value,n,length){
	
	if(canUseName(currentData,value)){
		var newFolder = {
				name : value,
				type:'folder',
				checked:false,
				id : ++dataFiles.maxId,
				pid : create,
				time:time(),
				child:[]
			};
			
		currentData.unshift(newFolder);
		
		currentData = view(data,create);
		alertText('新建文件夹成功','#20f2cd');
	}else{
		
		if(value.length>length){
			value = value.substring(0,length);
			
		}
		newFolders(currentData,value+`(${++n})`,n,length)
	}
}


//获取事件
function time(){
	var currentTime = new Date();
	var currentYear = currentTime.getFullYear();
	var currentMon = currentTime.getMonth()+1;
	var currentDate = currentTime.getDate();
	var currentHours = currentTime.getHours();
	var currentMin = currentTime.getMinutes();
	var currentSec = currentTime.getSeconds();
	return currentYear+'-'+currentMon+'-'+ currentDate +' '+add(currentHours) + ':' +add(currentMin) +':' + add(currentSec);
}
//补0函数
function add(n){
	return n<10? '0'+n:''+n;
}