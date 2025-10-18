import{bZ as E,r as s,j as e}from"./iframe-Ck33ggOC.js";import{B as k,a as j,b as m,c as h,d as x,e as w,f as I}from"./breadcrumb-vfLMGRmh.js";import{S as f}from"./Person-DN_kbHgk.js";import{S as b}from"./Briefcase-C8RpnIiG.js";import{S as _}from"./Reception-TNBGlrDi.js";const F={rekrutteringstreff:{label:"Rekrutteringstreff",icon:e.jsx(_,{"aria-hidden":!0,className:"w-4 h-4"})},stilling:{label:"Stillingsoppdrag",icon:e.jsx(b,{"aria-hidden":!0,className:"w-4 h-4"})},stillinger:{label:"Stillinger",icon:e.jsx(b,{"aria-hidden":!0,className:"w-4 h-4"})},etterregistrering:{label:"Etterregistrering",icon:e.jsx(b,{"aria-hidden":!0,className:"w-4 h-4"})},kandidat:{label:"Jobbsøkere",icon:e.jsx(f,{"aria-hidden":!0,className:"w-4 h-4"})},kandidater:{label:"Jobbsøkere",icon:e.jsx(f,{"aria-hidden":!0,className:"w-4 h-4"})},"vis-kandidat":{label:"Jobbsøker",icon:e.jsx(f,{"aria-hidden":!0,className:"w-4 h-4"})},"finn-kandidater":{label:"Finn jobbsøker"},"finn-stilling":{label:"Finn stilling"}};function L({pathConfig:v=F,erstattPath:c,className:B,forcedPath:N}){const S=E(),o=N||S||"",t=o?o.split("/").filter(Boolean):[],[g,d]=s.useState(!1),l=s.useRef(null),u=s.useRef(null);s.useEffect(()=>{d(!1)},[o]),s.useLayoutEffect(()=>{if(!l.current)return;const n=new ResizeObserver(()=>{if(!u.current||!l.current)return;const r=u.current.scrollWidth,a=l.current.clientWidth;r>a&&t.length>2?d(!0):d(!1)});return n.observe(l.current),()=>n.disconnect()},[t.length]);const i=t.map((n,r)=>{const a=v[n],P="/"+t.slice(0,r+1).join("/"),R=r===t.length-1;let p=a?.label||n;return c&&n===c[0]&&(p=c[1]),{segment:n,href:P,icon:a?.icon,label:p,skipLink:R||!!a?.skipLink}}),y=s.useMemo(()=>!g||i.length<=2?i:[i[0],{segment:"__ellipsis__"},i[i.length-1]],[g,i]);return!o||t.length===0?null:e.jsxs("div",{ref:l,className:B,children:[e.jsx("div",{ref:u,"aria-hidden":!0,className:"invisible absolute left-0 top-0 h-0 overflow-hidden",children:e.jsx(k,{"aria-label":"Full breadcrumb width measurement",children:e.jsx(j,{children:i.map((n,r)=>e.jsxs(s.Fragment,{children:[r>0&&e.jsx(m,{}),e.jsx(h,{children:n.skipLink?e.jsx(x,{icon:n.icon,children:n.label}):e.jsx(w,{href:n.href,icon:n.icon,children:n.label})})]},`measure-${n.segment}-${r}`))})})}),e.jsx(k,{"aria-label":"Brødsmulesti",children:e.jsx(j,{children:y.map((n,r)=>{const a=r>0;return n.segment==="__ellipsis__"?e.jsxs(s.Fragment,{children:[a&&e.jsx(m,{}),e.jsx(h,{children:e.jsx(I,{})})]},`ellipsis-${r}`):e.jsxs(s.Fragment,{children:[a&&e.jsx(m,{}),e.jsx(h,{children:n.skipLink?e.jsx(x,{icon:n.icon,children:n.label}):e.jsx(w,{href:n.href,icon:n.icon,children:n.label})})]},`bc-${n.segment}-${r}`)})})})]})}L.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
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
}`,computed:!1}},erstattPath:{required:!1,tsType:{name:"tuple",raw:"[originalSegment: string, nyLabel: string]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler']"},className:{required:!1,tsType:{name:"string"},description:""},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{L as A,F as d};
