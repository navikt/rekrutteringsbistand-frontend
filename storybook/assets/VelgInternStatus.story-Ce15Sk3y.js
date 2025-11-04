import{P as s,j as i}from"./iframe-BHOx9B5b.js";import{V as n}from"./VelgInternStatus-BALJaDdz.js";import{w as d,c as o}from"./ContextDecorators-2UbCvTD3.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D8iqcdMD.js";import"./Tag-BadF4dPH.js";import"./CircleSlash-CClKArLN.js";import"./XMarkOctagon-DIyDRUAK.js";import"./Reception-BgQ7qNDs.js";import"./SealCheckmark-B2SIDxxy.js";import"./PersonChat-Djq0Wypa.js";import"./MagnifyingGlass-7Hx1H-_r.js";import"./KandidatlisteContext-PdvcG0Kw.js";import"./OrganisasjonsnummerAlert-BzQj5vvO.js";import"./VStack-CmLA3gnA.js";import"./BasePrimitive-SkRKoGXq.js";import"./List-_fOxGsS0.js";import"./Link-CgwqW9aN.js";import"./KandidatHendelseTag-2_0YGvkp.js";import"./ChatExclamationmark-8ugFK-GN.js";import"./FileXMark-BrjqZNmO.js";import"./Trash-OENCU4YY.js";import"./HandShakeHeart-vBuPvVGQ.js";import"./Calendar-DuWWARUT.js";import"./ThumbUp-B_hDBLiw.js";import"./Table-ClzuaGNZ.js";import"./util-DmSLrwrq.js";import"./parse-Dyx89_Ry.js";import"./getDefaultOptions-DwRyr_Q7.js";import"./parseISO-CqNQisVW.js";import"./index-C3Kl7Ykz.js";import"./index-B40KJ5b4.js";import"./isBefore-CVE6uPQu.js";import"./util-BeBCU710.js";import"./Dropdown-LTrOY_m7.js";import"./useControllableState-CMMk7b1o.js";import"./Popover-B0G3dP6o.js";import"./floating-ui.react-C7cTNDuv.js";import"./Date.Input-BAjUfhRV.js";import"./useFormField-DtUBbpyB.js";import"./ChevronDown-tvniP40I.js";import"./Modal.context-V4MFRuxC.js";import"./DismissableLayer-Cx9euIV1.js";import"./useDescendant-BD6yfJ31.js";import"./useClientLayoutEffect-FxKx5dnQ.js";import"./Pencil-CUfiB_cj.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
