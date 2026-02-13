import{d$ as f,c3 as S,r as x,j as t,c as j,bJ as s}from"./iframe-ogJKK8dt.js";import{I,a as h,i as E}from"./InternStatusTag-4G3bouL9.js";import{u as y}from"./KandidatlisteContext-BVQmcTiH.js";import{D as r}from"./Dropdown-5AcJ98mv.js";import{S as v}from"./Pencil-CEo86eH4.js";import{w as m,c as V}from"./ContextDecorators-Cm-nlCVO.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DVOjX6NO.js";import"./CircleSlash-DVwTKBFz.js";import"./XMarkOctagon-DM07EGDe.js";import"./Reception-clOgjqc1.js";import"./SealCheckmark-BJrIYbg-.js";import"./PersonChat-qhVOQ31T.js";import"./MagnifyingGlass-Dl2bpW-l.js";import"./OrganisasjonsnummerAlert-B4r86ma9.js";import"./VStack-yzZbQCBY.js";import"./BasePrimitive-DjusfcqA.js";import"./Box-ooNOMxMv.js";import"./List-CxZDaKVg.js";import"./Link-BEY9g3IO.js";import"./KandidatHendelseTag-ThwAB8GS.js";import"./ChatExclamationmark-zXL3mRiD.js";import"./FileXMark-CoaNlJsI.js";import"./Trash-BLQSm5Na.js";import"./HandShakeHeart-DcAsaTni.js";import"./Calendar-Cy6HYWh_.js";import"./ThumbUp-C-XSNpl9.js";import"./ExclamationmarkTriangle-DzRfnHv7.js";import"./Table-B-JVjdBV.js";import"./index-C5FF2Bxh.js";import"./index-B40KJ5b4.js";import"./util-DZUih_L4.js";import"./useControllableState-CfJj0Xvi.js";import"./Popover-C8taA3_I.js";import"./floating-ui.react-C2MSLeiy.js";import"./Modal.context-BTpjd2zQ.js";import"./DismissableLayer-xsuFORDV.js";import"./owner-Cl3CaANg.js";import"./useClientLayoutEffect-D5xtevBN.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
