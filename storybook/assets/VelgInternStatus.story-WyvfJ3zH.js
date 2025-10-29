import{P as s,j as i}from"./iframe-Dx5p-74P.js";import{w as d,c as o}from"./ContextDecorators-BCgGVb31.js";import{V as n}from"./VelgInternStatus-BnpLllpM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BH3Z2Hac.js";import"./OrganisasjonsnummerAlert-BaL2Wpxk.js";import"./VStack-M4BYiSCC.js";import"./BasePrimitive-HT4iaqsB.js";import"./List-Ccl9AqJr.js";import"./Link-CQRIlL-P.js";import"./KandidatHendelseTag-Ckw2Yf1k.js";import"./Tag-BBp8XsrL.js";import"./ChatExclamationmark-DE5DLdsZ.js";import"./FileXMark-BZbSkgiU.js";import"./Trash-InTWHO4k.js";import"./HandShakeHeart-C3Fy77aQ.js";import"./Calendar-CUrO_5Yz.js";import"./ThumbUp-DV7m7lpk.js";import"./Table-CxSSnKIY.js";import"./util-BmmH2cUm.js";import"./parse-QRK9mKr4.js";import"./getDefaultOptions-VUvHQon4.js";import"./parseISO-CfdHbu5H.js";import"./index-DKRmfY_S.js";import"./index-B40KJ5b4.js";import"./isBefore-DNN8erOw.js";import"./util-BZefUNq6.js";import"./InternStatusTag-Cjn3A6-n.js";import"./CircleSlash-CtALDa4F.js";import"./XMarkOctagon-COlb4Fj3.js";import"./Reception-DgoF5Qer.js";import"./SealCheckmark-CL8PnGL-.js";import"./PersonChat-CR4S7PCY.js";import"./MagnifyingGlass-D5P89O5V.js";import"./Dropdown-Duqq4eaR.js";import"./useControllableState-BHffPqA3.js";import"./Popover-hxTLgkf3.js";import"./floating-ui.react-1bRgyrJ9.js";import"./Date.Input-Dap9AMiQ.js";import"./ReadOnlyIcon-CUSYp9cW.js";import"./useFormField-CieKNAG5.js";import"./ChevronDown-D21O9Nae.js";import"./Modal.context-TxvMfdUR.js";import"./DismissableLayer-C8rDKSSp.js";import"./useDescendant-BjBks9Ie.js";import"./useClientLayoutEffect-D5-QfL8A.js";import"./Pencil-DKq0cMkG.js";const rt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,rt as default};
