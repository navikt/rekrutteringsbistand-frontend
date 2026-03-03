import{be as f,cm as S,r as x,j as t,c as j,c4 as s}from"./iframe-DFtwoTh_.js";import{I,a as h,i as E}from"./InternStatusTag-B91rRucD.js";import{u as y}from"./KandidatlisteContext-BVZFb7qF.js";import{D as r}from"./Dropdown-DkqEt1-N.js";import{S as v}from"./Pencil-vKpl7Qk5.js";import{w as u,c as V}from"./ContextDecorators-6jVGRUOm.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-BIOIosZZ.js";import"./CircleSlash-CpFDsPC4.js";import"./XMarkOctagon-DRA_DawE.js";import"./Reception-B4DalNiz.js";import"./SealCheckmark-DtNMfc-_.js";import"./PersonChat-D5p6JWyq.js";import"./MagnifyingGlass-DoaBZcvu.js";import"./OrganisasjonsnummerAlert-DYmCj9GK.js";import"./VStack-BXRFfnuf.js";import"./BasePrimitive-CDiUHIiY.js";import"./Box-BdthdfsJ.js";import"./List-gA8PGlEK.js";import"./Link-DHYtyBSS.js";import"./KandidatHendelseTag-CqvSDl7X.js";import"./ChatExclamationmark-CcOau3A-.js";import"./FileXMark-CHULUM4y.js";import"./Trash-B_Y4964l.js";import"./HandShakeHeart-jbq6MMqz.js";import"./Calendar-Cvtr8Wg5.js";import"./ThumbUp-BxTfKIw1.js";import"./ExclamationmarkTriangle-CL_LvRko.js";import"./Table-B43CwJIp.js";import"./dato-fXzLlyUY.js";import"./format-CfcYpSTP.js";import"./getTimezoneOffsetInMilliseconds-BBE5HC6h.js";import"./match-C6Ty43v9.js";import"./parseISO-B97Io5Ji.js";import"./parse-pScTYrPT.js";import"./getDefaultOptions-CV-Qyq1F.js";import"./isSameDay-BlXFn6_m.js";import"./index-uWxY8Wir.js";import"./index-CWbL8d4M.js";import"./util-BzTF6oNQ.js";import"./useControllableState-b9V7-pUK.js";import"./Popover-CcT1ofdB.js";import"./floating-ui.react-BeotM2gb.js";import"./Modal.context-BnWAHEQc.js";import"./DismissableLayer-WJLu7NM2.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
