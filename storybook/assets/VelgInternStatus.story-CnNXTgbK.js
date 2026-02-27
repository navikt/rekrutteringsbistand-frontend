import{ea as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-BPmgH2Tx.js";import{I,a as h,i as E}from"./InternStatusTag-BFxVKAK1.js";import{u as y}from"./KandidatlisteContext-DtMrBJSR.js";import{D as r}from"./Dropdown-B0yNLeM3.js";import{S as v}from"./Pencil-CAFCmNIQ.js";import{w as m,c as V}from"./ContextDecorators-CKLWcmE6.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BkLofOHG.js";import"./CircleSlash-8YnqASMy.js";import"./XMarkOctagon-BFTwkeia.js";import"./Reception-DtKhs4N3.js";import"./SealCheckmark-UREkbUZ1.js";import"./PersonChat-BmZqE3Ai.js";import"./MagnifyingGlass-CG8NnAil.js";import"./OrganisasjonsnummerAlert-BF-FmAnq.js";import"./VStack-FkDzzsLz.js";import"./BasePrimitive-oP1t9L8b.js";import"./Box-DmpKkvmh.js";import"./List-CG1-uwNh.js";import"./Link-D_8pAuw4.js";import"./KandidatHendelseTag-BCc5pevu.js";import"./ChatExclamationmark-Dzsqno_z.js";import"./FileXMark-BJmYxrXd.js";import"./Trash-3bORrV6d.js";import"./HandShakeHeart-CdY3ES18.js";import"./Calendar-Byxidj_3.js";import"./ThumbUp-Ca9HePGa.js";import"./ExclamationmarkTriangle-B781ayZI.js";import"./Table-DLLzaYr6.js";import"./index-p5qoiiL2.js";import"./index-CWbL8d4M.js";import"./util-D94mQNHJ.js";import"./useControllableState-NeFzMEdM.js";import"./Popover-CReZJ0cK.js";import"./floating-ui.react-D2LCOjcf.js";import"./Modal.context-Dp2nafXs.js";import"./DismissableLayer-nrhuz3N0.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
