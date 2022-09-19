var b=Object.defineProperty;var J=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var M=e=>b(e,"__esModule",{value:!0});var U=(e,n)=>{for(var i in n)b(e,i,{get:n[i],enumerable:!0})},H=(e,n,i,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let m of E(n))!_.call(e,m)&&(i||m!=="default")&&b(e,m,{get:()=>n[m],enumerable:!(t=J(n,m))||t.enumerable});return e};var j=(e=>(n,i)=>e&&e.get(n)||(i=H(M({}),n,1),e&&e.set(n,i),i))(typeof WeakMap!="undefined"?new WeakMap:0);var B={};U(B,{default:()=>L});var o=require("@raycast/api"),S=require("react");var l=require("@raycast/api");var d=require("@raycast/api"),h=require("child_process"),P=require("crypto"),a=require("fs"),A=require("path"),f=d.environment.supportPath+"/customTimers.json";async function y(e,n="Untitled"){let t=(d.environment.supportPath+"/"+new Date().toISOString()+"---"+e+".timer").replace(/:/g,"__");(0,a.writeFileSync)(t,n);let m=(0,d.getPreferenceValues)(),c=`sleep ${e} && if [ -f "${t}" ]; then `;m.selectedSound==="speak_timer_name"?c+=`say "${n}"`:c+=`afplay "${d.environment.assetsPath+"/"+m.selectedSound}"`,c+=` && osascript -e 'display notification "'"Timer complete"'" with title "Ding!"' && rm "${t}"; else echo "Timer deleted"; fi`,(0,h.exec)(c,(p,w)=>{if(p){console.log(`error: ${p.message}`);return}if(w){console.log(`stderr: ${w}`);return}})}async function x(e){let n=`if [ -f "${e}" ]; then rm "${e}"; else echo "Timer deleted"; fi`;(0,h.execSync)(n)}async function O(){let e=[];return(0,a.readdirSync)(d.environment.supportPath).forEach(i=>{if((0,A.extname)(i)==".timer"){let t={name:"",secondsSet:-99,timeLeft:-99,originalFile:i};t.name=(0,a.readFileSync)(d.environment.supportPath+"/"+i).toString();let m=i.split("---");t.secondsSet=Number(m[1].split(".")[0]);let c=m[0].replace(/__/g,":");t.timeLeft=Math.max(0,Math.round(t.secondsSet-(new Date().getTime()-new Date(c).getTime())/1e3)),e.push(t)}}),e.sort((i,t)=>i.timeLeft-t.timeLeft),e}async function $(e,n){let i=d.environment.supportPath+"/"+e;(0,a.writeFileSync)(i,n)}async function T(){(0,a.existsSync)(f)||(0,a.writeFileSync)(f,JSON.stringify({}))}async function g(e){await T();let n=JSON.parse((0,a.readFileSync)(f,"utf8"));n[(0,P.randomUUID)()]=e,(0,a.writeFileSync)(f,JSON.stringify(n))}async function I(){return await T(),JSON.parse((0,a.readFileSync)(f,"utf8"))}async function k(e,n){await T();let i=JSON.parse((0,a.readFileSync)(f,"utf8"));i[e].name=n,(0,a.writeFileSync)(f,JSON.stringify(i))}async function R(e){await T();let n=JSON.parse((0,a.readFileSync)(f,"utf8"));delete n[e],(0,a.writeFileSync)(f,JSON.stringify(n))}function C(e){let n=async i=>{i===""||i===e.currentName?await new l.Toast({style:l.Toast.Style.Failure,title:"No new name given!"}).show():(await(0,l.popToRoot)(),e.timerFile=="customTimer"?await k(e.ctID?e.ctID:"-99",i):await $(e.timerFile,i),await new l.Toast({style:l.Toast.Style.Success,title:`Timer was renamed to ${i}!`}).show())};return _jsx(l.Form,{actions:_jsx(l.ActionPanel,null,_jsx(l.Action.SubmitForm,{title:"Rename Timer",onSubmit:async i=>n(i.newName)}))},_jsx(l.Form.TextField,{id:"newName",title:"New name",placeholder:e.currentName}))}var r=require("@raycast/api");function F(){let e=async t=>{if(await T(),t.hours===""&&t.minutes===""&&t.seconds==="")await new r.Toast({style:r.Toast.Style.Failure,title:"No values set for timer length!"}).show();else if(isNaN(Number(t.hours)))await new r.Toast({style:r.Toast.Style.Failure,title:"Hours must be a number!"}).show();else if(isNaN(Number(t.minutes)))await new r.Toast({style:r.Toast.Style.Failure,title:"Minutes must be a number!"}).show();else if(isNaN(Number(t.seconds)))await new r.Toast({style:r.Toast.Style.Failure,title:"Seconds must be a number!"}).show();else{await(0,r.closeMainWindow)();let m=t.name?t.name:"Untitled",c=3600*Number(t.hours)+60*Number(t.minutes)+Number(t.seconds);await y(c,m),t.willBeSaved&&g({name:t.name,timeInSeconds:c}),await(0,r.showHUD)(`Timer "${m}" started for ${t.hours?t.hours:0}h${t.minutes?t.minutes:0}m${t.seconds?t.seconds:0}s! \u{1F389}`),await(0,r.popToRoot)()}},n=[{id:"hours",title:"Hours",placeholder:"0"},{id:"minutes",title:"Minutes",placeholder:"00"},{id:"seconds",title:"Seconds",placeholder:"00"}];return(0,r.getPreferenceValues)().newTimerInputOrder!=="hhmmss"&&n.reverse(),_jsx(r.Form,{actions:_jsx(r.ActionPanel,null,_jsx(r.Action.SubmitForm,{title:"Start Custom Timer",onSubmit:async t=>e(t)}))},n.map((t,m)=>_jsx(r.Form.TextField,{key:m,id:t.id,title:t.title,placeholder:t.placeholder})),_jsx(r.Form.TextField,{id:"name",title:"Name",placeholder:"Pour Tea"}),_jsx(r.Form.Checkbox,{id:"willBeSaved",label:"Save as preset"}))}function L(){let[e,n]=(0,S.useState)(void 0),[i,t]=(0,S.useState)({}),{push:m}=(0,o.useNavigation)();(0,S.useEffect)(()=>{setInterval(async()=>{await c()},1e3)},[]);let c=async()=>{await T();let s=await O();n(s);let u=await I();t(u)},p=async s=>{await x(o.environment.supportPath+"/"+s.originalFile),await c()},w=async s=>{await y(s.timeInSeconds,s.name),await c()},D=async s=>{let u={name:s.name,timeInSeconds:s.secondsSet};await g(u),await c()},V=async s=>{await R(s),await c()},N=s=>{let u=new Date(s);return u.setSeconds(Number(s)),u.toISOString().substring(11,19)};return _jsx(o.List,{isLoading:e===void 0||i===void 0},_jsx(o.List.Section,{title:e?.length!==0&&e!=null?"Currently Running":"No Timers Running"},e?.map((s,u)=>_jsx(o.List.Item,{key:u,icon:{source:o.Icon.Clock,tintColor:o.Color.Yellow},title:s.name,subtitle:N(s.timeLeft)+" left",accessoryTitle:N(s.secondsSet)+" originally",actions:_jsx(o.ActionPanel,null,_jsx(o.Action,{title:"Stop Timer",onAction:()=>p(s)}),_jsx(o.Action,{title:"Rename Timer",onAction:()=>m(_jsx(C,{currentName:s.name,timerFile:s.originalFile,ctID:null}))}),_jsx(o.Action,{title:"Save Timer as Preset",shortcut:{modifiers:["cmd","shift"],key:"enter"},onAction:()=>D(s)}))})),_jsx(o.List.Item,{key:0,icon:o.Icon.Clock,title:"Create a new timer",subtitle:"Press Enter to start a timer",actions:_jsx(o.ActionPanel,null,_jsx(o.Action,{title:"Start Timer",onAction:()=>m(_jsx(F,null))}))})),_jsx(o.List.Section,{title:"Custom Timers"},Object.keys(i)?.sort((s,u)=>i[s].timeInSeconds-i[u].timeInSeconds).map(s=>_jsx(o.List.Item,{key:s,icon:o.Icon.Clock,title:i[s].name,subtitle:N(i[s].timeInSeconds),actions:_jsx(o.ActionPanel,null,_jsx(o.Action,{title:"Start Timer",onAction:()=>w(i[s])}),_jsx(o.Action,{title:"Rename Timer",onAction:()=>m(_jsx(C,{currentName:i[s].name,timerFile:"customTimer",ctID:s}))}),_jsx(o.Action,{title:"Delete Custom Timer",shortcut:{modifiers:["ctrl"],key:"x"},onAction:()=>V(s)}))}))))}module.exports=j(B);0&&(module.exports={});
