import{X as s,j as i}from"./iframe-BI30XQnF.js";import{V as n}from"./VelgInternStatus-hVtdaYEf.js";import{w as d,c as o}from"./ContextDecorators-DuKEksGm.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Bks4sJz7.js";import"./Tag-Dxs0Vko4.js";import"./CircleSlash-DNlY45_B.js";import"./XMarkOctagon-DhsjDgCx.js";import"./Reception-BIvn_uJ1.js";import"./SealCheckmark-CTJrgSph.js";import"./PersonChat-DKca6zFW.js";import"./MagnifyingGlass-Zpxtdx3z.js";import"./KandidatlisteContext-BnxcNx4Y.js";import"./OrganisasjonsnummerAlert-W15zpEie.js";import"./VStack-CZMV2HC4.js";import"./BasePrimitive-CZE9qk7F.js";import"./List-BIkHkuYY.js";import"./Link-D4z1f04J.js";import"./KandidatHendelseTag-CSskVXBJ.js";import"./ChatExclamationmark-DF-1Cb_k.js";import"./FileXMark-DnOgS1YU.js";import"./Trash-3JQrFA94.js";import"./HandShakeHeart-DAxA4Ims.js";import"./Calendar-iJrxzXuD.js";import"./ThumbUp-CKLFu6F5.js";import"./Table-nidyqZEJ.js";import"./index-DkFBChQ6.js";import"./index-B40KJ5b4.js";import"./util-fxl2veKI.js";import"./Dropdown-Bs5_bCZ7.js";import"./useControllableState-DEvJbc5V.js";import"./Popover-BLioJgLw.js";import"./floating-ui.react-BxirlH8W.js";import"./Date.Input-Bb1wLdYj.js";import"./useFormField-BSE-6FGG.js";import"./ChevronDown-CIFnBDD2.js";import"./Modal.context-CrBnhJq6.js";import"./DismissableLayer-UGMmz6iD.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DyDkmotJ.js";import"./Pencil-knGRv3yv.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
