import{e2 as f,c6 as S,r as x,j as t,c as j,bM as s}from"./iframe-CCb5PQcY.js";import{I,a as h,i as E}from"./InternStatusTag-PxKLUMnh.js";import{u as y}from"./KandidatlisteContext-Dc37_TCH.js";import{D as r}from"./Dropdown-CkzRdaTj.js";import{S as v}from"./Pencil-DXXJjS0g.js";import{w as m,c as V}from"./ContextDecorators-C--AsPFB.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BaR3L-Dh.js";import"./CircleSlash-29H_rByE.js";import"./XMarkOctagon-CrXYyl12.js";import"./Reception-Cv13N89H.js";import"./SealCheckmark-CObzxDpP.js";import"./PersonChat-D-FUKoQR.js";import"./MagnifyingGlass-BSw-qRmR.js";import"./OrganisasjonsnummerAlert-xc3gUtYm.js";import"./VStack-GuuCXI7l.js";import"./BasePrimitive-BvB3PA65.js";import"./Box-CbCiLbTk.js";import"./List-CnK_8OkB.js";import"./Link-rPLI3IhV.js";import"./KandidatHendelseTag-DirEbrpn.js";import"./ChatExclamationmark-y3EdFamj.js";import"./FileXMark-BcmF-wlJ.js";import"./Trash-DDfway-W.js";import"./HandShakeHeart-BQJN1IXL.js";import"./Calendar-CA9P8KHZ.js";import"./ThumbUp-Cps_Sn-O.js";import"./ExclamationmarkTriangle-BBH31ES4.js";import"./Table-BOcKp25A.js";import"./index-BlPNPszT.js";import"./index-B40KJ5b4.js";import"./util-oaPuE8Fm.js";import"./useControllableState-CozOow6N.js";import"./Popover-Bzep_eZE.js";import"./floating-ui.react-DXBcDFUa.js";import"./Modal.context-Cyjgyz6B.js";import"./DismissableLayer-nY22yEH_.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Bmjur04w.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
