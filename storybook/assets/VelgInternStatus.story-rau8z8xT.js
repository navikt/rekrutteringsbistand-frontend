import{e2 as f,c6 as S,r as x,j as t,c as j,bM as s}from"./iframe-ClMyIzST.js";import{I,a as h,i as E}from"./InternStatusTag-Dq4V1z4b.js";import{u as y}from"./KandidatlisteContext-oGGvfWDy.js";import{D as r}from"./Dropdown-CcU0CbuD.js";import{S as v}from"./Pencil-Dqtw6oYt.js";import{w as m,c as V}from"./ContextDecorators-CTg61soK.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-CH04uOtr.js";import"./CircleSlash-kWqFz6qh.js";import"./XMarkOctagon-mMtrn3Cm.js";import"./Reception-Cpx4NBL0.js";import"./SealCheckmark-ZW26c6pF.js";import"./PersonChat-MCd58-bk.js";import"./MagnifyingGlass-VsrPN9OA.js";import"./OrganisasjonsnummerAlert-C_-rEhpK.js";import"./VStack-CCWlmw28.js";import"./BasePrimitive-DhBovoNH.js";import"./Box-C7JaK5c2.js";import"./List-DccLa0y-.js";import"./Link-DlUtuUu5.js";import"./KandidatHendelseTag-CWYx2-f5.js";import"./ChatExclamationmark-BYp9JkNG.js";import"./FileXMark-By0-S9LU.js";import"./Trash-DczEwQwH.js";import"./HandShakeHeart-By1KTdau.js";import"./Calendar-n4_puD3I.js";import"./ThumbUp-BVNP6fyD.js";import"./ExclamationmarkTriangle-DisTa6wr.js";import"./Table-BqJavzdr.js";import"./index-BCNfeqSF.js";import"./index-B40KJ5b4.js";import"./util-B3hQ8lNg.js";import"./useControllableState-HyX2mBFK.js";import"./Popover-Db3xP1Ha.js";import"./floating-ui.react-Ce6F3Lq8.js";import"./Modal.context-D2E0iDkv.js";import"./DismissableLayer-DzkdpLc-.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-QdHMCz4D.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
