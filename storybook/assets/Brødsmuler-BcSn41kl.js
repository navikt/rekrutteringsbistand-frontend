import{r as t,af as W,ch as q,ci as A,Q as O,j as n}from"./iframe-D4iOfYdD.js";import{a as V}from"./KandidatContext-C30LtHdT.js";import{B as v,a as j,b as h,c as w,d as S,e as E,f as M}from"./breadcrumb-DcqOyJTs.js";import{S as I}from"./Person-CXSKd0nF.js";import{S as N}from"./Briefcase-CYNotasw.js";import{S as z}from"./Reception-DWuZBdNz.js";const Q=t.createContext(void 0);function G(){return t.useContext(Q)}const U={rekrutteringstreff:{label:"Rekrutteringstreff",icon:n.jsx(z,{"aria-hidden":!0,className:"h-4 w-4"})},stilling:{label:"Stillingsoppdrag",icon:n.jsx(N,{"aria-hidden":!0,className:"h-4 w-4"})},stillinger:{label:"Stillinger",icon:n.jsx(N,{"aria-hidden":!0,className:"h-4 w-4"})},etterregistrering:{label:"Etterregistrering",icon:n.jsx(N,{"aria-hidden":!0,className:"h-4 w-4"})},kandidat:{label:"Jobbsøkere",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},kandidater:{label:"Jobbsøkere",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},kandidatliste:{label:"Kandidatliste",lagHref:({segmenter:l})=>{const d=l[1];if(d)return`/stilling/${d}?stillingFane=kandidater`}},"vis-kandidat":{label:"Jobbsøker",icon:n.jsx(I,{"aria-hidden":!0,className:"h-4 w-4"})},"finn-kandidater":{label:"Finn jobbsøker"},"finn-stilling":{label:"Finn stilling"}};function X({pathConfig:l=U,erstattPath:d,className:B,forcedPath:T}){const{windowMode:_}=W(),$=G(),D=q(),u=T||D||"",r=u?u.split("/").filter(Boolean):[],P=A(),m=P?.get("visKandidatId"),f=P?.get("visStillingId"),[y,b]=t.useState(!1),o=t.useRef(null),p=t.useRef(null),F=O(),c=V(),R=c?.kandidatData?.fornavn&&c?.kandidatData?.etternavn?`${c.kandidatData.fornavn} ${c.kandidatData.etternavn}`:void 0,k=e=>{if(c?.kandidatId===e&&R)return R},L=F?.stillingsData?.stilling?.title,x=e=>{if(F?.stillingsData?.stilling?.uuid===e&&L)return L};t.useEffect(()=>{const e=setTimeout(()=>{b(!1)},0);return()=>clearTimeout(e)},[u]),t.useLayoutEffect(()=>{if(!o.current)return;const e=new ResizeObserver(()=>{if(!p.current||!o.current)return;const i=p.current.scrollWidth,a=o.current.clientWidth;i>a&&r.length>2?b(!0):b(!1)});return e.observe(o.current),()=>e.disconnect()},[r.length]);const s=r.map((e,i)=>{const a=l[e],C="/"+r.slice(0,i+1).join("/"),K=a?.lagHref?.({segmenter:r,indeks:i,standardHref:C})??C,H=i===r.length-1;let g=a?.label||e;return g=x(e)??k(e)??g,d&&e===d[0]&&(g=d[1]),{segment:e,href:K,icon:a?.icon,label:g,skipLink:H||!!a?.skipLink}}),J=t.useMemo(()=>!y||s.length<=2?s:[s[0],{segment:"__ellipsis__"},s[s.length-1]],[y,s]);if(!u||r.length===0)return null;if(_&&$?.tile==="detail"){const e=s[s.length-1],i=f&&x(f)||m&&k(m)||e.label,a=f&&x(f)&&l.stilling?.icon||m&&k(m)&&(l["vis-kandidat"]?.icon||l.kandidat?.icon)||e.icon;return n.jsx("div",{ref:o,className:B,children:n.jsx(v,{"aria-label":"Vindusnavn",children:n.jsx(j,{children:n.jsx(h,{children:n.jsx(w,{icon:a,children:i})})})})})}return n.jsxs("div",{ref:o,className:B,children:[n.jsx("div",{ref:p,"aria-hidden":!0,className:"invisible absolute top-0 left-0 h-0 overflow-hidden",children:n.jsx(v,{"aria-label":"Full breadcrumb width measurement",children:n.jsx(j,{children:s.map((e,i)=>n.jsxs(t.Fragment,{children:[i>0&&n.jsx(S,{}),n.jsx(h,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(E,{href:e.href,icon:e.icon,children:e.label})})]},`measure-${e.segment}-${i}`))})})}),n.jsx(v,{"aria-label":"Brødsmulesti",children:n.jsx(j,{children:J.map((e,i)=>{const a=i>0;return e.segment==="__ellipsis__"?n.jsxs(t.Fragment,{children:[a&&n.jsx(S,{}),n.jsx(h,{children:n.jsx(M,{})})]},`ellipsis-${i}`):n.jsxs(t.Fragment,{children:[a&&n.jsx(S,{}),n.jsx(h,{children:e.skipLink?n.jsx(w,{icon:e.icon,children:e.label}):n.jsx(E,{href:e.href,icon:e.icon,children:e.label})})]},`bc-${e.segment}-${i}`)})})})]})}X.__docgenInfo={description:"",methods:[],displayName:"AutoBreadcrumbs",props:{pathConfig:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"PathConfigEntry"}],raw:"Record<string, PathConfigEntry>"},description:"Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig.",defaultValue:{value:`{
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
}`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},erstattPath:{required:!1,tsType:{name:"tuple",raw:"[originalSegment: string, nyLabel: string]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler']"},forcedPath:{required:!1,tsType:{name:"string"},description:"For test / Storybook: bruk denne pathen i stedet for usePathname()"}}};export{X as A,U as d,G as u};
