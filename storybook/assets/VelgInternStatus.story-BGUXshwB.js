import{aK as s,j as i}from"./iframe-Dz5WkgO0.js";import{w as d,c as o}from"./ContextDecorators-CtqBMGek.js";import{V as n}from"./VelgInternStatus-DgXbuNQg.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BXVVn83h.js";import"./OrganisasjonsnummerAlert-cue8hzmE.js";import"./VStack-BiEkvKf6.js";import"./BasePrimitive-CCDlBmCX.js";import"./List-BtiImhee.js";import"./Link-zoaxWdQX.js";import"./KandidatHendelseTag-CqRiatAU.js";import"./Tag-DDDFzLIg.js";import"./ChatExclamationmark-DMnkqLQD.js";import"./FileXMark-DIL-4EoH.js";import"./Trash-cluU2dwU.js";import"./HandShakeHeart-C1M5G_up.js";import"./Calendar-DzX_tnPl.js";import"./ThumbUp-DvB7mkr_.js";import"./Table-C0E7aHio.js";import"./util-Boa8LuGc.js";import"./format-z-6xuJmt.js";import"./match-CyEf2s84.js";import"./parse-DbdPPznS.js";import"./getDefaultOptions-XvlMf_q4.js";import"./parseISO-jKUOMyLd.js";import"./util-CKNMcXwP.js";import"./InternStatusTag-DNej0cQu.js";import"./CircleSlash-D2skyiKS.js";import"./XMarkOctagon-bndjVuk_.js";import"./Reception-D15HUEGX.js";import"./SealCheckmark-DOAs8AQB.js";import"./PersonChat-DbY_eYQ6.js";import"./MagnifyingGlass-BwGn1RLW.js";import"./Dropdown-CbWweeCj.js";import"./useControllableState-XDgiReJF.js";import"./Popover-C7CA7fr6.js";import"./floating-ui.react-BVd2IcmE.js";import"./Date.Input-DrgG06vb.js";import"./useFormField-DpLIdY3U.js";import"./ChevronDown-BOcJumpe.js";import"./Modal.context-DYi7aOes.js";import"./DismissableLayer-aFCZqziv.js";import"./useDescendant-F22c6Vqt.js";import"./useClientLayoutEffect-DCXCSFQx.js";import"./Pencil-C63k0nm1.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
