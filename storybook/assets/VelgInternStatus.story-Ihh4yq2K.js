import{P as s,j as i}from"./iframe-CXuq1bzX.js";import{V as n}from"./VelgInternStatus-DyDWGMUR.js";import{w as d,c as o}from"./ContextDecorators-Ci1A41Sr.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BZurE0iv.js";import"./Tag-Cida-Jzl.js";import"./CircleSlash-CPscxaVd.js";import"./XMarkOctagon-DeGXw7Hd.js";import"./Reception-5HrvEuOf.js";import"./SealCheckmark-BdnEO_Jq.js";import"./PersonChat-Vaebm1O1.js";import"./MagnifyingGlass-DlHW62JL.js";import"./KandidatlisteContext-Bx-AetdE.js";import"./OrganisasjonsnummerAlert-CY5A3vjK.js";import"./VStack-LqEsNTZZ.js";import"./BasePrimitive-DiKxr93y.js";import"./List-kturX9gN.js";import"./Link-7owy6tIO.js";import"./KandidatHendelseTag-DXzu7t6G.js";import"./ChatExclamationmark-CuSvMEE0.js";import"./FileXMark-C3mt0mpx.js";import"./Trash-DX_gXo3G.js";import"./HandShakeHeart-5A69Ghj1.js";import"./Calendar-BY4BLq7b.js";import"./ThumbUp-CflO1XuR.js";import"./Table-DY0KpqSI.js";import"./util-gTmey5Qo.js";import"./parse-DbkuHRKQ.js";import"./getDefaultOptions-DWOdFO_w.js";import"./parseISO-C2WOoNR9.js";import"./index-BQoksTIl.js";import"./index-B40KJ5b4.js";import"./isBefore-VEfq4mHQ.js";import"./util-yzhPM8cu.js";import"./Dropdown-C6_9gyuv.js";import"./useControllableState-Bofen_tQ.js";import"./Popover-7HJPygkH.js";import"./floating-ui.react-CdZLdAlr.js";import"./Date.Input-Dr8BqPTN.js";import"./useFormField-C5bcbRvk.js";import"./ChevronDown-DqTWyvcU.js";import"./Modal.context-g98g4FZE.js";import"./DismissableLayer-vULnLQXj.js";import"./useDescendant-waL9R7tb.js";import"./useClientLayoutEffect-DN-HA8Cw.js";import"./Pencil-qh2YCmtS.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
