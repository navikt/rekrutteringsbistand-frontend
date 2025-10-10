import{gQ as R,r as s,j as e}from"./iframe-BZGI7Ig_.js";import{B as k,a as j,d as u,b as h,e as x,c as v,f as _}from"./breadcrumb-C3UjrvP4.js";import{S as m}from"./Person-C2Tebu51.js";import{S as b}from"./Briefcase-myqMCsx5.js";const E={stilling:{label:"Stillingsoppdrag",icon:e.jsx(b,{"aria-hidden":!0,className:"w-4 h-4"})},stillinger:{label:"Stillinger",icon:e.jsx(b,{"aria-hidden":!0,className:"w-4 h-4"})},etterregistrering:{label:"Etterregistrering",icon:e.jsx(b,{"aria-hidden":!0,className:"w-4 h-4"})},kandidat:{label:"Jobbsøkere",icon:e.jsx(m,{"aria-hidden":!0,className:"w-4 h-4"})},kandidater:{label:"Jobbsøkere",icon:e.jsx(m,{"aria-hidden":!0,className:"w-4 h-4"})},"vis-kandidat":{label:"Jobbsøker",icon:e.jsx(m,{"aria-hidden":!0,className:"w-4 h-4"})},"finn-kandidater":{label:"Finn kandidater for stilling"},rekrutteringsbistand:{label:"Rekrutteringsbistand"}};function I({pathConfig:w=E,overrideLastLabel:f,className:B,forcedPath:N}){const P=R(),c=N||P||"",t=c?c.split("/").filter(Boolean):[],[g,o]=s.useState(!1),l=s.useRef(null),d=s.useRef(null);s.useEffect(()=>{o(!1)},[c]),s.useLayoutEffect(()=>{if(!l.current)return;const n=new ResizeObserver(()=>{if(!d.current||!l.current)return;const r=d.current.scrollWidth,a=l.current.clientWidth;r>a&&t.length>2?o(!0):o(!1)});return n.observe(l.current),()=>n.disconnect()},[t.length]);const i=t.map((n,r)=>{const a=w[n],y="/"+t.slice(0,r+1).join("/"),p=r===t.length-1;return{segment:n,href:y,icon:a?.icon,label:p&&f?f:a?.label||n,skipLink:p||!!a?.skipLink}}),S=s.useMemo(()=>!g||i.length<=2?i:[i[0],{segment:"__ellipsis__"},i[i.length-1]],[g,i]);return!c||t.length===0?null:e.jsxs("div",{ref:l,className:B,children:[e.jsx("div",{ref:d,"aria-hidden":!0,className:"invisible absolute left-0 top-0 h-0 overflow-hidden",children:e.jsx(k,{"aria-label":"Full breadcrumb width measurement",children:e.jsx(j,{children:i.map((n,r)=>e.jsxs(s.Fragment,{children:[r>0&&e.jsx(u,{}),e.jsx(h,{children:n.skipLink?e.jsx(x,{icon:n.icon,children:n.label}):e.jsx(v,{href:n.href,icon:n.icon,children:n.label})})]},`measure-${n.segment}-${r}`))})})}),e.jsx(k,{"aria-label":"Brødsmulesti",children:e.jsx(j,{children:S.map((n,r)=>{const a=r>0;return n.segment==="__ellipsis__"?e.jsxs(s.Fragment,{children:[a&&e.jsx(u,{}),e.jsx(h,{children:e.jsx(_,{})})]},`ellipsis-${r}`):e.jsxs(s.Fragment,{children:[a&&e.jsx(u,{}),e.jsx(h,{children:n.skipLink?e.jsx(x,{icon:n.icon,children:n.label}):e.jsx(v,{href:n.href,icon:n.icon,children:n.label})})]},`bc-${n.segment}-${r}`)})})})]})}I.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
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
  'finn-kandidater': { label: 'Finn kandidater for stilling' },
  rekrutteringsbistand: { label: 'Rekrutteringsbistand' },
}`,computed:!1}},overrideLastLabel:{required:!1,tsType:{name:"string"},description:"Hvis satt, overskriver label på siste segment"},className:{required:!1,tsType:{name:"string"},description:""},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{I as A,E as d};
