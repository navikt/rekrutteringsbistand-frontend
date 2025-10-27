import{aK as s,j as i}from"./iframe-D0f7J1nY.js";import{w as d,c as o}from"./ContextDecorators-BIKSPi1e.js";import{V as n}from"./VelgInternStatus-BM0_YBFd.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DyFagPG4.js";import"./OrganisasjonsnummerAlert-CH6yCm4M.js";import"./VStack-zAsIOaWi.js";import"./BasePrimitive-_B0tGX77.js";import"./List-01d2Ok0m.js";import"./Link-CVBcNhat.js";import"./KandidatHendelseTag-DGTUG4F0.js";import"./Tag-C3Wthr0B.js";import"./ChatExclamationmark-Dz5EKjCZ.js";import"./FileXMark-CI7Dy0MH.js";import"./Trash-CtpFpmK8.js";import"./HandShakeHeart-e28kC94C.js";import"./Calendar-BUSnok4u.js";import"./ThumbUp-DJsI1PwY.js";import"./Table-DNUQiUTR.js";import"./util-C9AS3FCi.js";import"./format-DEtrES72.js";import"./match-DEtL1OMk.js";import"./parse-0EL43YaE.js";import"./getDefaultOptions-BEAVjXe_.js";import"./parseISO-D0I4fR8a.js";import"./index-Bucijd2D.js";import"./index-B40KJ5b4.js";import"./isBefore-BYhlh3_7.js";import"./util-2JKmsimX.js";import"./InternStatusTag-DD_08Gor.js";import"./CircleSlash-BoXyPXOx.js";import"./XMarkOctagon-BpO7JADT.js";import"./Reception-Qz4Zib7O.js";import"./SealCheckmark-BsQ-mHsV.js";import"./PersonChat-D1PDlhtN.js";import"./MagnifyingGlass-cVFmPB2o.js";import"./Dropdown-XUPqmuQC.js";import"./useControllableState-CqeC_HD5.js";import"./Popover-CP-vJaXa.js";import"./floating-ui.react-wf1Om8PO.js";import"./Date.Input-DV87Ki3V.js";import"./useFormField-BUhWNJci.js";import"./ChevronDown-gEqybSmK.js";import"./Modal.context-Byy9zaEN.js";import"./DismissableLayer-weKq368f.js";import"./useDescendant-Dgila3fS.js";import"./useClientLayoutEffect-BIx7NCwy.js";import"./Pencil-BlyQiINN.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
