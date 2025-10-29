import{P as s,j as i}from"./iframe-CnM7RT4h.js";import{w as d,c as o}from"./ContextDecorators-BLW72MqT.js";import{V as n}from"./VelgInternStatus-CDZIHWpH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DyOfJxEG.js";import"./OrganisasjonsnummerAlert-CIyafJD8.js";import"./VStack-q_qdqDEK.js";import"./BasePrimitive-BcRt1gCV.js";import"./List-C38Qf_at.js";import"./Link-B4LcRRHa.js";import"./KandidatHendelseTag-mSc9II9L.js";import"./Tag-BGgcBDkO.js";import"./ChatExclamationmark-NytTTLa3.js";import"./FileXMark-DPgsERTd.js";import"./Trash-FsJZeVDl.js";import"./HandShakeHeart-BFpOtlHB.js";import"./Calendar-D9k6rPRi.js";import"./ThumbUp-C_2BI2ud.js";import"./Table-Dvx6_-ke.js";import"./util-BJ4TtLU-.js";import"./parse-DTRzWOAH.js";import"./getDefaultOptions-FxIfy1dz.js";import"./parseISO-Bt1F7znG.js";import"./index-r9hVGdVq.js";import"./index-B40KJ5b4.js";import"./isBefore-DmiPH2e_.js";import"./util-CEOuGiz7.js";import"./InternStatusTag-DaN8phk8.js";import"./CircleSlash-3Zc_y9XY.js";import"./XMarkOctagon-CUgBW4H0.js";import"./Reception-CdPuJKzy.js";import"./SealCheckmark-Cl1GHWJV.js";import"./PersonChat-DcO_NsOk.js";import"./MagnifyingGlass-BF6bMqO1.js";import"./Dropdown-B6nbuRLb.js";import"./useControllableState-Cn-1utpz.js";import"./Popover-Bk_EGq0e.js";import"./floating-ui.react-pnL2__Kf.js";import"./Date.Input-ZulnjPi4.js";import"./useFormField-DKGrE0Rs.js";import"./ChevronDown-DNt8Y1Vb.js";import"./Modal.context-vVkaDHEy.js";import"./DismissableLayer-BfJi0g9l.js";import"./useDescendant-CRShSGYi.js";import"./useClientLayoutEffect-CgR7ggQ6.js";import"./Pencil-lkf01aDR.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
