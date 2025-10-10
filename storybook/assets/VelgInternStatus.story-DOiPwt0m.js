import{j as e}from"./iframe-BZGI7Ig_.js";import{w as o,c as d}from"./ContextDecorators-BtIsLzpi.js";import{V as n}from"./VelgInternStatus-Bnrpf9zG.js";import{I as s}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./StillingsContext-0iH-_-OF.js";import"./index-DZOmuGKb.js";import"./index-aGn2uf-9.js";import"./stilling.dto-Dd_wOmtL.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./startOfDay-lTP3GKUn.js";import"./SWRLaster-BBaxFb3n.js";import"./Feilmelding-G6ggJxep.js";import"./CopyButton-5dj8m9cm.js";import"./Checkmark-DLuShYHm.js";import"./Sidelaster-BMfr2Uml.js";import"./KandidatlisteContext-C78b2UBh.js";import"./OrganisasjonsnummerAlert-svrmRo8s.js";import"./VStack-CJffh7sy.js";import"./BasePrimitive-Dl-LHXGo.js";import"./List-CSL1zfoc.js";import"./Link-D091lGCu.js";import"./KandidatHendelseTag-D-j5Jvgt.js";import"./Tag-BDSeVM5B.js";import"./FileXMark-W-BAfzMc.js";import"./Trash-ZF0t-SRt.js";import"./HandShakeHeart-Bq1y94Ar.js";import"./Calendar-BbDlJIM5.js";import"./ThumbUp-C2gsDPJF.js";import"./Table-Sv3lnO08.js";import"./util-nc4EAXcZ.js";import"./format-DCzO9vOU.js";import"./match-DCN6kGAU.js";import"./parseISO-DJIM71K9.js";import"./parse-CG8pKw-3.js";import"./getDefaultOptions-YA01bVNM.js";import"./util-Bzm_XTyQ.js";import"./InternStatusTag-Cg5EpmFf.js";import"./CircleSlash-CE-9SPkF.js";import"./XMarkOctagon-CacTxqM5.js";import"./Reception-WHVoFyap.js";import"./SealCheckmark-X62GPX_Q.js";import"./PersonChat-BYzYpGMf.js";import"./MagnifyingGlass-XfUkpTtt.js";import"./Dropdown-CM4ANDrX.js";import"./useControllableState-DL5RPXQs.js";import"./Popover-C7Sth1iA.js";import"./floating-ui.react-CePIoC5e.js";import"./Date.Input-Cog2CMqs.js";import"./useFormField-Czj1vEkU.js";import"./ChevronDown-BQhdyX28.js";import"./Modal.context-CzvA4Cfh.js";import"./DismissableLayer-RlPm4z_T.js";import"./useDescendant-yAaYD9qp.js";import"./useClientLayoutEffect-CLUbOuYY.js";import"./Pencil-CTa2U-LU.js";const ct={tags:["autodocs"],component:n},r={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>o(()=>e.jsx(n,{...t}))},a={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>o(()=>e.jsx(n,{...t}),d({lukket:!0}))},i={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>o(()=>e.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>e.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
