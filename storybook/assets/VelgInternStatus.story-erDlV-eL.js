import{aK as s,j as i}from"./iframe-DhZ6odjH.js";import{w as d,c as o}from"./ContextDecorators-Br_G47wg.js";import{V as n}from"./VelgInternStatus-CEgwcJa5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D3Dve5TB.js";import"./OrganisasjonsnummerAlert-BviJ9JMB.js";import"./VStack-BFpIlLyU.js";import"./BasePrimitive-Ofhb2EAm.js";import"./List-Csjqadvv.js";import"./Link-CVCEyY32.js";import"./KandidatHendelseTag-ClNTVVbc.js";import"./Tag-IvE1ESiI.js";import"./ChatExclamationmark-C52cVVmC.js";import"./FileXMark-DJPd0cfS.js";import"./Trash-Bj6CoTrm.js";import"./HandShakeHeart-DQxJHZuq.js";import"./Calendar-NqVtKBdr.js";import"./ThumbUp-zSm5etw3.js";import"./Table-BNblVnDj.js";import"./util-TPcHwbXL.js";import"./format-CSQizK5m.js";import"./match-BcagkmTM.js";import"./parse-DcPhISwL.js";import"./getDefaultOptions-jSIKK2Ms.js";import"./parseISO-VKa_XIl-.js";import"./isBefore-DPyoQYA2.js";import"./util-DPdujr1q.js";import"./InternStatusTag-CKZTx5NE.js";import"./CircleSlash-MslFb7fa.js";import"./XMarkOctagon-BbVj6R20.js";import"./Reception-DLldjmjY.js";import"./SealCheckmark-B7x6Wnph.js";import"./PersonChat-aAE97Xg2.js";import"./MagnifyingGlass-BOB5P8qu.js";import"./Dropdown-DwGOrLxZ.js";import"./useControllableState-XxOyj5-F.js";import"./Popover-BBd01zDa.js";import"./floating-ui.react-7udJG8Yp.js";import"./Date.Input-CNpZwMN3.js";import"./useFormField-Bdv40VSQ.js";import"./ChevronDown-BQcdOcKV.js";import"./Modal.context--Sc1y3le.js";import"./DismissableLayer-C_voP-Bm.js";import"./useDescendant-BuZfSEYa.js";import"./useClientLayoutEffect-BEniKjNU.js";import"./Pencil-BXhq1z1d.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
