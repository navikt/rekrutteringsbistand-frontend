import{r as t,ac as W,c5 as q,c6 as A,c7 as O,j as n}from"./iframe-DAHX0Bjj.js";import{B as v,a as j,b as h,c as w,d as S,e as E,f as V}from"./breadcrumb-C7gdqTJI.js";import{S as I}from"./Person-Dn8VVu8M.js";import{S as N}from"./Briefcase-D7XNlAcF.js";import{S as M}from"./Reception-BbcgWVVe.js";const z=t.createContext(void 0),G=()=>{const s=t.useContext(z);return s===void 0?null:s},Q=t.createContext(void 0);function U(){return t.useContext(Q)}const X={rekrutteringstreff:{label:"Rekrutteringstreff",icon:n.jsx(M,{"aria-hidden":!0,className:"h-4 w-4"})},stilling:{label:"Stillingsoppdrag",icon:n.jsx(N,{"aria-hidden":!0,className:"h-4 w-4"})},stillinger:{label:"Stillinger",icon:n.jsx(N,{"aria-hidden":!0,className:"h-4 w-4"})},etterregistrering:{label:"Etterregistrering",icon:n.jsx(N,{"aria-hidden":!0,className:"h-4 w-4"})},kandidat:{label:"Jobbsøkere",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},kandidater:{label:"Jobbsøkere",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},kandidatliste:{label:"Kandidatliste",lagHref:({segmenter:s})=>{const o=s[1];if(o)return`/stilling/${o}?stillingFane=kandidater`}},"vis-kandidat":{label:"Jobbsøker",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},"finn-kandidater":{label:"Finn jobbsøker"},"finn-stilling":{label:"Finn stilling"}};function Y({pathConfig:s=X,erstattPath:o,className:B,forcedPath:T}){const{windowMode:_}=W(),$=U(),J=q(),u=T||J||window.location.pathname,l=u?u.split("/").filter(Boolean):[],P=A(),m=P?.get("visKandidatId"),g=P?.get("visStillingId"),[C,b]=t.useState(!1),d=t.useRef(null),k=t.useRef(null),y=O(),c=G(),F=c?.kandidatData?.fornavn&&c?.kandidatData?.etternavn?`${c.kandidatData.fornavn} ${c.kandidatData.etternavn}`:void 0,p=e=>{if(c?.kandidatId===e&&F)return F},R=y?.stillingsData?.stilling?.title,x=e=>{if(y?.stillingsData?.stilling?.uuid===e&&R)return R};t.useEffect(()=>{const e=setTimeout(()=>{b(!1)},0);return()=>clearTimeout(e)},[u]),t.useLayoutEffect(()=>{if(!d.current)return;const e=new ResizeObserver(()=>{if(!k.current||!d.current)return;const i=k.current.scrollWidth,a=d.current.clientWidth;i>a&&l.length>2?b(!0):b(!1)});return e.observe(d.current),()=>e.disconnect()},[l.length]);const r=l.map((e,i)=>{const a=s[e],L="/"+l.slice(0,i+1).join("/"),H=a?.lagHref?.({segmenter:l,indeks:i,standardHref:L})??L,K=i===l.length-1;let f=a?.label||e;return f=x(e)??p(e)??f,o&&e===o[0]&&(f=o[1]),{segment:e,href:H,icon:a?.icon,label:f,skipLink:K||!!a?.skipLink}}),D=t.useMemo(()=>!C||r.length<=2?r:[r[0],{segment:"__ellipsis__"},r[r.length-1]],[C,r]);if(!u||l.length===0)return null;if(_&&$?.tile==="detail"){const e=r[r.length-1],i=g&&x(g)||m&&p(m)||e.label,a=g&&x(g)&&s.stilling?.icon||m&&p(m)&&(s["vis-kandidat"]?.icon||s.kandidat?.icon)||e.icon;return n.jsx("div",{ref:d,className:B,children:n.jsx(v,{"aria-label":"Vindusnavn",children:n.jsx(j,{children:n.jsx(h,{children:n.jsx(w,{icon:a,children:i})})})})})}return n.jsxs("div",{ref:d,className:B,children:[n.jsx("div",{ref:k,"aria-hidden":!0,className:"invisible absolute top-0 left-0 h-0 overflow-hidden",children:n.jsx(v,{"aria-label":"Full breadcrumb width measurement",children:n.jsx(j,{children:r.map((e,i)=>n.jsxs(t.Fragment,{children:[i>0&&n.jsx(S,{}),n.jsx(h,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(E,{href:e.href,icon:e.icon,children:e.label})})]},`measure-${e.segment}-${i}`))})})}),n.jsx(v,{"aria-label":"Brødsmulesti",children:n.jsx(j,{children:D.map((e,i)=>{const a=i>0;return e.segment==="__ellipsis__"?n.jsxs(t.Fragment,{children:[a&&n.jsx(S,{}),n.jsx(h,{children:n.jsx(V,{})})]},`ellipsis-${i}`):n.jsxs(t.Fragment,{children:[a&&n.jsx(S,{}),n.jsx(h,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(E,{href:e.href,icon:e.icon,children:e.label})})]},`bc-${e.segment}-${i}`)})})})]})}Y.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
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
    icon: <BriefcaseIcon aria-hidden className='h-4 w-4' />,
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
}`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},erstattPath:{required:!1,tsType:{name:"tuple",raw:"[originalSegment: string, nyLabel: string]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler']"},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{Y as A,X as d,U as u};
