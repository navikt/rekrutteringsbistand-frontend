import{aK as s,j as i}from"./iframe-B0j3dBe_.js";import{w as d,c as o}from"./ContextDecorators-Dr6K2XF0.js";import{V as n}from"./VelgInternStatus-e7FM9BLO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CThpR_0Y.js";import"./OrganisasjonsnummerAlert-Bxy0Rcbz.js";import"./VStack-DbIwrttT.js";import"./BasePrimitive-Dod1M_er.js";import"./List-BYFxz2b-.js";import"./Link-DGDf1XYQ.js";import"./KandidatHendelseTag-UzCePNJV.js";import"./Tag-BNRBoOxy.js";import"./ChatExclamationmark-BynP-iDS.js";import"./FileXMark-C_9Jiyie.js";import"./Trash-IOfx71pU.js";import"./HandShakeHeart-Vczkap1y.js";import"./Calendar-ZqKhZm1M.js";import"./ThumbUp-DKnvruW5.js";import"./Table-DFZx8cdo.js";import"./util-CfoXsJ_z.js";import"./format-qS-sW-Ib.js";import"./match-DHz9fwDB.js";import"./parse-DNW-Wvb-.js";import"./getDefaultOptions-BKY15GUr.js";import"./parseISO-D4PY0Yeo.js";import"./util-Bq54C9Kr.js";import"./InternStatusTag-gzoBHKdK.js";import"./CircleSlash-DCx4AEkC.js";import"./XMarkOctagon-C0h5mgL6.js";import"./Reception-CzLKYT3s.js";import"./SealCheckmark-I3jOPa5L.js";import"./PersonChat-Czd2fv6R.js";import"./MagnifyingGlass-CGh2PMgB.js";import"./Dropdown-D9qakBS7.js";import"./useControllableState-BWgq-Ysb.js";import"./Popover-DrCQFxi7.js";import"./floating-ui.react-g9dkc5xN.js";import"./Date.Input-67tnFGPP.js";import"./useFormField-G-xxxCyd.js";import"./ChevronDown-BxOVmkRo.js";import"./Modal.context-BUox5sdW.js";import"./DismissableLayer-DYXclc2x.js";import"./useDescendant-CHSh_-f7.js";import"./useClientLayoutEffect-_R_noXX6.js";import"./Pencil-CyBcMbj_.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
