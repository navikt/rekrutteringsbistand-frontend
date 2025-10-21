import{aP as s,j as i}from"./iframe-DbFLZ0zb.js";import{w as d,c as o}from"./ContextDecorators-BnxEfYpQ.js";import{V as n}from"./VelgInternStatus-Bf8ek8IB.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-uirWz_eZ.js";import"./OrganisasjonsnummerAlert-BPfFuRiU.js";import"./VStack-BkCc1yDX.js";import"./BasePrimitive-CgkWumvN.js";import"./List-DI9WFelc.js";import"./Link-BazqRdLB.js";import"./KandidatHendelseTag-DX09_6iy.js";import"./Tag-DvDlcQfM.js";import"./ChatExclamationmark-DMJ-MqzE.js";import"./FileXMark-NauADuuW.js";import"./Trash-D6e790lM.js";import"./HandShakeHeart-Bw2OOiWo.js";import"./Calendar-CwVAoayr.js";import"./ThumbUp-0JCHZIXv.js";import"./Table-CiBbMHtd.js";import"./util-DVzjgWiD.js";import"./format-RWB3csbs.js";import"./match-C1npcLjZ.js";import"./parseISO-D6FxEAUm.js";import"./parse-DZBN-M-U.js";import"./getDefaultOptions-C2XsHj0b.js";import"./util-DXccvi6O.js";import"./InternStatusTag-D5WGM0vY.js";import"./CircleSlash-B46QVLb_.js";import"./XMarkOctagon-DnMVueLL.js";import"./Reception-Bxs6DZYw.js";import"./SealCheckmark-SUhlIj-a.js";import"./PersonChat-C9hHAdqL.js";import"./MagnifyingGlass-2wFD6OAF.js";import"./Dropdown-ChViT6mY.js";import"./useControllableState-DCK-IQG-.js";import"./Popover-Ik0XXJ4Q.js";import"./floating-ui.react-BsSqsGZq.js";import"./Date.Input-Cr-MtQ8S.js";import"./useFormField-B7aPxswA.js";import"./ChevronDown-CSKcdQzq.js";import"./Modal.context-CWMVqGHt.js";import"./DismissableLayer-0bXQ8NiJ.js";import"./useDescendant-DbwemXBE.js";import"./useClientLayoutEffect-Cxo0zxMa.js";import"./Pencil-CWlPUU_Q.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
