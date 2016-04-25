define("app/modules",['magix'],function(require){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
return Magix.View.extend({
    tmpl: "<div class=\"content\"><div class=\"clearfix\"><h2 id=\"download\">项目地址</h2></div><div class=\"list\"><a href=\"https://github.com/thx/magix\">https://github.com/thx/magix</a></div></div><div class=\"content\"><div class=\"clearfix\"><h2 id=\"modules\">模块定制</h2></div><h3>定制方法</h3><div class=\"list\">\n        默认Magix只有最核心的区块管理功能，其它如router、接口管理等均不内置<br />\n        通过修改tool/gulpfile.js中的extModules对象进行定制<br />\n        您只可以通过修改该对象进行可选模块的定制，可选模块列表见下方<br />\n        您也可以<span class=\"red\">参考内置模块的方案添加您的模块，并使它成为可选模块</span></div><h3>可选模块</h3><div class=\"list\"><div class=\"item\">\n            base\n            <span class=\"desc\">提供Magix.Base基类，Magix.Base中已经组合了Magix.Event</span></div><div class=\"item\">\n            cnum\n            <span class=\"desc\">Magix.Cache类中是否有num方法</span></div><div class=\"item\">\n            ceach\n            <span class=\"desc\">Magix.Cache类中是否有each方法</span></div><div class=\"item\">\n            router\n            <span class=\"desc\">是否提供Magix.Router对象，该对象主要提供地址解析和更改功能</span></div><div class=\"item\">\n            tiprouter\n            <span class=\"desc\">当页面中输入有变化用户未保存，离开页面时是否提示用户</span></div><div class=\"item\">\n            edgerouter\n            <span class=\"desc\">是否使用浏览器最新的pushState来做为router改变地址的方法</span></div><div class=\"item\">\n            service\n            <span class=\"desc\">是否提供Magix.Service对象，该对象主要提供接口管理功能</span></div><div class=\"item\">\n            resource\n            <span class=\"desc\">Magix.View类中是否有capture和release方法，当view销毁或刷新时自动处理第三方资源</span></div><div class=\"item\">\n            style\n            <span class=\"desc\">Magix.View中是否提供样式支持，仅模块首次加载时自动处理css</span></div><div class=\"item\">\n            share\n            <span class=\"desc\">在view树上共享数据的模块，子view可以获取祖先view上共享的数据，是比原来Magix.local更优的方案。全局数据共享请使用Magix.config</span></div><div class=\"item\">\n            linkage\n            <span class=\"desc\">Vframe上是否有parent,children,invoke等父子间获取数据的方法</span></div><div class=\"item\">\n            viewInit\n            <span class=\"desc\">View类上是否有init方法，推荐使用ctor方法：当view间继承时，会自动调用每个层级的ctor方法，而旧版的init并不会。如果认可旧版init的方式：由开发者自己手动调用，请选择该模块</span></div></div><h3>打包</h3><div class=\"list\">\n        在tool目录下运行gulp combine,成功后生成dist/type/magix-debug.js。再运行gulp compress即可在同目录下生成相应的压缩文件magix.js\n    </div></div><div class=\"content\"><div class=\"clearfix\"><h2 id=\"tool\">编译工具</h2></div><h3>内置占位符</h3><div class=\"list\"><div class=\"item\">\n            @filename.html\n            <span class=\"desc\">把filename.html文件的内容输出在当前位置</span></div><div class=\"item\">\n            @filename.css\n            <span class=\"desc\">把filename.css文件的内容输出在当前位置，同时修改css的类名，确保在当前项目唯一，请配合Magix.applyStyle方法使用</span></div><div class=\"item\">\n            names@filename.css\n            <span class=\"desc\">把filename.css文件中的类名映射到新类名的对象，因为编译工具会修改类名，所以通过该对象访问修改后的类名</span></div><div class=\"item\">\n            names@filename.css[s1,s2,s3]\n            <span class=\"desc\">把filename.css文件中的类名映射到新类名的对象，该对象仅包含指定的s1,s2和s3，比names@filename.css更节省资源，但书写略不方便</span></div><div class=\"item\">\n            global@filename.css\n            <span class=\"desc\">把filename.css文件的内容输出在当前位置，但不会对css的类名做任何变动</span></div><div class=\"item\">\n            ref@filename.css\n            <span class=\"desc\">引用filename.css文件的内容，但不输出在当前位置，仅使用编译后的类名<span class=\"red\">替换掉模板中的类名</span>，如果你需要访问编译后的类名，请参考names@filename.css。</span></div><div class=\"item\">\n            @filename.css:className\n            <span class=\"desc\">把filename.css中经工具编译转换后的className字符串输出在当前位置</span></div><div class=\"item\">\n            @filename.css:$prfix\n            <span class=\"desc\">获取工具编译filename.css时自动添加的前缀，并输出在当前位置</span></div><div class=\"item\">\n            @moduleId\n            <span class=\"desc\">当前文件的模块id，如app/views/default</span></div><div class=\"item\">\n            @../path 或 @x/y/z\n            <span class=\"desc\">相对路径转完整的模块路径，或完整的模块路径转相对路径</span></div></div></div><div class=\"content\"><div class=\"clearfix\"><h2 id=\"vom\">调试插件</h2></div><div class=\"list\">\n        方式一：<br />\n        在页面中直接引用http://thx.github.io/magix/assets/helper.js <br /><br />\n        方式二：<br />\n        添加以下链接到书签<br /><a href=\"javascript:void((function(d,s){s=d.createElement('script');s.src='http://thx.github.io/magix/assets/helper.js';s.charset='utf-8';d.body.appendChild(s)}(document)))\">Magix Helper</a><br />\n        然后在使用Magix的页面上点击该书签即可\n    </div></div>",
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    }
});
});