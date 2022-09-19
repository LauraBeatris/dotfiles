var D=Object.create;var m=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var S=t=>m(t,"__esModule",{value:!0});var R=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),U=(t,e)=>{for(var r in e)m(t,r,{get:e[r],enumerable:!0})},x=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of J(e))!O.call(t,n)&&(r||n!=="default")&&m(t,n,{get:()=>e[n],enumerable:!(o=G(e,n))||o.enumerable});return t},_=(t,e)=>x(S(m(t!=null?D(k(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t),q=(t=>(e,r)=>t&&t.get(e)||(r=x(S({}),e,1),t&&t.set(e,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var b=R(u=>{"use strict";var v=u&&u.__assign||function(){return v=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++){e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},v.apply(this,arguments)},B=u&&u.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e};Object.defineProperty(u,"__esModule",{value:!0});var F=B(require("child_process"));function A(t){return Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,"raw")}function H(t,e){for(var r="",o=t.length,n=0;n<o;n++){var a=n<o-1?e[n]:"";r+=t[n]+a}return r.trim()}function h(t,e,r){return r===void 0&&(r={}),process.platform!=="darwin"?Promise.reject(new Error("osascript-tag requires macOS")):new Promise(function(o,n){var a=r.argv||[],g=[],p=H(t,e),c="AppleScript";r.language==="JavaScript"&&(c=r.language,p="(function(...argv){"+p+"})("+a.map(function(s){return JSON.stringify(s)})+")"),r.parse&&(g=["-s","s"]),typeof r.flags=="string"&&(g=["-s",r.flags]);var f=F.spawn("osascript",["-l",c].concat(g,["-e",p])),y="";f.stderr.on("data",function(s){y+=s.toString()});var T="";f.stdout.on("data",function(s){T+=s.toString()}),f.on("close",function(){if(y)n(y);else{var s=T;if(r.parse)try{s=JSON.parse(T)}catch(C){n(C)}o(s)}}),f.on("error",function(s){n(s)})})}function I(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return A(t)?h(t,e,{}):function(o){for(var n=[],a=1;a<arguments.length;a++)n[a-1]=arguments[a];return h(o,n,t)}}function j(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return A(t)?h(t,e,{language:"JavaScript"}):function(o){for(var n=[],a=1;a<arguments.length;a++)n[a-1]=arguments[a];return h(o,n,v({language:"JavaScript"},t))}}I.jxa=j;u.jxa=j;u.default=I});var V={};U(V,{default:()=>E});var i=require("@raycast/api"),l=require("react");var d=require("@raycast/api"),w=_(b());var P=(0,d.getPreferenceValues)(),M=async t=>{try{return await w.default.jxa({parse:!0})`${t}`}catch(e){if(typeof e=="string"){let r=e.replace("execution error: Error: ","");r.match(/Application can't be found/)?(0,d.showToast)({style:d.Toast.Style.Failure,title:"Application not found",message:"Things must be running"}):(0,d.showToast)({style:d.Toast.Style.Failure,title:"Something went wrong",message:r})}}};var K={Inbox:"TMInboxListSource",Today:"TMTodayListSource",Anytime:"TMNextListSource",Upcoming:"TMCalendarListSource",Someday:"TMSomedayListSource"},L=t=>M(`
  const things = Application('${P.thingsAppIdentifier}');
  const todos = things.lists.byId('${K[t]}').toDos();
  return todos.map(todo => ({
    id: todo.id(),
    name: todo.name(),
    status: todo.status(),
    notes: todo.notes(),
    tags: todo.tagNames(),
    dueDate: todo.dueDate() && todo.dueDate().toISOString(),
    project: todo.project() && {
      id: todo.project().id(),
      name: todo.project().name(),
      tags: todo.project().tagNames(),
      area: todo.project().area() && {
        id: todo.project().area().id(),
        name: todo.project().area().name(),
        tags: todo.project().area().tagNames(),
      },
    },
    area: todo.area() && {
      id: todo.area().id(),
      name: todo.area().name(),
      tags: todo.area().tagNames(),
    },
  }));
`),$=(t,e,r)=>M(`
  const things = Application('${P.thingsAppIdentifier}');
  things.toDos.byId('${t}').${e} = '${r}';
`);var N=30;function E(){let[t,e]=(0,l.useState)([]),[r,o]=(0,l.useState)(!0);async function n(){try{e(await L("Today"))}catch{}finally{o(!1)}}async function a(c){return await $(c,"status","completed"),n()}(0,l.useEffect)(()=>{n()},[]);let g=t.length>0?t[0].name:"",p=g.length>N?g.substring(0,N)+"\u2026":g;return _jsx(i.MenuBarExtra,{icon:"things-icon.png",title:p,tooltip:g,isLoading:r},t.length>0?_jsx(_jsxFragment,null,_jsx(i.MenuBarExtra.Item,{title:"Complete",icon:i.Icon.CheckCircle,onAction:()=>{a(t[0].id)}}),_jsx(i.MenuBarExtra.Separator,null),_jsx(i.MenuBarExtra.Item,{title:"Today"})):null,t.map(c=>_jsx(i.MenuBarExtra.Item,{title:c.name,key:c.id,onAction:()=>{(0,i.open)(`things:///show?id=${c.id}`)}})))}module.exports=q(V);0&&(module.exports={});
