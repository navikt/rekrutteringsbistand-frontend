import{bh as f,co as S,r as x,j as t,a as j,c6 as s}from"./iframe-BPSD_YT1.js";import{I,a as h,i as E}from"./InternStatusTag-CCnYcNgd.js";import{u as y}from"./KandidatlisteContext-CWv2XNbQ.js";import{D as r}from"./Dropdown-lqtpRVcX.js";import{S as v}from"./Pencil-DundG2E5.js";import{w as u,c as V}from"./ContextDecorators-y4hijMIi.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-Z_hb8F6K.js";import"./CircleSlash-JGECxQoI.js";import"./XMarkOctagon-DOrd1yw_.js";import"./Reception-KJBv6Msn.js";import"./SealCheckmark-DV83Qq23.js";import"./PersonChat-jOBT2E9K.js";import"./MagnifyingGlass-DUc4lcOL.js";import"./OrganisasjonsnummerAlert-DBPOxU3O.js";import"./VStack-C67QtXfD.js";import"./BasePrimitive-8nTlBWV_.js";import"./Box-CMQLBGtp.js";import"./List-CG-AmWBZ.js";import"./Link-9DcEu_Or.js";import"./KandidatHendelseTag-BA8Xq8oU.js";import"./ChatExclamationmark-OKMhT7nK.js";import"./FileXMark-zEZJwxZh.js";import"./Trash-C41qzD3M.js";import"./HandShakeHeart-stKjGjIo.js";import"./Calendar-Blqonz_6.js";import"./ThumbUp-ByRZjHBD.js";import"./ExclamationmarkTriangle-CXzaFuJ-.js";import"./Table-Cj6PKC90.js";import"./dato-BAVnjlbJ.js";import"./format-D-YFd6ny.js";import"./getTimezoneOffsetInMilliseconds-DQEVRmlI.js";import"./match-BuiY2TPh.js";import"./parseISO-BOW4UQTL.js";import"./parse-NK1nM1gG.js";import"./getDefaultOptions-C9er2TTU.js";import"./isSameDay-DbD_TQR0.js";import"./index-CGIfqvc0.js";import"./index-CWbL8d4M.js";import"./util-u9UCHBPY.js";import"./useControllableState-_KJ3yXDg.js";import"./Popover-Db1minLV.js";import"./floating-ui.react-D5gzGk-9.js";import"./Modal.context-DvEzp0QD.js";import"./DismissableLayer-5YKXKYJX.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
