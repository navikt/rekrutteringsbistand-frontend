import{aP as s,j as i}from"./iframe-CIx7wo7D.js";import{w as d,c as o}from"./ContextDecorators-BCkTy9R8.js";import{V as n}from"./VelgInternStatus-CkGmV6vR.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BE8HKbW2.js";import"./OrganisasjonsnummerAlert-DP7OVJ5V.js";import"./VStack-D7okkdd5.js";import"./BasePrimitive-l8vjXYg9.js";import"./List-BcRZRMxq.js";import"./Link-nGzr4IID.js";import"./KandidatHendelseTag-Bs36lIQK.js";import"./Tag-Ch13GRkI.js";import"./FileXMark-b-SwBIUk.js";import"./Trash-DDF0lDvq.js";import"./HandShakeHeart-BeQpNpMA.js";import"./Calendar-DpL55Nco.js";import"./ThumbUp-Dm7v3uRz.js";import"./Table-CncWjAoz.js";import"./util-Dz2WTHUK.js";import"./format-pnjYDM88.js";import"./match-kta7IEBV.js";import"./parseISO-CHHyxPoY.js";import"./parse-uQgzkAwn.js";import"./getDefaultOptions-CVriGt-u.js";import"./util-xzISgwZH.js";import"./InternStatusTag-DSyboMsu.js";import"./CircleSlash-CG4VzY4m.js";import"./XMarkOctagon-DBL8Gd41.js";import"./Reception-DgUSVWda.js";import"./SealCheckmark-DSP91Zel.js";import"./PersonChat-DYP2SH46.js";import"./MagnifyingGlass-CBOXQulF.js";import"./Dropdown-BJ_SZv6O.js";import"./useControllableState-Cn-dqJnK.js";import"./Popover-BlQmHkAr.js";import"./floating-ui.react-DWu7eOHT.js";import"./Date.Input-DDJFd5Co.js";import"./useFormField-CpdlRCd5.js";import"./ChevronDown-CY3htvpV.js";import"./Modal.context-BmX0zHS2.js";import"./DismissableLayer-CON-JNDb.js";import"./useDescendant-0NAjw1zc.js";import"./useClientLayoutEffect-BNDslFP0.js";import"./Pencil-D2MOTzNG.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
