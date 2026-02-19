import{e2 as f,c6 as S,r as x,j as t,c as j,bM as s}from"./iframe-DSUVO1db.js";import{I,a as h,i as E}from"./InternStatusTag-DjPyR19L.js";import{u as y}from"./KandidatlisteContext-B3z-Rlqv.js";import{D as r}from"./Dropdown-BH6pkWje.js";import{S as v}from"./Pencil-DPQDpq8f.js";import{w as m,c as V}from"./ContextDecorators-Dy-nwR2v.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DOqfPotY.js";import"./CircleSlash-p2EEtGy_.js";import"./XMarkOctagon-BXi_wbr4.js";import"./Reception-Cz9c287Z.js";import"./SealCheckmark-D5E-YeUV.js";import"./PersonChat-Bu_H-scS.js";import"./MagnifyingGlass-Ch3ZZNTF.js";import"./OrganisasjonsnummerAlert-BdVa-zDv.js";import"./VStack-Dxa2ykuQ.js";import"./BasePrimitive-Cd9npuWI.js";import"./Box-InfC8s2B.js";import"./List-D_1txQZ1.js";import"./Link-DTGJsR9W.js";import"./KandidatHendelseTag-kk3lKhbZ.js";import"./ChatExclamationmark-5-3cSAq3.js";import"./FileXMark-BD9yt7V1.js";import"./Trash-DvPYmWaC.js";import"./HandShakeHeart-uH00FJw3.js";import"./Calendar-Bt1zfgSm.js";import"./ThumbUp-C-ipizhB.js";import"./ExclamationmarkTriangle-Chg4wcZD.js";import"./Table-uio_zPLq.js";import"./index-DtWzaQSg.js";import"./index-B40KJ5b4.js";import"./util-DAFQcwBC.js";import"./useControllableState-CRyIFUSe.js";import"./Popover-BJ6FJyKP.js";import"./floating-ui.react-Dms8S2Hr.js";import"./Modal.context-Cln_0uc1.js";import"./DismissableLayer-C8GykZcW.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BWijcyp9.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
