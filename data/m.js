window.onload = function() {
    LigDa(getCookie('ligda'));
    mdui.$.showOverlay();
    setTimeout("mdui.$.hideOverlay()", 200);
}

//<!-- Matomo -->
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//81.71.38.231:8780/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '3']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
//<!-- End Matomo Code -->

function firstSet(id, index, num){
  let firstEl = document.getElementById(id);
  firstEl.innerHTML = '<div class="mdui-spinner"></div>';
  mdui.$.ajax({
    method: 'POST',
    url: 'data/code/first2.php',
    data: {
      i: index,
      n: num
    },
    success: function (data) {
      firstEl.innerHTML = data;
    }
  });
}

function to(toID) {
    //根据标签ID获取操作对象
    var toEl = document.getElementById(toID);
    //toEl为指定跳转到该位置的DOM节点
    let bridge = toEl;
    let body = document.body;
    let height = 0;
    //计算该DOM节点到body顶部距离
    do {
        height += bridge.offsetTop;
        bridge = bridge.offsetParent;
    } while (bridge !== body)
    //滚动到指定位置
    window.scrollTo({
        top: height,
        behavior: 'smooth'
    });
    mdui.snackbar({
        message: '正在跳转ing...',
    });
}

function copyC(text){
    var tag = document.createElement('input');
    tag.setAttribute('id', 'cp_hgz_input');
    tag.value = text;
    document.getElementsByTagName('body')[0].appendChild(tag);
    document.getElementById('cp_hgz_input').select();
    document.execCommand('copy');
    document.getElementById('cp_hgz_input').remove();
    mdui.snackbar({
      message: '复制成功',
    });
}

function LigDa(awa) {
    Setcookie("ligda", awa);
    var ibq = document.getElementById("ibq");
    if (awa == "da") {
        //夜间
        ibq.innerText = "brightness_4";
        document.body.classList.add('mdui-theme-layout-dark');
        document.body.classList.remove('mdui-theme-accent-blue');
        document.body.classList.add('mdui-theme-accent-light-blue');
        //document.body.classList.remove('mdui-theme-primary-indigo');
        document.body.classList.add('mdui-theme-primary-grey');
        
    } else {
        //白天
        ibq.innerText = "brightness_7";
        document.body.classList.remove('mdui-theme-layout-dark');
        document.body.classList.remove('mdui-theme-accent-light-blue');
        document.body.classList.add('mdui-theme-accent-blue');
        //document.body.classList.add('mdui-theme-primary-indigo');
        document.body.classList.remove('mdui-theme-primary-grey');
    }
}
function LigDaq() {
    var awa = getCookie('ligda');
    var ibq = document.getElementById("ibq");
    if (awa == "da") {
        Setcookie("ligda", "li");
        LigDa("li");
        mdui.snackbar({
            message: '已切换为浅色主题',
            buttonText: '撤销',
            onButtonClick: function() {
                LigDa("da");
            }
        });
    } else {
        Setcookie("ligda", "da");
        LigDa("da");
        mdui.snackbar({
            message: '已切换为深色主题',
            buttonText: '撤销',
            onButtonClick: function() {
                LigDa("li");
            }
        });
    }
}

//MarkDown转换为HTML
//https://cdn.jsdelivr.net/npm/showdown@2.0.3/dist/showdown.min.js

var Shseting = {
  "omitExtraWLInCodeBlocks":false,
  "noHeaderId":false,
  "customizedHeaderId":false,
  "ghCompatibleHeaderId":false,
  "prefixHeaderId":false,
  "rawPrefixHeaderId":false,
  "rawHeaderId":false,
  "headerLevelStart":1,
  "parseImgDimensions":true,
  "simplifiedAutoLink":true,
  "literalMidWordUnderscores":false,
  "strikethrough":true,
  "tables":true,
  "tablesHeaderId":false,
  "ghCodeBlocks":true,
  "tasklists":true,
  "smoothLivePreview":true,
  "smartIndentationFix":false,
  "disableForced4SpacesIndentedSublists":false,
  "simpleLineBreaks":false,
  "requireSpaceBeforeHeadingText":false,
  "ghMentions":false,
  "ghMentionsLink":"https://github.com/{u}",
  "encodeEmails":true,
  "openLinksInNewWindow":false,
  "backslashEscapesHTMLTags":true,
  "emoji":true,
  "underline":true,
  "ellipsis":true,
  "completeHTMLDocument":false,
  "metadata":false,
  "splitAdjacentBlockquotes":false,
  "moreStyling":false
};

function MDtoHTML(text){
  let converter = new showdown.Converter();
  for(var key in Shseting){
    converter.setOption(key, Shseting[key]);
  }
  return converter.makeHtml(text);
}

//Cookie

function Setcookie(name, value) {
    //设置名称为name,值为value的Cookie
    var expdate = new Date(); //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000); //时间单位毫秒
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";

    //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
}

function getCookie(c_name) {
    //判断document.cookie对象里面是否存有cookie
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
    }
    return "";
}


//动态添加css样式文件
        function addCss(cssUrl){
            var linkObj = document.createElement("link");
            linkObj.setAttribute("href",cssUrl);
            linkObj.setAttribute("rel","stylesheet");
            document.body.appendChild(linkObj);
        }
        //动态添加js文件
        function addjs(jsUrl){
            var linkObj = document.createElement("script");
            linkObj.setAttribute("src",jsUrl);
            document.body.appendChild(linkObj);
        }
       //删除js/css文件
        function removejscssfile(filename,type){
            var targetelement;
            var targetattr
            if(type == 'css')
            {
                targetelement = 'link';
                targetattr = 'href';
            }
            else
            {
                targetelement = 'script';
                targetattr = 'src';
            }

            var allsuspects=document.getElementsByTagName(targetelement);

            for (var i=allsuspects.length-1; i>=0; i--)
            {
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
                    allsuspects[i].parentNode.removeChild(allsuspects[i]);
                }  
            }
        }