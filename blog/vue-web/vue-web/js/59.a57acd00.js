(self["webpackChunkvuefortrading"]=self["webpackChunkvuefortrading"]||[]).push([[59],{84138:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("div",{staticClass:"btns"},[v("my-button",{attrs:{name:"成功",icon:"edit",type:"success"}}),v("my-button",{attrs:{name:"警告",icon:"edit",type:"warning"}}),v("my-button",{attrs:{name:"信息",icon:"edit",type:"info"}}),v("my-button",{attrs:{name:"危险",icon:"edit","icon-position":"right",type:"danger",plain:""}})],1)])},t=[],l={name:"ButtonTest"},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"587deae4",null),i=a.exports},62123:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("icon-button",{attrs:{icon:"click"}})],1)},t=[],l={name:"IconButtonTest"},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"11511b52",null),i=a.exports},44820:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("my-input",{attrs:{label:"账号:",width:"350",placeholder:s.placeholder,icon:"user"},model:{value:s.value,callback:function(v){s.value=v},expression:"value"}})],1)},t=[],l={name:"InputTest",data(){return{value:"111",placeholder:"请输入账号"}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"6d6f7d86",null),i=a.exports},4779:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("my-button",{attrs:{name:"打开消息框",icon:"edit",type:"info",plain:""},on:{click:function(v){return s.openBox()}}})],1)},t=[],l={name:"MsgBoxTest",methods:{openBox(){this.$msgBox.confirm({title:"提醒",content:"要删除吗？一旦删除将不可恢复",type:"info",onOK:()=>{console.log(111)},onCancel:()=>{console.log(222)}})}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"1d88a4a9",null),i=a.exports},82295:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("my-button",{attrs:{name:"消息",icon:"edit",type:"warning"},on:{click:function(v){return s.open()}}})],1)},t=[],l={name:"MsgTest",methods:{open(){this.$msg({type:"danger",content:"这是一条自定义消息"})}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"77323d34",null),i=a.exports},22687:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("div",{staticClass:"radio-group",staticStyle:{display:"flex"}},[v("my-radio",{attrs:{label:"男"},on:{input:s.radioSelect},model:{value:s.gender,callback:function(v){s.gender=v},expression:"gender"}},[s._v("男")]),v("my-radio",{attrs:{label:"女"},on:{input:s.radioSelect},model:{value:s.gender,callback:function(v){s.gender=v},expression:"gender"}},[s._v("女")])],1)])},t=[],l={name:"RadioTest",data(){return{gender:"男"}},methods:{radioSelect(s){console.log(s)}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"3ec2e093",null),i=a.exports},35210:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("div",{staticClass:"select-group"},[v("my-select",{attrs:{options:s.options,selected:s.selected},on:{"change-select":s.changeSelect}}),v("my-select",{attrs:{options:s.searchOptions,selected:s.searchSelected,type:"search"},on:{"change-select":s.changeSearchSelect}})],1)])},t=[],l={name:"RaioTest",data(){return{options:[{label:"苹果",value:"1"},{label:"香蕉",value:"2"},{label:"橘子",value:"3"}],selected:{label:"橘子",value:"3"},searchOptions:[{label:"2个橘子",value:"1"},{label:"香蕉",value:"2"},{label:"橘子",value:"3"}],searchSelected:{label:"橘子",value:"3"}}},methods:{changeSelect(s,v){console.log(s,v),this.selected.label=s,this.selected.value=v},changeSearchSelect(s,v){this.searchSelected.label=s,this.searchSelected.value=v}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"849b8bf4",null),i=a.exports},62182:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("div",{staticClass:"svg-group"},s._l(s.iconList,(function(s,g){return v("div",{key:g,staticClass:"svg-item"},[v("svg-icon",{attrs:{title:s,"icon-name":s,size:"24px"}})],1)})),0)])},t=[],l=(g(57658),{name:"SvgTest",data(){return{iconList:[]}},mounted(){const s=s=>s.keys().map(s),v=g(2341),e="icon-";s(v).forEach((s=>{var v=s.default.id.slice(e.length);this.iconList.push(v)}))}}),o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"4d98a602",null),i=a.exports},23081:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("my-tags",{attrs:{value:[]},on:{input:s.input,"update:tags":s.update}})],1)},t=[],l={name:"TagsTest",methods:{input(s){console.log(s)},update(s){console.log(s)}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"162b300c",null),i=a.exports},62808:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("my-textarea",{attrs:{label:"账号:",width:"350",placeholder:s.placeholder,maxlength:"350",height:"100"},model:{value:s.value,callback:function(v){s.value=v},expression:"value"}})],1)},t=[],l={name:"TextTest",data(){return{value:"111",placeholder:"请输入账号"}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"799f69a6",null),i=a.exports},98090:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return i}});var e=function(){var s=this,v=s._self._c;return v("div",[v("my-upload",{attrs:{action:s.uploadUrl,preview:"",image:s.img},on:{"upload-success":s.uploadCallback},model:{value:s.file,callback:function(v){s.file=v},expression:"file"}})],1)},t=[],l={name:"UploadTest",data(){return{file:{},uploadUrl:"http://116.62.179.162:7001/api/file"}},methods:{uploadCallback(s){console.log(s),this.$msg({type:"success",content:"上传成功"})}}},o=l,n=g(1001),a=(0,n.Z)(o,e,t,!1,null,"62a7caca",null),i=a.exports},67059:function(s,v,g){"use strict";g.r(v),g.d(v,{default:function(){return u}});var e=function(){var s=this,v=s._self._c;return v("div",{staticClass:"component-test"},[v("TemplatePage"),v("div",{staticClass:"component-box block"},[v("div",{staticClass:"block"},[v("button-test")],1),v("div",{staticClass:"block"},[v("input-test")],1),v("div",{staticClass:"block"},[v("textarea-test")],1),v("div",{staticClass:"block"},[v("tags-test")],1),v("div",{staticClass:"block"},[v("upload-test")],1),v("div",{staticClass:"block"},[v("radio-test")],1),v("div",{staticClass:"block"},[v("select-test")],1),v("div",{staticClass:"block"},[v("icon-button-test")],1),v("div",{staticClass:"block"},[v("msg-test")],1),v("div",{staticClass:"block"},[v("msg-box-test")],1),v("div",{staticClass:"block"},[v("svg-test")],1)])],1)},t=[],l=g(20144);const o=g(32909);function n(){o.keys().forEach((s=>{const v=o(s),g=s.replace(/^\.\//,"").replace(/\.vue$/,"");l.ZP.component(g,v.default||v)}))}n();var a={name:"ComponentTest",data(){return{}},methods:{}},i=a,r=g(1001),c=(0,r.Z)(i,e,t,!1,null,"e959cd3c",null),u=c.exports},2341:function(s,v,g){var e={"./svg/about-me.svg":52757,"./svg/add-location.svg":76213,"./svg/add.svg":46750,"./svg/aim.svg":34407,"./svg/alarm-clock.svg":37831,"./svg/apple.svg":18926,"./svg/arrow-down-bold.svg":21366,"./svg/arrow-down.svg":41692,"./svg/arrow-left-bold.svg":50428,"./svg/arrow-left.svg":88551,"./svg/arrow-right-bold.svg":81105,"./svg/arrow-right.svg":66972,"./svg/arrow-up-bold.svg":91491,"./svg/arrow-up.svg":3335,"./svg/avatar.svg":50808,"./svg/back.svg":4468,"./svg/baseball.svg":59959,"./svg/basketball.svg":67266,"./svg/bell-filled.svg":11299,"./svg/bell.svg":61353,"./svg/bicycle.svg":41993,"./svg/book.svg":61142,"./svg/bottom-left.svg":60874,"./svg/bottom-right.svg":12130,"./svg/bottom.svg":165,"./svg/bowl.svg":98190,"./svg/box.svg":32863,"./svg/briefcase.svg":45561,"./svg/brush-filled.svg":41030,"./svg/brush.svg":66307,"./svg/burger.svg":13636,"./svg/calendar.svg":5481,"./svg/camera-filled.svg":3505,"./svg/camera.svg":49725,"./svg/caret-bottom.svg":5910,"./svg/caret-left.svg":32110,"./svg/caret-right.svg":91409,"./svg/caret-top.svg":49308,"./svg/cellphone.svg":23937,"./svg/change.svg":2433,"./svg/chat-dot-round.svg":22565,"./svg/chat-dot-square.svg":81283,"./svg/chat-line-round.svg":6508,"./svg/chat-line-square.svg":24994,"./svg/chat-round.svg":3323,"./svg/chat-square.svg":58989,"./svg/check.svg":96310,"./svg/checked.svg":74123,"./svg/cherry.svg":66943,"./svg/chicken.svg":76112,"./svg/chrome-filled.svg":11695,"./svg/circle-check-filled.svg":5772,"./svg/circle-check.svg":22095,"./svg/circle-close-filled.svg":37010,"./svg/circle-close.svg":40415,"./svg/circle-plus-filled.svg":5599,"./svg/circle-plus.svg":51659,"./svg/click.svg":8925,"./svg/clock.svg":56929,"./svg/close-bold.svg":1364,"./svg/close.svg":90676,"./svg/cloudy.svg":4034,"./svg/coffee-cup.svg":56629,"./svg/coffee.svg":31964,"./svg/coin.svg":10621,"./svg/cold-drink.svg":19484,"./svg/colect.svg":96675,"./svg/collect-filled.svg":26630,"./svg/collect.svg":46026,"./svg/collection-tag.svg":46627,"./svg/collection.svg":18365,"./svg/comment-filled.svg":92166,"./svg/comment.svg":72730,"./svg/compass.svg":54750,"./svg/connection.svg":74202,"./svg/coordinate.svg":73798,"./svg/copy-document.svg":12519,"./svg/cpu.svg":6551,"./svg/credit-card.svg":57914,"./svg/crop.svg":6996,"./svg/d-arrow-left.svg":49116,"./svg/d-arrow-right.svg":74499,"./svg/d-caret.svg":69503,"./svg/data-analysis.svg":24222,"./svg/data-board.svg":22124,"./svg/data-line.svg":95274,"./svg/date.svg":5781,"./svg/delete-filled.svg":77507,"./svg/delete-location.svg":71847,"./svg/delete.svg":34718,"./svg/dessert.svg":99469,"./svg/diary.svg":30085,"./svg/digest.svg":94132,"./svg/discount.svg":9470,"./svg/dish-dot.svg":55281,"./svg/dish.svg":15247,"./svg/document-add.svg":2670,"./svg/document-checked.svg":5226,"./svg/document-copy.svg":67966,"./svg/document-delete.svg":55874,"./svg/document-remove.svg":88595,"./svg/document.svg":17851,"./svg/download.svg":89479,"./svg/drizzling.svg":96543,"./svg/edit-pen.svg":33580,"./svg/edit.svg":14662,"./svg/eleme-filled.svg":21916,"./svg/eleme.svg":60741,"./svg/element-plus.svg":1265,"./svg/expand.svg":22577,"./svg/failed.svg":29734,"./svg/female.svg":1753,"./svg/files.svg":13682,"./svg/film.svg":94964,"./svg/filter.svg":78443,"./svg/finished.svg":26146,"./svg/first-aid-kit.svg":65866,"./svg/flag.svg":5820,"./svg/fold.svg":58985,"./svg/folder-add.svg":19504,"./svg/folder-checked.svg":27178,"./svg/folder-delete.svg":28392,"./svg/folder-opened.svg":39161,"./svg/folder-remove.svg":23615,"./svg/folder.svg":95222,"./svg/food.svg":69301,"./svg/football.svg":54074,"./svg/fork-spoon.svg":38676,"./svg/fries.svg":38627,"./svg/full-screen.svg":74541,"./svg/goblet-full.svg":24490,"./svg/goblet-square-full.svg":37594,"./svg/goblet-square.svg":42803,"./svg/goblet.svg":10392,"./svg/gold-medal.svg":26930,"./svg/good-filled.svg":50888,"./svg/good.svg":25757,"./svg/goods.svg":9566,"./svg/grape.svg":35533,"./svg/grid.svg":62259,"./svg/guide.svg":71898,"./svg/handbag.svg":63993,"./svg/headset.svg":23112,"./svg/heavy-snow.svg":30322,"./svg/help-filled.svg":74934,"./svg/help.svg":38574,"./svg/hide-filled.svg":7745,"./svg/hide.svg":17641,"./svg/histogram.svg":6919,"./svg/home-filled.svg":29546,"./svg/hot-water.svg":23929,"./svg/house.svg":43695,"./svg/ice-cream-round.svg":42322,"./svg/ice-cream-square.svg":28124,"./svg/ice-cream.svg":20067,"./svg/ice-drink.svg":63946,"./svg/ice-tea.svg":26066,"./svg/info-filled.svg":96744,"./svg/iphone.svg":39354,"./svg/key.svg":54608,"./svg/knife-fork.svg":26681,"./svg/left.svg":46995,"./svg/lightning.svg":2328,"./svg/link.svg":50962,"./svg/list.svg":46018,"./svg/loading.svg":81080,"./svg/location-filled.svg":68473,"./svg/location-information.svg":79923,"./svg/location.svg":92954,"./svg/lock.svg":59127,"./svg/lollipop.svg":91526,"./svg/magic-stick.svg":45776,"./svg/magnet.svg":15724,"./svg/male.svg":5553,"./svg/management.svg":14596,"./svg/map-location.svg":39596,"./svg/medal.svg":66083,"./svg/memo.svg":10409,"./svg/menu.svg":53964,"./svg/message-box.svg":74602,"./svg/message.svg":68874,"./svg/mic.svg":57040,"./svg/microphone.svg":82726,"./svg/milk-tea.svg":38100,"./svg/minus.svg":54892,"./svg/money.svg":90002,"./svg/monitor.svg":79163,"./svg/moon-night.svg":37591,"./svg/moon.svg":34845,"./svg/more-filled.svg":8576,"./svg/more.svg":10378,"./svg/mostly-cloudy.svg":7249,"./svg/mouse.svg":32717,"./svg/mug.svg":86784,"./svg/mute-notification.svg":67629,"./svg/mute.svg":2145,"./svg/no-smoking.svg":53686,"./svg/notebook.svg":30497,"./svg/notification.svg":912,"./svg/odometer.svg":12479,"./svg/office-building.svg":43286,"./svg/open.svg":12556,"./svg/operation.svg":58286,"./svg/opportunity.svg":73017,"./svg/orange.svg":67292,"./svg/paperclip.svg":49178,"./svg/partly-cloudy.svg":58901,"./svg/pear.svg":95294,"./svg/pen.svg":85072,"./svg/phone-filled.svg":47218,"./svg/phone.svg":87810,"./svg/picture-filled.svg":68714,"./svg/picture-rounded.svg":90580,"./svg/picture.svg":61489,"./svg/pie-chart.svg":42967,"./svg/place.svg":2487,"./svg/platform.svg":5143,"./svg/plus.svg":24716,"./svg/pointer.svg":44236,"./svg/position.svg":72632,"./svg/postcard.svg":61205,"./svg/pouring.svg":22760,"./svg/present.svg":50800,"./svg/price-tag.svg":67448,"./svg/printer.svg":57378,"./svg/promotion.svg":19001,"./svg/publish.svg":67101,"./svg/quartz-watch.svg":92006,"./svg/question-filled.svg":31461,"./svg/rank.svg":46408,"./svg/reading-lamp.svg":44116,"./svg/reading.svg":39979,"./svg/record.svg":6014,"./svg/refresh-left.svg":57998,"./svg/refresh-right.svg":45438,"./svg/refresh.svg":72129,"./svg/refrigerator.svg":39519,"./svg/register.svg":85650,"./svg/remove-filled.svg":82262,"./svg/remove.svg":9025,"./svg/reply.svg":2898,"./svg/right.svg":8612,"./svg/rocket.svg":94910,"./svg/scale-to-original.svg":21778,"./svg/school.svg":81863,"./svg/scissor.svg":98576,"./svg/search-filled.svg":49481,"./svg/search.svg":63830,"./svg/select.svg":8019,"./svg/sell.svg":84953,"./svg/semi-select.svg":36009,"./svg/service.svg":19429,"./svg/set-up.svg":24751,"./svg/setting-filled.svg":43320,"./svg/setting.svg":54428,"./svg/share.svg":87554,"./svg/ship.svg":55992,"./svg/shop.svg":50319,"./svg/shopping-bag.svg":18280,"./svg/shopping-cart-full.svg":56528,"./svg/shopping-cart.svg":47100,"./svg/shopping-trolley.svg":80113,"./svg/smoking.svg":82833,"./svg/soccer.svg":2654,"./svg/sold-out.svg":1884,"./svg/sort-down.svg":99442,"./svg/sort-up.svg":65059,"./svg/sort.svg":89338,"./svg/stamp.svg":55731,"./svg/star-filled.svg":18123,"./svg/star.svg":62022,"./svg/stopwatch.svg":42490,"./svg/success-filled.svg":3026,"./svg/sugar.svg":92287,"./svg/suitcase-line.svg":91839,"./svg/suitcase.svg":42588,"./svg/sunny.svg":19269,"./svg/sunrise.svg":21983,"./svg/sunset.svg":63573,"./svg/switch-button.svg":2232,"./svg/switch-filled.svg":82067,"./svg/switch.svg":91920,"./svg/tag.svg":41995,"./svg/takeaway-box.svg":28085,"./svg/ticket.svg":83797,"./svg/tickets.svg":78416,"./svg/timer.svg":31093,"./svg/toilet-paper.svg":5900,"./svg/tools.svg":71664,"./svg/top-left.svg":67956,"./svg/top-right.svg":1620,"./svg/top.svg":51723,"./svg/trend-charts.svg":7008,"./svg/trophy-base.svg":94539,"./svg/trophy.svg":31332,"./svg/turn-off.svg":59987,"./svg/umbrella.svg":68821,"./svg/unlock.svg":24581,"./svg/upload-filled.svg":53151,"./svg/upload.svg":47773,"./svg/user-filled.svg":6938,"./svg/user.svg":65785,"./svg/van.svg":25884,"./svg/video-camera-filled.svg":32193,"./svg/video-camera.svg":89103,"./svg/video-pause.svg":44322,"./svg/video-play.svg":98650,"./svg/view.svg":15339,"./svg/wallet-filled.svg":23858,"./svg/wallet.svg":94776,"./svg/warn-triangle-filled.svg":10812,"./svg/warning-filled.svg":38359,"./svg/warning.svg":84938,"./svg/watch.svg":28424,"./svg/watermelon.svg":41357,"./svg/wind-power.svg":50289,"./svg/zoom-in.svg":6600,"./svg/zoom-out.svg":28860,"./svg/中雨.svg":65877,"./svg/中雪.svg":87616,"./svg/多云.svg":59108,"./svg/夜间多云.svg":26260,"./svg/夜间晴天.svg":45135,"./svg/大雨.svg":50629,"./svg/大雪.svg":58822,"./svg/天气无数据.svg":14790,"./svg/小雨.svg":43787,"./svg/小雪.svg":99454,"./svg/晴.svg":78736,"./svg/暴雨.svg":98449,"./svg/暴雪.svg":46027,"./svg/阴.svg":99249,"./svg/阵雨.svg":55140,"./svg/阵雪.svg":46640,"./svg/雷阵雨.svg":11154,"./svg/雾.svg":73278};function t(s){var v=l(s);return g(v)}function l(s){if(!g.o(e,s)){var v=new Error("Cannot find module '"+s+"'");throw v.code="MODULE_NOT_FOUND",v}return e[s]}t.keys=function(){return Object.keys(e)},t.resolve=l,s.exports=t,t.id=2341},32909:function(s,v,g){var e={"./ButtonTest.vue":84138,"./IconButtonTest.vue":62123,"./InputTest.vue":44820,"./MsgBoxTest.vue":4779,"./MsgTest.vue":82295,"./RadioTest.vue":22687,"./SelectTest.vue":35210,"./SvgTest.vue":62182,"./TagsTest.vue":23081,"./TextareaTest.vue":62808,"./UploadTest.vue":98090};function t(s){var v=l(s);return g(v)}function l(s){if(!g.o(e,s)){var v=new Error("Cannot find module '"+s+"'");throw v.code="MODULE_NOT_FOUND",v}return e[s]}t.keys=function(){return Object.keys(e)},t.resolve=l,s.exports=t,t.id=32909}}]);