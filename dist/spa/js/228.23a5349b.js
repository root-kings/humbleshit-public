(self["webpackChunkhumbleshit_app"]=self["webpackChunkhumbleshit_app"]||[]).push([[228],{2310:(e,t,a)=>{"use strict";a.d(t,{Z:()=>h});var l=a(3673),i=a(2323);const r={class:"text-center"},o={class:"text-center"};function s(e,t,a,s,c,d){const n=(0,l.up)("q-icon"),u=(0,l.up)("q-card-section"),m=(0,l.up)("q-item-label"),p=(0,l.up)("q-btn"),f=(0,l.up)("q-card");return(0,l.wg)(),(0,l.j4)(f,{flat:"",bordered:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,null,{default:(0,l.w5)((()=>[(0,l.Wm)("div",r,[(0,l.Wm)(n,{size:"96px",name:a.icon,color:"grey-4"},null,8,["name"])])])),_:1}),(0,l.Wm)(m,{class:"text-center",header:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,i.zw)(a.label),1)])),_:1}),a.to?((0,l.wg)(),(0,l.j4)(u,{key:0},{default:(0,l.w5)((()=>[(0,l.Wm)("div",o,[(0,l.Wm)(p,{"no-caps":"",unelevated:"",rounded:"",label:a.action,to:a.to,color:"primary","text-color":"secondary"},null,8,["label","to"])])])),_:1})):(0,l.ry)("",!0)])),_:1})}const c={props:{icon:{type:String,default:"eva-alert-triangle-outline"},label:{type:String,default:"Sorry! No data found."},to:{type:String,default:null},action:{type:String,default:null}}};var d=a(151),n=a(5589),u=a(4554),m=a(2350),p=a(8240),f=a(7518),y=a.n(f);c.render=s;const h=c;y()(c,"components",{QCard:d.Z,QCardSection:n.Z,QIcon:u.Z,QItemLabel:m.Z,QBtn:p.Z})},6228:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>K});a(246);var l=a(3673),i=a(2323);const r={key:0,class:"row q-col-gutter-md"},o={class:"col-12"},s={class:"text-h6"},c={class:"text-body1"},d=(0,l.Uk)("Last Checked");function n(e,t,a,n,u,m){const p=(0,l.up)("EmptyTile"),f=(0,l.up)("q-card-section"),y=(0,l.up)("q-item-label"),h=(0,l.up)("q-item-section"),w=(0,l.up)("q-item"),b=(0,l.up)("q-list"),g=(0,l.up)("q-card"),v=(0,l.up)("q-expansion-item"),W=(0,l.up)("q-btn"),_=(0,l.up)("q-page-sticky"),Z=(0,l.up)("FacilityForm"),q=(0,l.up)("q-dialog"),F=(0,l.up)("q-page"),Q=(0,l.Q2)("ripple");return(0,l.wg)(),(0,l.j4)(F,{padding:""},{default:(0,l.w5)((()=>[e.facility?(0,l.ry)("",!0):((0,l.wg)(),(0,l.j4)("div",r,[(0,l.Wm)("div",o,[(0,l.Wm)(p)])])),e.facility?((0,l.wg)(),(0,l.j4)(g,{key:1,flat:"",bordered:""},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)("div",s,(0,i.zw)(e.facility.name||"unset"),1),(0,l.Wm)("div",c,(0,i.zw)(e.facility.description||"unset"),1)])),_:1}),(0,l.Wm)(b,{bordered:"",separator:"",class:"overflow-hidden"},{default:(0,l.w5)((()=>[e.facility.lastChecked?(0,l.wy)(((0,l.wg)(),(0,l.j4)(w,{key:0},{default:(0,l.w5)((()=>[(0,l.Wm)(h,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[d])),_:1})])),_:1}),(0,l.Wm)(h,{side:""},{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,i.zw)(e.$filters.formatDate(e.facility.lastChecked)),1)])),_:1})])),_:1})])),_:1},512)),[[Q]]):(0,l.ry)("",!0),(0,l.Wm)(v,{label:"Parameters"},{default:(0,l.w5)((()=>[(0,l.Wm)(g,null,{default:(0,l.w5)((()=>[(0,l.Wm)(b,null,{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)(e.facility.parameters,(t=>((0,l.wg)(),(0,l.j4)(w,{key:t},{default:(0,l.w5)((()=>[(0,l.Wm)(h,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,i.zw)(e.parameterNameMap[t]),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})):(0,l.ry)("",!0),(0,l.Wm)(_,{position:"bottom-right",offset:[18,18]},{default:(0,l.w5)((()=>[(0,l.Wm)(W,{fab:"",icon:"eva-edit-outline",color:"primary",onClick:t[1]||(t[1]=t=>e.facilityDialog=!0)})])),_:1}),(0,l.Wm)(q,{modelValue:e.facilityDialog,"onUpdate:modelValue":t[3]||(t[3]=t=>e.facilityDialog=t),maximized:"",persistent:""},{default:(0,l.w5)((()=>[(0,l.Wm)(Z,{facility:e.facility,onDone:t[2]||(t[2]=t=>e.facilityDialog=!1)},null,8,["facility"])])),_:1},8,["modelValue"])])),_:1})}var u=a(1959),m=a(5474),p=a(5250),f=a(9582),y=a(621);const h={class:"text-h6"},w=(0,l.Uk)(" Facility "),b={class:"row q-col-gutter-md items-center"},g={class:"col"};function v(e,t,a,i,r,o){const s=(0,l.up)("q-btn"),c=(0,l.up)("q-card-section"),d=(0,l.up)("q-separator"),n=(0,l.up)("q-input"),u=(0,l.up)("q-checkbox"),m=(0,l.up)("q-item"),p=(0,l.up)("q-list"),f=(0,l.up)("q-card"),y=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.j4)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)("div",h,[w,(0,l.wy)((0,l.Wm)(s,{round:"",flat:"",dense:"",icon:"eva-close-outline",class:"float-right"},null,512),[[y]])])])),_:1}),(0,l.Wm)(d),(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(n,{modelValue:r.dataFactory.name,"onUpdate:modelValue":t[1]||(t[1]=e=>r.dataFactory.name=e),outlined:"",label:"Facility name","lazy-rules":"",class:"q-mb-md"},null,8,["modelValue"]),(0,l.Wm)(n,{modelValue:r.dataFactory.description,"onUpdate:modelValue":t[2]||(t[2]=e=>r.dataFactory.description=e),outlined:"",label:"Description",type:"textarea","lazy-rules":"",class:"q-mb-md",autogrow:""},null,8,["modelValue"]),(0,l.Wm)(p,{bordered:"",separator:"",class:"rounded-borders q-mb-md"},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)(r.dataFactory.parameters,(e=>((0,l.wg)(),(0,l.j4)(m,{key:e._id},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{modelValue:e.v,"onUpdate:modelValue":t=>e.v=t,label:e.name,color:"primary"},null,8,["modelValue","onUpdate:modelValue","label"])])),_:2},1024)))),128))])),_:1})])),_:1}),(0,l.Wm)(c,{class:"absolute-bottom"},{default:(0,l.w5)((()=>[(0,l.Wm)("div",b,[(0,l.Wm)("div",g,[(0,l.Wm)(s,{class:"full-width",rounded:"",label:"Save",type:"submit",color:"primary",onClick:o.saveFacility},null,8,["onClick"])])])])),_:1})])),_:1})}var W=a(515),_=a.n(W);a(9544),a(8603);const Z={props:{facility:{type:Object,default:()=>({})}},emits:["done"],data(){return{step:1,doneGeneral:!1,doneParameters:!1,supervisors:[],dataFactory:{parameters:[]}}},computed:{parameters(){return this.$store.getters["parameters/parameters"]}},mounted(){this.dataFactory=_()(_()({},this.facility),{},{parameters:this.parameters.map((e=>({_id:e._id,name:e.name,v:!1})))}),this.dataFactory.parameters.forEach((e=>e.v=!1)),this.dataFactory.active||(this.dataFactory.active=!0,m.api.put("/facilities/"+this.dataFactory._id+"/activate").then((e=>{this.$q.notify("Facility activated!")})).catch((e=>{console.error(e)})))},methods:{saveFacility(){this.dataFactory.parameters=this.dataFactory.parameters.filter((e=>e.v)).map((e=>e._id)),this.$q.loading.show(),m.api.put("/facilities/"+this.dataFactory._id,this.dataFactory).then((e=>{this.$store.dispatch("facilities/fetchFacilities"),this.$emit("done")})).catch((e=>{console.error(e)})).finally((()=>{this.$q.loading.hide()}))},getSupervisors(){m.api.get("/users/staff").then((e=>{this.supervisors=e.data.map((e=>({value:e._id,label:e.name})))})).catch((e=>{console.error(e)}))}}};var q=a(151),F=a(5589),Q=a(8240),k=a(5869),C=a(4842),x=a(7011),S=a(6332),j=a(5735),V=a(2350),I=a(677),D=a(7518),U=a.n(D);Z.render=v;const z=Z;U()(Z,"components",{QCard:q.Z,QCardSection:F.Z,QBtn:Q.Z,QSeparator:k.Z,QInput:C.Z,QList:x.Z,QItem:S.Z,QCheckbox:j.Z,QItemLabel:V.Z}),U()(Z,"directives",{ClosePopup:I.Z});var P=a(2310);const $=(0,l.aZ)({components:{FacilityForm:z,EmptyTile:P.Z},setup(){const e=(0,p.oR)(),t=(0,f.yj)();let a=t.params.id,{data:i}=(0,y.ZP)("/tickets/by-facility/last?facility="+a,m.fetcher),{data:r}=(0,y.ZP)("/tickets/by-facility/top?facility="+a,m.fetcher),o=(0,u.iH)(!1),s=(0,u.iH)(!1),c=(0,l.Fl)((()=>e.getters["facilities/facilityById"](a))),d=(0,l.Fl)((()=>e.getters["parameters/nameMap"])),n=()=>{e.dispatch("parameters/fetchParameters")};return(0,l.bv)((()=>{e.dispatch("general/setTitle","Facility"),n()})),{issues:i,topIssues:r,facilityDialog:o,facilityScheduleDialog:s,facility:c,parameterNameMap:d,fetchParameters:n}}});var L=a(4379),B=a(2035),E=a(4615),H=a(4554),M=a(1007),N=a(4390),T=a(6489);$.render=n;const K=$;U()($,"components",{QPage:L.Z,QCard:q.Z,QCardSection:F.Z,QList:x.Z,QItem:S.Z,QItemSection:B.Z,QItemLabel:V.Z,QExpansionItem:E.Z,QIcon:H.Z,QPageSticky:M.Z,QBtn:Q.Z,QDialog:N.Z}),U()($,"directives",{Ripple:T.Z})}}]);