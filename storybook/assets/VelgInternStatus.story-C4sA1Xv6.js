import{aP as s,j as i}from"./iframe-7eHG5h_U.js";import{w as d,c as o}from"./ContextDecorators-U54iRWbW.js";import{V as n}from"./VelgInternStatus-B4WR2vmM.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DnG2yZZF.js";import"./OrganisasjonsnummerAlert-yxmlgvWb.js";import"./VStack-Bn24QnTO.js";import"./BasePrimitive-_gW3khcb.js";import"./List-CU38lByH.js";import"./Link-nxBccCCM.js";import"./KandidatHendelseTag-DqvuH8sL.js";import"./Tag-CCAZ-Ukh.js";import"./FileXMark-MhiY1pg_.js";import"./Trash-g2QxdwJW.js";import"./HandShakeHeart-CHdc252e.js";import"./Calendar-BLomWIBv.js";import"./ThumbUp-FdCUfIUT.js";import"./Table-ITv2gwZr.js";import"./util-C9Af0tKE.js";import"./format-B6AGnuRA.js";import"./match-ZJSMZWUP.js";import"./parseISO-DqOfLv4e.js";import"./parse-CKYxhVP8.js";import"./getDefaultOptions-hi6Mw6xh.js";import"./util-B-tfxij0.js";import"./InternStatusTag-DtraZE5Y.js";import"./CircleSlash-DbaSe04T.js";import"./XMarkOctagon-CyICpCCT.js";import"./Reception-DDD4K8AJ.js";import"./SealCheckmark-BHggV6LZ.js";import"./PersonChat-BCbHdaPC.js";import"./MagnifyingGlass-uonIJjaU.js";import"./Dropdown-0CyQauzV.js";import"./useControllableState-CTVR2G-L.js";import"./Popover-D60KDE0f.js";import"./floating-ui.react-DZKdw4va.js";import"./Date.Input-DUSVmfk7.js";import"./useFormField-DtXzDAXc.js";import"./ChevronDown-0ue-sR1C.js";import"./Modal.context-fguPQkN6.js";import"./DismissableLayer-DwDXwodQ.js";import"./useDescendant-BM1MCWSW.js";import"./useClientLayoutEffect-BGScRAc0.js";import"./Pencil-CS03Rc3Q.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />)
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.AKTUELL,
    lukketKandidatliste: true
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />, createKandidatlisteMock({
    lukket: true
  }))
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'dummy',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: () => withStillingsKandidatliste(() => <div className='flex flex-col gap-4'>
        {Object.values(InternKandidatstatus).map(s => <VelgInternStatus key={s} kandidatnr={\`kandidat-\${s}\`} status={s} lukketKandidatliste={false} />)}
      </div>)
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
