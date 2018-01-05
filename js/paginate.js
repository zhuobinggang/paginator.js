(function (exports) {
    'use strict'

    const Paginator = function (options) {

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

        //Datas backup when searched
        this.datasBackup = []

        //endregion

        //Option defaults
        var defaults = {
            pageLength: 10,
            searchColNames: [],//Params to searched
        }

        //Setting
        if (options && typeof options === 'object') {
            this.setting = Object.assign({}, defaults, options)
        }

    }

    Paginator.prototype = {
        prePage: function () {
            this.changeCurrentIndex(this.getCurrentIndex() - 1)
        },
        getCurrentIndex: function () {
            return this.currentIndex
        },
        nextPage: function () {
            this.changeCurrentIndex(this.getCurrentIndex() + 1)
        },
        firstPage: function () {
            this.changeCurrentIndex(1)
        },
        checkIndexValid: function (index) {
            if (index == this.currentIndex || index < 1 || index > this.pageCount)
                return false

            return true
        },
        lastPage: function () {
            this.changeCurrentIndex(this.getPageCount())
        },
        gotoPage: function (pageIndex) {
            this.changeCurrentIndex(pageIndex)
        },
        getDatas: function () {
            return this.currentPageDatas
        },
        pushData: function (datas) {//Will go to first page

            if (!(datas instanceof Array)) {
                datas = [datas]
            }

            //Array.prototype.push.apply(this.datas, datas)
            this.datas.push(...datas)

            this.updateDatasChanged()
        },
        updateDatasChanged: function () {
            this.total = this.datas.length
            this.pageCount = this.calculatePageCount(this.total,this.getPageLength())

            this.currentIndex = 1//Reset to page 1
            this.updateIndexChanged()
        },
        calculatePageCount: function(count,pageLength){
            var result = Math.floor(count / pageLength)

            if(count % pageLength != 0)
                result += 1

            return result
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
            //console.log('ChangeCurrentIndex')

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
        },
        search: function (value) {
            if(!value || value.length < 1){//If search value empty
                //console.log('Search value empty')
                if(this.datasBackup.length > 0){//If backuped
                    //console.log('Search value empty and backuped')
                    this.datas = this.datasBackup
                    this.datasBackup = []//Reset datasBackup
                    this.updateDatasChanged()
                }
                return
            }

            if(this.datasBackup.length < 1){//Backup datas
                //console.log('Backup datas')
                this.datasBackup = this.datas
            }

            this.datas = this._filter(this._getValidator(value), this.datasBackup)
            this.updateDatasChanged()
            //console.log('Filtered,Please check datas')
        },
        _filter: function(fn,datas){
            var result = []
            var searchColNames = []

            if(datas.length < 1)
                return result

            //Init params by setting
            if(this.setting.searchColNames.length > 0){
                searchColNames = this.setting.searchColNames
            }else{
                searchColNames = Object.getOwnPropertyNames(datas[0])
            }

            for(var item of datas){
                for(var colName of searchColNames){
                    if(fn(item[colName]) == true){
                        result.push(item)
                        break
                    }
                }
            }

            return result
        },
        _getValidator: function (value) {
            return function(str){
                var type = typeof str
                //Can accept string,number and boolean types
                if(type === "string" || type === 'number' || type === 'boolean') {
                    return ('' + str).indexOf(value) !== -1
                }
                return false
            }
        }
    }

    Paginator.prototype.constructor = Paginator

    exports.Paginator = Paginator
})(typeof exports === 'undefined' ? this['paginator'] = {} : exports)