import{bh as f,cp as S,r as x,j as t,a as j,c7 as s}from"./iframe-Cngrpa0B.js";import{I,a as h,i as E}from"./InternStatusTag-CP0X314I.js";import{u as y}from"./KandidatlisteContext-CNVADSCp.js";import{D as r}from"./Dropdown-Di58Cj59.js";import{S as v}from"./Pencil-Bvdz-2Qa.js";import{w as u,c as V}from"./ContextDecorators-CvBekZFU.js";import"./preload-helper-PPVm8Dsz.js";import"./Tag--IBSZNj-.js";import"./CircleSlash-Dptc3osP.js";import"./XMarkOctagon-DaNXsWpQ.js";import"./Reception-CnYxGMfC.js";import"./SealCheckmark-DuHxoDt2.js";import"./PersonChat-kGyO7Y8C.js";import"./MagnifyingGlass-C9WyS4S9.js";import"./OrganisasjonsnummerAlert-DUcoGvxf.js";import"./VStack-BFBL45fh.js";import"./BasePrimitive-CGU5BbqL.js";import"./Box-BW3nG8Jf.js";import"./List-CyvmAVZj.js";import"./Link-o44YGFGr.js";import"./KandidatHendelseTag-CmD02y5a.js";import"./ChatExclamationmark-DeeI9_wa.js";import"./FileXMark-DVbVR_aZ.js";import"./Trash-CN1_i1Sq.js";import"./HandShakeHeart-GEnnHbv3.js";import"./Calendar-DCk_FjSR.js";import"./ThumbUp-DSAzQ4Kq.js";import"./ExclamationmarkTriangle-jdbAdb9o.js";import"./Table-ZPtYIC8D.js";import"./dato-CpkWzOJY.js";import"./format-3IHPRRWg.js";import"./en-US-B-0rQnz0.js";import"./match-OPoBeP1h.js";import"./parseISO-xTwo21f6.js";import"./parse-C3RwyexH.js";import"./getDefaultOptions-Ji22CbKk.js";import"./isSameDay-DD94dVMd.js";import"./index-BKy-G9Eu.js";import"./index-CWbL8d4M.js";import"./util-s8rubUNi.js";import"./useControllableState-CGZKPh8n.js";import"./Popover-B8m_FL6b.js";import"./floating-ui.react-DJCD_w5E.js";import"./Modal.context-CTgmsW8v.js";import"./DismissableLayer-1ihfafDX.js";const R=async(a,i,m)=>{await f(`${S.internUrl}/veileder/kandidatlister/${a}/kandidater/${i}/status`,{status:m})},w=Object.values(s),n=({kandidatnr:a,status:i,lukketKandidatliste:m})=>{const{reFetchKandidatliste:k,kandidatlisteId:g}=y(),[p,c]=x.useState(!1),K=async e=>{if(!(p||e===i)){c(!0);try{await R(g,a,e),k()}finally{c(!1)}}};return t.jsx(r,{children:t.jsxs("div",{className:"flex items-center",children:[t.jsx(I,{status:i}),t.jsx("div",{className:"justify-left flex",children:t.jsx(j,{"data-color":"neutral",disabled:m||p,size:"small",icon:t.jsx(v,{"aria-hidden":!0}),variant:"tertiary","aria-label":"Endre intern status",as:r.Toggle})}),t.jsx(r.Menu,{children:t.jsx(r.Menu.GroupedList,{children:w.map(e=>t.jsxs(r.Menu.GroupedList.Item,{onClick:()=>K(e),children:[h(e),E(e)]},e))})})," "]})})};n.__docgenInfo={description:"",methods:[],displayName:"VelgInternStatus",props:{status:{required:!0,tsType:{name:"InternKandidatstatus"},description:""},kandidatnr:{required:!0,tsType:{name:"string"},description:""},lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""}}};const jt={tags:["autodocs"],component:n},d={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:a=>u(()=>t.jsx(n,{...a}))},o={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:a=>u(()=>t.jsx(n,{...a}),V({lukket:!0}))},l={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>u(()=>t.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(a=>t.jsx(n,{kandidatnr:`kandidat-${a}`,status:a,lukketKandidatliste:!1},a))}))};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
