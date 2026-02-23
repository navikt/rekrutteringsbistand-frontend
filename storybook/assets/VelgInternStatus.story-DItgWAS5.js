import{e2 as f,c6 as S,r as x,j as t,c as j,bM as s}from"./iframe-BcafLp1P.js";import{I,a as h,i as E}from"./InternStatusTag-CJ076wuC.js";import{u as y}from"./KandidatlisteContext-CGY16HKw.js";import{D as r}from"./Dropdown-COtr7l8p.js";import{S as v}from"./Pencil-CmJnTIvr.js";import{w as m,c as V}from"./ContextDecorators-D80o-Zvr.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-Dv6zkSQ9.js";import"./CircleSlash-C8bVsBvr.js";import"./XMarkOctagon-CZHRvIqX.js";import"./Reception-BffuCrnn.js";import"./SealCheckmark-C76t34mg.js";import"./PersonChat-4RZ44o_Z.js";import"./MagnifyingGlass-T7NmSUzg.js";import"./OrganisasjonsnummerAlert-t2yePXnP.js";import"./VStack-BUYffyo0.js";import"./BasePrimitive-Cu0275kf.js";import"./Box-xMHjpoe3.js";import"./List-DwnSYGzg.js";import"./Link-C1BCDRkt.js";import"./KandidatHendelseTag-CVkbCg1g.js";import"./ChatExclamationmark-kWyARzrM.js";import"./FileXMark-BI0ZAUr1.js";import"./Trash--x60bOrt.js";import"./HandShakeHeart-DQrVkoWy.js";import"./Calendar-DrETUeCk.js";import"./ThumbUp-Cu_3J7Cj.js";import"./ExclamationmarkTriangle-Duk46aag.js";import"./Table-Q-vYZ7yy.js";import"./index-C-IARwxn.js";import"./index-B40KJ5b4.js";import"./util-B2_wk1ag.js";import"./useControllableState-B1nYmOK4.js";import"./Popover-B1sKhYVD.js";import"./floating-ui.react-pOYmEKUR.js";import"./Modal.context-DBs681lM.js";import"./DismissableLayer-BGB0hYDt.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CKRhGgNk.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
