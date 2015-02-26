/** 
 * @author wubocao 
 * 守护进程模块 
 * 使用addDeamon(model,args,option)来添加一个守护进程 
 * 该函数返回一个守护进程对象，通过调用该对象的stop和init来停止和重新启动该进程 
 *  
 */  
var child_process = require("child_process");
var util = require("util");
var debug = require("debug")("daemon");
//守护进程对象
function Deamon(model, args, option) {
    if (!model || typeof model != "string") {
        throw new Error("illegal model argument");
    }
    
    //简单深拷贝
    var _args;
    if (args) {
        _args= JSON.parse(JSON.stringify(args));
    }

    var _option;
    if (typeof option == "object") {
        _option= JSON.parse(JSON.stringify(args));
    } else {
        _option = {};
    }

    this._model = model;
    this._args = _args;
    this._option = _option;

    this._cp = null;
    this._cpid = 0;
    
    //心跳 用时间作为心跳处理依据
    this._heartbeat = null;

    //检测心跳失败次数
    this._fail = 0;


}

//
Deamon.prototype= {
    init:function() {
        if (this._cp) {
            return;
        }
        this._kill = false;

        var timeout = this._option.timeout;
        var start = new Date().getTime;
        var self = this;

        (function run() {
            debug("进程准备启动");
            self._cp = child_process.fork(self._model, self._args, self._option);
            self._cpid = self._cp.pid;

            self._cp.on("exit", function(code, signal) {
                debug("进程exit");

                if (self._kill) {
                    return;
                }
                
                //超时时间
                if (timeout > 0) {
                    var end = new Date().getTime();
                    if (end - start < timeout) {
                        run();
                    } else {
                        self._cp = null;
                        self._cpid = 0;
                    }
                } else{
                    run();
                }
            });

            self._cp.on("close", function (code, signal) {
                debug("进程close");
            });

            self._cp.on("message", function(message) {
                //心跳
                if (message.Heartbeat) {
                    //self._heartbeat=
                }
            });

        })();
    },
    
    stop:function() {
        if (this._cp) {
            debug("deamon stop");
            this._kill = true;
            this._cp.disconnect();

            this._cp.kill('SIGQUIT');

            this._cp = null;
            this._cpid = 0;
        }
    },
    
    //强制停止
    forceStop:function() {
        if (this._cp) {
            debug("deamon force stop");
            this._kill = true;
            child_process.exec("kill -9" + this._cpid);
            this._cp = null;
            this._cpid = 0;
        }
    },
    
    _checkDeamon: function () {
        var deamon = this;
        var t = setTimeout(function() {
            deamon._fail++;

            t = 0;

            if (deamon._fail >= 5) {
                debug("heart check with no response more then 3 times,restart now");
                deamon._fail = 0;
                deamon.stopHeartbeat();
                deamon.forceStop();
                setTimeout(function() {
                    deamon.init();
                }, 1000);
            }

        }, 2000);

        //
    },
    
    broadcast:function(callback, msg) {
        if (this._cp) {
            this._messageCall = callback;
            try {
                if (msg) {
                    debug("try get child process info with message[" + msg + "]");
                }
            } catch (e) {

            } 
        }
    },

    //开始心跳
    startHeartbeat:function() {
        var deamon = this;

        //停掉之前的心跳
        deamon.stopHeartbeat();
        
        //20秒检查一次
        deamon._heartbeat = setInterval(_checkDeamon, 10000);
    },
    //停止心跳
    stopHeartbeat:function() {
        this._heartbeat = this._heartbeat && clearInterval(this._heartbeat);
    }
}

exports.addDeamon = function (model, args, option) {
    args = args || [];
    // 过滤掉ppid参数
    for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] == '-pid') {
            i++;
        }
    }
    return new Deamon(model, args.concat(['-pid', process.pid]), option);
}