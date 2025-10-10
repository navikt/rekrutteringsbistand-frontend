import{j as e}from"./iframe-WlOW16KT.js";import{w as o,c as d}from"./ContextDecorators-Bn_HLXlk.js";import{V as n}from"./VelgInternStatus-DC5mmvrQ.js";import{I as s}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./StillingsContext-BX8ONHb7.js";import"./index-CDp5tk2I.js";import"./index-CibxlY9n.js";import"./stilling.dto-CoZWRjru.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./startOfDay-lTP3GKUn.js";import"./SWRLaster-BVqtMFKJ.js";import"./Feilmelding-4HUNkcbf.js";import"./CopyButton-BzrJWFs_.js";import"./Checkmark-BzyWZ4Ad.js";import"./Sidelaster-CN63qN-4.js";import"./KandidatlisteContext-CONyjdyI.js";import"./OrganisasjonsnummerAlert-YUoWQBHa.js";import"./VStack-DOF5c85d.js";import"./BasePrimitive-D_E869Ly.js";import"./List-DnWEJrOY.js";import"./Link-BMPYEf3M.js";import"./KandidatHendelseTag-Cm8onx4V.js";import"./Tag-CiLo6Qvb.js";import"./FileXMark-DBQzcoy9.js";import"./Trash-DDTWPXzn.js";import"./HandShakeHeart-DjnOpuQw.js";import"./Calendar-Db467AUg.js";import"./ThumbUp-C9qL4nzY.js";import"./Table-B_eAAvaS.js";import"./util-JGHCy8PM.js";import"./format-lmga2jL-.js";import"./match-CItYnUcs.js";import"./parseISO-DJIM71K9.js";import"./parse-DIblDuu1.js";import"./getDefaultOptions-CqbKhm2h.js";import"./util-eRQ1H9rL.js";import"./InternStatusTag-E3ns9-Cq.js";import"./CircleSlash-UMex7LWz.js";import"./XMarkOctagon-BEJXzbk1.js";import"./Reception-8LErAEJ0.js";import"./SealCheckmark-Bs8KIH4V.js";import"./PersonChat-n6kGGOx-.js";import"./MagnifyingGlass-BGOKBaQn.js";import"./Dropdown-XosxyM22.js";import"./useControllableState-CCA-pbh4.js";import"./Popover-PckxfrY7.js";import"./floating-ui.react-DtbDoruD.js";import"./Date.Input-CTWCdr_T.js";import"./useFormField-DD8Yv9fI.js";import"./ChevronDown-kr8OAsaw.js";import"./Modal.context-CPaeYima.js";import"./DismissableLayer-B2ExQGae.js";import"./useDescendant-Dygdcpjo.js";import"./useClientLayoutEffect-Sgzh84oK.js";import"./Pencil-iBbWK6HY.js";const ct={tags:["autodocs"],component:n},r={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>o(()=>e.jsx(n,{...t}))},a={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>o(()=>e.jsx(n,{...t}),d({lukket:!0}))},i={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>o(()=>e.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>e.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />)
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.AKTUELL,
    lukketKandidatliste: true
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />, createKandidatlisteMock({
    lukket: true
  }))
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'dummy',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: () => withStillingsKandidatliste(() => <div className='flex flex-col gap-4'>
        {Object.values(InternKandidatstatus).map(s => <VelgInternStatus key={s} kandidatnr={\`kandidat-\${s}\`} status={s} lukketKandidatliste={false} />)}
      </div>)
}`,...i.parameters?.docs?.source}}};export{i as FlereStatuser,a as LukketListe,r as Vurderes,ct as default};
