import{V as s,j as i}from"./iframe-ft6w6Wdm.js";import{V as n}from"./VelgInternStatus-CZ8EPYx6.js";import{w as d,c as o}from"./ContextDecorators-DwEJcRYu.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DM9tc1SN.js";import"./Tag-BlUIK-vn.js";import"./CircleSlash-DeMHoM0A.js";import"./XMarkOctagon-DidDOOKM.js";import"./Reception-CajVK31_.js";import"./SealCheckmark-C0uSpCQU.js";import"./PersonChat-CXS685YC.js";import"./MagnifyingGlass-Box4sjpo.js";import"./KandidatlisteContext-B1I5LHQm.js";import"./OrganisasjonsnummerAlert-Ciny46VT.js";import"./VStack-DNeHZhTP.js";import"./BasePrimitive-_eBTgk3A.js";import"./List-B_6gCJvD.js";import"./Link-Bjy5BopZ.js";import"./KandidatHendelseTag-BzevYHoG.js";import"./ChatExclamationmark-CbWzzwkU.js";import"./FileXMark-CapRqFxj.js";import"./Trash-BeWHCtV-.js";import"./HandShakeHeart-D9kNQldF.js";import"./Calendar-BBxBl6ki.js";import"./ThumbUp-D5VKUCEZ.js";import"./Table-wKUEyQsU.js";import"./util-Cb7eeMNc.js";import"./parse-PSqnlPmE.js";import"./getDefaultOptions-CTJLxZl4.js";import"./parseISO-Dhwx3Di0.js";import"./index-CEl6i_yI.js";import"./index-B40KJ5b4.js";import"./isBefore-FHSZ9UXM.js";import"./util-BGf-ull0.js";import"./Dropdown-CLk_5nPF.js";import"./useControllableState-BpidpNKQ.js";import"./Popover-DDdCRw7i.js";import"./floating-ui.react-Dms4syf-.js";import"./Date.Input-Bsl0jub-.js";import"./useFormField-D1Ch0Fnu.js";import"./ChevronDown-CIAFQB1t.js";import"./Modal.context-DA2sPsBB.js";import"./DismissableLayer-DhaTc8VR.js";import"./useDescendant-DiEit0FA.js";import"./useClientLayoutEffect-C0UqTwEf.js";import"./Pencil-OAlsv9L0.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
