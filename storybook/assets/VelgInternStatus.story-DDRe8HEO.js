import{cQ as f,ay as S,r as x,j as t,h as j,Q as s}from"./iframe-4a7pzBuS.js";import{I,a as h,i as y}from"./InternStatusTag-D0psweOf.js";import{u as E}from"./KandidatlisteContext-BD9_3RHd.js";import{D as r}from"./Dropdown-C0PcmcXq.js";import{S as v}from"./Pencil-DOOD6umf.js";import{w as m,c as V}from"./ContextDecorators-0DxnwN8H.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-D3S9-NkF.js";import"./CircleSlash-c8nq1tgj.js";import"./XMarkOctagon-B3TwEdMX.js";import"./Reception-C4QoPh3P.js";import"./SealCheckmark-CzIDflrA.js";import"./PersonChat-Bu3B7C8k.js";import"./MagnifyingGlass-B6pqe_9x.js";import"./OrganisasjonsnummerAlert-8KB8IjJf.js";import"./VStack-DzcWggSF.js";import"./BasePrimitive-Bw-dE1Pc.js";import"./Box-CW0Z3SG9.js";import"./List-b8cW90yl.js";import"./Link-cXXLhatC.js";import"./KandidatHendelseTag-bjzEuH46.js";import"./ChatExclamationmark-CFFp_i8M.js";import"./FileXMark-_1-OnK4S.js";import"./Trash-bicb_nBB.js";import"./HandShakeHeart-B7hLCJD-.js";import"./Calendar-CV40_lg4.js";import"./ThumbUp-D-yOKIPO.js";import"./ExclamationmarkTriangle-DAiqYGTZ.js";import"./Table-DkwYalXI.js";import"./index-Dqq5BLuM.js";import"./index-B40KJ5b4.js";import"./util-CyD_m1PQ.js";import"./useControllableState-V8VzWG7k.js";import"./Popover-WeEmj7q9.js";import"./floating-ui.react-D5Gni_Yn.js";import"./Modal.context-DbZ7VQS-.js";import"./DismissableLayer-BEwNDouw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BogR7EgA.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=E(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),y(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
