import{dZ as f,c3 as S,r as x,j as t,c as j,bJ as s}from"./iframe-C7XLhcpc.js";import{I,a as h,i as E}from"./InternStatusTag-Dk5RnHRX.js";import{u as y}from"./KandidatlisteContext-DKn3kA58.js";import{D as r}from"./Dropdown-Bgn6IPVT.js";import{S as v}from"./Pencil-CKREkttQ.js";import{w as m,c as V}from"./ContextDecorators-VbRdTLSO.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DQMyaSqp.js";import"./CircleSlash-p_NtMmbi.js";import"./XMarkOctagon-B_2muvFU.js";import"./Reception-CyjdPoc4.js";import"./SealCheckmark-DocwzkSZ.js";import"./PersonChat-BgwmV1YC.js";import"./MagnifyingGlass-CGClP_7u.js";import"./OrganisasjonsnummerAlert-DB1FIAtx.js";import"./VStack-D9oREGnM.js";import"./BasePrimitive-COQ289lw.js";import"./Box-TXzayjAy.js";import"./List-BhYaUhw6.js";import"./Link-B5AnCRBg.js";import"./KandidatHendelseTag-BSTr6MXW.js";import"./ChatExclamationmark-Bjo6hXdk.js";import"./FileXMark-DLMPCfDo.js";import"./Trash-DgPccyKE.js";import"./HandShakeHeart-DHEH6BIq.js";import"./Calendar-BV1fKCCJ.js";import"./ThumbUp-HgoDSFyx.js";import"./ExclamationmarkTriangle-DJ_6pgml.js";import"./Table-Cwzq4m90.js";import"./index-Cbr6uTtH.js";import"./index-B40KJ5b4.js";import"./util-CHKwWRQQ.js";import"./useControllableState-CqHAXLCA.js";import"./Popover-YT6OP2M_.js";import"./floating-ui.react-JHpuQG_0.js";import"./Modal.context-DXPH1CfZ.js";import"./DismissableLayer-CEJ7Zggx.js";import"./owner-Cl3CaANg.js";import"./useClientLayoutEffect-qRqWNUAU.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
