import{Y as s,j as i}from"./iframe-ByzEnOxG.js";import{w as d,c as o}from"./ContextDecorators-BtgFJAn-.js";import{V as n}from"./VelgInternStatus-BPfr6DqR.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-32deajk_.js";import"./OrganisasjonsnummerAlert-CjWKWI09.js";import"./VStack-BUNeWq07.js";import"./BasePrimitive-ADC_nWuD.js";import"./List-B9e_Uqcn.js";import"./Link-DP8L-u5t.js";import"./KandidatHendelseTag-DB-zDha5.js";import"./Tag-g1oZ3pmM.js";import"./ChatExclamationmark-CS5U7PlC.js";import"./FileXMark-9GnYKY-v.js";import"./Trash-MmHSDIpY.js";import"./HandShakeHeart-T_GBk1ak.js";import"./Calendar-DEfQx0cd.js";import"./ThumbUp-DIYI02ff.js";import"./Table-hnbPft1Z.js";import"./util-D-V2Ntvq.js";import"./format-jrJ_Xa-f.js";import"./match-C9jzbOjx.js";import"./parse-De4qOPe7.js";import"./getDefaultOptions-BH1O2UCm.js";import"./parseISO-CJWGJaij.js";import"./index-CDMSrJPg.js";import"./index-B40KJ5b4.js";import"./isBefore-DuuV8X7P.js";import"./util-BXsTr_LB.js";import"./InternStatusTag-C3WewCq1.js";import"./CircleSlash-C8eOKJPR.js";import"./XMarkOctagon-DiLkq8U1.js";import"./Reception-Bu-g2jov.js";import"./SealCheckmark-uJNMQQZd.js";import"./PersonChat-BRl-Xbsy.js";import"./MagnifyingGlass-C2nDmOMB.js";import"./Dropdown-BSV1s-9N.js";import"./useControllableState-BF3zxFoJ.js";import"./Popover-ByhCh30h.js";import"./floating-ui.react-CIrDHEIY.js";import"./Date.Input-5lHBwM5y.js";import"./useFormField-CJY1G2Gz.js";import"./ChevronDown-BvbvSwjf.js";import"./Modal.context-CpSCLtx0.js";import"./DismissableLayer-BtNcpslw.js";import"./useDescendant-Dpz54Aj9.js";import"./useClientLayoutEffect-6mKBGoH_.js";import"./Pencil-DsDnD8u6.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
