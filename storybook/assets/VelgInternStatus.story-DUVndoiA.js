import{j as s}from"./iframe-XlTllAuX.js";import{w as d,c as o}from"./ContextDecorators-VPPjrswg.js";import{V as n}from"./VelgInternStatus-bAm3MQJZ.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-OmFZasYM.js";import"./OrganisasjonsnummerAlert-CV3WVrYQ.js";import"./VStack-CsoES-hm.js";import"./BasePrimitive-B27pQm3P.js";import"./List-VTGdx7DI.js";import"./Link-BZllahFp.js";import"./KandidatHendelseTag-DwG_0g3h.js";import"./Tag-BDONKljZ.js";import"./FileXMark-DIYkyt3P.js";import"./Trash-Css8GNUu.js";import"./HandShakeHeart-DeLxSOoE.js";import"./Calendar-DOtBe3lY.js";import"./ThumbUp-DENVjgkC.js";import"./Table-DQEfXYmu.js";import"./util-BHGYwjsw.js";import"./format-D2iUlHUk.js";import"./match-B5GTOkkR.js";import"./parseISO-CX-BFnlC.js";import"./parse-9h7q15na.js";import"./getDefaultOptions-CexkTlHf.js";import"./util-DZymvEEu.js";import"./InternStatusTag-DpP85aaQ.js";import"./CircleSlash-DOpoIhzj.js";import"./XMarkOctagon-CLgDs1Z0.js";import"./Reception-BJLCDZfr.js";import"./SealCheckmark-B9drq2F8.js";import"./PersonChat-QYUpTGHA.js";import"./MagnifyingGlass-DadXHoIl.js";import"./Dropdown-ojxc0QcK.js";import"./useControllableState-Dwr4OusZ.js";import"./Popover-CJyuLt0R.js";import"./floating-ui.react-CQ1j8rqW.js";import"./Date.Input-Dvo-G1dZ.js";import"./useFormField-BBkBvgfd.js";import"./ChevronDown-CaeRuUHi.js";import"./Modal.context-B_tjMCaq.js";import"./DismissableLayer-DminS6_a.js";import"./useDescendant-CHQi9KgN.js";import"./useClientLayoutEffect-B0RCFDC1.js";import"./Pencil-DaCsutLP.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
