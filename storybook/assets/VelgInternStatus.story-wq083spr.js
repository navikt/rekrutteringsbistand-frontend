import{eb as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-CeMepOlr.js";import{I,a as h,i as E}from"./InternStatusTag-BJPZdogf.js";import{u as y}from"./KandidatlisteContext-C9AWXuLp.js";import{D as r}from"./Dropdown-BLXEr4gE.js";import{S as v}from"./Pencil-kTi1zvR9.js";import{w as m,c as V}from"./ContextDecorators-CRMBCi0g.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-C3eNjb8Z.js";import"./CircleSlash-8jJJmXe3.js";import"./XMarkOctagon-CDP9_ym4.js";import"./Reception-jbEvNPae.js";import"./SealCheckmark-xr5zsDDA.js";import"./PersonChat-C7SR0WXQ.js";import"./MagnifyingGlass-BKKrrzDk.js";import"./OrganisasjonsnummerAlert-BNzAZK2T.js";import"./VStack-Bf7_wlp6.js";import"./BasePrimitive-DMMQw_JA.js";import"./Box-4zIiotVL.js";import"./List-7xQPIt_g.js";import"./Link-DRVVOdn0.js";import"./KandidatHendelseTag-DmasyJpX.js";import"./ChatExclamationmark-DVD2Zl5K.js";import"./FileXMark-jK1tQ1Dk.js";import"./Trash-dPYMChoi.js";import"./HandShakeHeart-Ck_S5Irb.js";import"./Calendar-DtB2lXzt.js";import"./ThumbUp-DKnaihwy.js";import"./ExclamationmarkTriangle-BF_HyOX8.js";import"./Table-s_OdHfiB.js";import"./index-B-NKUlDt.js";import"./index-CWbL8d4M.js";import"./util-vYUnaJjq.js";import"./useControllableState-Crc-rsnR.js";import"./Popover-C0RgLZrx.js";import"./floating-ui.react-cX7ZYnOt.js";import"./Modal.context-BBPtWxoG.js";import"./DismissableLayer-CliU41Ny.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},b=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:b.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
