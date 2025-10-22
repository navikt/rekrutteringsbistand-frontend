import{aK as s,j as i}from"./iframe-CQcQKVHJ.js";import{w as d,c as o}from"./ContextDecorators-C7RnmZVl.js";import{V as n}from"./VelgInternStatus-CF7BrMQG.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CLD8Yobj.js";import"./OrganisasjonsnummerAlert-C3V9N-mA.js";import"./VStack-BkcKOsGL.js";import"./BasePrimitive-R7dqkGXT.js";import"./List-oE4KN9Jk.js";import"./Link-CNM6WXAJ.js";import"./KandidatHendelseTag-_wYeKXt7.js";import"./Tag-B1UgeQBj.js";import"./FileXMark-Bs2UkFRM.js";import"./Trash-BXz9vHTO.js";import"./HandShakeHeart-1ht42tEv.js";import"./Calendar-DLiZi9ru.js";import"./ThumbUp-BZVFYXyc.js";import"./Table-Dxrl4W2c.js";import"./util-D4RQEmo9.js";import"./format-CArDlM88.js";import"./match-CzCdKmhZ.js";import"./parse-CAYOWmc-.js";import"./getDefaultOptions-CQzlSNmC.js";import"./parseISO-CD2GUqTb.js";import"./util-B1ze5Nv7.js";import"./InternStatusTag-BIP_se_u.js";import"./CircleSlash-CSIIAtLa.js";import"./XMarkOctagon-BIyB4SUC.js";import"./Reception-D4x4NoZm.js";import"./SealCheckmark-CXPvayA-.js";import"./PersonChat-BhvTg0Ld.js";import"./MagnifyingGlass-geTlnn_A.js";import"./Dropdown-D6-HYjJe.js";import"./useControllableState-3MLhtD_J.js";import"./Popover-DH8FRCRo.js";import"./floating-ui.react-DEmG-l0u.js";import"./Date.Input-EHz2oxZ9.js";import"./useFormField-BFganqKl.js";import"./ChevronDown-D-JqxndO.js";import"./Modal.context-Ab6UYj-Y.js";import"./DismissableLayer-B5sCW8rV.js";import"./useDescendant-fkukH1Ut.js";import"./useClientLayoutEffect-DFs0Tmsn.js";import"./Pencil-CDw249sI.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
