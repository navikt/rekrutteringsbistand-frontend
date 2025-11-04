import{P as s,j as i}from"./iframe-KUKdFIZ7.js";import{V as n}from"./VelgInternStatus-DtuaVZKT.js";import{w as d,c as o}from"./ContextDecorators-CCvxMt9b.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-C-TW8NcQ.js";import"./Tag-CueplUnS.js";import"./CircleSlash-bhi_ANKM.js";import"./XMarkOctagon-B0J9Z7nb.js";import"./Reception-CMskPuOg.js";import"./SealCheckmark-ktop8Tw-.js";import"./PersonChat-BkRGKR9C.js";import"./MagnifyingGlass-fJMFGvJs.js";import"./KandidatlisteContext-D2FlhmQq.js";import"./OrganisasjonsnummerAlert-Cens1SaX.js";import"./VStack-mK9hJiTW.js";import"./BasePrimitive-CwMHyULp.js";import"./List-CxhB9m56.js";import"./Link-C-73sY9C.js";import"./KandidatHendelseTag-BSBnY5VX.js";import"./ChatExclamationmark-CDGYDuI2.js";import"./FileXMark-BBZ5pBIr.js";import"./Trash-BdahZicB.js";import"./HandShakeHeart-B8vXQM1-.js";import"./Calendar-DZiE5oJM.js";import"./ThumbUp-zUFk_W2S.js";import"./Table-CnaaXedP.js";import"./util-CUS-DV8a.js";import"./parse-DYiz1_ue.js";import"./getDefaultOptions-5m5FAbyc.js";import"./parseISO-CfRniNou.js";import"./index-BufEp5AN.js";import"./index-B40KJ5b4.js";import"./isBefore-Dd8Tg51N.js";import"./util-fOgXZ26Y.js";import"./Dropdown-CwCvPe1G.js";import"./useControllableState-B4PYToqo.js";import"./Popover-BKokA7vB.js";import"./floating-ui.react-Chb98_y2.js";import"./Date.Input-CW2er8ey.js";import"./useFormField-BTKzMuXa.js";import"./ChevronDown-Dt5oLEcE.js";import"./Modal.context-B64mO1CY.js";import"./DismissableLayer-BXivA_65.js";import"./useDescendant-DtlgqquC.js";import"./useClientLayoutEffect-Wu0zOuyx.js";import"./Pencil-BY5aLFZT.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
