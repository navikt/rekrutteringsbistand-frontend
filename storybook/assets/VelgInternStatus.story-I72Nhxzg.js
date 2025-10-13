import{j as s}from"./iframe-CgpsV_Wu.js";import{w as d,c as o}from"./ContextDecorators-DChxsmLa.js";import{V as n}from"./VelgInternStatus-BCObdacw.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C_fgEUb0.js";import"./OrganisasjonsnummerAlert-Bhx4nxvy.js";import"./VStack-DlX7_wSI.js";import"./BasePrimitive-DnTZQNYl.js";import"./List-VI7Q0s2V.js";import"./Link-BDVHruia.js";import"./KandidatHendelseTag-BD3eADfS.js";import"./Tag-C37VkUMh.js";import"./FileXMark-B7ZDcxhz.js";import"./Trash-C31SSF9P.js";import"./HandShakeHeart-vrKMCZxi.js";import"./Calendar-DhK1AGOB.js";import"./ThumbUp-CBRf_sJN.js";import"./Table-D1lgSz1-.js";import"./util-2ZMmUiey.js";import"./format-B58jIAnh.js";import"./match-fCXOdtfI.js";import"./parseISO-BOwU1sGN.js";import"./parse-D2-UF7KL.js";import"./getDefaultOptions-ClMb8y5B.js";import"./util-WBelmkEa.js";import"./InternStatusTag-DScMJbbQ.js";import"./CircleSlash-14vQWRn_.js";import"./XMarkOctagon-BzrWfJux.js";import"./Reception-DT50fEVt.js";import"./SealCheckmark-BYq5QDeQ.js";import"./PersonChat-BXkZ_SET.js";import"./MagnifyingGlass-vLKwyiE8.js";import"./Dropdown-7GVyBjb-.js";import"./useControllableState-BTYG4yPg.js";import"./Popover-BoBT5WYj.js";import"./floating-ui.react-CIjUBrgT.js";import"./Date.Input-C8sZDZm4.js";import"./useFormField-DliOPgKb.js";import"./ChevronDown-xqq8YiUn.js";import"./Modal.context-BRVM-1Ki.js";import"./DismissableLayer-14fygN0E.js";import"./useDescendant-CCor8Ww3.js";import"./useClientLayoutEffect-DSdcXSH4.js";import"./Pencil-Bl76_Qub.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
