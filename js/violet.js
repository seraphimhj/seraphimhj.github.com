/**
 * @name:        violet.js
 * @author:      pizn(pizner@gmail.com)
 * @description: This is the violet theme js source.
 */
var violet = violet || {
    VERSION: '2.0',
    checkViolet: function() {
    	var str = document.domain, rule = /^(www\.huangjian\.info)?$/, url = "http://huangjian.info", cookie_Key="__isViole__", cookie_value="Y";
    	if(!rule.test(str)) {
    		//document.cookie = cookie_key+'='+cookie_value+';expires='+new Date(new Date().getTime()+3600*24*30*1000).toUTCString();
    		window.location.replace(url);
    	}
    	/**
    	var isViolet = document.cookie.match(new RegExp(cookie_Key+ '=([Y])'))
    	console.log(isViolet)
    	if(isViolet != null && ) {
			$("#J-tips").show();
    	}
    	**/
    },
    showFlower: function(a, b){
        var banner = $('#J_banner');
        banner.addClass('swing');
        function show() {
            banner.append(a);
        }
        setTimeout(show, b);    
    },
    highLightMenu: function() {
    	var navs, url, cur, i;
    	navs = $("#J_nav li a");
		for(i = 1; i < navs.length; i++){
			url = navs[i].href;
			cur = window.location.href;
                        // console.log(cur);
                        // console.log(url);
			if(cur.indexOf(url) !=-1) {
				navs[i].className = "current";
				navs[0].className = "";
			}
			if(cur != navs[0].href) {
				navs[0].className = "";
			}
		}     	
    },
    getGitHub: function(name, num, id) {
    	var user, url, loading, repo_name, repo_url, repo_desc, repo_watch, repo_fork, repo_len, i, meta, status, errmsg;
    	user = name;
    	url = "https://api.github.com/users/"+user+"/repos?sort=updated";
    	loading = '<p class="v-loading"><img src="/images/loading.gif" alt="loading" /></p>';
    	$(id).append(loading);
    	$.ajax({
    		url: url,
    		dataType: "jsonp",
    		success: function(data) {
    			$(id).children("p").remove();
    			repo_len = data.data.length;
    			limit = data.meta["X-RateLimit-Remaining"];
    			status = data.meta["status"];
    			if(limit && limit > 0){
       				if( repo_len < num ) {
    					for( i = 0; i < repo_len; i++) {
    						repo_name = data.data[i].name;
    						repo_url = data.data[i].html_url;
    						repo_desc = data.data[i].description;
    						repo_watch = data.data[i].watchers;
    						repo_fork = data.data[i].forks;
    						project = '<article class="v-project-list">\
                        			   <p class="name"><a href="' + repo_url + '" title="' + repo_name + '" target="_blank">' + repo_name + '</a>\
                        			   <span class="v-project-watch">' + repo_watch + '</span>\
                        			   <span class="v-project-forks">' + repo_fork + '</span></p>\
                        			   <p class="descript">' + repo_desc + '</p>\
                    				   </article>';
                    		$(id).append(project);
    					}	
    				} else {
    					for( i = 0; i < num; i++){
    						repo_name = data.data[i].name;
    						repo_url = data.data[i].html_url;
    						repo_desc = data.data[i].description;
    						repo_watch = data.data[i].watchers;
    						repo_fork = data.data[i].forks;
    						project = '<article class="v-project-list">\
                        			   <p class="name"><a href="' + repo_url + '" title="' + repo_name + '" target="_blank">' + repo_name + '</a>\
                        			   <span class="v-project-watch">' + repo_watch + '</span>\
                        			   <span class="v-project-forks">' + repo_fork + '</span></p>\
                        			   <p class="descript">' + repo_desc + '</p>\
                    				   </article>';
                    		$(id).append(project);
    					}
    					project = '<p class="v-more-right v-project-mor"><a href="https://github.com/' + user + '" target="_blank" title="Seraphim on github"><span>&#10149;</span>All Projects</a></p>';
    					$(id).append(project);
    				}
    			} else {
    				errmsg = '<article class="v-project-normal"><p>通过项目的开发过程，能够得到更多的锻炼。</p>\
    						  <p>在 GitHub 上有 Seraphim 的几个小项目，例如 Vim-Evernote, Nodeapp, Blog 等等。</p></article>\
    					      <p class="v-more-right"><a href="https://github.com/' + user + '" target="_blank" title="Seraphim on github"><span>&#10149;</span>All Projects</a></p>';
    				$(id).append(errmsg);
    			}
    		}
    	});
    }         
}
/**
 *  goTop for violet
 */
violet.goTop = {
    nodeName: "J-backTop",
        scrollHeight: "100",
        linkBottom: "200px",
        linkRight: "20px",
        _scrollTop: function() {
        if(jQuery.scrollTo) {
            jQuery.scrollTo(0, 800, {queue:true});
        }
    },
    _scrollScreen: function() {
        var that = this, topLink = $('#' + that.nodeName);
        if(jQuery(document).scrollTop() <= that.scrollHeight) {
            topLink.hide();
            return true;
        }  else {
            topLink.fadeIn();
        }
    },
    _resizeWindow: function() {
        var that = this, topLink = $('#' + that.nodeName);
        topLink.css({
            'right' : that.linkRight,
            'bottom': that.linkBottom
        });
    },
    run: function() {
        var that = this, topLink = $('<a id="' + that.nodeName + '" href="#" class="violet-backtop">Top</a>');
        topLink.appendTo($('body'));
        topLink.css({
            'display': 'none',
            'position': 'fixed',
            'right': that.linkRight,
            'bottom': that.linkBottom
        });
        if(jQuery.scrollTo) {
            topLink.click(function() {
                that._scrollTop();
                return false;
            });
        }
        jQuery(window).resize(function() {
            that._scrollScreen();
        });
        jQuery(window).scroll(function() {
            that._scrollScreen();
        });
    }
}


$(document).ready(function(){
    // violet.checkViolet();
    // highLightMenu    
    violet.highLightMenu();
    violet.goTop.run();
})
