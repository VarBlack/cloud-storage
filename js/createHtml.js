
//生成树状菜单
function createTrees(data,id){
	var str = '';
	for(var i=0;i<data.length;i++){
		if(data[i].checked) continue
		str+=`<li data-id = ${data[i].id} data-pid = ${data[i].pid}>
		<h2 class = 'title ${data[i].id === id? 'active':''} ${ data[i].child.length != 0? 'lin' : ''}'><i></i>${data[i].name}</h2>
		`;
		if(data[i].child&&data[i].child.length){
			str+=`<ul>${createTrees(data[i].child,id)}</ul>`
		}
		str+=`</li>`;
	}
	return str;
}


//生成文件夹
function createFiles(data){
	var str = '';
//	console.log(data)
	for(var i=0;i<data.length;i++){
		
		str+=`<div class="folder" data-id = ${data[i].id} data-pid = ${data[i].pid}>
				<em class="icon ${data[i].checked? 'active':''}"></em>
				<div class = "flie-img"></div>
				<div class = "file-name">
					<span title="${data[i].name}">${data[i].name}</span>
					<input type="text"  value="${data[i].name}" />
				</div>
				<time>${data[i].time}</time>
			  </div>	
		`;
	}
	
	return str;
	
}


//面包屑导航条
function createNavs(data,id){
	data = data.reverse();
	var str = '';
	for(var i = 0;i<data.length;i++){
		str+=`
			<li data-id='${data[i].id}' data-pid = ${data[i].pid}><span class='navs'>${data[i].name}</span></li>
		`
	}
	return str;
}
