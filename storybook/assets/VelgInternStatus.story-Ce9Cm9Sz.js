import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-B9EIERAQ.js";import{I,a as h,i as E}from"./InternStatusTag-CjlR-lP1.js";import{u as y}from"./KandidatlisteContext-B3uABJSX.js";import{D as r}from"./Dropdown-C1IFs_rT.js";import{S as v}from"./Pencil-CPjjmDMA.js";import{w as u,c as V}from"./ContextDecorators-CRQo1Evu.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DIDn8Nt2.js";import"./CircleSlash-iY1LEKrv.js";import"./XMarkOctagon-DHLnmYqK.js";import"./Reception-01CVxBB6.js";import"./SealCheckmark-BRkETniP.js";import"./PersonChat-BT3pUO2D.js";import"./MagnifyingGlass-CUFgn1Ok.js";import"./OrganisasjonsnummerAlert-CR-TCWdO.js";import"./VStack-Dy4xRJaM.js";import"./BasePrimitive-okBwE8Ge.js";import"./Box-ByLIj58o.js";import"./List-C3lxDxOD.js";import"./Link-DmJvsI4e.js";import"./KandidatHendelseTag-ByIjOx-o.js";import"./ChatExclamationmark-BTFjrLKH.js";import"./FileXMark-BToMMGE1.js";import"./Trash-DAldqpgv.js";import"./HandShakeHeart-B01ivSUL.js";import"./Calendar-BjKd7Qze.js";import"./ThumbUp-DijIWXld.js";import"./ExclamationmarkTriangle-CoHKIESC.js";import"./Table-C3HmYiSq.js";import"./dato-BM2vGqf6.js";import"./format-DmSMY60N.js";import"./en-US-5rbPq74o.js";import"./match-BNzN7Mxu.js";import"./parseISO-CaTi8wH-.js";import"./parse-rS6AgNhC.js";import"./getDefaultOptions-9vdk47zt.js";import"./isSameDay-C7GJG5VT.js";import"./index-DHP1TQEp.js";import"./index-CWbL8d4M.js";import"./util-CxacG2RW.js";import"./useControllableState-UfBjBAk3.js";import"./Popover-DyVoyflr.js";import"./floating-ui.react-BoG6eMh5.js";import"./Modal.context-BLDLPEvc.js";import"./DismissableLayer-CXLcXTCV.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};export{l as FlereStatuser,o as LukketListe,d as Vurderes,jt as default};
