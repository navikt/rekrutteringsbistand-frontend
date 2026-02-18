import{e1 as f,c5 as S,r as x,j as t,c as j,bL as s}from"./iframe-I1RaL24p.js";import{I,a as h,i as E}from"./InternStatusTag-mOG9NMDC.js";import{u as y}from"./KandidatlisteContext-Brh0sSXY.js";import{D as r}from"./Dropdown-CCUFK96J.js";import{S as v}from"./Pencil-BVWUIlLE.js";import{w as m,c as V}from"./ContextDecorators-CiZiKQAh.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-CYKyVrC_.js";import"./CircleSlash-DHmqzqLm.js";import"./XMarkOctagon-DGPDkh3w.js";import"./Reception-CAhfcx31.js";import"./SealCheckmark-qDaz4YsJ.js";import"./PersonChat-124hBLE2.js";import"./MagnifyingGlass-CDMH3E-X.js";import"./OrganisasjonsnummerAlert-CE9grySA.js";import"./VStack-BcNo5M5H.js";import"./BasePrimitive-ffzBbguk.js";import"./Box-CIK8h6iD.js";import"./List-R_rbwQvs.js";import"./Link-DJLXINnN.js";import"./KandidatHendelseTag-CH3P3uMK.js";import"./ChatExclamationmark-BnR9Wl2D.js";import"./FileXMark-BmEGjrOU.js";import"./Trash-B-zfF0Gv.js";import"./HandShakeHeart-BsXKIDVK.js";import"./Calendar-FE6qr37K.js";import"./ThumbUp-CTTKsmT3.js";import"./ExclamationmarkTriangle-xb8KQJ1P.js";import"./Table-BcVDr8qU.js";import"./index-DxilKTmv.js";import"./index-B40KJ5b4.js";import"./util-DVpbqcpO.js";import"./useControllableState-CUyvrH3O.js";import"./Popover-tIGNB_c7.js";import"./floating-ui.react-CN8wowa4.js";import"./Modal.context-D-E6NpkL.js";import"./DismissableLayer-CzUiDmEW.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect--j-RM18L.js";const L=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},R=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await L(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:R.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
