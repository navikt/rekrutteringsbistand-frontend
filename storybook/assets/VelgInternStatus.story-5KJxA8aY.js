import{ea as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-dHiPtB1K.js";import{I,a as h,i as E}from"./InternStatusTag-BCinsN28.js";import{u as y}from"./KandidatlisteContext-CeYyi7aC.js";import{D as r}from"./Dropdown-DCO9f9-c.js";import{S as v}from"./Pencil-D6Wg17K5.js";import{w as m,c as V}from"./ContextDecorators-CoWNwxu9.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-8SPP-xG4.js";import"./CircleSlash-DZJT_TpD.js";import"./XMarkOctagon-B6_nEd1G.js";import"./Reception-BswjceN1.js";import"./SealCheckmark-CSlsH4IM.js";import"./PersonChat-DbbLCMfb.js";import"./MagnifyingGlass-B_kCcf9C.js";import"./OrganisasjonsnummerAlert-DIkYQKdd.js";import"./VStack-BRSuobsI.js";import"./BasePrimitive-B6AYqQ1F.js";import"./Box-B2aTq1Ly.js";import"./List-TP_Y8Wd_.js";import"./Link-d4G3MTaM.js";import"./KandidatHendelseTag-sc6nO4tw.js";import"./ChatExclamationmark-DDnS1859.js";import"./FileXMark-D8IlZbDS.js";import"./Trash-D-mbu_B_.js";import"./HandShakeHeart-EWCEHQQe.js";import"./Calendar-C_hozZAH.js";import"./ThumbUp-BSCzsSqX.js";import"./ExclamationmarkTriangle-BzkE6gMT.js";import"./Table-IaacpR-h.js";import"./index-Bbb8RcBC.js";import"./index-CWbL8d4M.js";import"./util-Cp_q5jyE.js";import"./useControllableState-CQeteWjZ.js";import"./Popover-DOwkhEL4.js";import"./floating-ui.react-klta_uuB.js";import"./Modal.context-CWapPCJW.js";import"./DismissableLayer-wvdswCkQ.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};export{l as FlereStatuser,o as LukketListe,d as Vurderes,pt as default};
