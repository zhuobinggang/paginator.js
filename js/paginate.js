(function () {
    'use strict'

    window.Paginator = function (options) {

        //region Global references

        this.datas = []

        //Update only after datas changed
        this.total = 0
        this.pageCount = 0
        
        //Update when page changed
        this.currentIndex = 1
        
        //Update when datas changed and page changed
        this.currentPageDatas = []
        this.hasNextPage = false
        this.hasLastPage = false

        //endregion

        //Option defaults
        var defaults = {
            pageLength: 10,
        }

        //Setting
        if (options && typeof options === 'object') {
            this.setting = Object.assign({}, defaults, options)
        }

    }

    window.Paginator.prototype = {
        prePage: function () {
            //EventBus.dispatch('prepage')
            console.log('paginate.js:: prePage()')

            this.changeCurrentIndex(this.getCurrentIndex() - 1)
        },
        getCurrentIndex: function () {
            return this.currentIndex
        },
        nextPage: function () {
            //EventBus.dispatch('nextpage')
            console.log('paginate.js:: nextPage()')
            
            this.changeCurrentIndex(this.getCurrentIndex() + 1)
        },
        firstPage: function () {
            //EventBus.dispatch('firstpage')
            console.log('paginate.js:: firstPage()')
            
            this.changeCurrentIndex(1)
        },
        checkIndexValid: function (index) {
            if (index == this.currentIndex || index < 1 || index > this.pageCount)
                return false
            
            return true
        },
        lastPage: function () {
            //EventBus.dispatch('lastpage')
            console.log('paginate.js:: lastPage()')
            
            this.changeCurrentIndex(this.getPageCount())
        },
        gotoPage: function (pageIndex) {
            //EventBus.dispatch('jumpto',this,pageIndex)
            console.log('paginate.js:: gotoPage() <= ' + pageIndex)
            
            this.changeCurrentIndex(pageIndex)
        },
        getDatas: function () {
            return this.currentPageDatas
        },
        pushData: function (datas) {

            if (!(datas instanceof Array)) {
                datas = [datas]
            }

            Array.prototype.push.apply(this.datas, datas)

            this.updateDatasChanged()
        },
        updateDatasChanged: function () {
            this.total = this.datas.length
            this.pageCount = Math.floor((this.total + 1) / this.getPageLength())

            this.updateIndexChanged()
        },
        hasLast: function () {
            return this.hasLastPage
        },
        hasNext: function () {
            return this.hasNextPage
        },
        getPageCount: function () {
            return this.pageCount
        },
        changeCurrentIndex: function (index) {
            if(!this.checkIndexValid(index)) 
                return
            
            this.currentIndex = index
            console.log('ChangeCurrentIndex')
            
            this.updateIndexChanged()
        },
        updateIndexChanged: function () {
            this.updateCurrentPageDatas()
            this.updateHasLast()
            this.updateHasNext()
        },
        updateCurrentPageDatas: function () {
            var start = this.getStart()
            this.currentPageDatas = this.datas.slice(start,start + this.getPageLength())
        },
        updateHasLast: function () {
            this.hasLastPage = this.getCurrentIndex() > 1
        },
        updateHasNext: function () {
            this.hasNextPage = this.getPageCount() > this.getCurrentIndex()
        },
        getStart: function () {
            return (this.currentIndex - 1) * this.getPageLength()
        },
        getPageLength: function () {
            return this.setting.pageLength
        }
    }

    window.Paginator.prototype.constructor = window.Paginator

}())