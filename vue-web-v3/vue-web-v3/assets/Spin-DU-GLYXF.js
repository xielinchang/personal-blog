import{A as e,L as t,V as n,dt as r,h as i,ot as a,v as o,vt as s,z as c}from"./_plugin-vue_export-helper-B1YI6WaW.js";import{$ as l,G as u,I as d,J as f,L as p,Z as m,c as h,i as g,n as _,q as v,r as y,t as b}from"./light-UJ42B9xV.js";import{t as x}from"./use-compitable-DwDAvwHq.js";function S(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var C={name:`Spin`,common:b,self:S},w=v([v(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),f(`spin-container`,`
 position: relative;
 `,[f(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[_()])]),f(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),f(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[m(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),f(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),f(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[m(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]);n(),r(),o();var T={small:20,medium:18,large:16},E=t({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},h.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),g),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=p(t),i=h(`Spin`,`-spin`,w,C,t,n),o=e(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof e==`number`?u(e):r[l(`size`,e)],"--n-color":o,"--n-text-color":s}}),c=r?d(`spin`,e(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),o,t):void 0,f=x(t,[`spinning`,`show`]),m=s(!1);return a(e=>{let n;if(f.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{m.value=!0},r),e(()=>{clearTimeout(n)});return}}m.value=f.value}),{mergedClsPrefix:n,active:m,mergedStrokeWidth:e(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return T[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:o,themeClass:c?.themeClass,onRender:c?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:r}=this,a=t.icon&&this.rotate,o=(r||t.description)&&c(`div`,{class:`${n}-spin-description`},r||t.description?.call(t)),s=t.icon?c(`div`,{class:[`${n}-spin-body`,this.themeClass]},c(`div`,{class:[`${n}-spin`,a&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),o):c(`div`,{class:[`${n}-spin-body`,this.themeClass]},c(y,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),o);return(e=this.onRender)==null||e.call(this),t.default?c(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},c(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),c(i,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});export{E as t};