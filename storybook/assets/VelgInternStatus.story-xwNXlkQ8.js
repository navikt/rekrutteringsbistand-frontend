import{aK as s,j as i}from"./iframe-DyjxJt6_.js";import{w as d,c as o}from"./ContextDecorators-N4SXPDP4.js";import{V as n}from"./VelgInternStatus-BDerVIWx.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DzVT8GY0.js";import"./OrganisasjonsnummerAlert-B1LbYRzk.js";import"./VStack-k6rjAcI6.js";import"./BasePrimitive-DD5QSJl_.js";import"./List-DbvLH4Xd.js";import"./Link-BQyKaBg8.js";import"./KandidatHendelseTag-Bn-bF2SW.js";import"./Tag-jVQ027fS.js";import"./ChatExclamationmark-_zjEuLjb.js";import"./FileXMark-BP7zxZnt.js";import"./Trash-CKc4iBLw.js";import"./HandShakeHeart-QphpuF16.js";import"./Calendar-Be9HdFY7.js";import"./ThumbUp-BxYAF2fV.js";import"./Table-5qzdeWed.js";import"./util-u2KN_oDe.js";import"./format-DiYK34ra.js";import"./match-r7-eMgNP.js";import"./parse-Cbdomb8H.js";import"./getDefaultOptions-CGyA5tp4.js";import"./parseISO-CQvy-Q--.js";import"./util-B55YeDai.js";import"./InternStatusTag-Xf8XnmS7.js";import"./CircleSlash-BBzMWUtv.js";import"./XMarkOctagon-DJoYif4O.js";import"./Reception-BpMI2Rd9.js";import"./SealCheckmark-DlS_YgVv.js";import"./PersonChat-BVwSsXAz.js";import"./MagnifyingGlass-BZCwYc8-.js";import"./Dropdown-BH7HRywN.js";import"./useControllableState-DyBNm6ng.js";import"./Popover-BWnH3nYw.js";import"./floating-ui.react-DwC01zyt.js";import"./Date.Input-hLEnjT2L.js";import"./useFormField-RkUFhjyk.js";import"./ChevronDown-B-gXgea7.js";import"./Modal.context-DsW8rZaM.js";import"./DismissableLayer-9F188wWR.js";import"./useDescendant-CYkwdAdJ.js";import"./useClientLayoutEffect-vNIzxBoF.js";import"./Pencil-CDlKP2r8.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
