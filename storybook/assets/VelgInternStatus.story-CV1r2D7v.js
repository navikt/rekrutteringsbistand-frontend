import{bh as f,co as S,r as x,j as t,a as j,c6 as s}from"./iframe-_cKBTLnw.js";import{I,a as h,i as E}from"./InternStatusTag-CtKymGJC.js";import{u as y}from"./KandidatlisteContext-C0leyilK.js";import{D as r}from"./Dropdown-DlE2u5r4.js";import{S as v}from"./Pencil-BVLjskO6.js";import{w as u,c as V}from"./ContextDecorators-C3Isupwo.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-D4kabPfr.js";import"./CircleSlash-CLRfUYNY.js";import"./XMarkOctagon-CzZgrNBP.js";import"./Reception-DGHy1NIF.js";import"./SealCheckmark-dvKOh7Im.js";import"./PersonChat-D2pBXiai.js";import"./MagnifyingGlass-CLxkyy4n.js";import"./OrganisasjonsnummerAlert-gteE0JkH.js";import"./VStack-BtbW7w57.js";import"./BasePrimitive-C5jwIYOF.js";import"./Box-DvTYyxHp.js";import"./List-DWt7NmUM.js";import"./Link-zB-Lhc-F.js";import"./KandidatHendelseTag-Dz1xBEV8.js";import"./ChatExclamationmark-CRCmR7vL.js";import"./FileXMark-DzkbVzxK.js";import"./Trash-tcnp0hgy.js";import"./HandShakeHeart-BNVPUKoX.js";import"./Calendar-Dfwht0_c.js";import"./ThumbUp-D5gCLZ-x.js";import"./ExclamationmarkTriangle-CED4CJLM.js";import"./Table-thjYa1jp.js";import"./dato-BtRV7oEY.js";import"./format-D0HpuGDJ.js";import"./getTimezoneOffsetInMilliseconds-DSQFW4v8.js";import"./match-CGt28Yrq.js";import"./parseISO-C5QHaKFY.js";import"./parse-p_9Fxx5z.js";import"./getDefaultOptions-kvERS8Mm.js";import"./isSameDay-CoqLCJxk.js";import"./index-zvKbqp8n.js";import"./index-CWbL8d4M.js";import"./util-FFbot6Rn.js";import"./useControllableState-DuwAMkuq.js";import"./Popover-DdNnqZ80.js";import"./floating-ui.react-Cdc_p7Sm.js";import"./Modal.context-DgbU6aMT.js";import"./DismissableLayer-DQElNf2B.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
