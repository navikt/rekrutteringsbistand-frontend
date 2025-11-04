import{P as s,j as i}from"./iframe-Db4gm7sv.js";import{V as n}from"./VelgInternStatus-C2gIPSC0.js";import{w as d,c as o}from"./ContextDecorators-CibIGTWJ.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CA6Q5ZgW.js";import"./Tag-CgnbrGVV.js";import"./CircleSlash-BdbzCmrD.js";import"./XMarkOctagon-J8g8Ua3c.js";import"./Reception-Bh6fUHUG.js";import"./SealCheckmark-DKoAfjTg.js";import"./PersonChat-BYm3QQ_k.js";import"./MagnifyingGlass-BB-yyhb4.js";import"./KandidatlisteContext-CLqUZ3Uw.js";import"./OrganisasjonsnummerAlert-Bhvc_O9z.js";import"./VStack-B2qKtTfL.js";import"./BasePrimitive-DhGBNVQz.js";import"./List-B-NNREoJ.js";import"./Link-Cih-0lU6.js";import"./KandidatHendelseTag-CkAKNKFx.js";import"./ChatExclamationmark-DADSIgGk.js";import"./FileXMark-DSnF131M.js";import"./Trash-B6XvmmwI.js";import"./HandShakeHeart-DLUD7zrI.js";import"./Calendar-DhwXWgXC.js";import"./ThumbUp-BbZg4QkZ.js";import"./Table-DYWQUoU3.js";import"./util-Ene38gJ_.js";import"./parse-mbg283r7.js";import"./getDefaultOptions-D7gsGtTo.js";import"./parseISO-1W8p0znK.js";import"./index-B-98khB0.js";import"./index-B40KJ5b4.js";import"./isBefore-DeoMZcNr.js";import"./util-Gs1PX1Y8.js";import"./Dropdown-fCR2-vDM.js";import"./useControllableState-BzElCyNZ.js";import"./Popover-DzqwXols.js";import"./floating-ui.react-DQrCiaXj.js";import"./Date.Input-DvwDNPfH.js";import"./useFormField-Dd5ApiFV.js";import"./ChevronDown-B_BXj3bk.js";import"./Modal.context-_lDx5AbH.js";import"./DismissableLayer-CesHQX8D.js";import"./useDescendant-Ba2aSA-P.js";import"./useClientLayoutEffect-DD-jHHhO.js";import"./Pencil-tRiImD2A.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
