import{j as s}from"./iframe-sZP266bO.js";import{w as d,c as o}from"./ContextDecorators-CiHjcECp.js";import{V as n}from"./VelgInternStatus-DdI0yxYp.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CKAF9csg.js";import"./OrganisasjonsnummerAlert-mxL8c4sm.js";import"./VStack-M5Jjoz8J.js";import"./BasePrimitive-CRPU5RNY.js";import"./List-DENPbORg.js";import"./Link-DQiMEZnz.js";import"./KandidatHendelseTag-AZu_skbn.js";import"./Tag-6IwzmMUZ.js";import"./ChatExclamationmark-DKfmyToB.js";import"./FileXMark-Da-f6SDk.js";import"./Trash-DMQ8OD7z.js";import"./HandShakeHeart-BTWM6TMD.js";import"./Calendar-Ckrf9MyK.js";import"./ThumbUp-vcLRfdLn.js";import"./Table-B8AVpSdn.js";import"./util-B9DhuNjA.js";import"./format-Dn1NmLY-.js";import"./match-CqaFT2ci.js";import"./parseISO-D6y3GPfQ.js";import"./parse-Cn_HLpVL.js";import"./getDefaultOptions-CxkFBLQq.js";import"./util-CYpKB-mD.js";import"./InternStatusTag-7c9Z05bK.js";import"./CircleSlash-BQzd8zLx.js";import"./XMarkOctagon-Dud-ZWR_.js";import"./Reception-BaWJ7x5T.js";import"./SealCheckmark-7rPMyTJH.js";import"./PersonChat-AushhbbB.js";import"./MagnifyingGlass-DDa7fCyq.js";import"./Dropdown-Dhjm-nmE.js";import"./useControllableState-cbYrnx3z.js";import"./Popover-BJXGpuYe.js";import"./floating-ui.react-smFhzZVY.js";import"./Date.Input-CcqUSilb.js";import"./useFormField-C_CCgozA.js";import"./ChevronDown-ClqKVkNC.js";import"./Modal.context-DYFw0clZ.js";import"./DismissableLayer-BBn0wG8l.js";import"./useDescendant-CsOSZ5Fo.js";import"./useClientLayoutEffect-hVLPoxGw.js";import"./Pencil-nwsxps-f.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
