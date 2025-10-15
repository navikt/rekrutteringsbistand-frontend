import{j as s}from"./iframe-uCi_mQk4.js";import{w as d,c as o}from"./ContextDecorators-ODaVyxTJ.js";import{V as n}from"./VelgInternStatus-D0VPS1EV.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-2TSOcbVy.js";import"./OrganisasjonsnummerAlert-D2ZDhlEi.js";import"./VStack-Dcwb538F.js";import"./BasePrimitive-Bsz9K4MY.js";import"./List-D_BiqU3x.js";import"./Link-CDg6BDKK.js";import"./KandidatHendelseTag-DmMWL5xZ.js";import"./Tag-D6F68oqU.js";import"./ChatExclamationmark-0MBCjqVa.js";import"./FileXMark-CVAfBa1I.js";import"./Trash-t0U_yquN.js";import"./HandShakeHeart-BX_z94qc.js";import"./Calendar-DNe2Xfpi.js";import"./ThumbUp-CFxhu4lm.js";import"./Table-taIHKPoA.js";import"./util-Tz1VMCCF.js";import"./format-C9LY8iZK.js";import"./match-ChqzxeL3.js";import"./parseISO-BkupR9xz.js";import"./parse-BgUE4KId.js";import"./getDefaultOptions-2bGULAAd.js";import"./util-BThEYQ9W.js";import"./InternStatusTag-CbT3qdR5.js";import"./CircleSlash-64pzQ4PL.js";import"./XMarkOctagon-DLbYGZGY.js";import"./Reception-BGMS8xzK.js";import"./SealCheckmark-CZv3wAKh.js";import"./PersonChat-nPzUsbFy.js";import"./MagnifyingGlass-Kco7xRh4.js";import"./Dropdown-BvTVMUmz.js";import"./useControllableState-CTHa6vAV.js";import"./Popover-CYTv81_a.js";import"./floating-ui.react-vq7Q8IrH.js";import"./Date.Input--CeuYuQs.js";import"./useFormField-CKp_MqU7.js";import"./ChevronDown-ChWcP7RJ.js";import"./Modal.context-CsE4BeM4.js";import"./DismissableLayer-MLFOpObD.js";import"./useDescendant-CFdznkdX.js";import"./useClientLayoutEffect--UZ4v6un.js";import"./Pencil-BQHVDI-9.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
