# Paginator.js

A data container.

Provide functionality to get data by page,check if has pre or next page,and search on specified columns.

Dependency on `window` of browser currently.

### How to use
Use through script tag in html
```html
<script src="./js/paginate.js"></script>
```
Or just copy all in paginate.js to your js file

### Example
#### Basic use
```js
const paginator = new Paginator({
        pageLength: 2,
        searchColNames: ['id','name'],
})

const datas = [{id: '0',name: 'Mike'},{id: '1',name: 'John'},{id: '2',name: 'Lily1'},{id: '3',name: 'Lily2'}]

paginator.pushData(datas)

const pageData = paginator.getDatas() //[{id: '0',name: 'Mike'},{id: '1',name: 'John'}]
const hasLast = paginator.hasLast() //false
const hasNext = paginator.hasNext() //true
const pageNum = paginator.getPageCount() //2

paginator.nextPage()
const page2Data = paginator.getDatas() //[{id: '2',name: 'Lily1'},{id: '3',name: 'Lily2'}]

paginator.prePage()
paginator.gotoPage(1)
paginator.gotoPage(2)

//...
```

#### Search
```js
const paginator = new Paginator({
        pageLength: 2,
        searchColNames: ['id','name'],
})

const datas = [{id: '0',name: 'Mike'},{id: '1',name: 'John'},{id: '2',name: 'Lily1'},{id: '3',name: 'Lily2'}]

paginator.pushData(datas)

paginator.search('1')

const pageData = paginator.getDatas() //[{id: '1',name: 'Mike'},{id: '2',name: 'Lily1'}]
const hasLast = paginator.hasLast() //false
const hasNext = paginator.hasNext() //false
const pageNum = paginator.getPageCount() //1
```
