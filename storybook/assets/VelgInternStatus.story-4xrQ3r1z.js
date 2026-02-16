import{d$ as f,c3 as S,r as x,j as t,c as j,bJ as s}from"./iframe-BIgN2dy8.js";import{I,a as h,i as E}from"./InternStatusTag-C4FWLYKD.js";import{u as y}from"./KandidatlisteContext-C62q-dVM.js";import{D as r}from"./Dropdown-DmgaxF4u.js";import{S as v}from"./Pencil-C956sDgU.js";import{w as m,c as V}from"./ContextDecorators-DnXsTUK9.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-UZn2eOFN.js";import"./CircleSlash-BjHN5t4z.js";import"./XMarkOctagon-DbGWIGN5.js";import"./Reception-CpHXEDWU.js";import"./SealCheckmark-C-L12z5x.js";import"./PersonChat-2GM6TrCb.js";import"./MagnifyingGlass-BDvzQ4wV.js";import"./OrganisasjonsnummerAlert-CfKtz4Dx.js";import"./VStack-BPjplv7Q.js";import"./BasePrimitive-BWKQEkUf.js";import"./Box-BHlQkMbP.js";import"./List-CWJ1uZ9h.js";import"./Link-DEKv3d9-.js";import"./KandidatHendelseTag-BIk2S_cj.js";import"./ChatExclamationmark-DzPRhjAg.js";import"./FileXMark-BrGCmu_I.js";import"./Trash-DeuBW4Zd.js";import"./HandShakeHeart-DwC4-YwP.js";import"./Calendar-D-bXASkh.js";import"./ThumbUp-BaYT_7xI.js";import"./ExclamationmarkTriangle-DcKgygPL.js";import"./Table-05jR4kq2.js";import"./index-BQFx-lDr.js";import"./index-B40KJ5b4.js";import"./util-BgV6oLwy.js";import"./useControllableState-DzgKsUeQ.js";import"./Popover-C_XRVh-U.js";import"./floating-ui.react-RC9XADmG.js";import"./Modal.context-BZdBJRXP.js";import"./DismissableLayer-DYMooN7A.js";import"./owner-Cl3CaANg.js";import"./useClientLayoutEffect-CZ8hWwJn.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
