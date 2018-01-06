# Paginator.js

A data container.

Provide functionality to get data by page,check if has pre or next page,and search on specified columns.

[Click to see live example](https://zhuobinggang.github.io/paginator.js/)

### How to use
Use through script tag in html
```html
<script src="./js/paginate.js"></script>
<script>
var pager = paginator.create({
    pageLength: 2,
    searchColNames: ['id','name']
})
</script>
```
Use in node
```js
const paginator = require('paginate')
const pager = paginator.create({
    pageLength: 2,
    searchColNames: ['id','name']
})
pager.pushData([
    {id: '0',name: 'Mike'},
    //...
])
```


### Example
#### Basic use
```js
const pager = paginator.create({
    pageLength: 2,
    searchColNames: ['id','name']
})

const datas = [{id: '0',name: 'Mike'},{id: '1',name: 'John'},{id: '2',name: 'Lily1'},{id: '3',name: 'Lily2'}]

pager.pushData(datas)

const pageData = pager.getDatas() //[{id: '0',name: 'Mike'},{id: '1',name: 'John'}]
const hasLast = pager.hasLast() //false
const hasNext = pager.hasNext() //true
const pageNum = pager.getPageCount() //2

pager.nextPage()
const page2Data = pager.getDatas() //[{id: '2',name: 'Lily1'},{id: '3',name: 'Lily2'}]

pager.prePage()
pager.gotoPage(1)
pager.gotoPage(2)

//...
```

#### Search
```js
const pager = paginator({
        pageLength: 2,
        searchColNames: ['id','name'],
})

const datas = [{id: '0',name: 'Mike'},{id: '1',name: 'John'},{id: '2',name: 'Lily1'},{id: '3',name: 'Lily2'}]

pager.pushData(datas)

pager.search('1')

const pageData = pager.getDatas() //[{id: '1',name: 'Mike'},{id: '2',name: 'Lily1'}]
const hasLast = pager.hasLast() //false
const hasNext = pager.hasNext() //false
const pageNum = pager.getPageCount() //1
```
