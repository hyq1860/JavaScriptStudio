/** 
 * 守护进程模块 
 * 使用addDeamon(model,args,option)来添加一个守护进程 
 * 该函数返回一个守护进程对象，通过调用该对象的stop和init来停止和重新启动该进程 
 *  
 */  
var child_process = require("child_process");
var util = require("util");
var debug = require("debug")("daemon");
//守护进程对象
function Deamon(modulePath, args, options) {
    if (!modulePath || typeof modulePath != "string") {
        throw new Error("illegal modulePath argument");
    }
    
    //简单深拷贝
    var _args;
    if (args) {
        _args= JSON.parse(JSON.stringify(args));
    }

    var _options;
    if (typeof options == "object") {
        _options= JSON.parse(JSON.stringify(options));
    } else {
        _options = {};
    }

    this._modulePath = modulePath;
    this._args = _args;
    this._option = _options;

    this._cp = null;
    this._cpid = 0;
    
    //心跳 用客户端传过来的时间作为心跳处理依据
    this._heartbeat = null;
    
    //子进程发送的时间戳
    this._timestamp = null;
    //检查心跳失败次数
    this._fail = 0;
    this.init();
}

//
Deamon.prototype= {
    init: function () {
        var self = this;
        if (self._cp) {
            return;
        }
        self._kill = false;
        self._fail = 0;
        var timeout = self._option.timeout;
        var start = new Date().getTime;
        

        (function run() {
            debug("进程准备启动");
            self._cp = child_process.fork(self._modulePath, self._args, self._option);
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

            self._cp.on("message", function (message) {
                debug("message:"+message.Timestamp);
                //心跳
                if (message.Timestamp) {
                    //self._heartbeat=
                    debug("on message:" + message.Timestamp);
                    console.log(message.Timestamp);
                    debug("时间：" + new Date(message.Timestamp));
                    
                    self._timestamp = new Date(message.Timestamp);

                    debug(self._timestamp == null);
                }
            });

        })();
        
        //检查心跳
        this.startHeartbeat();
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
            this._cp.kill('SIGKILL');
            this._kill = true;
            child_process.exec("kill -9" + this._cpid);
            this._cp = null;
            this._cpid = 0;
        }
    },
    


    //开始心跳
    startHeartbeat:function() {
        var deamon = this;

        //停掉之前的心跳
        deamon.stopHeartbeat();
        
        function checkDeamon() {
            /*
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

        */
        
        debug("检查心跳:" + deamon._cpid);
            var flag = deamon._timestamp != null && deamon._timestamp.dateDiff('s', new Date()) > 30;
            if (deamon._timestamp == null) {
                deamon._fail++;
                if (deamon._fail > 5) {
                    flag = true;
                }
            }
            if (flag) {
                console.log("子程序心跳异常");
                
                deamon.stopHeartbeat();
                deamon.forceStop();
                setTimeout(function () {
                    console.log("deamon.init()");
                    deamon.init();
                }, 2000);
                 
            } else {
                if (deamon._timestamp != null) {
                    debug("时间间隔：" + deamon._timestamp.dateDiff('s', new Date()));
                }
                debug("心跳检查失败次数："+ deamon._fail);
                //debug("检查心跳deamon._timestamp：" + deamon._timestamp);
            }
        }
        
        //20秒检查一次
        deamon._heartbeat = setInterval(checkDeamon, 1000);
    },
    //停止心跳
    stopHeartbeat:function() {
        this._heartbeat = this._heartbeat && clearInterval(this._heartbeat);
    }
}

exports.addDeamon = function (modulePath, args, options) {
    args = args || [];
    // 过滤掉pid参数
    for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] == '-pid') {
            i++;
        }
    }
    return new Deamon(modulePath, args.concat(['-pid', process.pid]), options);
}

Date.prototype.dateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
}