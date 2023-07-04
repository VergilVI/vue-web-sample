module.exports = {
    redirect: function (url, type) {
        var redirectUrl = ''
        if (type) {
            var localurl = location.href.split("?")[0]
            redirectUrl = localurl.substring(0, localurl.lastIndexOf('/')) + url;
        } else {
            redirectUrl = location.href.substring(0, location.href.lastIndexOf('/')) + url;
        }
        location.href = redirectUrl;

    },

    openWindow: function (url) { //打开新的窗口
        var redirectUrl = location.href.substring(0, location.href.lastIndexOf('/')) + url;
        window.open(redirectUrl, '_blank')
    },

    //日期格式化
    formatterDate: function (str, patten) {
        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "w+": this.getDay(), //day of week
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] :
                            ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        }
        // var d = new Date();
        // var useDate2 = d.format('yyyy-MM-dd hh:mm:ss');
        let d = new Date(str)
        let result = d.format(patten)
        return result;
    },

    //获取星期几
    getDayOfWeek(data) {
        let myddy = data.getDay(); //获取存储当前日期
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return weekday[myddy];
    },

    /**
     * 获取已发布时间 
     * @param {*} str 发布时间
     * @returns 
     */
    publishedTime: function (str) {
        // console.log("pubtime " + str * 1000)
        str = str * 1000

        let d = new Date().getTime();
        let pubedTime = d - str; //获取已经发布时间

        // console.log("pubedtime " + pubedTime + "\n\t")
        let pubHourMin = Math.round(pubedTime / 3600 / 60 / 24 * 100) / 100; //转时间
        let h = pubHourMin.toString().split('.')[0];
        let m = pubHourMin.toString().split('.')[1] * 60 / 100; //转分钟

        if (h > 0 && h < 24)
            return h + '小时前';
        else if (h <= 0)
            return Math.round(m) + '分钟前';
        else if (h >= 24 && h < 24 * 7) {
            return Math.round(h / 24) + '天前';
        } else if (h > 24 * 7) {
            return module.exports.formatterDate(str, 'yyyy年MM月dd日')
        }
    },

    /**
     * 获取标题中文
     * @param {*} nl 导航集合
     * @param {*} navId 当前文章categoryId
     * @returns 
     */
    getNavName(nl, categoryId) {

        for (let i = 0; i < nl.length; i++)
            if (nl[i].categoryId == categoryId) {
                return nl[i].categoryName;
            }
        return '';

    },

    /**
     * 获取当前页最后一篇文章id
     * @param {*} newList 当前新闻列表
     * @returns 
     */
    getLastNewsId(newList) {
        return newList[newList.length - 1].id;
    },

    /**
     * 获取url中的参数
     * @param {*} location 
     */
    getUrlParam2(location) {
        var url = location.search //获取url中"?"符后的字串 ('?modFlag=business&role=1')
        var theRequest = new Object()
        if (url.indexOf('?') != -1) {
            var str = url.substr(1) //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split('&')
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
            }
            // console.log(theRequest) //此时的theRequest就是我们需要的参数；
            // console.log(theRequest.type)
        }
        return theRequest;

    },

    /** 获取页面参数 */
    getUrlParam: function (key) {
        var re = "/^.*[\\?|\\&]" + key + "\\=([^\\&]*)/",
            url = location.href;
        re = eval(re);
        var ret = url.match(re);
        if (ret != null) {
            return decodeURIComponent(ret[1]);
        } else {
            return "";
        }
    },

    //获取当前地址的restful 参数
    getCurUrl() {
        let cUrl = window.location.href;
        let urlArr = cUrl.replace(location.protocol + '//' + location.host + '/', '')
        urlArr = urlArr.split('/')

        return urlArr;
    },

    //转换时间
    convertPublishTime(date) {
        if (!date) {
            return false
        }
        // var date = '2021-11-10T07:49:33.707+0000';
        let date2 = date.substring(0, 16);
        date2 = date2.replace(/-/g, '-').replace('T', ' ');
        return date2
    },

    //转换时间2
    convertPublishTime2(date) {
        if (!date) {
            return false
        }

        // console.log('parm date', date)
        let nowDate = new Date().getTime()
        // console.log('nowDate', nowDate)
        let d = new Date(date).getTime()
        // console.log('date', d)

        let pubedTime = nowDate - d; //获取已经发布时间
        // console.log("pubedtime " + pubedTime + "\n\t")

        let pubHourMin = Math.round(pubedTime / 3600 / 60 / 24 * 100) / 100; //转时间
        let h = pubHourMin.toString().split('.')[0];
        let m = pubHourMin.toString().split('.')[1] * 60 / 100; //转分钟

        if (h > 0 && h <= 1)
            return '刚刚';
        else if (h > 1 && h < 24)
            return h + '小时前';
        else if (h >= 24 && h < 24 * 365) {
            return module.exports.formatterDate(date, 'MM-dd')
        } else if (h >= 24 * 365) {
            return module.exports.formatterDate(date, 'yyyy-MM-dd')
        }

    },

    //获取当前日期
    getCurrentData() {
        var d = new Date();
        var nowDate = module.exports.formatterDate(d, 'yyyy年MM月dd日');
        return nowDate + ' ' + module.exports.getDayOfWeek(d)
    },

    //格式化订阅人数
    subCount(count) {
        if (count >= 10000) {
            let c1 = (count / 10000).toFixed(1)
            let cc1 = c1.split('.')
            console.log(cc1)
            if (cc1[1] == 0) {
                console.log(cc1[0] + '万')
            } else {
                console.log(c1 + '万')
            }
        }
    }



}