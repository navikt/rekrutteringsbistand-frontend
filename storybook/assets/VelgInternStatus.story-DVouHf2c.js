import{aK as s,j as i}from"./iframe-DkqQV0Vp.js";import{w as d,c as o}from"./ContextDecorators-CTI8SJFj.js";import{V as n}from"./VelgInternStatus-DDsHSZOj.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-LJmcUknT.js";import"./OrganisasjonsnummerAlert-B-0GhKkG.js";import"./VStack-Br_bVmDS.js";import"./BasePrimitive-CTvonWwE.js";import"./List-DgeHneII.js";import"./Link-BMo8M5FD.js";import"./KandidatHendelseTag-3mtqR6ne.js";import"./Tag-OQKFFpN6.js";import"./FileXMark-G79II5l8.js";import"./Trash-CvGRU7xH.js";import"./HandShakeHeart-P-Q9hIaQ.js";import"./Calendar-G_W6zy3n.js";import"./ThumbUp-n6Eb3EYf.js";import"./Table-_jt-Wkdf.js";import"./util-BKVFyWR_.js";import"./format-DbRpKZZT.js";import"./match-Bcqr4xsr.js";import"./parse-C-cVUR9H.js";import"./getDefaultOptions-CDCFXLmF.js";import"./parseISO-DB_v1pEI.js";import"./util-B1vQ7Ub3.js";import"./InternStatusTag-BFsWnhMI.js";import"./CircleSlash-C5XxsoL2.js";import"./XMarkOctagon-BeW9c_kC.js";import"./Reception-B-ak3D7U.js";import"./SealCheckmark-C3oe3jYm.js";import"./PersonChat-oE6N10pl.js";import"./MagnifyingGlass-BjouXiEJ.js";import"./Dropdown-BcNWWWeI.js";import"./useControllableState-CktX_T5O.js";import"./Popover-Dptv1Jr6.js";import"./floating-ui.react-AbRo5KDr.js";import"./Date.Input-DKgCjNm_.js";import"./useFormField-C_wy9RA2.js";import"./ChevronDown-D9cxegDX.js";import"./Modal.context-BxvMIN3L.js";import"./DismissableLayer-Ddn59H5u.js";import"./useDescendant-DiNnri6c.js";import"./useClientLayoutEffect-qPOaCdZX.js";import"./Pencil-Cmgl5pRh.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
