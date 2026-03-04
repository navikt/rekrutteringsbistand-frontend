import{be as f,cm as S,r as x,j as t,c as j,c4 as s}from"./iframe-CC6VL7_i.js";import{I,a as h,i as E}from"./InternStatusTag-CNdrGfKm.js";import{u as y}from"./KandidatlisteContext-BRl1YiDg.js";import{D as r}from"./Dropdown-DUIc206Z.js";import{S as v}from"./Pencil-lSlUNaNz.js";import{w as u,c as V}from"./ContextDecorators-CUtVdeEf.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-Cx_gqqJG.js";import"./CircleSlash-CoVtBSnG.js";import"./XMarkOctagon-C2l2xGu9.js";import"./Reception-ZLRofjoF.js";import"./SealCheckmark-CXfA2tRr.js";import"./PersonChat-CqZ_hTV7.js";import"./MagnifyingGlass-CQkSgEkz.js";import"./OrganisasjonsnummerAlert-DRsKbQ3p.js";import"./VStack-JqhHne0b.js";import"./BasePrimitive-BAiSlWT1.js";import"./Box-TsO214b1.js";import"./List-BBgAeE9_.js";import"./Link-D1X3YaTk.js";import"./KandidatHendelseTag-Djt1Ib9t.js";import"./ChatExclamationmark-6ubbdgfO.js";import"./FileXMark-BHMJYhjp.js";import"./Trash-B24tHuwu.js";import"./HandShakeHeart-C-fpM3MJ.js";import"./Calendar-doAPuZb7.js";import"./ThumbUp-BLwrXsZ2.js";import"./ExclamationmarkTriangle-BqkFwsM0.js";import"./Table-DU3VfrlI.js";import"./dato-CbpBeoBb.js";import"./format-BifkSCbE.js";import"./getTimezoneOffsetInMilliseconds-WjsRqsAD.js";import"./match-D08DcZY-.js";import"./parseISO-CIljvHn6.js";import"./parse-D5c0wGwL.js";import"./getDefaultOptions-COXxqqSZ.js";import"./isSameDay-CC7ir-aX.js";import"./index-Ctdpazjt.js";import"./index-CWbL8d4M.js";import"./util-DBtYKr8r.js";import"./useControllableState-WjbrG42K.js";import"./Popover-ZuS0Qa9f.js";import"./floating-ui.react-098Ic5Zf.js";import"./Modal.context-B9dQfTWE.js";import"./DismissableLayer-CxyKYVhC.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
