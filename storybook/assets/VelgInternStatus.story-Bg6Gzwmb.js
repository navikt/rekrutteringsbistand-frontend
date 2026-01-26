import{N as s,j as i}from"./iframe-D8l9BGis.js";import{V as n}from"./VelgInternStatus-DZ7Y8OHa.js";import{w as d,c as o}from"./ContextDecorators-KmkLxdOV.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DECLEwbm.js";import"./Tag-Qlq6vGjg.js";import"./CircleSlash-DCzrjBRS.js";import"./Reception-BafnohTn.js";import"./SealCheckmark-CAUc0hjd.js";import"./PersonChat-4paPMk7y.js";import"./MagnifyingGlass-DsC-uLtM.js";import"./KandidatlisteContext--tuHKiNq.js";import"./OrganisasjonsnummerAlert-DQLutb3A.js";import"./VStack-B0hY9ntf.js";import"./BasePrimitive-DQuU5A7Q.js";import"./Box-DWh8wLnh.js";import"./List-D4rYQwke.js";import"./Link-nD0NnHfS.js";import"./KandidatHendelseTag-BG0GYoSg.js";import"./ChatExclamationmark-DnSlsKaK.js";import"./FileXMark-aV0bDqes.js";import"./Trash-CtYOsaOd.js";import"./HandShakeHeart-CK2uE5i6.js";import"./Calendar-DjYZmVha.js";import"./ThumbUp-CsBZxtY2.js";import"./Table-CwSmWQEg.js";import"./index-DflwV3gF.js";import"./index-B40KJ5b4.js";import"./util-CAbY6blA.js";import"./Dropdown-Bkw08_Yn.js";import"./useControllableState-CSpkSaA9.js";import"./Popover-BkTsGPkC.js";import"./floating-ui.react-uksW3Zsc.js";import"./Modal.context-QsBti5gJ.js";import"./DismissableLayer-oyTpsV4W.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BiVm7P29.js";import"./Pencil-B6p6FOyY.js";const P={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,P as default};
