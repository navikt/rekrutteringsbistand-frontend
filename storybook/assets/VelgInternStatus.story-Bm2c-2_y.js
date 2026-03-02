import{ea as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-E6Mm1JGe.js";import{I,a as h,i as E}from"./InternStatusTag-BBc8w152.js";import{u as y}from"./KandidatlisteContext-YwxKUbfx.js";import{D as r}from"./Dropdown-D-mgyp34.js";import{S as v}from"./Pencil-CvI7-Nrl.js";import{w as m,c as V}from"./ContextDecorators-C256MxiX.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-GViw5sio.js";import"./CircleSlash-BcPvpbSc.js";import"./XMarkOctagon-BzOpAQ3H.js";import"./Reception-CPUdiVyq.js";import"./SealCheckmark-BqTOKzB0.js";import"./PersonChat-qs9TjgD8.js";import"./MagnifyingGlass-Bz1utv2I.js";import"./OrganisasjonsnummerAlert-v1sRG-Ae.js";import"./VStack-DcyqGAQ6.js";import"./BasePrimitive-DSSGc3uz.js";import"./Box-B24JeZZA.js";import"./List-BJszKEWq.js";import"./Link-B3qaX96X.js";import"./KandidatHendelseTag-DPu_rBEg.js";import"./ChatExclamationmark-_eF-En7c.js";import"./FileXMark-C2RZh6OQ.js";import"./Trash-DgvesoRa.js";import"./HandShakeHeart-BUaZDdK4.js";import"./Calendar-CCtlhJLK.js";import"./ThumbUp-PGXrQLD7.js";import"./ExclamationmarkTriangle-DM0VKza-.js";import"./Table-Da-H00QW.js";import"./index-D74NftQi.js";import"./index-CWbL8d4M.js";import"./util-CUQMCRY3.js";import"./useControllableState-D5-hTvpA.js";import"./Popover-BmiRZPoI.js";import"./floating-ui.react-BpFkhjzh.js";import"./Modal.context-BPi-odSy.js";import"./DismissableLayer-BTPBSXh8.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
