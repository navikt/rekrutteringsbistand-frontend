import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-BZVnfrYv.js";import{I,a as h,i as E}from"./InternStatusTag-CMPWjBcg.js";import{u as y}from"./KandidatlisteContext-CprgBpgy.js";import{D as r}from"./Dropdown-BU6OZKKt.js";import{S as v}from"./Pencil-D0QolvGc.js";import{w as u,c as V}from"./ContextDecorators-D-N7kVHb.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DVH-2L1c.js";import"./CircleSlash-D9hpoYxP.js";import"./XMarkOctagon-s1NGg3tE.js";import"./Reception-BTH6gXQx.js";import"./SealCheckmark-CPenCXLy.js";import"./PersonChat-OZ5L6uAC.js";import"./MagnifyingGlass-BGxTIOL-.js";import"./OrganisasjonsnummerAlert-YeZhsJNc.js";import"./VStack-DRl8vrOc.js";import"./BasePrimitive-e3pbX_Cv.js";import"./Box-DlstKKvA.js";import"./List-DR3ji4ww.js";import"./Link-BccQ5OtO.js";import"./KandidatHendelseTag-DMRZiYfP.js";import"./ChatExclamationmark-DlqHd3jQ.js";import"./FileXMark-DTWtn4i7.js";import"./Trash-Wy95G7FD.js";import"./HandShakeHeart-6U4EeBLh.js";import"./Calendar-GHjKS8cp.js";import"./ThumbUp-NB_Ue0Uc.js";import"./ExclamationmarkTriangle-BUyqgGYk.js";import"./Table-DG68d3NJ.js";import"./dato-DGRfIYWU.js";import"./format-D0OOekqm.js";import"./en-US-CcvIPWQU.js";import"./match-DFPR2ZC7.js";import"./parseISO-CADi8uXe.js";import"./parse-D5-LkPQY.js";import"./getDefaultOptions-z7q4JSD4.js";import"./isSameDay-Dng7j_kr.js";import"./index-D6axwwO9.js";import"./index-CWbL8d4M.js";import"./util-CA_G4S8e.js";import"./useControllableState-4LOe-ma9.js";import"./Popover-LXumDPyY.js";import"./floating-ui.react-CRYv7j3Z.js";import"./Modal.context-DdxXfQQV.js";import"./DismissableLayer-5Vs7lMa5.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
