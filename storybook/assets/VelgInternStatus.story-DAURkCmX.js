import{d$ as f,c3 as S,r as x,j as t,c as j,bJ as s}from"./iframe-DajSqrUA.js";import{I,a as h,i as E}from"./InternStatusTag-Bby3F9wB.js";import{u as y}from"./KandidatlisteContext-D9_fQrfR.js";import{D as r}from"./Dropdown-Dk-T8wcn.js";import{S as v}from"./Pencil-Dd4PudxC.js";import{w as m,c as V}from"./ContextDecorators-DPIiA7l7.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DDA00Iqw.js";import"./CircleSlash-DqGsSGO4.js";import"./XMarkOctagon-Bu6OS10N.js";import"./Reception-D-04Ot-7.js";import"./SealCheckmark-8NuXFLmu.js";import"./PersonChat-BNU68Ehr.js";import"./MagnifyingGlass-99R5y6Ho.js";import"./OrganisasjonsnummerAlert-ttuyWZZE.js";import"./VStack-6eko35wq.js";import"./BasePrimitive-B5cN4ML1.js";import"./Box-B1A3Jx9S.js";import"./List-Cdmy6Ve6.js";import"./Link-Cnq_3oR_.js";import"./KandidatHendelseTag-Cel334R7.js";import"./ChatExclamationmark-D-WTVOep.js";import"./FileXMark-CRJALD2q.js";import"./Trash-BiOWVvKm.js";import"./HandShakeHeart-CvYj85-E.js";import"./Calendar-DO7nAsmi.js";import"./ThumbUp-DRZr661s.js";import"./ExclamationmarkTriangle-M_FMFCMD.js";import"./Table-DYn-RzEP.js";import"./index-BHJY8bfe.js";import"./index-B40KJ5b4.js";import"./util-N9G6fNXg.js";import"./useControllableState-BvXX11tZ.js";import"./Popover-ByvOqoVA.js";import"./floating-ui.react-C9-2BR-y.js";import"./Modal.context-DdYEpb6k.js";import"./DismissableLayer-BcMxi2MV.js";import"./owner-Cl3CaANg.js";import"./useClientLayoutEffect-CA3gNj2M.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
