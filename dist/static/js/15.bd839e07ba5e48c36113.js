webpackJsonp([15],{Hf9a:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("TVG1"),r=o("gyMJ"),i={data:function(){return{code:"",state:""}},methods:{wxCode:function(){var e=this;Object(r.c)("api",{s:"/hapi/Weixin/bindWxInfo",code:this.$route.query.code,state:this.$route.query.state}).then(function(t){t&&(console.log(t),console.log(n.a.get("backLink")),e.$router.push(n.a.get("backLink")))})}},watch:{"$route.query.code":function(){this.code=this.$route.query.code,this.state=this.$route.query.state}},created:function(){this.$route.query.code&&this.wxCode()}},c={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var u=o("C7Lr")(i,c,!1,function(e){o("rSBS")},"data-v-2ba09442",null);t.default=u.exports},rSBS:function(e,t){}});