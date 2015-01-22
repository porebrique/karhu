angular.module('App').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/static/ngadmin/app/src/auth/templates/login.html',
    "\n" +
    "<div class=\"panel panel-default\" style=\"width: 400px; margin: 0 auto;\">\n" +
    "\n" +
    "    <!--\n" +
    "\t<div class=\"panel-heading\">\n" +
    "\t\t<div class=\"panel-title\">Login</div>\n" +
    "\t</div>\n" +
    "    -->\n" +
    "    <div class=\"panel-body\">\n" +
    "        \n" +
    "        <div class=\"col-xs-12\">\n" +
    "\t\t<form action=\"#\" method=\"post\" name=\"loginform\" style=\"\">\n" +
    "            \n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\" style=\"width: 100px;\">Login</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"user.username\" name=\"username\" required/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\" style=\"width: 100px;\">Password</span>\n" +
    "                    <input type=\"password\" class=\"form-control\" ng-model=\"user.password\" name=\"password\" required/>\n" +
    "                </div>           \n" +
    "            </div>\n" +
    "            \n" +
    "            <!--\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>\n" +
    "\t               <input type=\"checkbox\" ng-model=\"user.rememberme\" name=\"rememberme\"/>\n" +
    "\t               Remember me\n" +
    "                </label>         \n" +
    "            </div>\n" +
    "            -->\n" +
    "\t\t\t\t<div class=\"form-group\" ng-show=\"error\" style=\"margin-bottom: -15px; font-size: 14px;\">\n" +
    "                    <div class=\"alert alert-danger\">\n" +
    "\t\t\t\t\t   {{error}}\n" +
    "                    </div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</fieldset>\n" +
    "\n" +
    "\t\t\n" +
    "\t\t</form>\n" +
    "        </div>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "\n" +
    "\t\n" +
    "\t<div class=\"panel-footer text-right\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"loginform.$invalid\" ng-click=\"login()\"><span spinner-when=\"is.saving\"><span class=\"fa fa-unlock-alt\"/>login</span></button>\n" +
    "\t</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/auth/templates/logout.html',
    "\n" +
    "<div class=\"panel panel-default\" style=\"width: 400px; margin: 0 auto;\">\n" +
    "\n" +
    "    \n" +
    "\t<div class=\"panel-heading\">\n" +
    "\t\t<div class=\"panel-title\">Вы вышли из админки</div>\n" +
    "\t</div>\n" +
    "    \n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        \n" +
    "        <p style=\"font-size: 14px;\">\n" +
    "            Туда можно <a ui-sref=\"login\">вернуться</a>, а можно <a href=\"/\">отправиться на сайт</a>.\n" +
    "        </p>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "\n" +
    "\t\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/auth/templates/signup.html',
    "\n" +
    "<div class=\"system-widget widget\">\n" +
    "\n" +
    "\t<div class=\"widget-header\">\n" +
    "\t\t<div class=\"widget-header-wrapper\">\n" +
    "\t\tSign Up\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class=\"widget-content\">\n" +
    "\t<div class=\"widget-content-wrapper\">\n" +
    "\t\n" +
    "\t\t\n" +
    "\t\t<form action=\"#\" method=\"post\">\n" +
    "\t\t\n" +
    "\t\t\t<fieldset>\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<label>Login</label>\n" +
    "\t\t\t\t\t<input type=\"text\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<label>Password</label>\n" +
    "\t\t\t\t\t<input type=\"password\"/>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</fieldset>\n" +
    "\t\t\t\n" +
    "\t\t\t<fieldset class=\"buttons\">\n" +
    "\t\t\t\t<button type=\"button\">ok</button>\n" +
    "\t\t\t</fieldset>\n" +
    "\t\t\n" +
    "\t\t</form>\n" +
    "\t\t\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t\n" +
    "\t<div class=\"widget-footer\">\n" +
    "\t<div class=\"widget-footer-wrapper\">\n" +
    "\t\n" +
    "\t</div>\n" +
    "\t</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/blog/templates/list.html',
    "<h1>{{ ::resolvedConfig.apps.blog.menu_name }}</h1>\n" +
    "\n" +
    "\n" +
    "<div class=\"blog\">\n" +
    "    \n" +
    "    <div class=\"feed\" ng-cloak>\n" +
    "        \n" +
    "        <div class=\"panel panel-default\" ng-repeat=\"post in blog.posts\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <h2>{{::post.date_created | date:'dd MMM yyyy'}}: {{::post.title}} </h2>\n" +
    "                <div class=\"actions\">\n" +
    "                <a class=\"btn btn-default btn-sm\" \n" +
    "                   ui-sref=\"blog.post({post_id: post.id})\">\n" +
    "                    <span class=\"fa fa-pencil\" />\n" +
    "                    Редактировать\n" +
    "                </a>          \n" +
    "                <button \n" +
    "                        class=\"btn btn-danger btn-sm textless\" \n" +
    "                        confirmable-click=\"deletePost(post)\">\n" +
    "                    <span class=\"fa fa-trash\" />\n" +
    "                    \n" +
    "                </button>                               \n" +
    "                </div>\n" +
    "                </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <!--\n" +
    "                <div ng-show=\"::post.lead\" ng-bind-html=\"post.lead | trust\" />\n" +
    "-->\n" +
    "                <div ng-show=\"::post.lead\" ta-bind ng-model=\"::post.lead\" />\n" +
    "                <div ng-hide=\"::post.lead\">\n" +
    "                    <p class=\"alert alert-warning\" style=\"margin-bottom: 0;\">\n" +
    "                        Вводного текста нет. <br/> \n" +
    "                        По умолчанию вместо него будут показываться 40 первых слов \n" +
    "                        основного текста (если конкретный сайт не настроен иначе).\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>    \n" +
    "    \n" +
    "    <karhu-paginator total=\"{{blog.posts.paginator.count}}\" pagesize=\"10\" state=\"blog.list\"></karhu-paginator>\n" +
    "\n" +
    "    <div class=\"buttons\">\n" +
    "        <a class=\"btn btn-default\" ui-sref=\"home\"><span class=\"fa fa-mail-reply\"/>Вернуться</a>\n" +
    "        <a class=\"btn btn-default\" ui-sref=\"blog.post\"><span class=\"fa fa-plus\"/>Новая запись</a>\n" +
    "\n" +
    "        <!-- <a class=\"button\" title=\"ui-icon-plusthick\" ui-sref=\"blog_new\">Новая запись</a>-->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/static/ngadmin/app/src/blog/templates/post.html',
    "<h1 ng-hide=\"post.id\">Новая запись</h1>\n" +
    "<h1 ng-show=\"post.id\">Редактирование записи</h1>\n" +
    "<div>\n" +
    "\n" +
    "<form action=\"\" name=\"form\">\n" +
    "\n" +
    "    <fieldset>\n" +
    "\t\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<label>Заголовок записи {{post.id}}</label>\n" +
    "\t\t<input type=\"text\" ng-model=\"post.title\" class=\"form-control\" required/>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<label>Интро</label>\n" +
    "\t\t<div class=\"note\">\n" +
    "\t\t\tНеобязательное поле.<br/>\n" +
    "\t\t\tЕсли его не заполнить, в качестве вводного текста будут показываться 40 первых слов текста основного (если конкретный сайт не настроен иначе).\n" +
    "\t\t</div>\n" +
    "        <div text-angular ng-model=\"post.lead\"></div>\n" +
    "        <!--\n" +
    "\t\t<textarea ng-model=\"post.lead\" class=\"form-control\"></textarea>\n" +
    "-->\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<label>Текст записи</label>\n" +
    "\t\t<div class=\"elrte_default\">\n" +
    "            <div text-angular ng-required=\"true\" ng-model=\"post.text\"></div>\n" +
    "            <!--\n" +
    "\t\t\t<textarea ng-model=\"post.text\" class=\"form-control\" required text-angular></textarea>\n" +
    "-->\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</fieldset>\n" +
    "\n" +
    "\n" +
    "<div class=\"buttons\">\n" +
    "    <a class=\"btn btn-default\" ui-sref=\"blog.list\">\n" +
    "        <span class=\"fa fa-mail-reply\"></span>\n" +
    "        Вернуться к списку\n" +
    "    </a>\n" +
    "\t<button type=\"button\" \n" +
    "            ng-disabled=\"form.$invalid\"\n" +
    "            ng-click=\"save()\" \n" +
    "            class=\"btn btn-success\">\n" +
    "        <span spinner-when=\"is.saving\">\n" +
    "            <span class=\"fa fa-check\" />\n" +
    "            Сохранить\n" +
    "        </span>\n" +
    "    </button>\n" +
    "\t<button type=\"button\"\n" +
    "            ng-show=\"post.id\"\n" +
    "            class=\"btn btn-danger\" \n" +
    "            confirmable-click=\"deletePost()\">\n" +
    "        <span spinner-when=\"is.deleting\">\n" +
    "            <span class=\"fa fa-trash\"/>\n" +
    "            Удалить\n" +
    "        </span>\n" +
    "    </button>\n" +
    "</div>\n" +
    "\n" +
    "</form>\n" +
    "\t\t\t\t\n" +
    "\t\n" +
    "\n" +
    "\n" +
    "    </div>"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/404.html',
    " <p class=\"alert alert-danger centered\" style=\"font-size: 3em;\">404</p>"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/confirmation.html',
    "       <!-- \n" +
    "       <div class=\"modal-header\">\n" +
    "            <h3 class=\"modal-title\">I'm a modal!</h3>\n" +
    "        </div>\n" +
    "         -->\n" +
    "        <div class=\"modal-body\">\n" +
    "        \t<div>\n" +
    "        \t\tВы уверены?\n" +
    "        \t</div>\n" +
    "        \n" +
    "        <!-- \n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"item in items\">\n" +
    "                    <a ng-click=\"selected.item = item\">{{ item }}</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            Selected: <b>{{ selected.item }}</b>\n" +
    "             -->\n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button class=\"btn btn-danger\" ng-click=\"$close('ok')\">Да</button>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"$dismiss('fail')\">Пожалуй, нет</button>\n" +
    "        </div>"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/datepicker.html',
    "<span class=\"datepicker\">\n" +
    "    <input type=\"hidden\" \n" +
    "        class=\"form-control\" \n" +
    "        ng-model=\"datemodel\"\n" +
    "        is-open=\"dp.opened\" \n" +
    "        datepicker-popup=\"dd.MM.yyyy\" \n" +
    "        datepicker-options=\"dateOptions\" \n" +
    "        close-text=\"Close\" \n" +
    "        required/>\n" +
    "    <span class=\"input-group-btn\">\n" +
    "     <button type=\"button\" \n" +
    "            class=\"btn btn-default textless\" \n" +
    "            ng-click=\"open($event)\"><span class=\"fa fa-calendar\"></span>                         </button>\n" +
    "</span>"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/datetimepicker.html',
    "<span class=\"datetimepicker\">\n" +
    "<span class=\"datepicker\">\n" +
    "     <span class=\"input-group\">\n" +
    "       <input type=\"text\" \n" +
    "       \t\tclass=\"form-control\" \n" +
    "       \t\tdatepicker-popup=\"dd.MM.yyyy\" \n" +
    "       \t\tng-model=\"datetime.date\"\n" +
    "       \t\tis-open=\"datepickerIsOpen\" \n" +
    "       \t\tdatepicker-options=\"dateOptions\" \n" +
    "       \t\tclose-text=\"Close\" />\n" +
    "       <span class=\"input-group-btn\">\n" +
    "         <button type=\"button\" \n" +
    "         \t\tclass=\"btn btn-default\" \n" +
    "         \t\tng-click=\"open($event)\"><span class=\"glyphicon glyphicon-calendar\"></span></button>\n" +
    "       </span>\n" +
    "     </span>\t      \t\n" +
    "</span>\n" +
    "\n" +
    "\n" +
    "<span class=\"timepicker\" ng-class=\"{disabled: !dateSet()}\">\n" +
    "\t<span class=\"overlay\"></span>\n" +
    "\t<span class=\"widget\">\n" +
    "\t<timepicker ng-model=\"datetime.time\" \n" +
    "\t\t\t\tshow-meridian=\"false\"></timepicker>\n" +
    "\t</span>\t\t\t\n" +
    "</span>\t\n" +
    "\t\t\n" +
    "</span>\t\t\t"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/dropdown.html',
    "<div class=\"form-dropdown\">\n" +
    "   <div class=\"btn-group\" dropdown is-open=\"status.isopen\">\n" +
    "     <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-disabled=\"disabled\">\n" +
    "       {{selected[textfield]}} <span class=\"caret\"></span>\n" +
    "     </button>\n" +
    "     <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "     \t<li ng-repeat=\"item in available_options\" \n" +
    "            ng-class=\"{'selected': selected === item}\"\n" +
    "            ng-click=\"setSelected(item)\">{{item[textfield]}}</li>\n" +
    "       <li class=\"divider\" ng-hide=\"selected === null\"></li>\n" +
    "       <li  ng-hide=\"selected === null\" ng-click=\"reset()\">Очистить</li>\n" +
    "     </ul>\n" +
    "   </div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/form-list-filter.html',
    " <form action=\"\" method=\"get\" name=\"filterform\" style=\"margin-bottom: 10px;\" ng-submit=\"sendRequest()\" ng-cloak>\n" +
    "    <fieldset>\n" +
    "\t      <div class=\"row\" ng-repeat=\"field in fields\">\n" +
    "\t      \n" +
    "\t      \t<label>{{field.label}}</label>\n" +
    "\t      \t<span ng-if=\"field.type == 'text'\">\n" +
    "\t      \t\t<input class=\"form-control\" type=\"{{field.type}}\" ng-model=\"field.value\"/>\n" +
    "\t      \t</span>\n" +
    "\t      \t<span ng-if=\"field.type == 'date'\">\n" +
    "\t      \t\t<form-datepicker datemodel=\"field.value\"></widget-datepicker>\n" +
    "\t      \t</span>\n" +
    "\t      \t<span ng-if=\"field.type == 'time'\">\n" +
    "\t      \t\t<form-timepicker timemodel=\"field.value\"></form-timepicker>\n" +
    "\t      \t</span>\t      \t\n" +
    "\t      \t<span ng-if=\"field.type == 'datetime'\">\n" +
    "\t      \t\t<form-datetimepicker datetimemodel=\"field.value\"></form-timepicker>\n" +
    "\t      \t</span>\t   \t      \t\n" +
    "\t      \t<span ng-if=\"field.type == 'select'\">\n" +
    "\t      \t\t<form-dropdown options=\"field.options\" model=\"field.value\"></form-dropdown>\n" +
    "\t      \t\t<!--  \n" +
    "\t      \t\t<select class=\"form-control\" ng-model=\"field.value\" ng-options=\"a.id as a.name for a in field.options\"></select>\n" +
    "\t      \t\t -->\n" +
    "\t      \t</span>\t      \t\n" +
    "\t     </div>\n" +
    "\n" +
    "\t   </fieldset>\n" +
    "\t   \n" +
    "\t   <!-- \n" +
    "\t   <div>{{fields | json}}</div>\n" +
    "\t    -->\n" +
    "\t   \n" +
    "\t      <fieldset class=\"buttons\">\n" +
    "\t      \t<button class=\"btn btn-default\" type=\"submit\" ng-disabled=\"isEmpty()\">Поиск</button>\n" +
    "\t      \t<button class=\"btn btn-default\" type=\"button\" ng-click=\"resetForm()\" ng-disabled=\"isEmpty()\">Сбросить</button>\n" +
    "\t      </fieldset> \t\n" +
    "</form>\n" +
    " "
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/modal-crop.html',
    "<div class=\"modal-header\">\n" +
    "\t<h3>Crop interface</h3>\n" +
    "\n" +
    "\t<button aria-hidden=\"true\" data-dismiss=\"modal\" class=\"close\" type=\"button\">×</button>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "\t<div class=\"crop-interface1\">\t\n" +
    "\n" +
    "<!-- \n" +
    "\n" +
    "<div ng-jcrop=\"obj.src\" selection=\"obj.coords\" thumbnail=\"obj.thumbnail\"></div>\n" +
    " -->\n" +
    "\n" +
    " \n" +
    " <!-- \n" +
    " <div jrg-area-select coords='obj.coords'>\n" +
    "\t<div style='background-color:blue; height:300px; width:400px;'>&nbsp;</div>\n" +
    "</div>\n" +
    " -->\n" +
    " \n" +
    "\n" +
    "<ul>\n" +
    "\n" +
    "<li>ng-jrop: захардкоженные настройки, захардкоженно ужатая картинка-исходняк</li>\n" +
    "<li>angular-area-select: в модале некорректно рисует выделение, также необъяснимо сбрасывает выделение при кликах вне контейнера</li>\n" +
    "<li>ng img crop - не выделение, а браузерный кроп, возможно придётся</li>\n" +
    "<li></li>\n" +
    "<li></li>\n" +
    "</ul>\n" +
    "\n" +
    "\t\t\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "\t\n" +
    "<div class=\"modal-footer\">\n" +
    "\t<button type=\"button\" class=\"btn btn-primary\" ng-click=\"crop()\">Кропнуть</button>\n" +
    "\t<button type=\"button\" class=\"btn btn-primary\" ng-click=\"$close()\">ok</button>\n" +
    "\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"$dismiss()\">cancel</button>\n" +
    "</div>\t\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/modal-help.html',
    "\n" +
    "<div>\n" +
    "\t\n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"modal-help\" ng-bind-html=\"help_html | trust\"></div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"$dismiss()\">ok</button>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/modal-sorting.html',
    "\n" +
    "\n" +
    "\t<div class=\"modal-actions\">\n" +
    "        <!--\n" +
    "\t\t<button type=\"button\" class=\"btn btn-default textless\" ng-click=\"$dismiss()\"><span class=\"fa fa-close\" /></button>\n" +
    "        -->\n" +
    "\t</div>\n" +
    "\n" +
    "<div class=\"sorting_interface\" id=\"sorts\">\t\n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t\n" +
    "        <div class=\"some_note\">Измените порядок объектов, перетаскивая их.</div>\n" +
    "        <div class=\"as-sort\">\n" +
    "            <ul  as-sortable=\"sortableOptions\" data-ng-model=\"items\">\n" +
    "               <li class=\"item\" data-ng-repeat=\"item in items\" as-sortable-item>\n" +
    "                  <div as-sortable-item-handle>{{item[display]}}</div>\n" +
    "               </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        \n" +
    "        \n" +
    "\t\t<!--\n" +
    "\t\t<ul ui-sortable=\"sortableOptions\" class=\"items\" ng-model=\"items\">\n" +
    "\t\t\t<li id=\"item_{{item.id}}\" class=\"item\" ng-repeat=\"item in items\">{{item.text}}</li>\n" +
    "\t\t</ul>\n" +
    "        -->\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "\t\t\n" +
    "\t<div class=\"modal-footer\">\n" +
    "        <button type=\"button\" \n" +
    "                class=\"btn btn-default\" \n" +
    "                ng-click=\"$dismiss()\" \n" +
    "                ng-disabled=\"is.saving\">\n" +
    "            <span class=\"fa fa-mail-reply\"/>\n" +
    "            Отменить\n" +
    "        </button>\n" +
    "\t\t<button type=\"button\" \n" +
    "                class=\"btn btn-success\" \n" +
    "                ng-click=\"handleResult()\"\n" +
    "                ng-disabled=\"is.saving\">\n" +
    "            <span spinner-when=\"is.saving\">\n" +
    "                <span class=\"fa fa-check\"/>\n" +
    "                Сохранить\n" +
    "            </span>\n" +
    "        </button>\n" +
    "\t</div>\t\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/mp3player.html',
    "\r" +
    "\n" +
    "<object ng-if=\"mode == 'multi'\" type=\"application/x-shockwave-flash\" data=\"{{flashPath}}\" width=\"{{width}}\" height=\"{{height}}\">\r" +
    "\n" +
    "\t<param name=\"movie\" value=\"{{flashPath}}\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t<param name=\"wmode\" value=\"transparent\" />\r" +
    "\n" +
    "\t<param name=\"FlashVars\" value=\"{{options}}\" />\t \r" +
    "\n" +
    "</object>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\r" +
    "\n" +
    "<object ng-if=\"mode == 'single'\" type=\"application/x-shockwave-flash\" data=\"{{flashPath}}\" width=\"{{width}}\" height=\"{{height}}\">\r" +
    "\n" +
    "\t<param name=\"movie\" value=\"{{flashPath}}\" />\r" +
    "\n" +
    "\t<param name=\"wmode\" value=\"transparent\" />\r" +
    "\n" +
    "\t<param name=\"FlashVars\" value=\"{{options}}\" />\t \r" +
    "\n" +
    "</object>\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\t\t\t"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/paginator.html',
    "    <div ng-show=\"error\" class=\"alert alert-danger\">{{error}}</div>\n" +
    "    <div ng-show=\"pages_count.length > 1\">\n" +
    "        <ul class=\"pagination\">\n" +
    "            <!--\n" +
    "            <li><a href=\"{{blog.paginator.prev}}\">&laquo;</a>\n" +
    "-->\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"page in pages_count track by $index\" ng-class=\"{active: isActive($index)}\">\n" +
    "                <!--- <a ui-sref=\"blog.list({page: $index + 1})\">{{$index+1}}</a> -->\n" +
    "                <a ui-sref=\"{{state}}({page: $index + 1})\">{{$index+1}}</a>\n" +
    "            </li>\n" +
    "        <!--\n" +
    "            <li><a href=\"{{blog.paginator.next}}\">&raquo;</a>\n" +
    "            </li>\n" +
    "-->\n" +
    "        </ul>\n" +
    "    </div>"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/simple-table.html',
    "<table class=\"wide\">\n" +
    "\t<thead>\n" +
    "\t\t<tr>\n" +
    "\t\t\t<td colspan=\"{{columns.length}}\">\n" +
    "\t\t\t\t<widget-pagination items=\"pagination.items\" resource=\"pagination.resource\"></widget-pagination>\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr>\n" +
    "\t\t\t<td ng-repeat=\"column in parsedColumns\" style=\"{{column.css}}\" class=\"{{column.klass}}\">{{column.text}}</td>\n" +
    "\t\t</tr>\n" +
    "\t</thead>\n" +
    "\t<tbody>\n" +
    "\t\t<tr>\n" +
    "\t\t\t<tr ng-repeat=\"row in pagination.items\">\n" +
    "\t\t\t\t<td ng-repeat=\"cell in row\">{{cell}}</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tr>\n" +
    "\t</tbody>\n" +
    "\n" +
    "\t<tbody ng-show=\"!rows\">\n" +
    "\t\t<tr>\n" +
    "\t\t\t<td colspan=\"{{columns.length}}\" class=\"centered\">Данные отсутствуют</td>\n" +
    "\t\t</tr>\n" +
    "\t</tbody>\n" +
    "\n" +
    "</table>\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/common/templates/timepicker.html',
    "<span class=\"timepicker\">\n" +
    "\n" +
    "<timepicker ng-model=\"time.display\" \n" +
    "\t\t\tng-change=\"changed()\" \n" +
    "\t\t\tshow-meridian=\"false\"></timepicker>\n" +
    "</span>\t\n"
  );


  $templateCache.put('/static/ngadmin/app/src/events/templates/event.html',
    "<h1 ng-show=\"::event.id\">Редактирование события</h1>\n" +
    "<h1 ng-hide=\"::event.id\">Новое событие</h1>\n" +
    "\n" +
    "\n" +
    "<form  action=\"\" name=\"eventForm\">\n" +
    "\n" +
    "    <div  class=\"input-group\" style=\"margin-bottom: 10px; width: 350px;\">\n" +
    "        <span class=\"input-group-addon\" style=\"width: 160px;\">Дата</span>\n" +
    "        <div class=\"col-sm-10 static-control form-control\"\n" +
    "             ng-class=\"{'error': !event.date && eventForm.$dirty && eventForm.$invalid}\">               {{event.date | date:'d MMM yyyy'}}\n" +
    "        </div>\n" +
    "        <span class=\"input-group-btn\" >\n" +
    "            <form-datepicker datemodel=\"event.date\"></form-datepicker>\n" +
    "      </span>    \n" +
    "    </div>\n" +
    "    \n" +
    "\n" +
    "    <div class=\"input-group\" style=\"margin-bottom: 10px;\">\n" +
    "        <span class=\"input-group-addon\" style=\"width: 160px;\">Название</span>\n" +
    "        <input type=\"text\" \n" +
    "               ng-model=\"event.title\" \n" +
    "               class=\"form-control\" \n" +
    "               style=\"width: 400px;\"\n" +
    "               required/>\n" +
    "    </div>\t\n" +
    "    <div class=\"input-group\" style=\"margin-bottom: 10px;\">\n" +
    "        <span class=\"input-group-addon\" style=\"width: 160px;\">Место</span>\n" +
    "        <input type=\"text\" \n" +
    "               ng-model=\"event.place\" \n" +
    "               class=\"form-control\" \n" +
    "               style=\"width: 400px;\"/>\n" +
    "    </div>\t      \n" +
    "    <div class=\"input-group\" style=\"margin-bottom: 10px;\">\n" +
    "        <span class=\"input-group-addon\" style=\"width: 160px;\">Дополнительная <br/> информация</span>\n" +
    "        <div text-angular ta-toolbar=\"toolbar\" ng-model=\"event.info\"></div>\n" +
    "    </div>\t          \n" +
    "\n" +
    "\n" +
    "    <div class=\"buttons\">\n" +
    "        <a class=\"btn btn-default\" ui-sref=\"events.list\">\n" +
    "            <span class=\"fa fa-mail-reply\"></span>\n" +
    "            Вернуться к списку\n" +
    "        </a>\n" +
    "        <button type=\"button\"\n" +
    "                class=\"btn btn-success\" \n" +
    "                ng-disabled=\"is.saving || is.deleting || eventForm.$invalid\"\n" +
    "                ng-click=\"save()\">\n" +
    "            <span spinner-when=\"is.saving\">\n" +
    "                <span class=\"fa fa-check\"/>\n" +
    "                Сохранить\n" +
    "            </span>\n" +
    "        </button>\n" +
    "        <button type=\"button\"\n" +
    "                class=\"btn btn-danger\" \n" +
    "                ng-disabled=\"is.saving || is.deleting\"\n" +
    "                confirmable-click=\"deleteEvent()\" \n" +
    "                ng-show=\"event.id\">\n" +
    "                <span spinner-when=\"is.deleting\">\n" +
    "                    <span class=\"fa fa-trash\"/>\n" +
    "                    Удалить\n" +
    "                </span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</form>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/events/templates/list.html',
    "<h1>{{ ::resolvedConfig.apps.events.menu_name }}</h1>\n" +
    "\n" +
    "    \n" +
    "<div class=\"panel panel-default\">\n" +
    "    <table class=\"table table-striped\" style=\"font-size: 16px\">\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"event in events\">\n" +
    "                <td class=\"col-md-2\">{{::event.date | date:'d MMM yyyy'}}</td>\n" +
    "                <td class=\"col-md-2\">{{::event.title}}</td>\n" +
    "                <td class=\"col-md-2\">{{::event.place}}</td>\n" +
    "                <td class=\"col-md-4\">\n" +
    "                    <div ng-if=\"event.info\">\n" +
    "                      <button class=\"btn btn-default\"\n" +
    "                              ng-click=\"event.local.showInfo = !event.local.showInfo\">            \n" +
    "                            <span ng-hide=\"event.local.showInfo\">\n" +
    "                                <span class=\"fa fa-eye\"/>\n" +
    "                                <span class=\"fa fa-ellipsis-h\"/>         \n" +
    "                            </span>\n" +
    "                            <span ng-show=\"event.local.showInfo\">\n" +
    "                                <span class=\"fa fa-eye-slash\"/>                            \n" +
    "                                <span class=\"fa fa-ellipsis-h\"/>                            \n" +
    "                            </span>\n" +
    "                        </button>   \n" +
    "                        <div style=\"margin-top: 10px;\"\n" +
    "                             ng-show=\"event.local.showInfo\" \n" +
    "                             ta-bind\n" +
    "                             ng-model=\"::event.info\"></div>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "                <td class=\"col-md-2 actions righted\">\n" +
    "                   \n" +
    "                    <a class=\"btn btn-default textless\"\n" +
    "                            ui-sref=\"events.event({event_id: event.id})\">\n" +
    "                        <span class=\"fa fa-pencil\"></span>\n" +
    "                    </a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td colspan=\"4\"></td>\n" +
    "                <td class=\"righted\">\n" +
    "                    <a class=\"btn btn-default\" ui-sref=\"events.add({event_id: null})\">\n" +
    "                        <span class=\"fa fa-plus\"></span>\n" +
    "                        Добавить\n" +
    "                    </a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );


  $templateCache.put('/static/ngadmin/app/src/gallery/templates/folder.html',
    "\n" +
    "\n" +
    "<h1>Редактирование галерейной папки</h1>\n" +
    "<div class=\"folder_edit\">\n" +
    "<form action=\"\" novalidate>\n" +
    "    \n" +
    "\n" +
    "<fieldset class=\"folder_itself\">\n" +
    "\n" +
    "\t<div class=\"cover\" style=\"float: left;padding: 1em 0em 0 0; text-align: center; \">\n" +
    "        \n" +
    "\t\t<span ng-show=\"folder.cover\">\n" +
    "            \n" +
    "   \t\t\t<img  id=\"cover\" ng-src=\"{{folder.cover.url}}\" alt=\"\"/>\n" +
    "\n" +
    "   \t\t\t<br/>\n" +
    "            <button type=\"button\" class=\"btn btn-default\" style=\"margin-top: 10px;display:inline- block;\">Кропнуть обложку</button>\n" +
    " \t\t</span>\n" +
    " \t\t\n" +
    "        \n" +
    "   \t\t<span ng-hide=\"folder.cover\">\n" +
    "\n" +
    "            <image-placeholder  width=\"{{::config.cover_width}}\" height=\"{{::config.cover_height}}\"></image-placeholder>\n" +
    "  \t\t</span>  \t\t\n" +
    "\t\n" +
    "\t</div>\n" +
    "\n" +
    "\t\n" +
    "\t<div class=\"info\" style=\"float: left; margin-left: 3em; margin-right: -{{::config.cover_width}}px\">\n" +
    "\t\n" +
    "\t\t<div class=\"form-group\">\n" +
    "\t\t\t<label class=\"control-label\">Название галереи</label>\n" +
    "\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"folder.title\"/>\n" +
    "\t\t</div>\n" +
    "\t\t\t\n" +
    "\t\t<div class=\"form-group\">\n" +
    "\t\t\t<label class=\"control-label\">Видимость галереи на сайте <help-button source=\"status-help\"/></label>\n" +
    "            <div class=\"btn-group\">\n" +
    "                <label class=\"btn btn-default glyph-only\" \n" +
    "                       ng-model=\"folder.status\" \n" +
    "                       btn-radio=\"1\">\n" +
    "                    <span class=\"glyphicon glyphicon-eye-open\"/>\n" +
    "                </label>\n" +
    "                <label class=\"btn btn-default glyph-only\" \n" +
    "                       ng-model=\"folder.status\" \n" +
    "                       btn-radio=\"0\">\n" +
    "                    <span class=\"glyphicon glyphicon-eye-close\"/>\n" +
    "                </label>\n" +
    "            </div>            \n" +
    "\t\t</div>\t\t\n" +
    "\t\n" +
    "\t\t<div class=\"form-group\">\n" +
    "\t\t\t<label class=\"control-label\">Необязательное описание</label>\n" +
    "\t\t\t<textarea class=\"form-control\" ng-model=\"folder.description\"></textarea>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t</div>\n" +
    "</fieldset>\n" +
    "\n" +
    "<div class=\"buttons\">\n" +
    "\t<a class=\"btn btn-default\" ui-sref=\"gallery.list\"><span class=\"fa fa-mail-reply\"/>Вернуться</a>\n" +
    "\t<button type=\"button\" class=\"btn btn-success\" ng-click=\"saveFolder()\"><span class=\"fa fa-check\"/>Сохранить</button>\n" +
    "\t<button class=\"btn btn-danger\" \n" +
    "            type=\"button\" \n" +
    "            ng-click=\"deleteFolder()\" \n" +
    "            ng-show=\"folder.id\">\n" +
    "        <span spinner-when=\"is.deletingFolder\"><span class=\"fa fa-trash\"/>Удалить галерею</span>\n" +
    "    </button>\n" +
    "\t\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    \n" +
    "<!-- NB value add:\"50\" -->\n" +
    "\n" +
    "<div ng-hide=\"folder.id\">\n" +
    "    Сохраните папку, прежде чем добавлять в неё изображения\n" +
    "</div>\n" +
    "    \n" +
    "<div class=\"photos\" ng-show=\"folder.id\">\n" +
    "\t<h2>Содержимое папки:</h2>\n" +
    "\n" +
    "\t<div class=\"items\">\n" +
    "\n" +
    "\n" +
    "\t     <div class=\"thumbnail ng-fady\" \n" +
    "              ng-repeat=\"image in images\" \n" +
    "              ng-class=\"{processing: image.local.pending}\">\n" +
    "\t    \t<div class=\"wrapper\" \n" +
    "                 ng-class=\"{'bg-info': image.local.selected}\">\n" +
    "                <span class=\"throbber\"></span>\n" +
    "                <div class=\"img\" \n" +
    "                     style=\"width: {{::config.thumbnail_width}}px; height: {{::config.thumbnail_height}}px\">\n" +
    "                    <img ng-src=\"{{::image.urls.thumbnail}}\" alt=\"\" />\n" +
    "                      <button type=\"button\" \n" +
    "                              class=\"btn btn-default textless\" \n" +
    "                              ng-click=\"selectImage(image)\">\n" +
    "\n" +
    "                          <span  class=\"fa fa-check-square-o\"/>\n" +
    "                    </button>\n" +
    "                </div>\t      \n" +
    "                <div class=\"caption\">\n" +
    "                    <button type=\"button\" \n" +
    "                            class=\"btn btn-default textless\" \n" +
    "                            title=\"Сделать обложкой галереи\" \n" +
    "                            ng-click=\"setAsCover(image)\">\n" +
    "                        <span class=\"fa fa-home\"></span>\n" +
    "                    </button>\n" +
    "                    <button type=\"button\" \n" +
    "                            class=\"btn btn-default textless\" \n" +
    "                            title=\"Крупный размер\" \n" +
    "                            ng-click=\"openLightboxModal($index)\">\n" +
    "                        <span class=\"fa fa-search-plus\"></span>\n" +
    "                    </button>\n" +
    "                    <button type=\"button\" \n" +
    "                            class=\"btn btn-default textless\" \n" +
    "                            title=\"Вырезать другой фрагмент\">\n" +
    "                        <span class=\"fa fa-cut\"></span>\n" +
    "                    </button>                  \n" +
    "                    <button type=\"button\" \n" +
    "                            class=\"btn btn-danger glyph-only\" \n" +
    "                            ng-click=\"deleteImage(image, $index)\">\n" +
    "                        <span class=\"glyphicon glyphicon-trash\"/>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\t      </div>\n" +
    "\t    </div>\n" +
    "\t    \n" +
    "\t    <div class=\"thumbnail pull-left adding-item\" \n" +
    "            ng-class=\"{processing: is.uploadingImage}\" \n" +
    "             ng-show=\"uploader.queue.length < uploader.queueLimit\">\n" +
    "\t    \t<div class=\"wrapper\" >\n" +
    "\t    \t<span class=\"throbber\"></span>\n" +
    "\t    \t\t<div class=\"img\" \n" +
    "                     style=\"width: {{::config.thumbnail_width}}px; height: {{::config.thumbnail_height}}px\">\n" +
    "\t    \t\t\t<span class=\"add-place\">\n" +
    "\t    \t\t\t\t<span class=\"glyphicon glyphicon-plus-sign\"/>\n" +
    "\t    \t\t\t</span>\n" +
    "\t    \t\t</div>\n" +
    "                \n" +
    "\t    \t\t<input type=\"file\" nv-file-select uploader=\"::uploader\"/>\n" +
    "\n" +
    "\t      </div>\n" +
    "\t    </div>\t    \n" +
    "\t\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class=\"buttons\">\n" +
    "\t\t\n" +
    "        <span class=\"btn-group dropup\" \n" +
    "            dropdown is-open=\"status.isopen\">\n" +
    "            <button type=\"button\" \n" +
    "                    class=\"btn btn-primary dropdown-toggle\" \n" +
    "                    ng-disabled=\"selectedImages.length < 1\">\n" +
    "                <span spinner-when=\"is.migratingImages\">\n" +
    "                Переместить выбранные\n" +
    "                <span class=\"caret\"></span>\n" +
    "                </span>\n" +
    "            </button>\n" +
    "            <ul class=\"dropdown-menu form-dropdown\" role=\"menu\">\n" +
    "                <li ng-repeat=\"f in folders\" \n" +
    "                    ng-if=\"f.id !== folder.id\"\n" +
    "                    ng-click=\"moveSelectedTo(f)\">{{::f.title}}</li>\n" +
    "            </ul>\n" +
    "        </span>\n" +
    "\n" +
    "\t</div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"help-source\">\n" +
    "\t<div id=\"status-help\">\n" +
    "\n" +
    "\n" +
    "\t<ul>\n" +
    "\t\t<li><strong>Публичные галереи</strong> видны всем посетителям.</li>\n" +
    "\t\t<li><strong>Служебные галереи</strong> видны только в админке, но изображения из них общедоступны.\n" +
    "\t\t\t<p>\n" +
    "\t\t\tЭто удобно, например, когда нужно хранить множество изображений для вставки в записи блога, \n" +
    "\t\t\tно нет желания засорять ими общую галерею пафосных фотограмм.\n" +
    "\t\t\t</p>\n" +
    "\t\t\t<p>Статус галереи никак не относится к безопасности и решает чисто эстетические задачи.\n" +
    "\t\t\t\tБудьте осторожны и не выкладывайте в служебную галерею то, что хотели бы скрыть от случайных глаз. При определённой доле смекалки статус не станет препятствием для любопытных.\n" +
    "\t\t\t</p> \n" +
    "\t\t\t</li>\n" +
    "\t</ul>\n" +
    "\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "     </form>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div id=\"help_21\" style=\"display: none;\">\n" +
    "\t<ul>\n" +
    "\t\t<li><strong>Публичные галереи</strong> видны всем посетителям.</li>\n" +
    "\t\t<li><p><strong>Служебные галереи</strong> видны только в админке, но изображения из них общедоступны.\n" +
    "\t\t\t<br/>\n" +
    "\t\t\tЭто удобно, например, когда нужно хранить множество изображений для вставки в записи блога, \n" +
    "\t\t\tно нет желания засорять ими общую галерею пафосных фотограмм.\n" +
    "\t\t\t</p>\n" +
    "\t\t\t<p>Статус галереи никак не относится к безопасности и решает чисто эстетические задачи.\n" +
    "\t\t\t\tБудьте осторожны и не выкладывайте в служебную галерею то, что хотели бы скрыть от случайных глаз. \n" +
    "\t\t\t\tПри определённой доле смекалки статус не станет препятствием для любопытных.\n" +
    "\t\t\t</p> \n" +
    "\t\t\t</li>\n" +
    "\t</ul>\n" +
    "</div>\t\t\t\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/gallery/templates/list.html',
    "\n" +
    "<h1>{{ ::resolvedConfig.apps.gallery.menu_name }}</h1>\n" +
    "<div class=\"gallery_whole\" ng-cloak>\n" +
    "\t    <div class=\"thumbnail\" ng-repeat=\"folder in folders\">\n" +
    "\t    \t<a class=\"img\" ui-sref=\"gallery.folder({folder_id: folder.id})\">\n" +
    "\t\t      \t<img ng-src=\"{{::folder.cover.url}}\" alt=\"\" ng-show=\"::folder.cover\"/>\n" +
    "\t\t   \t\t<span ng-hide=\"::folder.cover\">\n" +
    "\t\t   \t\t\t<image-placeholder  width=\"{{::config.cover_width}}\" height=\"{{::config.cover_height}}\"></image-placeholder>\n" +
    "\t\t   \t\t</span>\n" +
    "\t\t   \t\t<span class=\"badge\">{{::folder.size}}</span>\n" +
    "\t   \t\t</a>\t      \n" +
    "\t      <div class=\"caption\">\n" +
    "\t        <h3>{{::folder.title}}</h3>\n" +
    "\n" +
    "\t      </div>\n" +
    "\t    </div>\n" +
    "\n" +
    "\n" +
    "\t<div class=\"buttons\">\n" +
    "\t\t<a class=\"btn btn-default\" ui-sref=\"gallery.list\"><span class=\"fa fa-mail-reply\"/>Вернуться</a>\n" +
    "\t\t<a class=\"btn btn-default\" ui-sref=\"gallery.add_folder\"><span class=\"fa fa-plus\"/>Добавить папку</a>\n" +
    "        <button type=\"button\"\n" +
    "            class=\"btn btn-default\"\n" +
    "            modal-sort\n" +
    "            items=\"folders\" \n" +
    "            display=\"title\" \n" +
    "            then=\"sortingDone\" \n" +
    "            button=\"Изменить порядок\">\n" +
    "                <span class=\"fa fa-list\"/>\n" +
    "                Изменить порядок\n" +
    "        </button>    \n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/static/ngadmin/app/src/gallery/templates/modal-lightbox.html',
    "\t<div class=\"modal-actions\">\n" +
    "\t\t<button type=\"button\" class=\"icon xmark\" ng-click=\"$dismiss()\"></button>\n" +
    "\t</div>\n" +
    "\n" +
    "<div class=\"sorting_interface\">\t\n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t\n" +
    "\t\t<div class=\"some_note\">Измените порядок объектов, перетаскивая их.</div>\n" +
    "\t\t<ul ui-sortable=\"sortableOptions\" class=\"items\" ng-model=\"items\">\n" +
    "\t\t\t<li id=\"item_{{item.id}}\" class=\"item\" ng-repeat=\"item in items\">{{item.text}}</li>\n" +
    "\t\t</ul>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "\t\t\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"button\" class=\"btn btn-primary\" ng-click=\"$close()\">ok</button>\n" +
    "\t</div>\t\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/lineup/templates/list.html',
    "<h1>{{ ::resolvedConfig.apps.lineup.menu_name }}</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!--\r" +
    "\n" +
    "<div class=\"clear\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    \r" +
    "\n" +
    " {{items | json}}\r" +
    "\n" +
    "        \r" +
    "\n" +
    "    \r" +
    "\n" +
    "    <div class=\"sorting_interface\" id=\"sorts\">\t\r" +
    "\n" +
    "        <div class=\"some_note\">Измените порядок объектов, перетаскивая их.</div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "        <ul class=\"as-sort\" as-sortable=\"sortableOptions\" data-ng-model=\"items\">\r" +
    "\n" +
    "           <li class=\"item\" data-ng-repeat=\"item in items\" as-sortable-item>\r" +
    "\n" +
    "              <div as-sortable-item-handle>{{item}}</div>\r" +
    "\n" +
    "           </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"lineup\">\r" +
    "\n" +
    "\t<div ng-repeat=\"person in lineup\" class=\"item\"  style=\"margin-left: {{::config.thumbnail.width}}px\">\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t<div class=\"img\" style=\"margin-left: -{{::config.thumbnail.width}}px\">\r" +
    "\n" +
    "\t\t\t<a ui-sref=\"lineup.person({person_id: person.id})\">\r" +
    "\n" +
    "    \t\t\t<img ng-show=\"::person.photo\" ng-src=\"{{::person.photo}}\" alt=\"{{::person.name}} photo\"/>\r" +
    "\n" +
    "    \t\t\t<span ng-hide=\"::person.photo\">\r" +
    "\n" +
    "    \t\t\t\t<image-placeholder width=\"::config.thumbnail.width\" height=\"::config.thumbnail.height\"></image-placeholder>\r" +
    "\n" +
    "    \t\t\t</span>\r" +
    "\n" +
    "\t\t\t</a>\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\t\t</div>\t\r" +
    "\n" +
    "\t\t<div class=\"info\">\r" +
    "\n" +
    "\t\t\t<div class=\"name\">{{::person.name}}</div>\r" +
    "\n" +
    "\t\t\t<div class=\"role\">{{::person.role}}</div>\r" +
    "\n" +
    "\t\t\t<div class=\"notes\">\r" +
    "\n" +
    "                <div class=\"note\" ng-repeat=\"note in notes | where: {person:person.id}\">\r" +
    "\n" +
    "\t\t\t\t\t<span class=\"topic\" ng-repeat=\"topic in topics | where:{id:note.topic}\">{{::topic.title }}</span>:\r" +
    "\n" +
    "\t\t\t\t\t<span class=\"text\">{{:: note.text }}</span>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t\t\t\t\r" +
    "\n" +
    "</div>    \r" +
    "\n" +
    "    \r" +
    "\n" +
    "\t<div class=\"buttons\">\r" +
    "\n" +
    "\t\t<a class=\"btn btn-default\"ui-sref=\"home\"><span class=\"fa fa-mail-reply\"/>Вернуться</a>\r" +
    "\n" +
    "        <a class=\"btn btn-default\" title=\"ui-icon-plusthick\" ui-sref=\"lineup.person\"><span class=\"fa fa-plus\"></span>Добавить</a>\r" +
    "\n" +
    "        <button type=\"button\"\r" +
    "\n" +
    "                class=\"btn btn-default\"\r" +
    "\n" +
    "                modal-sort\r" +
    "\n" +
    "                items=\"lineup\" \r" +
    "\n" +
    "                display=\"name\" \r" +
    "\n" +
    "                then=\"sortingDone\" \r" +
    "\n" +
    "                button=\"Изменить порядок\">\r" +
    "\n" +
    "            <span class=\"fa fa-list\"/>\r" +
    "\n" +
    "            Изменить порядок\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/lineup/templates/person.html',
    "\r" +
    "\n" +
    "<div class=\"person\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<form action=\"\" method=\"post\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t<fieldset class=\"name\">\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t\t\t\t<h3 class=\"panel-title\">Главное</h3>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t\t  \r" +
    "\n" +
    "\t\t\t  \t<div class=\"input-group\" style=\"margin-bottom: 10px;\">\r" +
    "\n" +
    "\t\t\t  \t\t<span class=\"input-group-addon\" style=\"width: 100px;\">Имя</span>\r" +
    "\n" +
    "\t\t\t  \t\t<input type=\"text\" ng-model=\"person.name\" class=\"form-control\"/>\r" +
    "\n" +
    "\t\t\t  \t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t  \t<div class=\"input-group\">\r" +
    "\n" +
    "\t\t\t  \t\t<span class=\"input-group-addon\" style=\"width: 100px\">Роль</span>\r" +
    "\n" +
    "\t\t\t  \t\t<input type=\"text\" ng-model=\"person.role\" class=\"form-control\"/>\r" +
    "\n" +
    "\t\t\t  \t</div>\r" +
    "\n" +
    "\t\t\t  \r" +
    "\n" +
    "\t\t\t    \r" +
    "\n" +
    "\t\t\t  </div>\r" +
    "\n" +
    "\t\t\t</div>\t\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t</fieldset>\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t<fieldset class=\"img\">\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t<h3 class=\"panel-title\">Портрет</h3>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t\t<div ng-show=\"person.photo\">\r" +
    "\n" +
    "\t\t\t\t<div style=\"float: left; widtH: 100%;\">\r" +
    "\n" +
    "\t\t\t\t<img class=\"portrait\" ng-src=\"{{person.photo}}\" alt=\"{{person.name}}\"/>\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\t\t<div class=\"help\">\r" +
    "\n" +
    "\t\t\t\t\t<p>Этот маленький фрагмент исходного изображения будет использоваться там, где оно не поместилось бы целиком.</p>\r" +
    "\n" +
    "\t\t\t\t\t<p>Оригинал хранится без изменений, поэтому вы всегда можете вырезать из него другой фрагмент, если захотите.</p>\t\t\t\t\r" +
    "\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\">Вырезать другой фрагмент</button>\r" +
    "\n" +
    "\t\t\t\t\t<modal-crop buttontext=\"Crop\" source=\"{{person.photo}}\"></modal-crop>\t\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\t\t\t<div style=\"clear: both\">\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\t\t\t<input type=\"file\" nv-file-select uploader=\"uploader\" class=\"form-control\"/>\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\r" +
    "\n" +
    "\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\t\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "\t\t\t\r" +
    "\n" +
    "\t\t</fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t<fieldset class=\"notes\">\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t\t\t\t<h3 class=\"panel-title\">Заметки</h3>\r" +
    "\n" +
    "\t\t\t\t\t<help-button source=\"notes-help\"></help-button>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"help-source\">\r" +
    "\n" +
    "\t\t\t\t\t\t<div id=\"notes-help\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<p>Темы и заметки - это что-то вроде ответов на вопросы. Например \"Любимый цвет: зелёный\" или \"Предпочитаемый гитарный бренд: Chtulhu Guitars\".</p>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<p><strong>Заметки</strong> у каждого свои, их удаление больше ничего не изменит.А список <strong>тем</strong> общий для всего состава, поэтому <strong>если удалить тему, удалятся все связанные с ней заметки</strong>.</p>\t\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t\t  \r" +
    "\n" +
    "\t\t\t<table>\r" +
    "\n" +
    "\t\t\t\t<tr ng-repeat=\"topic in topics\">\r" +
    "\n" +
    "\t\t\t\t\t<td>\r" +
    "\n" +
    "\t\t\t\t\t\t<label>{{::topic.title}}</label>\r" +
    "\n" +
    "\t\t\t\t\t</td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t\t<td>\r" +
    "\n" +
    "                        <div ng-class=\"{'input-group': topic.note.id}\">\r" +
    "\n" +
    "                          <input type=\"text\" class=\"form-control\" ng-model=\"topic.note.text\">\r" +
    "\n" +
    "                          <span class=\"input-group-btn\">\r" +
    "\n" +
    "                            <button ng-show=\"topic.note.id\" tabindex=\"-1\" ng-click=\"delete_note(topic)\" class=\"btn btn-danger\" type=\"button\">\r" +
    "\n" +
    "                                <span ng-hide=\"topic.note.local.isPending\" class=\"fa fa-remove\"></span>\r" +
    "\n" +
    "                                <span ng-show=\"topic.note.local.isPending\" class=\"fa fa-spinner fa-spin\"></span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                          </span>\r" +
    "\n" +
    "                        </div>                      \r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "\t\t\t\t\t<td><button type=\"button\" tabindex=\"-1\" class=\"form-control btn btn-danger\" confirmable-click=\"delete_topic(topic)\">Удалить тему</button></td>\r" +
    "\n" +
    "\t\t\t\t\t<td></td>\r" +
    "\n" +
    "\t\t\t\t</tr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t<td></td>\r" +
    "\n" +
    "\t\t\t\t<td>\r" +
    "\n" +
    "\t\t\t\t\t<div id=\"add_topic_form\">\r" +
    "\n" +
    "\t\t\t\t\t\t<input type=\"text\" ng-model=\"newtopic\" class=\"form-control\"/>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</td>\r" +
    "\n" +
    "\t\t\t\t<td>\r" +
    "\n" +
    "\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary form-control\" ng-click=\"create_topic()\">Добавить тему</button>\r" +
    "\n" +
    "\t\t\t\t</td>\r" +
    "\n" +
    "\t\t\t\t<td></td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t\t</table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t  \r" +
    "\n" +
    "\t\t\t    \r" +
    "\n" +
    "\t\t\t  </div>\r" +
    "\n" +
    "\t\t\t</div>\t\t\t\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t</fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"buttons\">\r" +
    "\n" +
    "<a class=\"btn btn-default\" ui-sref=\"lineup.list\">\r" +
    "\n" +
    "\t<span class=\"fa fa-mail-reply\"></span>\r" +
    "\n" +
    "\tВернуться к списку\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<span class=\"btn btn-success\" type=\"button\"  ng-click=\"savePerson()\" spinner-when=\"is.saving\"><span class=\"fa fa-check\"/>Сохранить</span>\r" +
    "\n" +
    "<span class=\"btn btn-danger\" confirmable-click=\"removePerson()\" ng-show=\"person.id\"><span spinner-when=\"is.deleting\"><span class=\"fa fa-trash\"/> Удалить</span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/music/templates/album.html',
    "\r" +
    "\n" +
    "<div class=\"album_edit\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<fieldset>\r" +
    "\n" +
    "<div style=\"\">\r" +
    "\n" +
    "<p>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"form-group\">\r" +
    "\n" +
    "<label clas=\"control-label\">Название</label>\r" +
    "\n" +
    "<input type=\"text\" class=\"form-control\" ng-model=\"album.title\"/>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"cover form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "<label>Обложка</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-show=\"album.cover\">\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "\t<span class=\"image\">\r" +
    "\n" +
    "\t<img ng-src=\"{{album.cover}}\" alt=\"\"/>\r" +
    "\n" +
    "\t<button class=\"btn btn-danger glyph-only\" confirmable-click=\"clearCover()\"><span class=\"glyphicon glyphicon-trash\"></span></button>\r" +
    "\n" +
    "\t</span>\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "\t<button style=\"margin-top: 1em; display: block;\" id=\"summon_crop\" class=\"btn btn-default\">Вырезать другой фрагмент</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div style=\"margin-top: 1em;\">\r" +
    "\n" +
    "<input type=\"file\" class=\"form-control\" nv-file-select uploader=\"uploader\"/>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!-- \r" +
    "\n" +
    "<script type=\"text/javascript\">\r" +
    "\n" +
    "\t$('#summon_crop').areCropButtons({\r" +
    "\n" +
    "\t\t\treloadImage: '.cover img'\r" +
    "\n" +
    "\t\t});\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t$('input:file').fileinput({\r" +
    "\n" +
    "\t\tbuttonText: 'Загрузить',\r" +
    "\n" +
    "\t\tinputText: 'Сменить обложку...'\r" +
    "\n" +
    "\t});\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"buttons\">\r" +
    "\n" +
    "<a class=\"btn btn-default\" ui-sref=\"music.list\"><span class=\"fa fa-mail-reply\"/>Вернуться</a>\r" +
    "\n" +
    "<button type=\"button\" class=\"btn btn-success\" ng-click=\"save()\" spinner-when=\"is.saving\"><span class=\"fa fa-check\"/>Сохранить</button>\r" +
    "\n" +
    "<!-- \r" +
    "\n" +
    "<button type=\"button\" class=\"btn btn-primary\" ng-click=\"upload()\" spinner-when=\"is.saving\">Upload</button>\r" +
    "\n" +
    " -->\r" +
    "\n" +
    "<button type=\"button\" class=\"btn btn-danger\" confirmable-click=\"deleteAlbum()\" ng-show=\"album.id\"><span spinner-when=\"is.deleting\"><span class=\"fa fa-trash\"/>Удалить альбом (и все его песни)</span></button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/music/templates/list.html',
    "\n" +
    "<div class=\"music\">\n" +
    "\t<h1><h1>{{ ::resolvedConfig.apps.music.menu_name }}</h1></h1>\n" +
    "\t\n" +
    "<div style=\"font-size: 1.2em;margin-bottom: 2em;\">\n" +
    "\n" +
    "<p class=\"alert-default alert\">\n" +
    "\tЕсли вас смущает слово \"альбом\" (которое было бы уместно не во всех случаях), можете мысленно\n" +
    "\tзаменить его на \"список\", например. \n" +
    "\t<br/>\n" +
    "\tЗдесь этот термин обозначает просто условную группу песен, объединённую каким-либо названием.\n" +
    "</p>\n" +
    "\n" +
    "</div>\n" +
    "\t\t\n" +
    "\t\t\n" +
    "\t\t<div class=\"feed\">\n" +
    "\n" +
    "\n" +
    "\t\t<div class=\"album\" style=\"margin-left: {{::cover.width}}px;\" ng-repeat=\"album in albums\">\t\t\n" +
    "\t\t\t<div class=\"left\" style=\" margin-left: -{{::cover.width}}px;\">\n" +
    "\t\t\t\t<div class=\"cover\">\n" +
    "\t\t\t\t\t<img ng-show=\"::album.cover\" ng-src=\"{{::album.cover}}\" style=\"width: {{::cover.width}}px\" alt=\"\"/>\n" +
    "\t\t\t\t\t<span ng-hide=\"::album.cover\">\n" +
    "\t\t\t\t\t\t<image-placeholder  width=\"::cover.width\" height=\"::cover.height\"></image-placeholder>\n" +
    "\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"right\">\n" +
    "                <h2>{{::album.title}}</h3>\n" +
    "\t\t\t\t<table class=\"songs\" ng-show=\"::album.songs\">\n" +
    "\t\t\t\t\n" +
    "\t\t\t\t\t<tr ng-repeat=\"song in ::album.songs\">\n" +
    "\t\t\t\t\t\n" +
    "\t\t\t\t\t<td class=\"edit\">\n" +
    "\t\t\t\t\t\t<a ui-sref=\"music.song({song_id: song.id})\" class=\"btn btn-default glyph-only\"><span class=\"glyphicon glyphicon-pencil\"></span></a>\n" +
    "\n" +
    "\t\t\t\t\t\t<span ng-show=\"::song.lyrics\">\n" +
    "\t\t\t\t\t\t<a ng-click=\"showLyrics(song)\" class=\"btn btn-default glyph-only\"><span class=\"glyphicon glyphicon-file\"></span></a>\n" +
    "\t\t\t\t\t\t\t\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</td>\t\t\t\t\t\n" +
    "\t\t\t\t\t\t<td class=\"song_title\">{{::song.title}}</td>\n" +
    "\t\t\t\t\t\t\n" +
    "\t\t\t\t\t\t<td class=\"player\" ng-show=\"::song.mp3\">\n" +
    "\t\t\t\t\t\t\t<div class=\"player\">\n" +
    "\t\t\t\t\t\t\t\t<mp3-player mode=\"single\" music=\"::song.mp3\" width=\"100\" height=\"22\"></mp3-player>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t\n" +
    "\t\t\t\t\t</tr>\n" +
    "\t\t\t\t\t<tr>\n" +
    "\t\t\t\t\t\t<td colspan=\"2\">\n" +
    "\t\t\t\t\t\t\t<a class=\"btn btn-default glyph-only\" ui-sref=\"music.add_song({album_id: album.id})\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n" +
    "\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t</tr>\n" +
    "\t\t\t\t</table>\n" +
    "\t\t\t\t\n" +
    "\t\t\t\t<div class=\"edit_buttons\">\n" +
    "\t\t\t\t\t<a class=\"btn btn-default\" ui-sref=\"music.album({album_id: album.id})\">Редактировать</a>\n" +
    "\t\t\t\t\t<a class=\"btn btn-default\" ui-sref=\"music.add_song({album_id: album.id})\">Добавить трек сюда</a>\n" +
    "\t\t\t\t\t<!-- \n" +
    "\t\t\t\t\t<a class=\"button\" title=\"ui-icon-plusthick\" href=\"{  url 'admin-song-add'  }?album={album.pk}\">Добавить трек</a>\n" +
    "\t\t\t\t\t -->\t\t\t\t\t\n" +
    "\t\t\t\t\t<span ng-show=\"album.songs\">\n" +
    "                    <button type=\"button\"\n" +
    "                        class=\"btn btn-default\"\n" +
    "                        modal-sort\n" +
    "                        items=\"album.songs\" \n" +
    "                        display=\"title\" \n" +
    "                        then=\"sortingDoneSongs\" \n" +
    "                        button=\"Изменить порядок\">\n" +
    "                            <span class=\"fa fa-list\"/>\n" +
    "                            Изменить порядок\n" +
    "                    </button>  \n" +
    "\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t \n" +
    "\t\t\t\t</div>\t\t\t\t\t\n" +
    "\t\t\t\t\n" +
    "\t\t\t</div>\n" +
    "\t\t\t\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<br/>\n" +
    "\t\t\t<!-- \n" +
    "\t\t\t {# mp3player_admin 'multi' album.playlist   #}\n" +
    "\t\t\t  -->\n" +
    "\t\t\t \n" +
    "\t\t\n" +
    "\t\t</div>\t\n" +
    "\n" +
    "\t<div class=\"buttons\">\n" +
    "\t\t<a class=\"btn btn-default\" ui-sref=\"home\"><span class=\"fa fa-mail-reply\"/>Вернуться</a>\n" +
    "\t\t<a class=\"btn btn-default\" ui-sref=\"music.album\"><span class=\"glyphicon glyphicon-plus\"></span>Добавить альбом</a>\n" +
    "        <button type=\"button\"\n" +
    "            class=\"btn btn-default\"\n" +
    "            modal-sort\n" +
    "            items=\"albums\" \n" +
    "            display=\"title\" \n" +
    "            then=\"sortingDone\" \n" +
    "            button=\"Изменить порядок\">\n" +
    "                <span class=\"fa fa-list\"/>\n" +
    "                Изменить порядок\n" +
    "        </button>    \n" +
    "\t\t \n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- \n" +
    "<script type=\"text/javascript\">\n" +
    "$(function(){\n" +
    "$('.sort_summon').areSortSummoners();\n" +
    "\n" +
    "})\t\n" +
    "</script>\n" +
    " -->"
  );


  $templateCache.put('/static/ngadmin/app/src/music/templates/modal-lyrics.html',
    "       \n" +
    "       <div class=\"modal-header\">\n" +
    "            <h3 class=\"modal-title\">{{song.title}}</h3>\n" +
    "        </div>\n" +
    "       \n" +
    "        <div class=\"modal-body\">\n" +
    "        \t<div ng-bind-html=\"song.lyrics\"></div>\n" +
    "        \n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"$close()\">Закрыть</button>\n" +
    "        </div>"
  );


  $templateCache.put('/static/ngadmin/app/src/music/templates/song.html',
    "\n" +
    "<h1 ng-show=\"song.title\">{{::song.title}}</h1>\n" +
    "<h1 ng-hide=\"song.id\">Новая песня</h1>\n" +
    "\n" +
    "<div class=\"song\" ng-cloak>\n" +
    "\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "<div class=\"col-xs-6\">\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "\t<label class=\"control-label\">Название</label>\n" +
    "\t<input type=\"text\" ng-model=\"song.title\" class=\"form-control\" required/>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "\t<label class=\"control-label\">Альбом</label>\n" +
    "    \n" +
    "\t<form-dropdown options=\"albums\" model=\"local.selectedAlbum\" textfield=\"title\"></form-dropdown>\n" +
    "\t<br/>\n" +
    "</div>\n" +
    "\t\n" +
    "\t\n" +
    "<div class=\"form-group\">\n" +
    "\t<label class=\"control-label\">MP3</label>\n" +
    "\t \n" +
    "\t<input type=\"file\" class=\"form-control\" nv-file-select uploader=\"uploader\"/>\n" +
    "\t\n" +
    "\t\n" +
    "</div>\n" +
    "\t\n" +
    "<div ng-show=\"song.mp3\"> \n" +
    "\t<div class=\"form-group\">\n" +
    "\t\t<label class=\"control-label\">Уже загруженный файл</label>\n" +
    "\t\t<div class=\"player\">\n" +
    "\t\t\t\t\t\n" +
    "\t\t\t<mp3-player mode=\"single\" music=\"song.mp3\"></mp3-player>\n" +
    "\t\t\t<br/>\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-danger\" confirmable-click=\"clearMp3()\" style=\"margin-top: 10px;\"><span spinner-when=\"is.clearingMp3\">Удалить файл</span></button>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "\t<label class=\"control-label\">Текст</label>\n" +
    "\n" +
    "\t\t<textarea class=\"form-control\" ng-model=\"song.lyrics\" style=\"height: 300px;\"></textarea>\n" +
    "\t\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"buttons\">\n" +
    "\t\n" +
    "\t<a class=\"btn btn-default\" ui-sref=\"music.list\"><span class=\"fa fa-mail-reply\"></span>Вернуться</a>\n" +
    "\t<button type=\"button\" class=\"btn btn-success\" ng-click=\"save()\" spinner-when=\"is.saving\" ng-disabled=\"!(song.title&&song.album)\"><span class=\"fa fa-check\"/>Сохранить</button>\n" +
    "\t<!-- \t\n" +
    "\t<button type=\"button\" class=\"btn btn-primary\" ng-click=\"save()\">\n" +
    "\t<span class=\"spinner\" ng-show=\"isSaving\"></span>\n" +
    "\t<span ng-class=\"{transparent: isSaving}\">Сохранить</span>\n" +
    "\t</button>\n" +
    "\t -->\n" +
    "\t<button type=\"button\" class=\"btn btn-danger\" confirmable-click=\"deleteSong()\" ng-show=\"song.id\"><span spinner-when=\"is.deleting\"> <span class=\"fa fa-trash\"/>Удалить</span></button>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "</div>\n" +
    "\t\n" +
    "</div>\n"
  );


  $templateCache.put('/static/ngadmin/app/src/pagelets/templates/list.html',
    "\n" +
    "\n" +
    "<div class=\"help-source\">\n" +
    "\t<div id=\"pagelets-help\">\n" +
    "<p>\n" +
    "\tНазванное здесь (за неимением более подходящего слова) \"страницами\" - это просто статичные куски текста (а точнее html),\n" +
    "\tкоторые можно использовать двумя способами:\n" +
    "</p>\n" +
    "\t<ol>\t\n" +
    "\t\t<li><strong>Как небольшие самостоятельные страницы</strong> для конкретных задач - например, для какого-то объявления или контактной информации. \n" +
    "\t\t\tДля этого у каждой страницы есть адрес, по которому к ней можно обратиться. Если вы задали странице адрес <em>/kawaii_page/</em>,\n" +
    "\t\t\tто при обращении к <em>http://mysite.org/kawaii_page/</em> (доменное имя, конечно, должно быть ваше собственное) любой человек увидит её содержимое. \n" +
    "\t\t</li>\n" +
    "\t\t<li>\n" +
    "\t\t\t<strong>Для встраивания в произвольные места сайта</strong> (здесь они называются \"<strong>слотами</strong>\") - например, ту же контактную информацию\n" +
    "\t\t\tможно поместить в шапку сайта, чтобы посетители видели её постоянно. \n" +
    "\t\t\tДля этого нужно связать страницу со слотом, расположенным в нужном месте.\n" +
    "\t\t\tЭто, кстати, не помешает обращаться к странице по её адресу. <br/>\n" +
    "\t\t</li>\n" +
    "\t</ol>\n" +
    "\t\t\t\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"help-source\">\n" +
    "\t<div id=\"slots-help\">\n" +
    "        <p>Слот &mdash; это место где-то на сайте, в которое можно выводить страницу. А можно не выводить.</p>\n" +
    "        <p>Создавать новые слоты как правило бессмысленно, поскольку в вёрстку сайта их надо потом встраивать вручную, а без этого они будут видны только в админке.</p>\n" +
    "\t\t</p>\t\t\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"slots_and_pagelets\">\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "\n" +
    "<div class=\"pagelets col-md-6 col-md-height\">\n" +
    "\n" +
    "\t<div class=\"item panel panel-default\">\n" +
    "\t\t <div class=\"panel-heading\">\n" +
    "\t\t  \t<h3 class=\"panel-title\">Страницы</h3> \n" +
    "\t\t\t<help-button source=\"pagelets-help\"></help-button>\n" +
    "\t\t</div>\n" +
    "\t  <div class=\"panel-body\">\n" +
    " \t\t\t\n" +
    " \t\t\t<div class=\"item\" ng-repeat=\"pagelet in pagelets\" >\n" +
    "\t\t\t    <div class=\"thumbnail\" ng-class=\"{'bg-info': pagelet.id == marked.pagelet}\">\n" +
    "\t\t\t      <div class=\"caption \">\n" +
    "\t\t\t        <h3>{{::pagelet.title}}</h3> \n" +
    "\t\t\t\t\t<div class=\"url\">\n" +
    "\t\t\t\t\t\tДоступна по адресу <a class=\"ever\" href=\"{{::pagelet.url}}\">{{::pagelet.url}}</a>\n" +
    "\t\t\t\t\t</div>\t\t\t        \n" +
    "\t\t\t\t\t<div class=\"in_slot\" ng-show=\"::pagelet.slots.length > 0\">\n" +
    "\t\t\t\t\t\tТакже выводится в:\n" +
    "\t\t\t\t\t\t<ul>\n" +
    "\t\t\t\t\t\t <li ng-repeat=\"slot in ::pagelet.slots\">\n" +
    "\t\t\t\t\t\t <strong ng-mouseover=\"marked.slot = slot.id\" \n" +
    "                                 ng-mouseleave=\"marked.slot = null\">{{::slot.title}}</strong>\n" +
    "\t\t\t\t\t\t </li>\n" +
    "\t\t\t\t\t</div>\t\t\t\t\n" +
    "\t\t\t      </div>\n" +
    "\t\t\t      \n" +
    "\t       \t\t\t<div class=\"buttons\">\n" +
    "\t       \t\t\t<!-- \n" +
    "\t\t\t\t        <button  confirmable-click=\"\" class=\"btn btn-danger glyph-only\">\n" +
    "\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t -->\n" +
    "\t\t\t\t        <a ui-sref=\"pagelets.pagelet({pagelet_id: pagelet.id})\" class=\"btn btn-default glyph-only\">\n" +
    "\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t    </div>\n" +
    " \t\t\t</div>\n" +
    "\t  </div>\n" +
    "\t  <div class=\"panel-footer text-right\">\n" +
    "\t  \t<a ui-sref=\"pagelets.pagelet({pagelet_id: null})\" class=\"btn btn-default\"><span class=\"fa fa-plus\"/>Добавить страницу</a>\n" +
    "\t  </div>\n" +
    "\t</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"pagelets col-md-6 col-md-height\">\n" +
    "\n" +
    "\t<div class=\"item panel panel-default\">\n" +
    "\t\t <div class=\"panel-heading\">\n" +
    "\t\t  \t<h3 class=\"panel-title\">Cлоты</h3>\n" +
    "\t\t\t<help-button source=\"slots-help\"></help-button>\n" +
    "\t\t</div>\n" +
    "\t  <div class=\"panel-body\">\n" +
    " \t\t\t\n" +
    " \t\t\t<div class=\"item\"  ng-repeat=\"slot in slots\">\n" +
    "\t\t\t    <div class=\"thumbnail\"  ng-class=\"{'bg-info': slot.id == marked.slot}\">\n" +
    "\t\t\t      <div class=\"caption \">\n" +
    "\t\t\t        <h3>{{::slot.title}}</h3>\n" +
    "\t\t\t\t\t<span ng-show=\"::slot.pagelet\">\n" +
    "\t\t\t\t\t\tСодержит: <strong ng-mouseover=\"marked.pagelet = slot.pagelet.id\" ng-mouseleave=\"marked.pagelet = null\">{{::slot.pagelet.title}}</strong>\n" +
    "\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t<span ng-hide=\"::slot.pagelet\">\n" +
    "\t\t\t\t\tСлот пуст.\n" +
    "\t\t\t\t\t</span>\t\t\t        \n" +
    "\t\t\t        \n" +
    "\t\t\t      </div>\n" +
    "\t\t\t      \n" +
    "\t\n" +
    "\t\t\t\t<div class=\"buttons\" style=\"padding: 0; margin: 0;\">\n" +
    "\t\t\t\t<!-- \n" +
    "\t\t        \t<button  confirmable-click=\"\" class=\"btn btn-danger glyph-only\">\n" +
    "\t\t\t\t\t\t<span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t -->\n" +
    "\t\t\t\t\t<a ui-sref=\"pagelets.slot({slot_id: slot.id})\" class=\"btn btn-default glyph-only\">\n" +
    "\t\t\t\t\t\t<span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t</div>\t\t\t      \n" +
    "\t\t\t      \n" +
    "\t\t\t\t\t\t\t\t      \n" +
    "\t\t\t    </div>\n" +
    "\t\t\t  </div>\n" +
    " \n" +
    "\t  </div>\n" +
    "\t  <div class=\"panel-footer text-right\">\n" +
    "\t  \t<a ui-sref=\"pagelets.slot({slot_id: null})\" class=\"btn btn-default\"><span class=\"fa fa-plus\"/>Добавить слот</a>\t\t\n" +
    "\t  </div>\n" +
    "\t</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"buttons\">\n" +
    "\t<a class=\"btn btn-default\" ui-sref=\"home\">\n" +
    "\t\t<span class=\"fa fa-mail-reply\"></span>\n" +
    "\t\tВернуться\n" +
    "\t</a>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/pagelets/templates/pagelet.html',
    "\n" +
    "<div class=\"help-source\">\n" +
    "\t<div id=\"url-help\">\n" +
    "\n" +
    "\t<p>\n" +
    "\tЭто адрес, по которому страница будет доступна. Правильный адрес должен содержать только латиницу, цифры и_знак_подчеркивания. \n" +
    "\t<br/>\n" +
    "\tТакже он должен начинаться и заканчиваться символом \"/\", но его система может пририсовать самостоятельно.\n" +
    "\t</p>\n" +
    "\t<p>\n" +
    "\tБудьте внимательны:</p>\n" +
    "\t<ul>\n" +
    "\t\t<li>написать сюда вы можете всё что угодно, но некорректные адреса просто не будут работать</li>\n" +
    "\t\t<li>при изменении адреса страница, разумеется, перестаёт отдаваться по прошлому. Это может кого-нибудь опечалить.</li>\n" +
    "\t\t<li>не используйте адреса, уже занятые каким-либо модулем сайта. Результат совпадения не всегда предсказуем, но вряд ли вам понравится.</li>\n" +
    "</div>\t\t\t\t\t\t\n" +
    "</div>\n" +
    "\n" +
    "\t\t\n" +
    "\n" +
    "<div class=\"pagelet_edit\">\n" +
    "<form name=\"pageletForm\" action=\"\">\n" +
    "\t\n" +
    "\t<h1 ng-show=\"::pagelet.id\">Редактирование страницы</h1>\n" +
    "\t<h1 ng-hide=\"::pagelet.id\">Создание страницы</h1>\n" +
    "\n" +
    "\n" +
    "  \t<div class=\"form-group\" style=\"margin-bottom: 10px;\">\n" +
    "  \t\t<label class=\"control-label\">Название</label>\n" +
    "  \t\t<input type=\"text\" ng-model=\"pagelet.title\" class=\"form-control\" required/>\n" +
    "  \t</div>\t\t\n" +
    "  \t\n" +
    "  \t<div class=\"form-group\" style=\"margin-bottom: 10px;\">\n" +
    "  \t\t<label class=\"control-label\">Url\n" +
    "  \t\t<help-button source=\"url-help\"></help-button>\n" +
    "  \t\t</label>\n" +
    "  \t\t\n" +
    "  \t\t<input type=\"text\" ng-model=\"pagelet.url\" class=\"form-control\" required />\n" +
    "  \t</div>\t\n" +
    "  \t\n" +
    "  \t\n" +
    "  \t<div class=\"form-group\" style=\"margin-bottom: 10px;\">\n" +
    "  \t\t<label class=\"control-label\">Текст</label>\n" +
    "        <div text-angular ta-toolbar=\"toolbar\" ng-model=\"pagelet.content\"></div>\n" +
    "        \n" +
    "<!--  \t\t<textarea type=\"text\" ng-model=\"pagelet.content\" class=\"form-control\"></textarea>-->\n" +
    "  \t</div>\t\t\t  \t\n" +
    "  \t\t\t  \t\n" +
    "\n" +
    "\n" +
    "<div class=\"buttons\">\n" +
    "\t<a class=\"btn btn-default\" ui-sref=\"pagelets.list\">\n" +
    "\t\t<span class=\"fa fa-mail-reply\"></span>\n" +
    "\t\tВернуться к списку\n" +
    "\t</a>\n" +
    "\t<button type=\"button\"\n" +
    "            class=\"btn btn-success\" \n" +
    "            ng-click=\"save(pageletForm)\"\n" +
    "            ng-disabled=\"is.deleting || pageletForm.$invalid\">\n" +
    "            <span spinner-when=\"is.saving\">\n" +
    "                <span class=\"fa fa-check\"/>\n" +
    "                Сохранить\n" +
    "            </span>\n" +
    "    </button>\n" +
    "\t<button type=\"button\"\n" +
    "            class=\"btn btn-danger\" \n" +
    "            confirmable-click=\"deletePagelet()\" \n" +
    "            ng-show=\"pagelet.id\"\n" +
    "            ng-disabled=\"is.saving\">\n" +
    "            <span spinner-when=\"is.deleting\">\n" +
    "                <span class=\"fa fa-trash\"/>\n" +
    "                Удалить\n" +
    "            </span>\n" +
    "    </button>\n" +
    "\t\t\n" +
    "\t\n" +
    "</div>\n" +
    "</form>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/pagelets/templates/slot.html',
    "\n" +
    "\n" +
    "<form class=\"pagelet_edit\" action=\"\" name=\"slotForm\">\n" +
    "\n" +
    "\t<div class=\"panel panel-default\">\n" +
    "\t  <div class=\"panel-heading\">\n" +
    "\t\t\t<div class=\"panel-title\">\n" +
    "\t\t\t\t<span ng-show=\"::slot.id\">Редактирование слота</span>\n" +
    "\t\t\t\t<span ng-hide=\"::slot.id\">Создание слота</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t  <div class=\"panel-body\">\n" +
    "\t\t\t\n" +
    "          <p class=\"alert alert-warning\" ng-hide=\"::slot.id\">Имейте в виду, что содержимое добавленных слотов не будет видно без ручного вмешательства в вёрстку сайта, поэтому, увы, самостоятельно создавать новые бессмысленно.</p>\n" +
    "\n" +
    "\t\t  \t<div class=\"input-group\" style=\"margin-bottom: 10px;\">\n" +
    "\t\t  \t\t<span class=\"input-group-addon\" style=\"width: 160px;\">Название слота</span>\n" +
    "\t\t  \t\t<input type=\"text\" \n" +
    "                       ng-model=\"slot.title\" \n" +
    "                       class=\"form-control\" \n" +
    "                       style=\"width: 400px;\"\n" +
    "                       required/>\n" +
    "\t\t  \t</div>\t\t\n" +
    "\t\t  \t<div class=\"input-group\" style=\"margin-bottom: 10px;\">\n" +
    "\t\t  \t\t<span class=\"input-group-addon\" style=\"width: 160px;\">Содержимое слота</span>\n" +
    "\t\t  \t\t<form-dropdown options=\"available_pagelets\" \n" +
    "                               model=\"local.selectedPagelet\" \n" +
    "                               textfield=\"title\"/>\n" +
    "\t\t  \t</div>\n" +
    "\t  </div>\n" +
    "\t</div>\t\n" +
    "\t\n" +
    "\n" +
    "<div class=\"buttons\">\n" +
    "\t<a class=\"btn btn-default\" ui-sref=\"pagelets.list\">\n" +
    "\t\t<span class=\"fa fa-mail-reply\"></span>\n" +
    "\t\tВернуться к списку\n" +
    "\t</a>\n" +
    "\t<button class=\"btn btn-success\" \n" +
    "            ng-disabled=\"is.saving || is.deleting || slotForm.$invalid\"\n" +
    "            ng-click=\"save()\">\n" +
    "        <span spinner-when=\"is.saving\">\n" +
    "            <span class=\"fa fa-check\"/>\n" +
    "            Сохранить\n" +
    "        </span>\n" +
    "    </button>\n" +
    "\t<button class=\"btn btn-danger\" \n" +
    "            ng-disabled=\"is.saving || is.deleting\"\n" +
    "            confirmable-click=\"deleteSlot()\" \n" +
    "            ng-show=\"slot.id\">\n" +
    "            <span spinner-when=\"is.deleting\">\n" +
    "                <span class=\"fa fa-trash\"/>\n" +
    "                Удалить\n" +
    "            </span>\n" +
    "    </button>\n" +
    "\t\t\n" +
    "\t\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/templates/admin.html',
    "\n" +
    "<div id=\"header\">\n" +
    "\t<div class=\"wrapper\">\n" +
    "        <!--\n" +
    "\t\t<div class=\"titlewrapper1\">\n" +
    "\t\t\t<div class=\"title\">\n" +
    "\t\t\t\tЭТО АДМИНКА\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t-->\n" +
    "\t\t <navigation-menu></navigation-menu>\n" +
    "        \n" +
    "        <!--\n" +
    "        <div style=\"position: absolute; top: 10px; right: 200px;\">isLogged: {{Auth.isLogged}}</div>\n" +
    "        -->\n" +
    "\t</div>\t\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"main\">\n" +
    "\n" +
    "\t<div id=\"main-wrapper\">\n" +
    "        <div id=\"root-view-container\" state-spinner>\n" +
    "            <div ng-hide=\"rootViewLoading\">\n" +
    "                <ui-view></ui-view>\n" +
    "            </div>\n" +
    "            <!--\n" +
    "\t\t  <div id=\"root-view\" ui-view class=\"anim-in-out anim-slide-swap\" data-anim-speed=\"1000\"></div>\n" +
    "-->\n" +
    "        </div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"footer\">\n" +
    "<bindings-counter></bindings-counter>\n" +
    "karhu.admin v0.8\n" +
    "    \n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/static/ngadmin/app/src/templates/home.html',
    "\n" +
    "<div id=\"indexpage\">\n" +
    "\n" +
    "<div class=\"cards\">\n" +
    "\n" +
    "<!--  -->\n" +
    "<div class=\"col-xs-6 col-lg-3 column\">\n" +
    "    <a ui-sref=\"lineup.list\" class=\"card ever\" ng-show=\"::config.apps.lineup.enabled\" >\n" +
    "        <span class=\"fa fa-users\"></span>\n" +
    "        <span class=\"title\">{{ ::config.apps.lineup.menu_name }}</span>\n" +
    "        <span class=\"note\">\n" +
    "            Фотографии и любые сведения о членах вашего коллектива, которые вы хотите опубликовать.\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-xs-6 col-lg-3 column\">\n" +
    "    <a ui-sref=\"music.list\" class=\"card ever\" ng-show=\"::config.apps.music.enabled\" >\n" +
    "        <span class=\"fa fa-music\"></span>\n" +
    "        <span class=\"title\">{{ ::config.apps.music.menu_name }}</span>\n" +
    "        <span class=\"note\">\n" +
    "            Покажите посетителям свою музыку.\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>\n" +
    "    \n" +
    "<div class=\"col-xs-6 col-lg-3 column\">\n" +
    "    <a ui-sref=\"gallery.list\" class=\"card ever\" ng-show=\"::config.apps.gallery.enabled\" >\n" +
    "        <span class=\"fa fa-camera\"></span>\n" +
    "        <span class=\"title\">{{ ::config.apps.gallery.menu_name }}</span>\n" +
    "        <span class=\"note\">\n" +
    "            Фотографии, разложенные по папкам, публичным либо скрытым. \n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>\n" +
    "<div class=\"col-xs-6 col-lg-3 column\">\n" +
    "    <a ui-sref=\"events.list\" class=\"card ever\" ng-show=\"::config.apps.events.enabled\" >\n" +
    "        <span class=\"fa fa-calendar\"></span>\n" +
    "        <span class=\"title\">{{ ::config.apps.events.menu_name }}</span>\n" +
    "        <span class=\"note\">\n" +
    "            Календарь любых событий, о которых вы считаете нужным уведомить посетителей.\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>    \n" +
    "    \n" +
    "<div class=\"col-xs-6 col-lg-3 column\">\n" +
    "    <a ui-sref=\"blog.list\" class=\"card ever\" ng-show=\"::config.apps.blog.enabled\" >\n" +
    "        <span class=\"fa fa-book\"></span>\n" +
    "        <span class=\"title\">{{ ::config.apps.blog.menu_name }}</span>\n" +
    "        <span class=\"note\">\n" +
    "            Этот инструмент можно использовать как новостную ленту или блог.\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>\n" +
    "<div class=\"col-xs-6 col-lg-3 column\">\n" +
    "    <a ui-sref=\"pagelets.list\" class=\"card ever\" ng-show=\"::config.apps.pagelets.enabled\" >\n" +
    "        <span class=\"fa fa-th-large\"></span>\n" +
    "        <span class=\"title\">Слоты и страницы</span>\n" +
    "        <span class=\"note\">\n" +
    "            \"Страница\" это просто фрагмент текста (точнее, html) с адресом, по которому может быть открыт.\n" +
    "            \"Слот\" &mdash; место на сайте, куда этот фрагмент можно вставить.\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/templates/nav.html',
    " <div>\n" +
    "\t<div class=\"iconmenu submenu\" ng-controller=\"auth.LogoutCtrl\">\n" +
    "\t\t<a href=\"#\" class=\"ever icon lock\" ng-click=\"logout()\" title=\"Выход\"><span class=\"fa fa-unlock-alt\"/></a>\n" +
    "\t\t<a  href=\"/\" target=\"_blank\" class=\"ever icon newwindow\" title=\"На сайт\"><span class=\"fa fa-share\"/></a>\n" +
    "\n" +
    "\t</div>\n" +
    "\t<div class=\"iconmenu\">\n" +
    "        \n" +
    "\t\t<a ng-repeat=\"item in ::buttons\" class=\"ever\"  ui-sref=\"{{::item.sref}}\"  ng-if=\"item.enabled\" ng-class=\"{active:$state.includes(item.include)}\">\n" +
    "\t\t\t<span class=\"fa\" ng-class=\"::item.icon\"/>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t\t \n" +
    "\t\t \n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/static/ngadmin/app/src/templates/root.html',
    "<div id=\"all\">\n" +
    "<div id=\"page\">\n" +
    "\n" +
    "\n" +
    "    <ui-view></ui-view>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "</div>\n" +
    "<!--\n" +
    "<option value=\"anim-fade\">Fade</option>\n" +
    "<option value=\"anim-slide-left\">Slide left</option>\n" +
    "<option value=\"anim-slide-right\">Slide right</option>\n" +
    "<option value=\"anim-zoom-in\">Zoom in subtle</option>\n" +
    "<option value=\"anim-zoom-out\">Zoom out subtle</option>\n" +
    "<option value=\"anim-zoom-in-full\">Zoom in full</option>\n" +
    "<option value=\"anim-zoom-out-full\">Zoom out full</option>\n" +
    "<option value=\"anim-slide-below\">Slide below</option>\n" +
    "<option value=\"anim-slide-below-fade\">Slide below + fade</option>\n" +
    "<option value=\"anim-swap\">None</option>\n" +
    "-->"
  );


  $templateCache.put('/static/ngadmin/app/src/templates/todo.html',
    "<h1>ToDo</h1>\n" +
    "\n" +
    "<ul>\n" +
    "\n" +
    "<p>sdfsdfsdf</p>\n" +
    "\t<li>$cacheFactory и нужна ли она там, где можно хранить чочо в релевантных сервисах</li>\n" +
    "\t<li>подружить грунт.билд и пути к статике</li>\n" +
    "\t<li></li>\n" +
    "\t<li></li>\n" +
    "\t<li></li>\n" +
    "\t<li></li>\n" +
    "\t\n" +
    "</ul>"
  );

}]);
