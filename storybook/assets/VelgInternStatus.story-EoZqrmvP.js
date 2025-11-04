import{P as s,j as i}from"./iframe-DggTbHTG.js";import{V as n}from"./VelgInternStatus-CUiRzOz3.js";import{w as d,c as o}from"./ContextDecorators-DyVho6xR.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Cum_5RXD.js";import"./Tag-BRlhBhoK.js";import"./CircleSlash-_roTkGaE.js";import"./XMarkOctagon-DV8JZaBV.js";import"./Reception-544aOGZi.js";import"./SealCheckmark-DB_qFYj6.js";import"./PersonChat-D5FkiRe5.js";import"./MagnifyingGlass-CYu-8gIE.js";import"./KandidatlisteContext-DMeHDc5N.js";import"./OrganisasjonsnummerAlert-M41sRSNT.js";import"./VStack-hdgZhtTs.js";import"./BasePrimitive-ByuUTuzm.js";import"./List-BSPQku7V.js";import"./Link-pfPgYY8Y.js";import"./KandidatHendelseTag-BaFxykvB.js";import"./ChatExclamationmark-Byyi9_9c.js";import"./FileXMark-OJrkdDfU.js";import"./Trash-CjvBN-wi.js";import"./HandShakeHeart-6_l6UwHP.js";import"./Calendar-Dxt1eeUH.js";import"./ThumbUp-DqjOC6jP.js";import"./Table-C8w8VGPD.js";import"./util-bQi_RKn_.js";import"./parse-B8VYaoTJ.js";import"./getDefaultOptions-C5cRSyku.js";import"./parseISO-7GUi4n0B.js";import"./index-DuzJlVVz.js";import"./index-B40KJ5b4.js";import"./isBefore-DVy4mKQn.js";import"./util-CRSb4gnp.js";import"./Dropdown-FTUVA1Ib.js";import"./useControllableState-D2XNC1Vd.js";import"./Popover-B4uU21r2.js";import"./floating-ui.react-DflCFKju.js";import"./Date.Input-DjvJoNOi.js";import"./useFormField-Q0UaUZO-.js";import"./ChevronDown-BhX91dAV.js";import"./Modal.context-naP120KI.js";import"./DismissableLayer-KaqTptve.js";import"./useDescendant-Cq0mvZy6.js";import"./useClientLayoutEffect-BCXuvgkk.js";import"./Pencil-7ToZ1x72.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
