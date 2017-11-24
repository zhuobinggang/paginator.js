(function(){

    'use strict'

    window.Paginator = function (options) {

        //Global references
        this.datas = []

        //Option defaults
        var defaults = {
            pageLength: 10,
        }

        //Setting
        if(options && typeof options === 'object'){
            this.setting = Object.assign({},defaults,options)
        }

    }

    window.Paginator.prototype.pushData = function (datas){

        if(!(datas instanceof Array)){
            datas = [datas]
        }

        Array.prototype.push.apply(this.datas,datas)

        //Emit event
        eventBus.emit('datapush')

    }

    window.Paginator.prototype.prePage = function () {
        eventBus.emit('prepage')
    }

    window.Paginator.prototype.nextPage = function () {
        eventBus.emit('nextpage')
    }

    window.Paginator.prototype.firstPage = function () {
        eventBus.emit('firstpage')
    }

    window.Paginator.prototype.lastPage = function () {
        eventBus.emit('lastpage')
    }

    window.Paginator.prototype.jumpToPage = function (pageIndex) {
        eventBus.emit('jumpto',pageIndex)
    }

}())