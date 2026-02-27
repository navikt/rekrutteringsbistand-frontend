import{ea as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-PIyxYh0N.js";import{I,a as h,i as E}from"./InternStatusTag-9trDMw0t.js";import{u as y}from"./KandidatlisteContext-Dkr7M27v.js";import{D as r}from"./Dropdown-Dh_9pf1y.js";import{S as v}from"./Pencil-D45miUhU.js";import{w as m,c as V}from"./ContextDecorators-BLiWx5TC.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BfKDETSx.js";import"./CircleSlash-C9XtUhLC.js";import"./XMarkOctagon-BSnT3PMU.js";import"./Reception-DfSQycqP.js";import"./SealCheckmark-Ugz7mxVv.js";import"./PersonChat-CuQrGzZ6.js";import"./MagnifyingGlass-BiJtfa5i.js";import"./OrganisasjonsnummerAlert-D1-ibdTw.js";import"./VStack-C1VVTBrH.js";import"./BasePrimitive-B6gD52gJ.js";import"./Box-BPicFkNa.js";import"./List-BRg4jmBQ.js";import"./Link-CohzM1Nw.js";import"./KandidatHendelseTag-WHd0J4ye.js";import"./ChatExclamationmark-C3aP8kyt.js";import"./FileXMark-Brpn9O6G.js";import"./Trash-vtkia1Jm.js";import"./HandShakeHeart-8wSTH7xF.js";import"./Calendar-Bi8Gb9wP.js";import"./ThumbUp-B5jfWdS7.js";import"./ExclamationmarkTriangle-CHrPMSjw.js";import"./Table-Db45jQEm.js";import"./index-HyJdP3tn.js";import"./index-CWbL8d4M.js";import"./util-B2yife1h.js";import"./useControllableState-ZQecNKS5.js";import"./Popover-Cwkbhi5e.js";import"./floating-ui.react-D2HIA0Oo.js";import"./Modal.context-cqPJuvGz.js";import"./DismissableLayer-bNtwsa3p.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
