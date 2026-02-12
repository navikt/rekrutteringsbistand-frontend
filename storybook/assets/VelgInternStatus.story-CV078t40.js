import{cQ as f,ay as S,r as x,j as t,h as j,Q as s}from"./iframe-DAHX0Bjj.js";import{I,a as h,i as y}from"./InternStatusTag-B2-_zvaS.js";import{u as E}from"./KandidatlisteContext-WH-4jCVF.js";import{D as r}from"./Dropdown-DYu56pZi.js";import{S as v}from"./Pencil-BG2X9WTM.js";import{w as m,c as V}from"./ContextDecorators-DzNT8_3v.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-q9EhCUAn.js";import"./CircleSlash-DUOFxjoI.js";import"./XMarkOctagon-Bhgz-h6J.js";import"./Reception-BbcgWVVe.js";import"./SealCheckmark-oLvn4yv5.js";import"./PersonChat-HbHhnMWC.js";import"./MagnifyingGlass-aFDDPlqD.js";import"./OrganisasjonsnummerAlert-1w7GRpU5.js";import"./VStack-DjyJ5Lnj.js";import"./BasePrimitive-COrbn2CY.js";import"./Box-C5SMW_Le.js";import"./List-B1F9M9FI.js";import"./Link-DVwJPMop.js";import"./KandidatHendelseTag-BaKlM6nr.js";import"./ChatExclamationmark-JIkkt030.js";import"./FileXMark-C7V2eX7R.js";import"./Trash-NIbn-yOz.js";import"./HandShakeHeart-BDFJwSR5.js";import"./Calendar-5QxyC_94.js";import"./ThumbUp-DGbIuKVI.js";import"./ExclamationmarkTriangle-ClxxjODN.js";import"./Table-H1BV-ceW.js";import"./index-DArxax8E.js";import"./index-B40KJ5b4.js";import"./util-8uAgNAeh.js";import"./useControllableState-BS1X3OKI.js";import"./Popover-CUlPSUdR.js";import"./floating-ui.react-C-MydwVh.js";import"./Modal.context-BS0nfZmi.js";import"./DismissableLayer-DqBDfLE9.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C4MzY1kV.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=E(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),y(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />)
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.AKTUELL,
    lukketKandidatliste: true
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />, createKandidatlisteMock({
    lukket: true
  }))
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'dummy',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: () => withStillingsKandidatliste(() => <div className='flex flex-col gap-4'>
        {Object.values(InternKandidatstatus).map(s => <VelgInternStatus key={s} kandidatnr={\`kandidat-\${s}\`} status={s} lukketKandidatliste={false} />)}
      </div>)
}`,...l.parameters?.docs?.source}}};export{l as FlereStatuser,o as LukketListe,d as Vurderes,kt as default};
