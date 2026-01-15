import{O as s,j as i}from"./iframe-BJZT-pV2.js";import{V as n}from"./VelgInternStatus-BWSTItzI.js";import{w as d,c as o}from"./ContextDecorators-GILeYuxF.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DlzxM31z.js";import"./Tag-Dhce9dMK.js";import"./CircleSlash-iuf_C-t9.js";import"./XMarkOctagon-DkpYfUC9.js";import"./Reception-BTJvW6cg.js";import"./SealCheckmark-BvSN8K0k.js";import"./PersonChat-CsZ56GDc.js";import"./MagnifyingGlass-DKfgeBn5.js";import"./KandidatlisteContext-BBzNoh1n.js";import"./OrganisasjonsnummerAlert-BzNKGtv5.js";import"./VStack-C0iAkaF0.js";import"./BasePrimitive-BURutVTi.js";import"./List-CUa7SAJy.js";import"./Link-CTWJTCeg.js";import"./KandidatHendelseTag-mluJCksq.js";import"./ChatExclamationmark-vkU7yaSK.js";import"./FileXMark-eege6pqK.js";import"./Trash-DetofLY0.js";import"./HandShakeHeart-D3ZDILka.js";import"./Calendar-B5jaW0qy.js";import"./ThumbUp-q8PY1-rH.js";import"./ExclamationmarkTriangle-BVRlOXHG.js";import"./Table-BISCMbx9.js";import"./index-BgCKhpKW.js";import"./index-B40KJ5b4.js";import"./util-WEItX0rf.js";import"./Dropdown-CGgCBnAW.js";import"./useControllableState-Bc9HDHWi.js";import"./Popover-IQWetJBH.js";import"./floating-ui.react-CvzncKoC.js";import"./Date.Input-DxWRZeTN.js";import"./useFormField-CbAKSqsY.js";import"./ChevronDown-OwgFQKN0.js";import"./Modal.context-IYi_TOd5.js";import"./DismissableLayer-Cw7xwM7S.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C4CXiR91.js";import"./Pencil-FbcvORJi.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
