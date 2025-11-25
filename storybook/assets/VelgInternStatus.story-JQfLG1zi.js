import{W as s,j as i}from"./iframe-DpIzbEh6.js";import{V as n}from"./VelgInternStatus-DfOw1MIS.js";import{w as d,c as o}from"./ContextDecorators-Ca23vY5M.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BFYl2ZGh.js";import"./Tag-DoFMj22c.js";import"./CircleSlash-CGcw3HZ_.js";import"./XMarkOctagon-BQhrEVeW.js";import"./Reception-D97J58Pr.js";import"./SealCheckmark-DHO3FB4e.js";import"./PersonChat-C5arw4SP.js";import"./MagnifyingGlass-CmbqPbVy.js";import"./KandidatlisteContext-D8PB7bOg.js";import"./OrganisasjonsnummerAlert-DU6iBeu8.js";import"./VStack-DV-mKUsK.js";import"./BasePrimitive-CUveWDyh.js";import"./List-CjujHgjZ.js";import"./Link-Ckl8RwAe.js";import"./KandidatHendelseTag-DNdKryDm.js";import"./ChatExclamationmark-DRIiMgdo.js";import"./FileXMark-YbK2oGrq.js";import"./Trash-ejeNRuoy.js";import"./HandShakeHeart-DoUmunwQ.js";import"./Calendar-yrgqPStg.js";import"./ThumbUp-NzJa49rm.js";import"./Table-D3jDpAO4.js";import"./dato-LgoA4Xw4.js";import"./parse-RftGy9Bo.js";import"./getDefaultOptions-wfwqw35y.js";import"./parseISO-3EvW_LXM.js";import"./index-CxfxYm7_.js";import"./index-B40KJ5b4.js";import"./util-Ds2nhTK-.js";import"./Dropdown-DIxl1pzo.js";import"./useControllableState-DSjvWJiE.js";import"./Popover-Dy0tH-3T.js";import"./floating-ui.react-BeyQwPMw.js";import"./Date.Input-C0FLtTG3.js";import"./useFormField-Dj651Pd3.js";import"./ChevronDown-Be61l9Us.js";import"./Modal.context-BiOdcH09.js";import"./DismissableLayer-D8ZhvvRv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BEllSSZA.js";import"./Pencil-BabqsJvH.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
