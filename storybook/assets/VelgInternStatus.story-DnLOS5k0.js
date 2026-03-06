import{bh as f,co as S,r as x,j as t,a as j,c6 as s}from"./iframe-BDkGlu2A.js";import{I,a as h,i as E}from"./InternStatusTag--lbx8Anu.js";import{u as y}from"./KandidatlisteContext-Co5n97FX.js";import{D as r}from"./Dropdown-B1gz6mHE.js";import{S as v}from"./Pencil-CSCxrOVE.js";import{w as u,c as V}from"./ContextDecorators-B4PTfL0e.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-PZgmnfu9.js";import"./CircleSlash-CQ-_-LbK.js";import"./XMarkOctagon-Dv68dnol.js";import"./Reception-BcnkPzfc.js";import"./SealCheckmark-BOwdGOpD.js";import"./PersonChat-9hvNm-MO.js";import"./MagnifyingGlass-DhZoWWTy.js";import"./OrganisasjonsnummerAlert-MZvK8bEV.js";import"./VStack-DmbEZUe6.js";import"./BasePrimitive-BKHuKnFY.js";import"./Box-BPw0V6Fr.js";import"./List-BdwSeizn.js";import"./Link-Dzd4imFl.js";import"./KandidatHendelseTag-DLuEFraq.js";import"./ChatExclamationmark-UbCAJQZc.js";import"./FileXMark-B70j__7y.js";import"./Trash-vgJESm9p.js";import"./HandShakeHeart-n6A9Pp2R.js";import"./Calendar-DUJ3wHmA.js";import"./ThumbUp-DkC_SHsq.js";import"./ExclamationmarkTriangle-CzcnWQ2X.js";import"./Table-XtrGrhbx.js";import"./dato-Bw5hcYdr.js";import"./format-DOnqlv3Z.js";import"./getTimezoneOffsetInMilliseconds-B2lAfqmU.js";import"./match-H4nwVkoz.js";import"./parseISO-iW_-10Ww.js";import"./parse-DO6xBU5X.js";import"./getDefaultOptions-DaalUCUF.js";import"./isSameDay-CqMX9KMb.js";import"./index-Bn-4SKiA.js";import"./index-CWbL8d4M.js";import"./util-BUULX9Gg.js";import"./useControllableState-SFUimoeF.js";import"./Popover-arpT0mDC.js";import"./floating-ui.react-BSApgiA0.js";import"./Modal.context-DYSmtGyK.js";import"./DismissableLayer-D0OULu_n.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
