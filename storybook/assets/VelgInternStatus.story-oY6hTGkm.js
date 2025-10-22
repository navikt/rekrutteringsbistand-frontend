import{aK as s,j as i}from"./iframe-29wJf-MM.js";import{w as d,c as o}from"./ContextDecorators-BtUzP62y.js";import{V as n}from"./VelgInternStatus-CQKgJWld.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-nC5pSZqq.js";import"./OrganisasjonsnummerAlert-CZllZoGG.js";import"./VStack-BUqoGe0H.js";import"./BasePrimitive-kFQ7tb9Y.js";import"./List-CYAAEi6i.js";import"./Link-BLY7alrK.js";import"./KandidatHendelseTag-DczlWlqm.js";import"./Tag-ckTyjE5j.js";import"./ChatExclamationmark-BBSDZreT.js";import"./FileXMark-BMIrEZUw.js";import"./Trash-B0akXBne.js";import"./HandShakeHeart-7fyLqimj.js";import"./Calendar-CriLi_lr.js";import"./ThumbUp-BgcCqH17.js";import"./Table-D1B3P-cv.js";import"./util-O-1r3e4W.js";import"./format-C27PvbPf.js";import"./match-r1881k89.js";import"./parse-Be59gMbd.js";import"./getDefaultOptions-C1xSy5BF.js";import"./parseISO-CisWrXQ1.js";import"./util-DEtvZ1n6.js";import"./InternStatusTag-BgwJeBHI.js";import"./CircleSlash-Cm8aalyb.js";import"./XMarkOctagon-EL3x2u0A.js";import"./Reception-DNguGYKg.js";import"./SealCheckmark-BFQXKINm.js";import"./PersonChat-C_3zxiF2.js";import"./MagnifyingGlass-KS9LYkLp.js";import"./Dropdown-CYEdZ5Jg.js";import"./useControllableState-CdW7uF-V.js";import"./Popover-qoXLE4km.js";import"./floating-ui.react-BolRxfy1.js";import"./Date.Input-Cv9sKJ7x.js";import"./useFormField-BfJqjwot.js";import"./ChevronDown-BWOEzEec.js";import"./Modal.context-Dcp_CmN3.js";import"./DismissableLayer-Drl13rnU.js";import"./useDescendant-Df0cd9Zl.js";import"./useClientLayoutEffect-BlmE3wW5.js";import"./Pencil-A8YB8MIS.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
