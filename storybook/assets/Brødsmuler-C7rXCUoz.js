import{bT as E,r as i,aJ as _,j as e}from"./iframe-Dq6jy88q.js";import{a as F}from"./KandidatContext-ClBBlafL.js";import{B as x,a as v,b,c as g,d as w,e as N,f as L}from"./breadcrumb-DGmIMrHO.js";import{S as p}from"./Person-Beh9RE6j.js";import{S as k}from"./Briefcase-6SIxOLoO.js";import{S as D}from"./Reception-KTIxn3I8.js";const J={rekrutteringstreff:{label:"Rekrutteringstreff",icon:e.jsx(D,{"aria-hidden":!0,className:"w-4 h-4"})},stilling:{label:"Stillingsoppdrag",icon:e.jsx(k,{"aria-hidden":!0,className:"w-4 h-4"})},stillinger:{label:"Stillinger",icon:e.jsx(k,{"aria-hidden":!0,className:"w-4 h-4"})},etterregistrering:{label:"Etterregistrering",icon:e.jsx(k,{"aria-hidden":!0,className:"w-4 h-4"})},kandidat:{label:"Jobbsøkere",icon:e.jsx(p,{"aria-hidden":!0,className:"w-4 h-4"})},kandidater:{label:"Jobbsøkere",icon:e.jsx(p,{"aria-hidden":!0,className:"w-4 h-4"})},"vis-kandidat":{label:"Jobbsøker",icon:e.jsx(p,{"aria-hidden":!0,className:"w-4 h-4"})},"finn-kandidater":{label:"Finn jobbsøker"},"finn-stilling":{label:"Finn stilling"}};function $({pathConfig:B=J,erstattPath:u,className:S,forcedPath:y}){const P=E(),c=y||P||"",t=c?c.split("/").filter(Boolean):[],[j,m]=i.useState(!1),l=i.useRef(null),h=i.useRef(null),f=_(),o=F();i.useEffect(()=>{m(!1)},[c]),i.useLayoutEffect(()=>{if(!l.current)return;const n=new ResizeObserver(()=>{if(!h.current||!l.current)return;const a=h.current.scrollWidth,s=l.current.clientWidth;a>s&&t.length>2?m(!0):m(!1)});return n.observe(l.current),()=>n.disconnect()},[t.length]);const r=t.map((n,a)=>{const s=B[n],I="/"+t.slice(0,a+1).join("/"),C=a===t.length-1;let d=s?.label||n;return f?.stillingsData?.stilling?.uuid===n&&f.stillingsData?.stilling?.title&&(d=f.stillingsData.stilling.title),o?.kandidatId===n&&o.kandidatData?.fornavn&&o.kandidatData?.etternavn&&(d=`${o.kandidatData.fornavn} ${o.kandidatData.etternavn}`),u&&n===u[0]&&(d=u[1]),{segment:n,href:I,icon:s?.icon,label:d,skipLink:C||!!s?.skipLink}}),R=i.useMemo(()=>!j||r.length<=2?r:[r[0],{segment:"__ellipsis__"},r[r.length-1]],[j,r]);return!c||t.length===0?null:e.jsxs("div",{ref:l,className:S,children:[e.jsx("div",{ref:h,"aria-hidden":!0,className:"invisible absolute left-0 top-0 h-0 overflow-hidden",children:e.jsx(x,{"aria-label":"Full breadcrumb width measurement",children:e.jsx(v,{children:r.map((n,a)=>e.jsxs(i.Fragment,{children:[a>0&&e.jsx(b,{}),e.jsx(g,{children:n.skipLink?e.jsx(w,{icon:n.icon,children:n.label}):e.jsx(N,{href:n.href,icon:n.icon,children:n.label})})]},`measure-${n.segment}-${a}`))})})}),e.jsx(x,{"aria-label":"Brødsmulesti",children:e.jsx(v,{children:R.map((n,a)=>{const s=a>0;return n.segment==="__ellipsis__"?e.jsxs(i.Fragment,{children:[s&&e.jsx(b,{}),e.jsx(g,{children:e.jsx(L,{})})]},`ellipsis-${a}`):e.jsxs(i.Fragment,{children:[s&&e.jsx(b,{}),e.jsx(g,{children:n.skipLink?e.jsx(w,{icon:n.icon,children:n.label}):e.jsx(N,{href:n.href,icon:n.icon,children:n.label})})]},`bc-${n.segment}-${a}`)})})})]})}$.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
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
}`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},erstattPath:{required:!1,tsType:{name:"tuple",raw:"[originalSegment: string, nyLabel: string]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler']"},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{$ as A,J as d};
