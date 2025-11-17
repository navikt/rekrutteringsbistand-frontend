import{V as s,j as i}from"./iframe-zbUhGjti.js";import{V as n}from"./VelgInternStatus-B46Ow8pX.js";import{w as d,c as o}from"./ContextDecorators-D15_rS6s.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DHHX3LqC.js";import"./Tag-K6bQ2sjM.js";import"./CircleSlash-BXw6lQD3.js";import"./XMarkOctagon-D0BAfyBK.js";import"./Reception-DmrUD6p4.js";import"./SealCheckmark-Cjx4vLFc.js";import"./PersonChat-DH1g4ewe.js";import"./MagnifyingGlass-DSFYEApz.js";import"./KandidatlisteContext-5NBrRUDf.js";import"./OrganisasjonsnummerAlert-DogTccR8.js";import"./VStack-D2-FbYL0.js";import"./BasePrimitive-ByXS3CFE.js";import"./List-BzV1npJX.js";import"./Link-BLN5eTSs.js";import"./KandidatHendelseTag-CNs8YCU9.js";import"./ChatExclamationmark-taundlQq.js";import"./FileXMark-Cby3Ptey.js";import"./Trash-BSWeFA-4.js";import"./HandShakeHeart-Bzm2p_pH.js";import"./Calendar-BZYoQ7OQ.js";import"./ThumbUp-B-CUqlMN.js";import"./Table-DJHoi2oR.js";import"./util-Bw9VNyjs.js";import"./parse-D_RlzfMW.js";import"./getDefaultOptions-BQd4M5Gn.js";import"./parseISO-DpZcFrkX.js";import"./index-Dx1cgU1m.js";import"./index-B40KJ5b4.js";import"./isBefore-Cfsyz_OO.js";import"./util-Cuj27M8w.js";import"./Dropdown-BSnpdZM6.js";import"./useControllableState-9lWmz1GE.js";import"./Popover-BAl5EnHf.js";import"./floating-ui.react-CORjjwzS.js";import"./Date.Input-D_14jgPo.js";import"./useFormField-DEptfI14.js";import"./ChevronDown-Di096zjX.js";import"./Modal.context-BQceTvJ2.js";import"./DismissableLayer-BP_EiF3f.js";import"./useDescendant-D-B_Vd7C.js";import"./useClientLayoutEffect-0876YNTI.js";import"./Pencil-pHshiVWL.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
