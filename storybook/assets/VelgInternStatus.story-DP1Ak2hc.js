import{aK as s,j as i}from"./iframe-D5GLcELV.js";import{w as d,c as o}from"./ContextDecorators-C7vFFwWb.js";import{V as n}from"./VelgInternStatus-Dy_l09vG.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SulhFiUf.js";import"./OrganisasjonsnummerAlert-B9qpUYm5.js";import"./VStack-Bv0JWG-f.js";import"./BasePrimitive-DC9lFHA7.js";import"./List-BCZK_Xy2.js";import"./Link-CHu4RiPq.js";import"./KandidatHendelseTag-Bo8UKgDh.js";import"./Tag-DghhMzmu.js";import"./ChatExclamationmark-C51-UEDe.js";import"./FileXMark-BYjEGPc3.js";import"./Trash-BsCYRgD8.js";import"./HandShakeHeart-B7rRvMPR.js";import"./Calendar-CVA3Syd5.js";import"./ThumbUp-3OU6stig.js";import"./Table-DrxQ9pIW.js";import"./util-CtSO-HR5.js";import"./format-DeHyM4JK.js";import"./match-BGExYOs8.js";import"./parse-CIB-TC0h.js";import"./getDefaultOptions-By9Y0qpY.js";import"./parseISO-BsvmJ_As.js";import"./index-aoNK6OM-.js";import"./index-B40KJ5b4.js";import"./isBefore-D3QM3TL-.js";import"./util-HZY0gpg6.js";import"./InternStatusTag-nQ1PYMUS.js";import"./CircleSlash-3VcAarJ7.js";import"./XMarkOctagon-CDVnXD0a.js";import"./Reception-blRPyR7f.js";import"./SealCheckmark-C-RCcNXl.js";import"./PersonChat-xKjoUIkm.js";import"./MagnifyingGlass-CCQKKOBB.js";import"./Dropdown-DcZjvkHd.js";import"./useControllableState-C6IT1995.js";import"./Popover-BHAfR79i.js";import"./floating-ui.react-BaVvFCSb.js";import"./Date.Input-BcVGPYHY.js";import"./useFormField-69eCTCUv.js";import"./ChevronDown-_ie1QdRq.js";import"./Modal.context-4Pv1BvK5.js";import"./DismissableLayer-B9ql3sCc.js";import"./useDescendant-4xTvoj0i.js";import"./useClientLayoutEffect-DGZN2Qdt.js";import"./Pencil-DMVVnIhp.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
