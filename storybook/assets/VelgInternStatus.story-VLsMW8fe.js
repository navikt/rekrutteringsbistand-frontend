import{be as f,cm as S,r as x,j as t,c as j,c4 as s}from"./iframe-BrRRy87W.js";import{I,a as h,i as E}from"./InternStatusTag-DXCU5tTr.js";import{u as y}from"./KandidatlisteContext-Bx066WUy.js";import{D as r}from"./Dropdown-C6KPdaQQ.js";import{S as v}from"./Pencil-CnZWkh6M.js";import{w as u,c as V}from"./ContextDecorators-DL3WxG4-.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-D_3Ry31M.js";import"./CircleSlash-DIYAhrPD.js";import"./XMarkOctagon-xMHnRWXy.js";import"./Reception-CtGpWgCj.js";import"./SealCheckmark-72TTh6qJ.js";import"./PersonChat-CJXpJBBP.js";import"./MagnifyingGlass-Ckj12H5h.js";import"./OrganisasjonsnummerAlert-B7QDgbF8.js";import"./VStack-CgfmCG0c.js";import"./BasePrimitive-YQMHy7Np.js";import"./Box-C-uC0ruS.js";import"./List-gUQSEGNL.js";import"./Link-Ch6xHdZZ.js";import"./KandidatHendelseTag-DKSMfzI5.js";import"./ChatExclamationmark-dDuaQ_nl.js";import"./FileXMark-CCMOk04x.js";import"./Trash-B8waw_3B.js";import"./HandShakeHeart-jSUtcbqz.js";import"./Calendar-ItQ8uwze.js";import"./ThumbUp-CoYl0ohr.js";import"./ExclamationmarkTriangle-Chn-Fh0a.js";import"./Table-CBesBuVr.js";import"./dato-BmL0gDVE.js";import"./format-BhK7W3zi.js";import"./getTimezoneOffsetInMilliseconds-Bh9fIElG.js";import"./match-CKM5Xknp.js";import"./parseISO-CIRKoOMJ.js";import"./parse-DU8IMmvF.js";import"./getDefaultOptions-Cd6CUs11.js";import"./isSameDay-CHqErPY1.js";import"./index-vOxTa9hK.js";import"./index-CWbL8d4M.js";import"./util-CfPp7DTt.js";import"./useControllableState-BA6ifFhK.js";import"./Popover-CzB2-StR.js";import"./floating-ui.react-5tgXbmM2.js";import"./Modal.context-Bwo_Hchg.js";import"./DismissableLayer-BuYleBYY.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
