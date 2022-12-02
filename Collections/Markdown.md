# 介绍
> Markdown 是一种轻量级的「标记语言」，它的优点很多，目前也被越来越多的写作爱好者，撰稿者广泛使用。看到这里请不要被「标记」、「语言」所迷惑，Markdown 的语法十分简单。常用的标记符号也不超过十个，这种相对于更为复杂的 HTML 标记语言来说，Markdown 可谓是十分轻量的，学习成本也不需要太多，且一旦熟悉这种语法规则，会有一劳永逸的效果。 

> [教程1](http://wowubuntu.com/markdown/)  
> [教程2](http://www.jianshu.com/p/1e402922ee32/)

# 标题
## h2标题
### h3标题
#### ...  
我是高阶标题
======================
我是二阶标题
----------------------


# 分割线
***
---
___


# 文字样式
- 换行 在段落后面加两个空格
- em *斜体*  
- em _斜体_  
- strong **_强调_**  
- strong __强调__

# 引用
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.  
This is the first level of quoting.
> > This is **nested blockquote**.
> ### 这是引用标题
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。

# 列表
* 无序列表标记符号：* + - 用空格与内容隔开
* 有序列表标记符号以数字开头

* 第一项
    > 这是项目内引用
+ 第二项
- 第三项

1. 第一项
1. 第二项
8. 第三项


# 代码区块
**4空格缩进或者 1个制表符**  
这是一个普通段落：

    这是一个代码区块。
    
`这是一段行内代码`


# 链接
This is [an example](http://example.com/ "Title") inline link with title.  
This is [an example](http://example.com/) inline link without title.  
[linked url] [linkedUrl0]   
[linked url] [linkedUrl1]  
[linked url] [linkedUrl2]  
[link1] [link1]  
[Yahoo][] or [MSN][].


[linkedUrl0]:http://example.com/ "linkedUrl"
[linkedUrl1]:http://example.com/ 'linkedUrl1'
[linkedUrl2]:http://example.com/ (linkedUrl2)
[yahoo]:http://search.yahoo.com/ "Yahoo Search"
[msn]:http://search.msn.com/ "MSN Search"
[google]:http://google.com/ "Google"
[link1]: http://


# 图片
![这是图片](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1964159815,1893053832&fm=58 'Bootstrap')

![picture][] ![picture][id]

[picture]:https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1964159815,1893053832&fm=58 'Bootstrap'
[id]:https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2451961680,300273053&fm=58&s=2BA7EF0283205901107588C40000D073&bpow=121&bpoh=75


# 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

***
## <<< [Notes List](../README.md)
***