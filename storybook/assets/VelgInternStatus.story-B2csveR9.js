import{ea as f,c9 as S,r as x,j as t,c as j,bP as s}from"./iframe-FHkBCfVU.js";import{I,a as h,i as E}from"./InternStatusTag-CAvjs7d_.js";import{u as y}from"./KandidatlisteContext-CBVuysWM.js";import{D as r}from"./Dropdown-k_DIBa5b.js";import{S as v}from"./Pencil-DTgTwUOy.js";import{w as m,c as V}from"./ContextDecorators-BZQgSSgT.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-B9dItanu.js";import"./CircleSlash-BgtCUYV5.js";import"./XMarkOctagon-Bxn-azHO.js";import"./Reception-DVY19QyZ.js";import"./SealCheckmark-C3SPKO6B.js";import"./PersonChat-CSjpsESo.js";import"./MagnifyingGlass-C-hz1lGx.js";import"./OrganisasjonsnummerAlert-sQEFORFl.js";import"./VStack-C2l0CBZp.js";import"./BasePrimitive-AqEGMIdf.js";import"./Box-Cx_R66cD.js";import"./List-DzFasrsC.js";import"./Link-glYRQlo0.js";import"./KandidatHendelseTag-Df4d563E.js";import"./ChatExclamationmark-BqaaBmvF.js";import"./FileXMark-BdimZ12H.js";import"./Trash-Cn7CUgoq.js";import"./HandShakeHeart-DKyPgZrc.js";import"./Calendar-Co3HCRrj.js";import"./ThumbUp-DmclQqxp.js";import"./ExclamationmarkTriangle-r7Yzqlf4.js";import"./Table-Bpn6wA5d.js";import"./index-BvMoKo9a.js";import"./index-CWbL8d4M.js";import"./util-D3vyYHyo.js";import"./useControllableState-C70irtDf.js";import"./Popover-DSD2MpLi.js";import"./floating-ui.react-CQO1Gy8D.js";import"./Modal.context-DfI42K82.js";import"./DismissableLayer-DAyJ5Ecl.js";const R=async(a,i,u)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:u})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:u})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:u||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const pt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>m(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>m(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>m(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
