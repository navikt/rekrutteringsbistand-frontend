import{r as t,aB as W,z as q,aC as A,aD as O,j as n}from"./iframe-FHkBCfVU.js";import{B as v,a as j,b as h,c as w,d as S,e as L,f as V}from"./breadcrumb-BwbY3Jea.js";import{S as I}from"./Person-DkluMU29.js";import{S as z}from"./BriefcaseClock-BTvD6Kf_.js";import{S as E}from"./Briefcase-CNf_Vg-b.js";import{S as M}from"./Reception-DVY19QyZ.js";const G=t.createContext(void 0),Q=()=>{const s=t.useContext(G);return s===void 0?null:s},U=t.createContext(void 0);function X(){return t.useContext(U)}const Y={rekrutteringstreff:{label:"Rekrutteringstreff",icon:n.jsx(M,{"aria-hidden":!0,className:"h-4 w-4"})},stilling:{label:"Stillingsoppdrag",icon:n.jsx(E,{"aria-hidden":!0,className:"h-4 w-4"})},stillinger:{label:"Stillinger",icon:n.jsx(E,{"aria-hidden":!0,className:"h-4 w-4"})},etterregistrering:{label:"Etterregistrering",icon:n.jsx(z,{"aria-hidden":!0,className:"h-4 w-4"})},kandidat:{label:"Jobbsøkere",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},kandidater:{label:"Jobbsøkere",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},kandidatliste:{label:"Kandidatliste",lagHref:({segmenter:s})=>{const o=s[1];if(o)return`/stilling/${o}?stillingFane=kandidater`}},"vis-kandidat":{label:"Jobbsøker",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},"finn-kandidater":{label:"Finn jobbsøker"},"finn-stilling":{label:"Finn stilling"}};function Z({pathConfig:s=Y,erstattPath:o,className:B,forcedPath:T}){const{windowMode:_}=W(),$=X(),J=q(),u=T||J||window.location.pathname,l=u?u.split("/").filter(Boolean):[],N=A(),m=N?.get("visKandidatId"),f=N?.get("visStillingId"),[C,b]=t.useState(!1),d=t.useRef(null),k=t.useRef(null),P=O(),c=Q(),y=c?.kandidatData?.fornavn&&c?.kandidatData?.etternavn?`${c.kandidatData.fornavn} ${c.kandidatData.etternavn}`:void 0,p=e=>{if(c?.kandidatId===e&&y)return y},F=P?.stillingsData?.stilling?.title,x=e=>{if(P?.stillingsData?.stilling?.uuid===e&&F)return F};t.useEffect(()=>{const e=setTimeout(()=>{b(!1)},0);return()=>clearTimeout(e)},[u]),t.useLayoutEffect(()=>{if(!d.current)return;const e=new ResizeObserver(()=>{if(!k.current||!d.current)return;const i=k.current.scrollWidth,a=d.current.clientWidth;i>a&&l.length>2?b(!0):b(!1)});return e.observe(d.current),()=>e.disconnect()},[l.length]);const r=l.map((e,i)=>{const a=s[e],R="/"+l.slice(0,i+1).join("/"),H=a?.lagHref?.({segmenter:l,indeks:i,standardHref:R})??R,K=i===l.length-1;let g=a?.label||e;return g=x(e)??p(e)??g,o&&e===o[0]&&(g=o[1]),{segment:e,href:H,icon:a?.icon,label:g,skipLink:K||!!a?.skipLink}}),D=t.useMemo(()=>!C||r.length<=2?r:[r[0],{segment:"__ellipsis__"},r[r.length-1]],[C,r]);if(!u||l.length===0)return null;if(_&&$?.tile==="detail"){const e=r[r.length-1],i=f&&x(f)||m&&p(m)||e.label,a=f&&x(f)&&s.stilling?.icon||m&&p(m)&&(s["vis-kandidat"]?.icon||s.kandidat?.icon)||e.icon;return n.jsx("div",{ref:d,className:B,children:n.jsx(v,{"aria-label":"Vindusnavn",children:n.jsx(j,{children:n.jsx(h,{children:n.jsx(w,{icon:a,children:i})})})})})}return n.jsxs("div",{ref:d,className:B,children:[n.jsx("div",{ref:k,"aria-hidden":!0,className:"invisible absolute top-0 left-0 h-0 overflow-hidden",children:n.jsx(v,{"aria-label":"Full breadcrumb width measurement",children:n.jsx(j,{children:r.map((e,i)=>n.jsxs(t.Fragment,{children:[i>0&&n.jsx(S,{}),n.jsx(h,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(L,{href:e.href,icon:e.icon,children:e.label})})]},`measure-${e.segment}-${i}`))})})}),n.jsx(v,{"aria-label":"Brødsmulesti",children:n.jsx(j,{children:D.map((e,i)=>{const a=i>0;return e.segment==="__ellipsis__"?n.jsxs(t.Fragment,{children:[a&&n.jsx(S,{}),n.jsx(h,{children:n.jsx(V,{})})]},`ellipsis-${i}`):n.jsxs(t.Fragment,{children:[a&&n.jsx(S,{}),n.jsx(h,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(L,{href:e.href,icon:e.icon,children:e.label})})]},`bc-${e.segment}-${i}`)})})})]})}Z.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
  rekrutteringstreff: {
    label: 'Rekrutteringstreff',
    icon: <ReceptionIcon aria-hidden className='h-4 w-4' />,
  },
  stilling: {
    label: 'Stillingsoppdrag',
    icon: <BriefcaseIcon aria-hidden className='h-4 w-4' />,
  },
  stillinger: {
    label: 'Stillinger',
    icon: <BriefcaseIcon aria-hidden className='h-4 w-4' />,
  },
  etterregistrering: {
    label: 'Etterregistrering',
    icon: <BriefcaseClockIcon aria-hidden className='h-4 w-4' />,
  },
  kandidat: {
    label: 'Jobbsøkere',
    icon: <PersonIcon aria-hidden className='h-4 w-4' />,
  },
  kandidater: {
    label: 'Jobbsøkere',
    icon: <PersonIcon aria-hidden className='h-4 w-4' />,
  },
  kandidatliste: {
    label: 'Kandidatliste',
    lagHref: ({ segmenter }) => {
      const stillingId = segmenter[1];
      if (!stillingId) {
        return undefined;
      }
      return \`/stilling/\${stillingId}?stillingFane=kandidater\`;
    },
  },
  'vis-kandidat': {
    label: 'Jobbsøker',
    icon: <PersonIcon aria-hidden className='h-4 w-4' />,
  },
  'finn-kandidater': { label: 'Finn jobbsøker' },
  'finn-stilling': { label: 'Finn stilling' },
}`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},erstattPath:{required:!1,tsType:{name:"tuple",raw:"[originalSegment: string, nyLabel: string]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler']"},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{Z as A,Y as d,X as u};
