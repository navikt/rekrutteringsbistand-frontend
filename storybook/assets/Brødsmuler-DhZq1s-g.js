import{r as a,af as q,bU as K,bV as V,U as A,j as n}from"./iframe-BebJRiVm.js";import{a as O}from"./KandidatContext-L-_3SXL4.js";import{B as j,a as v,b,c as w,d as S,e as E,f as M}from"./breadcrumb-BiC0CduF.js";import{S as N}from"./Person-D4qJFZZn.js";import{S as B}from"./Briefcase-8KopRB4T.js";import{S as U}from"./Reception-CRL-Y6lA.js";const z=a.createContext(void 0);function H(){return a.useContext(z)}const G={rekrutteringstreff:{label:"Rekrutteringstreff",icon:n.jsx(U,{"aria-hidden":!0,className:"w-4 h-4"})},stilling:{label:"Stillingsoppdrag",icon:n.jsx(B,{"aria-hidden":!0,className:"w-4 h-4"})},stillinger:{label:"Stillinger",icon:n.jsx(B,{"aria-hidden":!0,className:"w-4 h-4"})},etterregistrering:{label:"Etterregistrering",icon:n.jsx(B,{"aria-hidden":!0,className:"w-4 h-4"})},kandidat:{label:"Jobbsøkere",icon:n.jsx(N,{"aria-hidden":!0,className:"w-4 h-4"})},kandidater:{label:"Jobbsøkere",icon:n.jsx(N,{"aria-hidden":!0,className:"w-4 h-4"})},"vis-kandidat":{label:"Jobbsøker",icon:n.jsx(N,{"aria-hidden":!0,className:"w-4 h-4"})},"finn-kandidater":{label:"Finn jobbsøker"},"finn-stilling":{label:"Finn stilling"}};function Q({pathConfig:d=G,erstattPath:f,className:I,forcedPath:F}){const{windowMode:_}=q(),T=H(),$=K(),c=F||$||"",t=c?c.split("/").filter(Boolean):[],P=V(),u=P?.get("visKandidatId"),m=P?.get("visStillingId"),[y,g]=a.useState(!1),l=a.useRef(null),p=a.useRef(null),R=A(),o=O(),L=o?.kandidatData?.fornavn&&o?.kandidatData?.etternavn?`${o.kandidatData.fornavn} ${o.kandidatData.etternavn}`:void 0,k=e=>{if(o?.kandidatId===e&&L)return L},C=R?.stillingsData?.stilling?.title,x=e=>{if(R?.stillingsData?.stilling?.uuid===e&&C)return C};a.useEffect(()=>{g(!1)},[c]),a.useLayoutEffect(()=>{if(!l.current)return;const e=new ResizeObserver(()=>{if(!p.current||!l.current)return;const i=p.current.scrollWidth,s=l.current.clientWidth;i>s&&t.length>2?g(!0):g(!1)});return e.observe(l.current),()=>e.disconnect()},[t.length]);const r=t.map((e,i)=>{const s=d[e],J="/"+t.slice(0,i+1).join("/"),W=i===t.length-1;let h=s?.label||e;return h=x(e)??k(e)??h,f&&e===f[0]&&(h=f[1]),{segment:e,href:J,icon:s?.icon,label:h,skipLink:W||!!s?.skipLink}}),D=a.useMemo(()=>!y||r.length<=2?r:[r[0],{segment:"__ellipsis__"},r[r.length-1]],[y,r]);if(!c||t.length===0)return null;if(_&&T?.tile==="detail"){const e=r[r.length-1],i=m&&x(m)||u&&k(u)||e.label,s=m&&x(m)&&d.stilling?.icon||u&&k(u)&&(d["vis-kandidat"]?.icon||d.kandidat?.icon)||e.icon;return n.jsx("div",{ref:l,className:I,children:n.jsx(j,{"aria-label":"Vindusnavn",children:n.jsx(v,{children:n.jsx(b,{children:n.jsx(w,{icon:s,children:i})})})})})}return n.jsxs("div",{ref:l,className:I,children:[n.jsx("div",{ref:p,"aria-hidden":!0,className:"invisible absolute left-0 top-0 h-0 overflow-hidden",children:n.jsx(j,{"aria-label":"Full breadcrumb width measurement",children:n.jsx(v,{children:r.map((e,i)=>n.jsxs(a.Fragment,{children:[i>0&&n.jsx(S,{}),n.jsx(b,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(E,{href:e.href,icon:e.icon,children:e.label})})]},`measure-${e.segment}-${i}`))})})}),n.jsx(j,{"aria-label":"Brødsmulesti",children:n.jsx(v,{children:D.map((e,i)=>{const s=i>0;return e.segment==="__ellipsis__"?n.jsxs(a.Fragment,{children:[s&&n.jsx(S,{}),n.jsx(b,{children:n.jsx(M,{})})]},`ellipsis-${i}`):n.jsxs(a.Fragment,{children:[s&&n.jsx(S,{}),n.jsx(b,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(E,{href:e.href,icon:e.icon,children:e.label})})]},`bc-${e.segment}-${i}`)})})})]})}Q.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
  rekrutteringstreff: {
    label: 'Rekrutteringstreff',
    icon: <ReceptionIcon aria-hidden className='w-4 h-4' />,
  },
  stilling: {
    label: 'Stillingsoppdrag',
    icon: <BriefcaseIcon aria-hidden className='w-4 h-4' />,
  },
  stillinger: {
    label: 'Stillinger',
    icon: <BriefcaseIcon aria-hidden className='w-4 h-4' />,
  },
  etterregistrering: {
    label: 'Etterregistrering',
    icon: <BriefcaseIcon aria-hidden className='w-4 h-4' />,
  },
  kandidat: {
    label: 'Jobbsøkere',
    icon: <PersonIcon aria-hidden className='w-4 h-4' />,
  },
  kandidater: {
    label: 'Jobbsøkere',
    icon: <PersonIcon aria-hidden className='w-4 h-4' />,
  },
  'vis-kandidat': {
    label: 'Jobbsøker',
    icon: <PersonIcon aria-hidden className='w-4 h-4' />,
  },
  'finn-kandidater': { label: 'Finn jobbsøker' },
  'finn-stilling': { label: 'Finn stilling' },
}`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},erstattPath:{required:!1,tsType:{name:"tuple",raw:"[originalSegment: string, nyLabel: string]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler']"},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{Q as A,G as d,H as u};
