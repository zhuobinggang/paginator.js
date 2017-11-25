(function(){

        //Check if jQuery exist
        if(!window.jQuery){
            throw new Error('Please confirm jQuery in your path.')
        }
    
        //Init EventBus plugin
        (function (root, factory) {
            if(typeof exports === 'object' && typeof module === 'object')
                module.exports = factory();
            else if(typeof define === 'function' && define.amd)
                define("EventBus", [], factory);
            else if(typeof exports === 'object')
                exports["EventBus"] = factory();
            else
                root["EventBus"] = factory();
        })(this, function() {
        
            var EventBusClass = {};
            EventBusClass = function() {
                this.listeners = {};
            };
            EventBusClass.prototype = {
                addEventListener: function(type, callback, scope) {
                    var args = [];
                    var numOfArgs = arguments.length;
                    for(var i=0; i<numOfArgs; i++){
                        args.push(arguments[i]);
                    }
                    args = args.length > 3 ? args.splice(3, args.length-1) : [];
                    if(typeof this.listeners[type] != "undefined") {
                        this.listeners[type].push({scope:scope, callback:callback, args:args});
                    } else {
                        this.listeners[type] = [{scope:scope, callback:callback, args:args}];
                    }
                },
                removeEventListener: function(type, callback, scope) {
                    if(typeof this.listeners[type] != "undefined") {
                        var numOfCallbacks = this.listeners[type].length;
                        var newArray = [];
                        for(var i=0; i<numOfCallbacks; i++) {
                            var listener = this.listeners[type][i];
                            if(listener.scope == scope && listener.callback == callback) {
        
                            } else {
                                newArray.push(listener);
                            }
                        }
                        this.listeners[type] = newArray;
                    }
                },
                hasEventListener: function(type, callback, scope) {
                    if(typeof this.listeners[type] != "undefined") {
                        var numOfCallbacks = this.listeners[type].length;
                        if(callback === undefined && scope === undefined){
                            return numOfCallbacks > 0;
                        }
                        for(var i=0; i<numOfCallbacks; i++) {
                            var listener = this.listeners[type][i];
                            if((scope ? listener.scope == scope : true) && listener.callback == callback) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                dispatch: function(type, target) {
                    var event = {
                        type: type,
                        target: target
                    };
                    var args = [];
                    var numOfArgs = arguments.length;
                    for(var i=0; i<numOfArgs; i++){
                        args.push(arguments[i]);
                    };
                    args = args.length > 2 ? args.splice(2, args.length-1) : [];
                    args = [event].concat(args);
        
        
                    if(typeof this.listeners[type] != "undefined") {
                        var listeners = this.listeners[type].slice();
                        var numOfCallbacks = listeners.length;
                        for(var i=0; i<numOfCallbacks; i++) {
                            var listener = listeners[i];
                            if(listener && listener.callback) {
                                var concatArgs = args.concat(listener.args);
                                listener.callback.apply(listener.scope, concatArgs);
                            }
                        }
                    }
                },
                getEvents: function() {
                    var str = "";
                    for(var type in this.listeners) {
                        var numOfCallbacks = this.listeners[type].length;
                        for(var i=0; i<numOfCallbacks; i++) {
                            var listener = this.listeners[type][i];
                            str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
                            str += " listen for '" + type + "'\n";
                        }
                    }
                    return str;
                }
            };
            var EventBus = new EventBusClass();
            return EventBus;
        });
    
        'use strict'
    
        window.PaginatorServerSide = function (options) {
    
            //Global references
            this.datas = []
            this.total = 0
            this.currentIndex = 0
            this.pageCount = 0
            this.hasNextPage = false
            this.hasLastPage = false
    
            //Option defaults
            var defaults = {
                pageLength: 10,
                ajax: null,
                datasFormat: response => {
                    return response
                },
                renderSuccess: pageInfo => {
                    return
                }
            }
    
            //Setting
            if(options && typeof options === 'object'){
                this.setting = Object.assign({},defaults,options)
            }
    
        }
    
        window.PaginatorServerSide.prototype = {
            prePage: function () {
                //EventBus.dispatch('prepage')
                if(!this.hasLastPage){
                    return
                }

                this.currentIndex -= 1

                this.requestServer()
            },
            nextPage: function () {
                //EventBus.dispatch('nextpage')
                if(!this.hasNextPage){
                    return
                }

                this.currentIndex += 1

                this.requestServer()
            },
            firstPage: function () {
                //EventBus.dispatch('firstpage')
                this.currentIndex = 1

                this.requestServer()
            },
            
            lastPage: function () {
                //EventBus.dispatch('lastpage')
                this.currentIndex = this.pageCount

                this.requestServer()
            },
            gotoPage: function (pageIndex) {
                //EventBus.dispatch('jumpto',this,pageIndex)
                if(pageIndex == this.currentIndex || pageIndex <= 1 || pageIndex >= this.pageCount)retutn

                this.currentIndex = pageIndex

                this.requestServer()
            },
            getDatas: function () {
                return this.datas
            },
            requestServer: function(){
                if(this.setting.ajax && typeof this.setting.ajax === "function"){
                    this.setting.ajax(this.currentIndex,this.setting.pageLength,this.ajaxCallback)
                }
            },
            ajaxCallback: function(response){//Change global variable: [total,datas]

                var pageInfo = response

                if(this.setting.datasFormat && typeof this.setting.datasFormat === "function"){
                    pageInfo = this.setting.datasFormat(response)
                }

                if(!pageInfo.total || !pageInfo.datas){
                    throw new Error('Response from server must be formated to have "total" and "datas" params!')
                }

                this.total = pageInfo.total
                this.datas = pageInfo.datas

                this.updatePageInfo()
            },
            updatePageInfo: function(){

                //TODO: 
            }
        }

        window.PaginatorServerSide.prototype.constructor = PaginatorServerSide

    }())