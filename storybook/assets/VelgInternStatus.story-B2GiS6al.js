import{e1 as f,c5 as S,r as x,j as t,c as j,bL as s}from"./iframe-CICabUNg.js";import{I,a as h,i as E}from"./InternStatusTag-BxtFOWx8.js";import{u as y}from"./KandidatlisteContext-uRRlq49D.js";import{D as r}from"./Dropdown-BaOAPXHQ.js";import{S as v}from"./Pencil-DL_Zr5mA.js";import{w as m,c as V}from"./ContextDecorators-CQMciJqA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-Ci9U1P_l.js";import"./CircleSlash-k7McnM7M.js";import"./XMarkOctagon-C8HbPVP4.js";import"./Reception-CXyQG7eC.js";import"./SealCheckmark-DAXrP63D.js";import"./PersonChat-BPmtQunB.js";import"./MagnifyingGlass-BSEcDyec.js";import"./OrganisasjonsnummerAlert-67p7D-UP.js";import"./VStack-mOgv7mOp.js";import"./BasePrimitive-Q5SXqBPp.js";import"./Box-bCAH4nym.js";import"./List-C71F1ED3.js";import"./Link-Cc-1o-tt.js";import"./KandidatHendelseTag-Bvd3bv-a.js";import"./ChatExclamationmark-CG04mwJo.js";import"./FileXMark-Drv5C4mg.js";import"./Trash-6IQGakom.js";import"./HandShakeHeart-jgUBH5fs.js";import"./Calendar-3mw3CxSC.js";import"./ThumbUp-DnZdUywu.js";import"./ExclamationmarkTriangle-BphOHuZJ.js";import"./Table-nlMImI8d.js";import"./index-tkkqveR9.js";import"./index-B40KJ5b4.js";import"./util-FewNhbmB.js";import"./useControllableState-jDf_Tnei.js";import"./Popover-CWO9fGvT.js";import"./floating-ui.react-CNhHaEN_.js";import"./Modal.context-BPOBanTz.js";import"./DismissableLayer-Dqvg0Hjc.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BwRbPqqF.js";const L=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},R=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await L(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:R.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
