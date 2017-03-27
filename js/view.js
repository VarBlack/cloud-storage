//生成结构
//渲染页面
function view(data,id){
	onOff = true;
	
	treesHtml(data,id);
	navsHtml(data,id);
	return createFilsHtml(data, id);
}

//生成侧边栏
function treesHtml(data,id){
	liftList.innerHTML = createTrees(data,id)	
	
}




//生成文件夹
function createFilsHtml(data, id){
	//找到对应ID对象下的child
	var datas = wy.getChildrenById(data, id);
	//生成child的内容
	var nodes = createFiles(datas);
//	if(nodes==''){
//		box.innerHTML= nodes;
//		box.style.background='url(img/1.png) no-repeat 0 0 /100% 100%'
//	}else{
//		box.style.background = '';
//		box.innerHTML= nodes;
//	}
	box.innerHTML= nodes;
	console.log(datas)
	return datas;
	
}

//生成面包屑导航栏
//createNav(navData(data,0))
function navsHtml(data,id){
	var parents = wy.getParentsByid(data,id);
	navs.innerHTML = createNavs(parents,id);
	
}
