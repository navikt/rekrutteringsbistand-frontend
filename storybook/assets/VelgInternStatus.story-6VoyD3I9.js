import{d$ as f,c3 as S,r as x,j as t,c as j,bJ as s}from"./iframe-Bl6ayYNX.js";import{I,a as h,i as E}from"./InternStatusTag-Ch8CZlt8.js";import{u as y}from"./KandidatlisteContext-BT7YG90M.js";import{D as r}from"./Dropdown-DH8IdPzr.js";import{S as v}from"./Pencil-DILD1lFY.js";import{w as m,c as V}from"./ContextDecorators-80g8Unov.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-Boi_htjO.js";import"./CircleSlash-CztbaNRH.js";import"./XMarkOctagon-B2UaSY63.js";import"./Reception-CgdKNAW4.js";import"./SealCheckmark-_F0Ej7Cs.js";import"./PersonChat-59tC9SHK.js";import"./MagnifyingGlass-C2b2AI_l.js";import"./OrganisasjonsnummerAlert-Bik6-JYn.js";import"./VStack-CA2QhmkG.js";import"./BasePrimitive-D0grWxJZ.js";import"./Box-0sLJeGaP.js";import"./List-auM7tRHU.js";import"./Link-DEishlH_.js";import"./KandidatHendelseTag-0PkozSXb.js";import"./ChatExclamationmark-BobvnP0I.js";import"./FileXMark-D4fNmJgc.js";import"./Trash-unLryNgO.js";import"./HandShakeHeart-nGR3n6oX.js";import"./Calendar-CKxz3_L5.js";import"./ThumbUp-BxrMO-Ff.js";import"./ExclamationmarkTriangle-DSpXpKdr.js";import"./Table-DwbONn7s.js";import"./index-CV8msX1I.js";import"./index-B40KJ5b4.js";import"./util-CZV-I1Pz.js";import"./useControllableState-CWh0NMBF.js";import"./Popover-C9mGiR_C.js";import"./floating-ui.react-CMAez5G4.js";import"./Modal.context-DXDsLaYB.js";import"./DismissableLayer-CdKLlNKO.js";import"./owner-Cl3CaANg.js";import"./useClientLayoutEffect-C9jJEFvX.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
