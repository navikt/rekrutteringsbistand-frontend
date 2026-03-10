import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-Clr6_eiR.js";import{I,a as h,i as E}from"./InternStatusTag-DaA6JK9K.js";import{u as y}from"./KandidatlisteContext-C8HhexAH.js";import{D as r}from"./Dropdown-CfcsTk3r.js";import{S as v}from"./Pencil-Bo8mzldQ.js";import{w as u,c as V}from"./ContextDecorators-BN7aHSuw.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DR5-8C-T.js";import"./CircleSlash-DYLNM7-s.js";import"./XMarkOctagon-D064Fxqq.js";import"./Reception-C2gM3svC.js";import"./SealCheckmark-Da4GoaEe.js";import"./PersonChat-B6wKsYEo.js";import"./MagnifyingGlass-Bkkl5Shm.js";import"./OrganisasjonsnummerAlert-DO7LUPOp.js";import"./VStack-CPx6I1hW.js";import"./BasePrimitive-CxRpgxE9.js";import"./Box-SVuIPcF3.js";import"./List-CtEOe7Hr.js";import"./Link-gfPk5w1O.js";import"./KandidatHendelseTag-i-E-ISRt.js";import"./ChatExclamationmark-BUh9bjuX.js";import"./FileXMark-CdDeP6if.js";import"./Trash-sBr1pDGc.js";import"./HandShakeHeart-BlpbBj5N.js";import"./Calendar-Cih3J-RN.js";import"./ThumbUp-_O2hsjnq.js";import"./ExclamationmarkTriangle--Nxi2gUP.js";import"./Table-CwK8tj6h.js";import"./dato-XZ6L-0PL.js";import"./format-CBz984WZ.js";import"./en-US-DqCJgRqo.js";import"./match-DybUA87c.js";import"./parseISO-CtQ5RE6R.js";import"./parse-C6dx_wHF.js";import"./getDefaultOptions-CTp-PeE4.js";import"./isSameDay-BPFxric3.js";import"./index-DZl7TAVY.js";import"./index-CWbL8d4M.js";import"./util-B2S2G6ZN.js";import"./useControllableState-COWj_ZN-.js";import"./Popover-GV-jBxQO.js";import"./floating-ui.react-D_cR4aCz.js";import"./Modal.context-D3d_p7y-.js";import"./DismissableLayer-CSQxb-ww.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
