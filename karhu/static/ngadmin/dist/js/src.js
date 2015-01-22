!function(a){"use strict";var b=a.module("App",["ngAnimate","ngCookies","ngFx","ngStorage","ui.router","ui.bootstrap","ui.sortable","restangular","angular.filter","angularFileUpload","bootstrapLightbox","textAngular","AuthModule","CommonModule","BlogModule","EventsModule","GalleryModule","LineupModule","MusicModule","PageletsModule","ResolvesModule"]),c="/static/ngadmin/app/";b.constant("PROJECT_ROOT_FOLDER",c),b.constant("APP_ROOT_FOLDER",c+"src/"),b.constant("API_URL","/api/"),b.config(["$httpProvider","RestangularProvider","LightboxProvider","API_URL",function(b,c,d,e){function f(b){var c=b;return a.isArray(c)?a.forEach(c,function(a){a.local={}}):a.isObject(c)&&(c.local={}),c}function g(a,b){return("post"===b||"put"===b)&&delete a.local,a}function h(b,c){var d=b;return"getList"===c&&(a.isArray(b)||(d=a.copy(b.results),delete b.results,d.paginator=b)),d}b.defaults.xsrfHeaderName="X-CSRFToken",b.defaults.xsrfCookieName="csrftoken",c.setResponseExtractor(f),c.addResponseInterceptor(h),c.addRequestInterceptor(g),c.setRequestSuffix("/"),c.setBaseUrl(e),d.getImageUrl=function(a){return a.urls.web},d.getImageCaption=function(){return""}}]),b.run(["$rootScope","$state","$stateParams","$http","$cookies","Restangular",function(a,b,c,d,e,f){d.defaults.headers.post["X-CSRFToken"]=e.csrftoken,f.setDefaultHeaders({"X-CSRFToken":e.csrftoken}),a.$state=b,a.$stateParams=c,a.$on("$stateChangeError",function(a,b,c,d,e,f){console.log("STATE CHANGE ERROR",f)})}])}(angular),function(a){"use strict";var b=a.module("App");b.controller("RootCtrl",["$scope","$state","CONFIG",function(a,b,c){a.resolvedConfig=c}]),b.config(["$stateProvider","$urlRouterProvider","APP_ROOT_FOLDER","$injector",function(a,b,c,d){function e(a,b){return g+a+"/templates/"+b+".html"}var f=d.get("RESOLVES"),g=c;b.otherwise("/"),a.state("root",{"abstract":!0,url:"/",templateUrl:g+"templates/root.html",data:{}}).state("admin",{parent:"root","abstract":!0,resolve:f.root,data:{secure:!0},templateUrl:g+"templates/admin.html"}).state("system",{parent:"root",template:'<div class="system-template"> <ui-view/> </div>'}).state("home",{parent:"admin",url:"",templateUrl:g+"templates/home.html"}).state("login",{parent:"system",url:"login",data:{secure:!1},controller:"auth.LoginCtrl",templateUrl:e("auth","login")}).state("logout",{parent:"system",url:"logout",data:{secure:!1},templateUrl:e("auth","logout")}).state("404",{parent:"admin",url:"404",templateUrl:e("common","404")}).state("blog",{"abstract":!0,parent:"admin",url:"blog",template:"<ui-view/>",resolve:f.Blog}).state("blog.list",{url:"/list/:page",templateUrl:e("blog","list"),controller:"BlogListCtrl",resolve:f.BlogListCtrl}).state("blog.post",{url:"/post/:post_id",templateUrl:e("blog","post"),controller:"BlogPostCtrl",resolve:f.BlogPostCtrl}).state("events",{parent:"admin",url:"events",template:"<ui-view/>",resolve:f.Events}).state("events.list",{url:"/list",templateUrl:e("events","list"),controller:"EventsListCtrl",resolve:f.EventsListCtrl}).state("events.add",{url:"/add",templateUrl:e("events","event"),controller:"EventCtrl",resolve:f.EventCtrl}).state("events.event",{url:"/:event_id",templateUrl:e("events","event"),controller:"EventCtrl",resolve:f.EventCtrl}).state("gallery",{parent:"admin","abstract":!0,url:"gallery",template:"<ui-view/>",resolve:f.Gallery}).state("gallery.list",{url:"/list",templateUrl:e("gallery","list"),controller:"GalleryListCtrl",resolve:f.GalleryListCtrl}).state("gallery.folder",{url:"/folders/:folder_id",templateUrl:e("gallery","folder"),controller:"GalleryFolderCtrl",resolve:f.GalleryFolderCtrl}).state("gallery.add_folder",{url:"/folders/new",templateUrl:e("gallery","folder"),controller:"GalleryFolderCtrl",resolve:f.GalleryFolderCtrl}).state("lineup",{"abstract":!0,parent:"admin",url:"lineup",resolve:f.Lineup,template:"<ui-view/>"}).state("lineup.list",{url:"/list",templateUrl:e("lineup","list"),controller:"LineupListCtrl",resolve:f.LineupListCtrl}).state("lineup.person",{url:"/:person_id",templateUrl:e("lineup","person"),resolve:f.LineupPersonCtrl,controller:"LineupPersonCtrl"}).state("music",{parent:"admin","abstract":!0,url:"music",template:"<ui-view/>",resolve:f.Music}).state("music.list",{url:"/list",templateUrl:e("music","list"),controller:"MusicListCtrl",resolve:f.MusicListCtrl}).state("music.album",{url:"/albums/:album_id",templateUrl:e("music","album"),controller:"MusicAlbumCtrl",resolve:f.MusicAlbumCtrl}).state("music.add_song",{url:"/albums/:album_id/add_song",templateUrl:e("music","song"),controller:"MusicSongCtrl",resolve:f.MusicSongCtrl}).state("music.song",{url:"/songs/:song_id",templateUrl:e("music","song"),controller:"MusicSongCtrl",resolve:f.MusicSongCtrl}).state("pagelets",{"abstract":!0,parent:"admin",template:"<ui-view/>",url:"pagelets",resolve:f.Pagelets}).state("pagelets.list",{url:"/list",templateUrl:e("pagelets","list"),controller:"PageletsListCtrl",resolve:f.PageletsListCtrl}).state("pagelets.pagelet",{url:"/:pagelet_id",templateUrl:e("pagelets","pagelet"),controller:"PageletsPageletCtrl",resolve:f.PageletsPageletCtrl}).state("pagelets.slot",{url:"/slot/:slot_id",templateUrl:e("pagelets","slot"),controller:"PageletsSlotCtrl",resolve:f.PageletsSlotCtrl})}])}(angular),function(a){"use strict";a.module("CommonModule",[])}(angular),function(a){"use strict";var b=a.module("CommonModule");b.directive("simpleTable",["$parse","APP_ROOT_FOLDER",function(b,c){return{restrict:"E",templateUrl:c+"common/templates/simple-table.html",scope:{columns:"=",rows:"=",pagination:"="},link:function(b){var c=[];a.forEach(b.columns,function(a){var b={};b.text=a.text||a,b.klass=a.klass||null,b.css=a.css||null,c.push(b)}),b.parsedColumns=c}}}])}(angular),function(a){"use strict";var b=a.module("CommonModule");b.directive("formDropdown",["APP_ROOT_FOLDER",function(b){return{restrict:"E",templateUrl:b+"common/templates/dropdown.html",scope:{textfield:"@",model:"=",options:"="},link:function(b){b.mapping;b.reset=function(){b.selected=null,b.model=b.selected()},b.setSelected=function(c){b.selected=c,a.isObject(b.model)||(b.model={}),b.model=b.selected};var c=b.$watch(function(){return b.options},function(d){a.isUndefined(d)||(b.available_options=d,c())}),d=b.$watch(function(){return b.model},function(c){a.isUndefined(c)||(b.selected=b.model,d())})}}}]),b.directive("formDatepicker",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"common/templates/datepicker.html",scope:{datemodel:"="},link:function(a){a.dp={opened:!1},a.open=function(b){b.stopPropagation(),a.dp.opened=!0},a.date=a.datemodel}}}])}(angular),function(a){"use strict";var b=a.module("CommonModule");b.directive("stateSpinner",["$rootScope","$state",function(a){return{restrict:"A",transclude:!0,template:'<div class="state-spinner" ng-show="rootViewLoading"><span class="fa fa-spinner fa-spin"></span></div><ng-transclude></ng-transclude>',link:function(b){b.rootViewLoading=!1,a.$on("$stateChangeStart",function(){b.rootViewLoading=!0}),a.$on("$stateChangeSuccess",function(){b.rootViewLoading=!1})}}}]),b.directive("spinnerWhen",["APP_ROOT_FOLDER","$compile","$interpolate","$parse",function(){return{restrict:"A",transclude:!0,scope:{condition:"=spinnerWhen"},template:'<span class="spinner"></span><span class="original-content" ng-transclude></span>',link:function(b,c){var d=a.element(".spinner",c),e=a.element(".original-content",c);b.$watch(function(){return b.condition},function(a){a===!0?(d.css("opacity",1),e.css("opacity",0)):a===!1&&(d.css("opacity",0),e.css("opacity",1))})}}}]),b.directive("confirmableClick",["$modal","APP_ROOT_FOLDER","$compile","$interpolate","$parse",function(a,b){var c={size:"sm",templateUrl:b+"common/templates/confirmation.html"};return{restrict:"A",scope:{action:"&confirmableClick"},link:function(b,d){var e,f=b.action;d.click(function(){e=a.open(c),e.result.then(function(){f()},function(){})})}}}]),b.directive("imagePlaceholder",["APP_ROOT_FOLDER",function(){return{restrict:"E",template:'<span class="placeholder" style="{{::styles.placeholder}}"><span class="glyphicon glyphicon-picture" style="{{::styles.icon}}"></span></span>',scope:{},link:function(a,b,c){var d=8;c.fontsize&&(d=c.fontsize),a.styles={placeholder:"width: "+c.width+"px; height: "+c.height+"px;",icon:"font-size: "+d+"em; line-height: "+c.height+"px"}}}}]),b.directive("helpButton",["$modal","APP_ROOT_FOLDER",function(b,c){return{restrict:"E",template:'<span class="helpbutton"><span class="fa fa-question-circle"></span></span>',scope:{source:"@"},link:function(d,e){var f=a.element("#"+d.source);d.help_html=f.html(),e.click(function(){var a=b.open({templateUrl:c+"common/templates/modal-help.html",scope:d});a.result.then(function(){console.log("closed!")})})}}}]),b.directive("navigationMenu",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"templates/nav.html",link:function(a){a.config=a.resolvedConfig;var b=[{enabled:!0,icon:"fa-home",include:"home",sref:"home"},{enabled:a.config.apps.lineup.enabled,icon:"fa-users",include:"lineup",sref:"lineup.list"},{enabled:a.config.apps.music.enabled,icon:"fa-music",include:"music",sref:"music.list"},{enabled:a.config.apps.gallery.enabled,icon:"fa-camera",include:"gallery",sref:"gallery.list"},{enabled:a.config.apps.events.enabled,icon:"fa-calendar",include:"events",sref:"events.list"},{enabled:a.config.apps.blog.enabled,icon:"fa-book",include:"blog",sref:"blog.list"},{enabled:!0,icon:"fa-th-large",include:"pagelets",sref:"pagelets.list"}];a.buttons=b}}}])}(angular),function(a){"use strict";var b=a.module("CommonModule");b.directive("modalSort",["$q","$modal","APP_ROOT_FOLDER",function(b,c,d){return{restrict:"A",scope:{sourceItems:"=items",display:"@",then:"="},template:"",link:function(b,e){var f;b.is={saving:!1},b.sortableOptions={containment:"#sorts",containerPositioning:"relative"},b.handleResult=function(){b.is.saving=!0,b.then(b.items).then(function(){b.is.saving=!1,f.close()})},e.click(function(){b.items=a.copy(b.sourceItems),f=c.open({templateUrl:d+"common/templates/modal-sorting.html",controller:function(){},scope:b})})}}}]),b.directive("karhuPaginator",["$modal","APP_ROOT_FOLDER","$stateParams",function(b,c,d){return{restrict:"E",scope:{total:"@",pagesize:"@",state:"@"},templateUrl:c+"common/templates/paginator.html",link:function(b){var c=parseInt(d.page,10),e=a.isDefined(b.pagesize)?b.pagesize:10;if(a.isUndefined(b.state))throw b.error='Paginator error: no "state" attribute provided!',new Error('Paginator error: no "state" attribute provided!');b.pages_count=[],b.pages_count.length=Math.ceil(b.total/e),b.isActive=function(a){return a+1===c||0===a&&!d.page}}}}]),b.directive("modalCrop",["$modal","APP_ROOT_FOLDER","$http",function(a,b,c){var d=b+"common/templates/modal-crop.html";return{restrict:"E",scope:{buttontext:"@",source:"@"},template:'<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-image"></span>{{buttontext}}</button>',link:function(b,e){b.image=b.source,b.crop=function(){var a="/api/admin/lineup/crop_for/1",d={x1:b.obj.coords[0],y1:b.obj.coords[1],x2:b.obj.coords[2],y2:b.obj.coords[3],width:b.obj.coords[4],height:b.obj.coords[5]};c.post(a,d).success(function(a){console.log(a)})},e.click(function(){var c=a.open({size:"auto",templateUrl:d,controller:function(){},scope:b});c.result.then(function(){console.log("closed!")})})}}}]),b.directive("bindingsCounter",["$timeout",function(b){function c(){var b=$(document.getElementsByTagName("body")),c=[],d=function(b){b.data().hasOwnProperty("$scope")&&angular.forEach(b.data().$scope.$$watchers,function(a){c.push(a)}),a.forEach(b.children(),function(a){d($(a))})};return d(b),c.length}return{restrict:"E",scope:!1,template:'<div style="position: absolute; top: 2px; left: 60px;"><button type="button" ng-click="update()" class="btn btn-default glyph-only"><span class="fa fa-refresh"></span><span>Watchers: {{count}}</span></button></div>',link:function(a){a.count="dunno",a.update=function(){a.count=c()},b(function(){a.update()},2e3)}}}])}(angular),function(a){"use strict";var b=a.module("CommonModule");b.factory("SingleFileUploader",["$q","$cookies","FileUploader",function(b,c,d){var e={},f={url:"",queueLimit:1,method:"PATCH",removeAfterUpload:!0,headers:{Accept:"application/json","X-CSRFToken":c.csrftoken},onAfterAddingFile:function(){},onSuccessItem:function(){},onErrorItem:function(){}};return d.prototype.ready=function(){var a=this;return a.queue.length>0},d.prototype.uploadIfReady=function(){var a=this,b={};return a.ready()?(a.queue[0].url=a.uploadTo(),a.uploadAll(),b.or=function(){}):b.or=function(a){a()},b},d.prototype.upload=function(){var a,c=this;return console.log(c.onSuccessItem),a=b.when()},e.create=function(b){var c,e=a.copy(f);return e=a.extend(e,b),c=new d(e),c.onSuccessItem=function(a,c){b.onSuccess(a,c)},c.onErrorItem=function(a,c){b.onError(a,c)},c.obj=b.obj,c.uploadTo=b.uploadTo,c},e.randomizeUrl=function(a){return a+"?"+Math.ceil(1e4*Math.random()).toString()},e}]),b.factory("RestangularResourceTemplate",["$q","$timeout","$state","$http","Restangular",function(b,c,d,e,f){function g(c,g){function h(a,b){return b.then(function(){d.go(a)})}function i(b){return a.extend(b,{andGo:function(a){return h(a,b)}})}function j(a){var c=a?t.one(a).get():t.one(),d=b.when(c);return d.$object=c,d.catch(function(a){404===a.status&&console.log("404!")}),d}function k(b,c,d){var e,f=null;if(null===c||""===c||void 0===c)return t.one();if(c=parseInt(c,10),a.isNumber(c)&&!isNaN(c))return a.forEach(b,function(a){a.id===c&&(f=a)}),f&&!d&&(e=b.indexOf(f),b.splice(e,1)),f;throw new Error(".grepFromCollection(id) should get null, empty string or something that can be parsed as int")}function l(a){return a.id?a.put():t.post(a)}function m(c){var d=[];return a.forEach(c,function(a){d.push(l(a))}),b.all(d)}function n(b,c){var d=[];return a.forEach(b,function(a){c(a)&&d.push(a)}),m(d)}function o(a,b){console.log(a);var c=a.patch(b).then(function(a){return a});return c}function p(a){return i(a.remove())}function q(a,b){var c=b.remove().then(function(){var c=a.indexOf(b);c>-1&&a.splice(c,1)});return i(c)}function r(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}function s(a,b){return console.log(a,b),e.patch(a,b)}g&&(f=g);var t=f.service(c),u={};return u.baseUrl=f.configuration.baseUrl+"/"+c+"/",u.getList=t.getList,u.getOne=j,u.grepFromCollection=k,u.save=l,u.saveBatch=m,u.customPatch=s,u.saveBatchIf=n,u.patch=o,u.remove=p,u.removeFromList=q,u.removeFromListWithoutDeleting=r,u}return{provideResource:g}}]),b.factory("configService",["$rootScope","RestangularResourceTemplate","Restangular",function(a,b,c){var d,e={};return e.load=function(){return c.all("config").customGET("").then(function(b){return d=b,a.resolvedConfig=b,b})},e.get=function(){return d?d:e.load()},e}]),b.service("configServiceOLD",["$rootScope","$resource","API_URL",function(a,b,c){var d=this,e=b(c+"config"),f=null;d.get=function(){return f?f:(f=e.get(),a.resolvedConfig=f,console.log("...but now it is. ",f),f)}}])}(angular),function(a){"use strict";var b=a.module("CommonModule");b.filter("trust",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),b.filter("separatelines",function(){return function(a){var b=a.split("\n"),c=b.join("<br/>");return c}}),b.filter("randomizeUrl",function(){return function(a){var b=a.split("?")[0];return b=b+"?"+Math.ceil(1e4*Math.random()).toString()}}),b.filter("range",function(){return function(a,b){var c;for(b=parseInt(b,10),c=0;b>c;c+=1)a.push(c);return a}})}(angular),function(a){"use strict";var b=a.module("AuthModule",[]);b.run(["$rootScope","Auth",function(a,b){a.$on("$stateChangeStart",function(a,c,d,e,f){b.checkAuthentication(a,c,d,e,f)})}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.controller("auth.LogoutCtrl",["$scope","$state","Auth",function(a,b,c){a.logout=function(){c.logout().then(function(){b.go("logout")})}}]),b.controller("auth.LoginCtrl",["$scope","$location","$state","Auth",function(a,b,c,d){a.is={saving:!1},a.user={},a.login=function(){a.is.saving=!0,d.login({username:a.user.username,password:a.user.password,remember:a.user.rememberme}).then(function(){a.is.saving=!1}).catch(function(b){console.log(b),a.is.saving=!1,403===b.status&&(a.error="Неверная пара логин+пароль"),400===b.status&&(a.error="Логин либо пароль не получен")})}}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.factory("Auth",["$http","$rootScope","$cookieStore","$state","$timeout","$localStorage",function(b,c,d,e,f,g){function h(){var b,c=this,d=g;a.isUndefined(d.auth)&&(d.auth={}),b=d.auth,c.get=function(c){return a.isUndefined(b[c])&&(b[c]=!1),b[c]},c.set=function(a,c){b[a]=c},c.reset=function(){delete d.auth}}function i(){return n.get("isLogged")}function j(a){return b.post("/api/login",a).then(function(a){n.set("isLogged",!0),n.set("user",a.data);var b=o?o.name:"home";o=null,e.go(b)})}function k(){return b.delete("/api/logout").then(function(){n.reset(),console.log("logged out. going to logout ok page")}).catch(function(a){console.log("logout errors:",a)})}function l(){return n.get("user")}function m(a,b,c,d){b.data.secure&&!i()&&(a.preventDefault(),"login"===d.name?e.reload():(o=b,console.log("will be redirected to"+o.name+" after login"),e.go("login")))}var n,o=null;return n=new h,{login:j,logout:k,getUser:l,checkAuthentication:m}}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.directive("authCurrentUserName",["Auth",function(a){return{restrict:"E",template:"<strong>User: {{user.name}}</strong>",link:function(b){b.user=a.user}}}])}(angular),function(a){"use strict";a.module("BlogModule",[])}(angular),function(a){"use strict";var b=a.module("BlogModule");b.controller("BlogListCtrl",["$scope","$sce","Restangular","resolvedData","Blog.Post",function(a,b,c,d,e){a.blog={},a.blog.posts=d,a.blog.posts.paginator.pagesize=5,a.deletePost=function(b){e.removeFromList(a.blog.posts,b)}}]),b.controller("BlogPostCtrl",["$scope","Blog.Post","$state","resolvedData",function(a,b,c,d){a.post=d,a.save=function(){a.is.saving=!0,b.save(a.post).then(function(b){a.is.saving=!1,a.post=b,c.go("blog.list")})},a.deletePost=function(){a.is.deleting=!0,b.remove(a.post).then(function(){a.is.deleting=!1,c.go("blog.list")})},a.is={saving:!1,deleting:!1}}])}(angular),function(a){"use strict";var b=a.module("BlogModule");b.factory("Blog.Post",["Restangular","RestangularResourceTemplate","configService",function(a,b){return b.provideResource("blog/posts")}])}(angular),function(a){"use strict";a.module("EventsModule",[])}(angular),function(a){"use strict";function b(a,b,c,d){a.events=d}function c(a,b,c,d){a.save=function(){a.is.saving=!0,c.save(a.event).then(function(c){a.is.saving=!1,a.event.id?(a.event=c,b.go("events.list")):b.go("events.event",{event_id:c.id})})},a.deleteEvent=function(){a.is.deleting=!0,c.remove(a.event).then(function(){a.is.deleting=!1,b.go("events.list")})},a.is={saving:!1,deleting:!1},a.toolbar=[["h1","h2","h3","p"],["bold","italics","underline"],["ul","ol"],["justifyLeft","justifyCenter","justifyRight"],["insertImage","insertLink"],["html"]],a.event=d}var d=a.module("EventsModule");d.controller("EventsListCtrl",["$scope","$state","Event","resolvedData",b]),d.controller("EventCtrl",["$scope","$state","Event","resolvedData",c])}(angular),function(a){"use strict";var b=a.module("EventsModule");b.factory("Event",["Restangular","RestangularResourceTemplate",function(a,b){return b.provideResource("events")}])}(angular),function(a){"use strict";a.module("EventsModule")}(angular),function(a){"use strict";a.module("GalleryModule",[])}(angular),function(a){"use strict";var b=a.module("GalleryModule");b.controller("GalleryListCtrl",["$scope","$q","Gallery","resolvedData",function(b,c,d,e){b.config=d.config,b.folders=e,b.sortingDone=function(e){var f=[];return b.folders=e,a.forEach(b.folders,function(a,b){a.order=b,f.push(d.Folder.patch(a,{order:b}))}),c.all(f)}}]),b.controller("GalleryFolderCtrl",["$scope","$state","$stateParams","$filter","Lightbox","SingleFileUploader","Gallery","resolvedData",function(b,c,d,e,f,g,h,i){function j(){h.Image.getList({folder:k}).then(function(a){b.images=a})}var k=d.folder_id;b.config=h.config,b.folder={},b.is={deletingFolder:!1,processingImage:null,migratingImages:!1,uploadingImage:!1},b.uploader=g.create({method:"POST",onAfterAddingFile:function(){b.is.uploadingImage=!0,b.uploader.uploadIfReady()},uploadTo:function(){return h.Folder.getUploadUrl(b.folder.id)},onSuccess:function(c,d){var e=h.Image.getOne(null).$object;e=a.extend(e,d),e.local={},e.urls.thumbnail=g.randomizeUrl(e.urls.thumbnail),b.images.push(e),b.is.uploadingImage=!1},onError:function(){b.is.uploadingImage=!1}}),b.saveFolder=function(){h.Folder.save(b.folder).then(function(a){b.folder.id?b.folder=a:c.go("gallery.folder",{folder_id:a.id})})},b.deleteFolder=function(){b.is.deletingFolder=!0,h.Folder.remove(b.folder).andGo("gallery.list")},b.selectedImages=[],b.selectImage=function(a){if(a.local.selected){var c=b.selectedImages.indexOf(a.id);b.selectedImages.splice(c,1),a.local.selected=!1}else a.local.selected=!0,b.selectedImages.push(a)},b.deleteImage=function(a){a.local={},a.local.pending=!0,h.Image.removeFromList(b.images,a).then(function(){a.local.pending=!1})},b.moveSelectedTo=function(c){var d={images:[],toFolder:c.id};a.forEach(b.selectedImages,function(a){a.local.pending=!0,d.images.push(a.id)}),b.is.migratingImages=!0,h.Image.moveImagesTo(c.id,d.images).then(function(c){console.log("Migrating done, response is:",c),b.is.migratingImages=!1,a.forEach(b.selectedImages,function(a){h.Image.removeFromListWithoutDeleting(b.images,a)}),b.selectedImages.length=0})},b.setAsCover=function(a){var c=h.Folder.baseUrl+b.folder.id+"/set_cover/";a.local.pending=!0,h.Folder.customPatch(c,{cover:a.id}).then(function(c){a.local.pending=!1,console.log("before",c.data.cover.url),c.data.cover.url=e("randomizeUrl")(c.data.cover.url),console.log("after",c.data.cover.url),b.folder.cover=c.data.cover})},b.openLightboxModal=function(a){f.openModal(b.images,a)},b.folders=i,k&&"new"!==k?(j(),b.folder=h.Folder.grepFromCollection(b.folders,k)):(b.images=[],b.folder=h.Folder.getOne())}])}(angular),function(a){"use strict";var b=a.module("GalleryModule");b.factory("Gallery.Folder",["Restangular","RestangularResourceTemplate",function(a,b){var c=b.provideResource("gallery/folders");return c.getUploadUrl=function(a){return c.baseUrl+a+"/upload_image/"},c}]),b.factory("Gallery.Image",["Restangular","RestangularResourceTemplate",function(a,b){var c=b.provideResource("gallery/images");return c.getUploadUrl=function(a){return c.baseUrl+a},c.moveImagesTo=function(a,b){console.log("Migrating images:",b);var d=c.customPatch(c.baseUrl+"migrate/",{images:b,folder:a});return console.log(d),d},c}]),b.factory("Gallery",["configService","Gallery.Folder","Gallery.Image",function(a,b,c){var d={Folder:b,Image:c};return d.setConfig=function(a){d.config=a.gallery},d}])}(angular),function(a){"use strict";a.module("GalleryModule")}(angular),function(a){"use strict";a.module("LineupModule",[])}(angular),function(a){"use strict";var b=a.module("LineupModule");b.controller("LineupListCtrl",["$scope","$q","Lineup","resolvedData",function(b,c,d,e){b.config=d.Person.config,b.lineup=e[0],b.topics=e[1],b.notes=e[2],b.sortingDone=function(e){var f=[];return b.lineup=e,a.forEach(b.lineup,function(a,b){a.order=b,f.push(d.Person.patch(a,{order:b}))}),c.all(f)}}]),b.controller("LineupSortingCtrl",["$scope","$http",function(){}]),b.controller("LineupPersonCtrl",["$scope","$q","$state","Lineup","SingleFileUploader","resolvedData",function(b,c,d,e,f,g){function h(a){var c=e.Note.getOne(null);return c.person=b.person.id,c.topic=a.id,c.text="",c.local={},c}function i(b,c){var d;return a.forEach(b,function(a){a.topic===c.id&&(d=a)}),d||(d=h(c)),d}function j(a){var d=""===a.note.text.trim(),f=d&&a.note.id,g=!d,i=null;return b.person.id&&(f&&(i=e.Note.remove(a.note),i.then(function(){a.note=h(a)})),g&&(a.note.person||(console.log("adding p[erson id"),a.note.person=b.person.id),i=e.Note.save(a.note),i.then(function(b){a.note=b}))),c.when(i)}function k(){var d=[];return a.forEach(b.topics,function(a){d.push(j(a))}),c.all(d)}b.is={clearing_cover:!1,saving:!1,deleting:!1},b.uploader=f.create({uploadTo:function(){return e.Person.getUploadUrl(b.person.id)},onSuccess:function(a,c){b.is.saving=!1,b.person.photo=f.randomizeUrl(c)},onError:function(){b.is.saving=!1}}),b.delete_note=function(a){a.note.id&&(a.note.local.isPending=!0,e.Note.remove(a.note).then(function(){a.note.local.isPending=!1,a.note=h(a)}))},b.create_topic=function(){if(""!==b.newtopic){var a={title:b.newtopic};e.Topic.save(a).then(function(a){a.note=h(a),b.topics.push(a),b.newtopic=""})}},b.delete_topic=function(a){e.Topic.removeFromList(b.topics,a)},b.savePerson=function(){b.is.saving=!0,e.Person.save(b.person).then(function(a){return b.person=a,k()}).then(function(){b.uploader.uploadIfReady().or(function(){b.is.saving=!1})})},b.removePerson=function(){e.Person.remove(b.person).andGo("lineup.list")},b.newtopic="",b.person=g[0],b.notes=g[2];var l=g[1];b.person.id?a.forEach(l,function(a){a.note=i(b.notes,a)}):a.forEach(l,function(a){a.note=h(a)}),b.topics=l}])}(angular),function(a){"use strict";var b=a.module("LineupModule");b.factory("Lineup.Topic",["RestangularResourceTemplate","configService",function(a){var b=a.provideResource("lineup/topics");return b.getNotesForList=function(){},b}]),b.factory("Lineup.Note",["RestangularResourceTemplate","configService",function(a){var b=a.provideResource("lineup/notes");return b.getNotesForList=function(){},b}]),b.factory("Lineup.Person",["RestangularResourceTemplate","configService",function(a,b){var c=b,d=a.provideResource("lineup/people");return d.config={},d.setConfig=function(){d.config.thumbnail={width:c.get().lineup.thumbnail_width,height:c.get().lineup.thumbnail_height}},d.getUploadUrl=function(a){return d.baseUrl+a+"/upload_photo/"},d}]),b.factory("Lineup",["Lineup.Person","Lineup.Topic","Lineup.Note",function(a,b,c){return{Person:a,Topic:b,Note:c}}])}(angular),function(a){"use strict";a.module("LineupModule")}(angular),function(a){"use strict";var b=a.module("LineupModule");b.filter("for_person_list",function(){return function(a){return a}})}(angular),function(a){"use strict";a.module("MusicModule",[])}(angular),function(a){"use strict";var b=a.module("MusicModule");b.controller("MusicListCtrl",["APP_ROOT_FOLDER","$scope","$state","$sce","$q","$stateParams","$modal","configService","Music","separatelinesFilter","resolvedData",function(b,c,d,e,f,g,h,i,j,k,l){c.cover={width:j.config.cover_width,height:j.config.cover_height},c.albums=l,c.sortingDone=function(b){var d=[];return c.albums=b,a.forEach(c.albums,function(a,b){a.order=b,d.push(j.Album.patch(a,{order:b}))}),f.all(d)},c.sortingDoneSongs=function(b){var d=[],e=j.Album.grepFromCollection(c.albums,b[0].album,!0);return e.songs=b,a.forEach(b,function(a,b){var c=j.Song.baseUrl+a.id+"/";a.order=b,d.push(j.Song.customPatch(c,{order:b}))}),f.all(d)},c.showLyrics=function(a){h.open({templateUrl:b+"music/templates/modal-lyrics.html",controller:["$scope",function(b){b.song={title:a.title,lyrics:e.trustAsHtml(k(a.lyrics))}}]})}}]),b.controller("MusicAlbumCtrl",["$scope","$state","$stateParams","SingleFileUploader","Music","resolvedData",function(a,b,c,d,e,f){c.album_id;a.error="",a.album=f,a.is={clearing_cover:!1,saving:!1,deleting:!1},a.uploader=d.create({uploadTo:function(){return e.Album.getUploadUrl(a.album.id)},onSuccess:function(b,c){a.is.saving=!1,a.album.cover=d.randomizeUrl(c)},onError:function(){a.is.saving=!1}}),a.save=function(){a.is.saving=!0,e.Album.save(a.album).then(function(b){a.album=b}).then(function(){a.uploader.uploadIfReady().or(function(){a.is.saving=!1})})},a.clearCover=function(){a.is.clearing_cover=!0,e.Album.update({id:a.album.id,action:"delete_cover"}).$promise.then(function(b){a.song=b,a.album.cover.thumbnail.url=null,a.is.clearing_cover=!1})},a.deleteAlbum=function(){a.is.deleting=!0,e.Album.remove(a.album).then(function(){a.is.deleting=!1,b.go("music.list")})}}]),b.controller("MusicSongCtrl",["$cookies","$scope","$state","$stateParams","Music","SingleFileUploader","resolvedData",function(b,c,d,e,f,g,h){function i(){var b;j?b=c.song.album:(b=parseInt(k,10),c.song.album=k),a.forEach(c.albums,function(a){a.id===b&&(c.local={},c.local.selectedAlbum=a)})}var j=(b.csrftoken,e.song_id),k=e.album_id;c.deleteSong=function(){c.is.deleting=!0,f.Song.remove(c.song).then(function(){c.is.deleting=!1,d.go("music.list")})},c.clearMp3=function(){c.is.clearingMp3=!0,f.Song.clearMp3(c.song.id).then(function(){c.song.mp3=null,c.is.clearingMp3=!1})},c.save=function(){c.is.saving=!0,c.song.album=c.local.selectedAlbum.id,f.Song.save(c.song).then(function(a){c.song=a,c.uploader.uploadIfReady().or(function(){c.is.saving=!1,d.go("music.list")})})},c.uploader=g.create({method:"PATCH",onAfterAddingFile:function(){},uploadTo:function(){return f.Song.getUploadUrl(c.song.id)},onSuccess:function(a,b){c.song.mp3=b,c.is.saving=!1},onError:function(){c.is.saving=!1}}),c.is={clearingMp3:!1,saving:!1,deleting:!1},c.albums=h[0],c.song=h[1],i()}])}(angular),function(a){"use strict";var b=a.module("MusicModule");b.factory("Music.Album",["Restangular","RestangularResourceTemplate","configService",function(a,b){var c=b.provideResource("music/albums");return c.getUploadUrl=function(a){return c.baseUrl+a+"/upload_cover/"},c}]),b.factory("Music.Song",["Restangular","RestangularResourceTemplate","configService",function(a,b){var c=b.provideResource("music/songs");return c.getUploadUrl=function(a){return c.baseUrl+a+"/upload_mp3/"},c.clearMp3=function(a){return c.customPatch(c.baseUrl+a+"/clear_mp3/")},c}]),b.factory("Music",["Music.Album","Music.Song",function(a,b){var c={Album:a,Song:b};return c.setConfig=function(a){c.config=a.gallery},c}])}(angular),function(a){"use strict";var b=a.module("MusicModule");b.directive("mp3Player",["PROJECT_ROOT_FOLDER","APP_ROOT_FOLDER","configService",function(b,c,d){var e=d.get().mp3player;return{restrict:"E",templateUrl:c+"common/templates/mp3player.html",scope:{music:"="},link:function(c,d,f){var g=e.common;c.mode=f.mode,"single"===c.mode?(c.flashPath=b+"flash/player_mp3_maxi.swf",a.extend(g,e.single),g.mp3=c.music):"multi"===c.mode&&(c.flashPath=b+"flash/player_mp3_multi.swf",a.extend(g,e.multi),g.mp3=c.music.urls,g.titles=c.music.titles),f.width&&(g.width=f.width),c.width=g.width,f.height&&(g.height=f.height),c.height=g.height,c.$watch(function(){return c.music},function(a){g.mp3=a;var b,d,e=[];for(b in g)d=b+"="+g[b],e.push(d);e=e.join("&"),c.options=e})}}}])}(angular),function(a){"use strict";a.module("PageletsModule",[])}(angular),function(a){"use strict";var b=a.module("PageletsModule");b.controller("PageletsListCtrl",["$scope","Slot","Pagelet","resolvedData",function(b,c,d,e){var f=e[0],g=e[1];a.forEach(g,function(b){a.forEach(f,function(a){b.pagelet===a.id&&(b.pagelet=a)})}),b.pagelets=f,b.slots=g,b.marked={pagelet:null,slot:null},b.highlightPagelet=function(a){b.highlighted_pagelet=a.id}}]),b.controller("PageletsPageletCtrl",["$scope","$state","Slot","Pagelet","resolvedData",function(a,b,c,d,e){a.pagelet=e,a.is={saving:!1,deleting:!1},a.save=function(c){c.$valid&&(a.is.saving=!0,d.save(a.pagelet).then(function(d){console.log(d),c.$setPristine(),a.pagelet=d,a.is.saving=!1,b.go("pagelets.list")}))},a.deletePagelet=function(){a.is.deleting=!0,d.remove(a.pagelet).andGo("pagelets.list")},a.toolbar=[["h1","h2","h3","p"],["bold","italics","underline"],["ul","ol"],["justifyLeft","justifyCenter","justifyRight"],["insertImage","insertLink"],["html"]]}]),b.controller("PageletsSlotCtrl",["$scope","$state","Slot","Pagelet","resolvedData",function(b,c,d,e,f){b.remove=function(){d.remove(b.slot).andGo("pagelets.list")},b.save=function(){b.local.selectedPagelet&&(b.slot.pagelet=b.local.selectedPagelet.id),b.is.saving=!0,d.save(b.slot).then(function(a){b.slot=a,b.is.saving=!1,c.go("pagelets.list")})},b.deleteSlot=function(){b.is.deleting=!0,e.remove(b.slot).andGo("pagelets.list")
},b.local={},b.is={saving:!1,deleting:!1},b.available_pagelets=f[0],b.slot=f[1],a.forEach(b.available_pagelets,function(a){a.id===b.slot.pagelet&&(b.local.selectedPagelet=a)})}])}(angular),function(a){"use strict";var b=a.module("PageletsModule");b.factory("Pagelet",["RestangularResourceTemplate",function(a){var b=a.provideResource("pagelets");return b}]),b.factory("Slot",["RestangularResourceTemplate",function(a){var b=a.provideResource("slots");return b}])}(angular),function(){"use strict"}(angular);