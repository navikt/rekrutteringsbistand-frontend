import{j as s}from"./iframe-2oXcNiqk.js";import{w as d,c as o}from"./ContextDecorators-y7sOmqA4.js";import{V as n}from"./VelgInternStatus-qVKY8NP1.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-9cw44CFx.js";import"./OrganisasjonsnummerAlert-Co5iX4pO.js";import"./VStack-BUstKu9N.js";import"./BasePrimitive-D35wACDJ.js";import"./List-NYF0RnVw.js";import"./Link-DL5GC8Kj.js";import"./KandidatHendelseTag-DK-cwbPx.js";import"./Tag-B42hqPtf.js";import"./ChatExclamationmark-D2kVWZgc.js";import"./FileXMark-Cx8wRif0.js";import"./Trash-BPy2QyW5.js";import"./HandShakeHeart-C7XDbjKV.js";import"./Calendar-DCiz2ZNN.js";import"./ThumbUp-HVgTX8jg.js";import"./Table-Ci_5s20-.js";import"./util-CnlfkwHW.js";import"./format-DWR74HJu.js";import"./match-BjocQXBS.js";import"./parseISO-CK2-VrtQ.js";import"./parse-CySyyd9K.js";import"./getDefaultOptions-DQBqaWPU.js";import"./util-utnAozoB.js";import"./InternStatusTag-Doe9NW4y.js";import"./CircleSlash-DfG48S01.js";import"./XMarkOctagon-CiFg4mBJ.js";import"./Reception-BbWayFZb.js";import"./SealCheckmark-CTI8HIfR.js";import"./PersonChat-BkY5be6v.js";import"./MagnifyingGlass-DQwlHIe8.js";import"./Dropdown-B3b0U9xY.js";import"./useControllableState-n5Q65I8H.js";import"./Popover-C03GkpTU.js";import"./floating-ui.react-DF0Q9kmB.js";import"./Date.Input-Bqt9RLEn.js";import"./useFormField-CJzQfYGu.js";import"./ChevronDown-D00_874Q.js";import"./Modal.context-ZJRuN0us.js";import"./DismissableLayer-CCbDkFeX.js";import"./useDescendant-q-9CiBNR.js";import"./useClientLayoutEffect-C5HQygpY.js";import"./Pencil-DuTwWBwf.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
