import{aK as s,j as i}from"./iframe-DX9y8s0p.js";import{w as d,c as o}from"./ContextDecorators-Cjlwqje6.js";import{V as n}from"./VelgInternStatus-Dxn_A6V8.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BgGQs1aF.js";import"./OrganisasjonsnummerAlert-wq-PWVhe.js";import"./VStack-BuoRLqFc.js";import"./BasePrimitive-n7t3DUXz.js";import"./List-CRuB2vXR.js";import"./Link-CE8mhjrR.js";import"./KandidatHendelseTag-DAfkQLOm.js";import"./Tag-DLJApF3O.js";import"./ChatExclamationmark-BaemJk_4.js";import"./FileXMark-BkK3__05.js";import"./Trash-Bd87jGlN.js";import"./HandShakeHeart-D0v5wORh.js";import"./Calendar-BTafpFij.js";import"./ThumbUp-DrDogaZf.js";import"./Table-DJuofRSv.js";import"./util-BeOVg5eS.js";import"./format-Dx5xwboz.js";import"./match-B_ykZKeH.js";import"./parse-BBuikJwA.js";import"./getDefaultOptions-Btv2vEbm.js";import"./parseISO-vl75CQb4.js";import"./index-Be7PHb8R.js";import"./index-B40KJ5b4.js";import"./isBefore-8anyI0-P.js";import"./util-BEto0Asq.js";import"./InternStatusTag-D_e0TbNu.js";import"./CircleSlash-unWCY0OS.js";import"./XMarkOctagon-S7XQwh1v.js";import"./Reception-fK8zw_dY.js";import"./SealCheckmark-BMAUkqeP.js";import"./PersonChat-3s43jqH8.js";import"./MagnifyingGlass-CJoCy806.js";import"./Dropdown-BI3WNMjX.js";import"./useControllableState-DG5wg-Pt.js";import"./Popover-BC9Mr5Gu.js";import"./floating-ui.react-Cf24XkUu.js";import"./Date.Input-BDB_uQzU.js";import"./useFormField-DGeky4xf.js";import"./ChevronDown-kOA26EDn.js";import"./Modal.context-CQeCPNOL.js";import"./DismissableLayer-Dlf6c4kf.js";import"./useDescendant-CltYyeMp.js";import"./useClientLayoutEffect-hednBzpC.js";import"./Pencil-Dr6eZ4BA.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
