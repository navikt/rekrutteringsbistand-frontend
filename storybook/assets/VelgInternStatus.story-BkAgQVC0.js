import{aL as s,j as i}from"./iframe-B5lap-Ku.js";import{w as d,c as o}from"./ContextDecorators-e6rh6jqN.js";import{V as n}from"./VelgInternStatus-CYJt4axM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C0nj-sEy.js";import"./OrganisasjonsnummerAlert-Cid1IVtu.js";import"./VStack-BAOUzk4Q.js";import"./BasePrimitive-JTxShD_Z.js";import"./List-BTCphmi9.js";import"./Link-B4ZX8J7S.js";import"./KandidatHendelseTag-DC5SqOk2.js";import"./Tag-DijBKXLj.js";import"./FileXMark-BONsLRyz.js";import"./Trash-ADvoL7uR.js";import"./HandShakeHeart-CrVsSIsC.js";import"./Calendar-nE1M2tRJ.js";import"./ThumbUp-CJ1CrxUC.js";import"./Table-DXoj44Y2.js";import"./util-9NfOLJI3.js";import"./format-C3YakQiN.js";import"./match-Dfp5Gb3j.js";import"./parse-DwqJeXH-.js";import"./getDefaultOptions-C7m5dLFw.js";import"./parseISO-Cd2_vPbt.js";import"./util-BCPyWica.js";import"./InternStatusTag-P5AIkahN.js";import"./CircleSlash-BPOUDHjM.js";import"./XMarkOctagon-_KwcdwYy.js";import"./Reception-CLms-o9g.js";import"./SealCheckmark-1uZJUR7K.js";import"./PersonChat-VH_52g-U.js";import"./MagnifyingGlass-VjpFg4U7.js";import"./Dropdown-Cjk2Q7o7.js";import"./useControllableState-DGruGuX1.js";import"./Popover-DmJ5VD8s.js";import"./floating-ui.react-DL-ezC40.js";import"./Date.Input-Bqz9kZmu.js";import"./useFormField-CbCCiLm3.js";import"./ChevronDown-ZgbNc0TD.js";import"./Modal.context-ZJjq0Plj.js";import"./DismissableLayer-C84ykXs6.js";import"./useDescendant-CgX9pFMc.js";import"./useClientLayoutEffect-C5Qcaslz.js";import"./Pencil-BCuOz38C.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
