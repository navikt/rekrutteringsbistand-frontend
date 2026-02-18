import{d$ as f,c3 as S,r as x,j as t,c as j,bJ as s}from"./iframe-D70-n2m-.js";import{I,a as h,i as E}from"./InternStatusTag-Cd3D5izu.js";import{u as y}from"./KandidatlisteContext-D6hOQxYx.js";import{D as r}from"./Dropdown-BUodzmE2.js";import{S as v}from"./Pencil-kD9OrP7n.js";import{w as m,c as V}from"./ContextDecorators-lnfv_d7n.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BnMe-z74.js";import"./CircleSlash-DvWSZldR.js";import"./XMarkOctagon-DeTVkQVB.js";import"./Reception-B7Buu4LG.js";import"./SealCheckmark-AQvuQnxu.js";import"./PersonChat-DEAzQoMK.js";import"./MagnifyingGlass-Bwx_z-pG.js";import"./OrganisasjonsnummerAlert-BMx9ggBB.js";import"./VStack-BAHy_GRE.js";import"./BasePrimitive-D2DrK62W.js";import"./Box-D6RALtuO.js";import"./List-Bhscd6Ad.js";import"./Link-Dldcqx0Y.js";import"./KandidatHendelseTag-BKKVJMW8.js";import"./ChatExclamationmark-jc2LIyOp.js";import"./FileXMark-n_z89ONK.js";import"./Trash-BgCW-nHH.js";import"./HandShakeHeart-CG_iTudN.js";import"./Calendar-DiZ7MSVX.js";import"./ThumbUp-BK8dis7h.js";import"./ExclamationmarkTriangle-Dg1zkN6a.js";import"./Table-B7oTFh85.js";import"./index-DboKPwRt.js";import"./index-B40KJ5b4.js";import"./util-CHmFCC2K.js";import"./useControllableState-Dn9P7nNK.js";import"./Popover-tnbaeHO5.js";import"./floating-ui.react-DG81sZI_.js";import"./Modal.context-5ghY98ha.js";import"./DismissableLayer-DMCbA-3c.js";import"./owner-Cl3CaANg.js";import"./useClientLayoutEffect-CvdKidsR.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
