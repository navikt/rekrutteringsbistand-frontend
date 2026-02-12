import{cQ as f,ay as S,r as x,j as t,h as j,Q as s}from"./iframe-B9ThPlmd.js";import{I,a as h,i as y}from"./InternStatusTag-BvSIrdiy.js";import{u as E}from"./KandidatlisteContext-D-IInopN.js";import{D as r}from"./Dropdown-DGHt6ApU.js";import{S as v}from"./Pencil-B_7i1raK.js";import{w as m,c as V}from"./ContextDecorators-BZenBO_w.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-arhPIFDs.js";import"./CircleSlash-CSpdEEAv.js";import"./XMarkOctagon-4njpg6I7.js";import"./Reception-BN1eDQzn.js";import"./SealCheckmark-DB8TjMgJ.js";import"./PersonChat-DWondyvc.js";import"./MagnifyingGlass-C74D0yjJ.js";import"./OrganisasjonsnummerAlert-C7A2Bp_A.js";import"./VStack-C9loVM5x.js";import"./BasePrimitive--eQQOU-u.js";import"./Box-Ia3ryaQk.js";import"./List-CACoCc-U.js";import"./Link-DibQlNmm.js";import"./KandidatHendelseTag-Bg5oh_TX.js";import"./ChatExclamationmark-_hz7dHBt.js";import"./FileXMark-CtT02kn6.js";import"./Trash-BJGu2QsA.js";import"./HandShakeHeart-DL-fDko_.js";import"./Calendar-BI75P9P5.js";import"./ThumbUp-B_LqSMfb.js";import"./ExclamationmarkTriangle-B5GxJVlA.js";import"./Table-Dxd5L6-e.js";import"./index-C4ZI2FHj.js";import"./index-B40KJ5b4.js";import"./util-B99gwcAI.js";import"./useControllableState-gfKYrbxX.js";import"./Popover-LagVs_D5.js";import"./floating-ui.react-Dk7odo6F.js";import"./Modal.context-DV_1AUnC.js";import"./DismissableLayer-COmNmYLB.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CKGmPh56.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=E(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),y(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
