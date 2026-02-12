import{cQ as f,ay as S,r as x,j as t,h as j,Q as s}from"./iframe-DP2kvpdg.js";import{I,a as h,i as y}from"./InternStatusTag-DBmJADF5.js";import{u as E}from"./KandidatlisteContext-DEpcEx0V.js";import{D as r}from"./Dropdown-FbZ4c_l1.js";import{S as v}from"./Pencil-JISOiqZF.js";import{w as m,c as V}from"./ContextDecorators-BDRP7RFd.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BHTVORAi.js";import"./CircleSlash-UwF9iU1n.js";import"./XMarkOctagon-CdgMsFRn.js";import"./Reception-NJ_tvM22.js";import"./SealCheckmark-CzEhldmC.js";import"./PersonChat-CBPyo0pQ.js";import"./MagnifyingGlass-QH9Mu4-F.js";import"./OrganisasjonsnummerAlert-CQQ9aCbz.js";import"./VStack-C25zxde3.js";import"./BasePrimitive-CWkv78-E.js";import"./Box-D-em4xIV.js";import"./List-3pEpFqVt.js";import"./Link-DRKZrfVD.js";import"./KandidatHendelseTag-Cj42a-w_.js";import"./ChatExclamationmark-CVdE9n6Y.js";import"./FileXMark-BWkn3Yak.js";import"./Trash-CuHVONvv.js";import"./HandShakeHeart-B6f8TyQr.js";import"./Calendar-y0B4-QLG.js";import"./ThumbUp-BFsTNLwf.js";import"./ExclamationmarkTriangle-BMbtBjZB.js";import"./Table-Cp8DjJzM.js";import"./index-Dw9xAlZq.js";import"./index-B40KJ5b4.js";import"./util-fsuIS61f.js";import"./useControllableState-sfzBv1qc.js";import"./Popover-CeaLRTdK.js";import"./floating-ui.react-Dp901iQN.js";import"./Modal.context-CZR20Tlo.js";import"./DismissableLayer-DMLmqCA1.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Bpr87MFm.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=E(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),y(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
