import{e8 as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-6grgfNuj.js";import{I,a as h,i as E}from"./InternStatusTag-BzaIn7XK.js";import{u as y}from"./KandidatlisteContext-BFjEZzBr.js";import{D as r}from"./Dropdown-LC2GdTkA.js";import{S as v}from"./Pencil-BSmFAot-.js";import{w as m,c as V}from"./ContextDecorators-CppZTJjG.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BIKce9wR.js";import"./CircleSlash-BX8tCQvO.js";import"./XMarkOctagon-4olxtocJ.js";import"./Reception-1shRHHXO.js";import"./SealCheckmark-C9O5SAvd.js";import"./PersonChat-3B7W3S8q.js";import"./MagnifyingGlass-CZFLFMAJ.js";import"./OrganisasjonsnummerAlert-DsfkeHa-.js";import"./VStack-CTB3Y52A.js";import"./BasePrimitive-DR-aDBsu.js";import"./Box-CK2Li0_5.js";import"./List-CM4ShwvY.js";import"./Link-BRwCl624.js";import"./KandidatHendelseTag-TZUBJy0X.js";import"./ChatExclamationmark-DPtL5bGC.js";import"./FileXMark-D3Tr9pSa.js";import"./Trash-TGNXr0wn.js";import"./HandShakeHeart-C4xjHM94.js";import"./Calendar-DaTFZjkE.js";import"./ThumbUp-DATi4Mtr.js";import"./ExclamationmarkTriangle-oc4PZQJc.js";import"./Table-hjJr4_8A.js";import"./index-DSAtEe8m.js";import"./index-CWbL8d4M.js";import"./util-C11T6ZGq.js";import"./useControllableState-BuBm39MZ.js";import"./Popover-CnmNvQ6Q.js";import"./floating-ui.react-9CfipS2k.js";import"./Modal.context-BR8CsQUC.js";import"./DismissableLayer-B5InjWix.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};export{l as FlereStatuser,o as LukketListe,d as Vurderes,pt as default};
