import{X as s,j as i}from"./iframe-Dy0lgISD.js";import{V as n}from"./VelgInternStatus-CvSMkg1I.js";import{w as d,c as o}from"./ContextDecorators-Cy19EL9c.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DheUMR8O.js";import"./Tag-Bgfs15oY.js";import"./CircleSlash-CqFIomWe.js";import"./XMarkOctagon-zFfu9icz.js";import"./Reception-BatqVLqs.js";import"./SealCheckmark-BJ8nj8wR.js";import"./PersonChat-DaBubQf0.js";import"./MagnifyingGlass-BwYpJuof.js";import"./KandidatlisteContext-4ihAi1Vd.js";import"./OrganisasjonsnummerAlert-Bhoy52Yu.js";import"./VStack-DoN2IO4E.js";import"./BasePrimitive-CQr7-pyL.js";import"./List-Dx95tQEs.js";import"./Link-dq1pqMCI.js";import"./KandidatHendelseTag-sB1FI4LX.js";import"./ChatExclamationmark-mnpx42yJ.js";import"./FileXMark-Dvyb1woY.js";import"./Trash-CQFlK5ks.js";import"./HandShakeHeart-CsXAGir8.js";import"./Calendar-DkoO1Plo.js";import"./ThumbUp-DhsAfMQl.js";import"./Table-BR6gcF0p.js";import"./index-B4PmVqKX.js";import"./index-B40KJ5b4.js";import"./util-BRqn0qrI.js";import"./Dropdown-mrNf_0yx.js";import"./useControllableState-DsPI5clQ.js";import"./Popover-ClhAQ4NF.js";import"./floating-ui.react-D5df03w-.js";import"./Date.Input-BgiE-HeY.js";import"./useFormField-CKGIjrUK.js";import"./ChevronDown-BUvm8QKR.js";import"./Modal.context-BzlekgQp.js";import"./DismissableLayer-CwiY48hJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BppbtjEv.js";import"./Pencil-Da8uvjWw.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
