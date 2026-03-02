import{eb as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-BTwVuC5L.js";import{I,a as h,i as E}from"./InternStatusTag-CThGdTIC.js";import{u as y}from"./KandidatlisteContext-DUtffNt7.js";import{D as r}from"./Dropdown-2bIMlZyJ.js";import{S as v}from"./Pencil-Bxnn5aox.js";import{w as m,c as V}from"./ContextDecorators-DnYvXya3.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-CRCf0WCW.js";import"./CircleSlash-YSKoKM-C.js";import"./XMarkOctagon-5LEPRcOr.js";import"./Reception-BcDSP3ar.js";import"./SealCheckmark-Botb9aVy.js";import"./PersonChat-BbM3N9vI.js";import"./MagnifyingGlass-3POgUfRl.js";import"./OrganisasjonsnummerAlert-B9TBo-GY.js";import"./VStack-BrnQe_V7.js";import"./BasePrimitive-CDk_2M2M.js";import"./Box-C9e24u4h.js";import"./List-Dg_uyu7Q.js";import"./Link-B2N88QCs.js";import"./KandidatHendelseTag-DLUayBID.js";import"./ChatExclamationmark-C7HSgIVf.js";import"./FileXMark-pcQo6V67.js";import"./Trash-CJqtVo0F.js";import"./HandShakeHeart-ahITAjlG.js";import"./Calendar-D7o4SdbH.js";import"./ThumbUp-BYu4FHGa.js";import"./ExclamationmarkTriangle-BFIoRgNN.js";import"./Table-B2jJF36c.js";import"./index-CnHQ6l6K.js";import"./index-CWbL8d4M.js";import"./util-CuzWVfDu.js";import"./useControllableState-BJWM5CP3.js";import"./Popover-BiNdNw_Q.js";import"./floating-ui.react-CANtNUcS.js";import"./Modal.context-D4oMjfsL.js";import"./DismissableLayer-CO08JDep.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},b=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:b.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
