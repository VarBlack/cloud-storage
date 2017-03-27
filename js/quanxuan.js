

//点击选中
box.addEventListener('click',function(e){
	if(!onOff) return;
	var target = e.target;
	if(target.classList.contains('icon')){
		var parent = target.parentNode;
		parent.classList.toggle('active');
		var checked = parent.classList.contains('active');
		
		wy.getDataById(currentData,Number(parent.dataset.id)).checked = checked;
		if(checkeds(currentData)){
			quanxuan.checked=true;
		}else{
			quanxuan.checked=false;
		}
	}
	
	
})

//判断全部选中了吗
function checkeds(data){
	
		if(!data.length){
			return false;
		}
		for(var i=0;i<data.length;i++){
			if(!data[i].checked){
				return false;
			}
		}
	
	return true;
}

//点击全部选中
quanxuan.onclick = function(){
	if(onOff){
		if(!currentData.length){
			quanxuan.checked = false;
			alertText('没有可选中的文件','#ef8989');
			return;
		}
		for(var i=0;i<folders.length;i++){
			if(quanxuan.checked){
				folders[i].classList.add('active');
				currentData[i].checked = true;
				
			}else{
				folders[i].classList.remove('active');
				currentData[i].checked = false;
				
			}
		}
	}else{
		quanxuan.checked = false;
	}

}

