import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-9QB-DaFS.js";import{I,a as h,i as E}from"./InternStatusTag-Bnwo3DdM.js";import{u as y}from"./KandidatlisteContext-Cb7w7IgL.js";import{D as r}from"./Dropdown-C7E42Dhf.js";import{S as v}from"./Pencil-BwxzY21Q.js";import{w as u,c as V}from"./ContextDecorators-BmkvBKIY.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DelammDU.js";import"./CircleSlash-Bp2PjbrY.js";import"./XMarkOctagon-xBPSOXAC.js";import"./Reception-D68oNaoW.js";import"./SealCheckmark-BL6mEdYl.js";import"./PersonChat-CJk2iDNA.js";import"./MagnifyingGlass-Cf4Hhl6r.js";import"./OrganisasjonsnummerAlert-B409Sg5H.js";import"./VStack-IdSzJfb7.js";import"./BasePrimitive-CqnHCdpO.js";import"./Box-DbNaBfp_.js";import"./List-Vcwr0u-C.js";import"./Link-DRUCHg3V.js";import"./KandidatHendelseTag-1m8Mn477.js";import"./ChatExclamationmark-DqB4-H3K.js";import"./FileXMark-D5QHHCrz.js";import"./Trash-CXv6PL6L.js";import"./HandShakeHeart-D7xvTXa4.js";import"./Calendar-z8xSDDL7.js";import"./ThumbUp-CevKwLW9.js";import"./ExclamationmarkTriangle-CUccKGoR.js";import"./Table-OyV2vUpS.js";import"./dato-micr6Kx5.js";import"./format-B0Vk874m.js";import"./en-US-CG9j0nLu.js";import"./match-BX-jyUN2.js";import"./parseISO-D9_5QCXM.js";import"./parse-LM0aOrqK.js";import"./getDefaultOptions-onEum7HG.js";import"./isSameDay-_XOy3LZz.js";import"./index-DAcM2qlO.js";import"./index-CWbL8d4M.js";import"./util-pjS9bycJ.js";import"./useControllableState-D55ZSACu.js";import"./Popover-DMCI_oTR.js";import"./floating-ui.react-BbfMT4OT.js";import"./Modal.context-BarcoW_3.js";import"./DismissableLayer-C7A3ZHit.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};export{l as FlereStatuser,o as LukketListe,d as Vurderes,jt as default};
