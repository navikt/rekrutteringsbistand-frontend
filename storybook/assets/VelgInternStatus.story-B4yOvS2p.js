import{e2 as f,c6 as S,r as x,j as t,c as j,bM as s}from"./iframe-CuDSMhaq.js";import{I,a as h,i as E}from"./InternStatusTag-BTVp-vQ7.js";import{u as y}from"./KandidatlisteContext-DvX5DOF6.js";import{D as r}from"./Dropdown-AZO4uMAf.js";import{S as v}from"./Pencil-DL144QGM.js";import{w as m,c as V}from"./ContextDecorators-BbiTrEuW.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DJ_iPMRQ.js";import"./CircleSlash-e_utLgv5.js";import"./XMarkOctagon-tlprlkRR.js";import"./Reception-CT8ZhneE.js";import"./SealCheckmark-D_NEPtnn.js";import"./PersonChat-oQxK9MgY.js";import"./MagnifyingGlass-XExlrZTP.js";import"./OrganisasjonsnummerAlert-gMFzB-Nj.js";import"./VStack-peAx0avK.js";import"./BasePrimitive-B1PStItJ.js";import"./Box-BQuanBXm.js";import"./List-DJ23K__7.js";import"./Link-tsLRweZL.js";import"./KandidatHendelseTag-BW31CTc3.js";import"./ChatExclamationmark-B0nHfMyF.js";import"./FileXMark-Ca4Av8Q1.js";import"./Trash-DwwMlthw.js";import"./HandShakeHeart-B-8bJJTX.js";import"./Calendar-DDJzmvww.js";import"./ThumbUp-C4QBnZuP.js";import"./ExclamationmarkTriangle-CMF8L1j6.js";import"./Table-DNymA4zI.js";import"./index-CBiK8n6F.js";import"./index-B40KJ5b4.js";import"./util-DXhbwXX1.js";import"./useControllableState-CxL1lGPX.js";import"./Popover-BAW7D9NM.js";import"./floating-ui.react-DZI1egVt.js";import"./Modal.context-DiZ0ui_2.js";import"./DismissableLayer-BRBLHQUd.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Bd3jXGUA.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
