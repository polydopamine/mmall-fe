/*
* @Author: wsh
* @Date:   2020-03-04 10:51:39
* @Last Modified by:   wsh
* @Last Modified time: 2020-03-04 14:59:52
*/
'use strict';

var conf = {
    serverHost : ''
};
var Hogan = require('hogan');

var _mm = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if (0 === res.status){

                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录，需要强制登录
                else if (10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 获取服务器地址
    getUrlParam : function(path){
        return conf.serverHost + path;
    },
    // 获取URL参数
    getUrlParam : function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate, data) {
        // 先编译，再渲染
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    // 操作成功提示
    successTips : function(msg) {
        alert(msg || '操作成功');
    },
    // 操作失败提示
    errorTips : function(msg) {
        alert(msg || '操作失败');
    },
    // 字段验证，包括：非空、手机、邮箱
    validate : function(value, type) {
        var value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if ('email' === type) {
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = './login.html?redicret=' + encodeURIComponent(window.location.href);
    },
    // 跳转主页
    goHome : function() {
        window.location.href = './index.html';
    }
};

module.exports = _mm;