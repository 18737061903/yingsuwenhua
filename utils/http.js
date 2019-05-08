// isAuth: 0没有权限 1有权限
// 1、首页
// / Index / index   首页分类列表 and banner列表
// / Index / indexCase 首页案例列表  （分页 page页码 row 条数）
// /Index/addBanner 添加首页banner   banners（格式类似提交详情时的imgs）banner：[{url:值},{url:值}]
// /Index/delBanner 删除banner    id（banner的id）
// 2、业务
 // Cate / add    添加分类   type（1、业务2、案例）pid(父级id) name（分类名称）icon（string）banner(string) 没有父级的话pid传值0  二级分类传id  接收pid
// Cate/del   //删除分类 id
// /cate / lst		左边的分类列表	type（1、业务 2、案例）
// /articles/lst	 详情列表cateId （一级分类id 如礼模的id） 
// /articles/detail  详情内容页  id(详情id)
// / articles / detailViedeoList  详情页点击查看更多视频  id(详情id)
// / articles / add    添加详情  title(详情标题)desc(详情描述)minDesc(小描述)money(金钱) isIndex(是否显示为首页 所属分类为案例时才有)cateId(分类Id)imgs（图片合集） videos（视频合集）
// /articles/edit		修改详情（只有 标题、描述、小描述、金钱、是否显示首页可 以修改）
// title(详情标题)desc(详情描述)minDesc(小描述)money(金钱) isIndex(是否显示为首页 所属分类为案例时才有)cateId(分类Id)
// / articles/del	删除详情  id(详情id)
// articles/detailVideoList  详情点击 传id
// Articles / addFile
// 3、案例
// / cate/lst	左边的分类列表	type（1、业务 2、案例）
// 其他和业务接口一样
// 4、文件
// Articles / addFile  详情id
// files / upload   上传文件(图片视频都可以)
// files/del删除详情的文件（图片or视频）  id(文件的id)