import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-9y18Ssu8.js";import{I,a as h,i as E}from"./InternStatusTag-OLiZ3tV4.js";import{u as y}from"./KandidatlisteContext-DUufdZz1.js";import{D as r}from"./Dropdown-aYJeMYYL.js";import{S as v}from"./Pencil-CNGDnXbW.js";import{w as u,c as V}from"./ContextDecorators-D6GDF6NN.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DrKdKGXB.js";import"./CircleSlash-DcmvZvI_.js";import"./XMarkOctagon-Bz-7r8Bx.js";import"./Reception-DJJLuIld.js";import"./SealCheckmark-MKsspaHd.js";import"./PersonChat-DwT_J-iR.js";import"./MagnifyingGlass-DoOrm5Uy.js";import"./OrganisasjonsnummerAlert-CLI_JLEl.js";import"./VStack-CReScaEF.js";import"./BasePrimitive-zryuTTx0.js";import"./Box-B2qmz5LI.js";import"./List-B87HwrzR.js";import"./Link-CsEgK7kv.js";import"./KandidatHendelseTag-s9EQi-CE.js";import"./ChatExclamationmark-BbDt_EiA.js";import"./FileXMark-BDqCBbSA.js";import"./Trash-Df_HNME-.js";import"./HandShakeHeart-BFwKgg0m.js";import"./Calendar-bxhdXwoQ.js";import"./ThumbUp-C7owMO3M.js";import"./ExclamationmarkTriangle-CxMevtua.js";import"./Table-C2hgNYb0.js";import"./dato-G81G8qMd.js";import"./format-CYyuaQK7.js";import"./en-US-BqXGko0a.js";import"./match-Dbok1h-_.js";import"./parseISO-Cvidxtvo.js";import"./parse-CrR1rErE.js";import"./getDefaultOptions-Bv-K6pOf.js";import"./isSameDay-CsSUTsd2.js";import"./index-CpS90Pn7.js";import"./index-CWbL8d4M.js";import"./util-BO8HyK-f.js";import"./useControllableState-B7HGaoNK.js";import"./Popover-DdJXH9vq.js";import"./floating-ui.react-DReJ0bXv.js";import"./Modal.context-C4_R1QvZ.js";import"./DismissableLayer-Dr9r_Rek.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
