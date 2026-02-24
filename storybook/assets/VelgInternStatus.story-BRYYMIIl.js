import{e2 as f,c6 as S,r as x,j as t,c as j,bM as s}from"./iframe-lXod11Sv.js";import{I,a as h,i as E}from"./InternStatusTag-CGjyU6fK.js";import{u as y}from"./KandidatlisteContext-4diR-jMI.js";import{D as r}from"./Dropdown-Rd56aqnz.js";import{S as v}from"./Pencil-NEJQa_h5.js";import{w as m,c as V}from"./ContextDecorators-CJ36Ig-T.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DN2M0MRu.js";import"./CircleSlash-Ch-oeF8J.js";import"./XMarkOctagon-CyCdd07d.js";import"./Reception-DV245b8-.js";import"./SealCheckmark-CtMT3Ynq.js";import"./PersonChat-CLKRcrui.js";import"./MagnifyingGlass-D1BmSpJU.js";import"./OrganisasjonsnummerAlert-Dlr7MwJJ.js";import"./VStack-DAwc_0ue.js";import"./BasePrimitive-ByOs4gr-.js";import"./Box-4m2HeBex.js";import"./List-oV3WafVY.js";import"./Link-Cr-Gd9h1.js";import"./KandidatHendelseTag-Jwpufq8X.js";import"./ChatExclamationmark-wqPXtHZ6.js";import"./FileXMark-BX3-txRm.js";import"./Trash-acfX7XoS.js";import"./HandShakeHeart-CwcS-b4L.js";import"./Calendar-CJL4dQ4A.js";import"./ThumbUp-C1T-4xnl.js";import"./ExclamationmarkTriangle-2NGkG3xT.js";import"./Table-DboZdKYO.js";import"./index-BFbI1gfX.js";import"./index-B40KJ5b4.js";import"./util-DmE3tY_K.js";import"./useControllableState-C7hOL0Vl.js";import"./Popover-DloUPreg.js";import"./floating-ui.react-1p7fdfVe.js";import"./Modal.context-CWktOTbF.js";import"./DismissableLayer-B2oOyXG2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-jxoLsiga.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const kt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
