			
			var wy = {};
			//寻找指定的ID的数据
			wy.getDataById = function(data,id){
				var item = null;
				for(var i=0;i<data.length;i++){
					if(data[i].id===id){
						item = data[i];
						break;
					}
					if(!item && data[i].child){
						item = this.getDataById(data[i].child,id);
						if(item){
							break;
						}
					}
				}
				
				return item;
			}
			
			
			//寻找指定的ID数据的里面子集
			wy.getChildrenById = function(data,id){
				var targetData = this.getDataById(data,id);
				if(targetData && targetData.child){
					return targetData.child;
				}
				
			}
			
			
			//通过指定的id获取到自己以及自己所有的父级
			wy.getParentsByid = function(data,id){
				var current = this.getDataById(data,id);
				var items = [];
				if(current){
				  items.push(current);
				  items = items.concat(this.getParentsByid(data,current.pid));
				}
				return items;
			}
			//找到当前层级的其它文件
			wy.getArrById = function(data,pid,id){
				var arr=wy.getChildrenById(data,pid);
				var a = wy.getDataById(data,id);
				var items = []
				for(var i=0;i<arr.length;i++){
					if(a.id!=arr[i].id){
						items.push(arr[i])
					}
				}
				return items;
			}
//			console.log(data)
//			console.log(wy.getArrById(data,0,1))