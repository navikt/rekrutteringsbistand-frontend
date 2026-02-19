import{e1 as f,c5 as S,r as x,j as t,c as j,bL as s}from"./iframe-BkwnODkR.js";import{I,a as h,i as E}from"./InternStatusTag-btfnO0fO.js";import{u as y}from"./KandidatlisteContext-D-4uVWPX.js";import{D as r}from"./Dropdown-CtHfcRJU.js";import{S as v}from"./Pencil-iFhseRyF.js";import{w as m,c as V}from"./ContextDecorators-D2D4wymU.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BbrVWz2H.js";import"./CircleSlash-CUTxmDZi.js";import"./XMarkOctagon-ugQ4d2sL.js";import"./Reception-CqTBvkWZ.js";import"./SealCheckmark-D0uKmyib.js";import"./PersonChat-FqBCaige.js";import"./MagnifyingGlass-DnTkv5zI.js";import"./OrganisasjonsnummerAlert-BDhdoZcn.js";import"./VStack-B4OSq3lZ.js";import"./BasePrimitive-C1_nDZIv.js";import"./Box-CZ-_ucwy.js";import"./List-Bg7qnbjY.js";import"./Link-BPE5RNzw.js";import"./KandidatHendelseTag-De4Zw3Z3.js";import"./ChatExclamationmark-nqvYvLOF.js";import"./FileXMark-W4dzEAi9.js";import"./Trash-BT8t48RZ.js";import"./HandShakeHeart-DtBCaqJt.js";import"./Calendar-B3JE1Dmr.js";import"./ThumbUp-BMUN86gn.js";import"./ExclamationmarkTriangle-CJLZ4uuX.js";import"./Table-ZWT3Pxbg.js";import"./index-BZlQ4SQL.js";import"./index-B40KJ5b4.js";import"./util-lalAa7Dy.js";import"./useControllableState-L1D98hI-.js";import"./Popover-CrWRRi8Q.js";import"./floating-ui.react-B9gpqnNq.js";import"./Modal.context-YPIuINkw.js";import"./DismissableLayer-B1idZzRU.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-urkX9LtN.js";const L=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},R=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await L(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:R.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
