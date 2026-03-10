import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-dQW9Z_zk.js";import{I,a as h,i as E}from"./InternStatusTag-MP4gCTxL.js";import{u as y}from"./KandidatlisteContext-CJYLD__z.js";import{D as r}from"./Dropdown-CnMH5PFk.js";import{S as v}from"./Pencil-BhB0auu6.js";import{w as u,c as V}from"./ContextDecorators-mz1pxptJ.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag-DhNgZu5O.js";import"./CircleSlash-BJBk-U6g.js";import"./XMarkOctagon-CSDuIOTX.js";import"./Reception-BaYYyDSx.js";import"./SealCheckmark-DBSRLJIv.js";import"./PersonChat-DcXMK9nC.js";import"./MagnifyingGlass-Bl3ugM0u.js";import"./OrganisasjonsnummerAlert-CYSlUhLZ.js";import"./VStack-5Cn0xXnD.js";import"./BasePrimitive-G6oXtLOj.js";import"./Box-otEQFjft.js";import"./List-0QRq-QCa.js";import"./Link-DFXDk8av.js";import"./KandidatHendelseTag-xkEb6fKi.js";import"./ChatExclamationmark-BhwYKFhb.js";import"./FileXMark-BKriksVs.js";import"./Trash-C0rAx-3K.js";import"./HandShakeHeart-CUbYMZF2.js";import"./Calendar-BbntDJCE.js";import"./ThumbUp-BMpVVZL2.js";import"./ExclamationmarkTriangle-BqI9Lc0z.js";import"./Table-OzJdcQ2O.js";import"./dato-6QacYvdF.js";import"./format-Ci1biztN.js";import"./en-US-CEt_ID-_.js";import"./match-PiNg2qZ7.js";import"./parseISO-DYSaaqBK.js";import"./parse-C3XDkwLd.js";import"./getDefaultOptions-BwmOte06.js";import"./isSameDay-Cj5NnS7e.js";import"./index-CVBl4lzb.js";import"./index-CWbL8d4M.js";import"./util-Cw-1L6iA.js";import"./useControllableState-BaYeSWn8.js";import"./Popover-Bah7kS58.js";import"./floating-ui.react-CbnLySmp.js";import"./Modal.context-EZhP1nV5.js";import"./DismissableLayer-D1nM_yGb.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
