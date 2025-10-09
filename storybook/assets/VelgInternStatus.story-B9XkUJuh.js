import{j as e}from"./iframe-DUxtTNxK.js";import{w as o,c as d}from"./ContextDecorators-0GWS18bU.js";import{V as n}from"./VelgInternStatus-DwFSY_HK.js";import{I as s}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./stillingMock-BrGQ3Dix.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./StillingsContext-DwxaThtx.js";import"./index-BB9gl3jm.js";import"./index-0HEPybu3.js";import"./stilling.dto-Bw9Mbzio.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./startOfDay-lTP3GKUn.js";import"./SWRLaster-ahx2Fy0D.js";import"./Feilmelding-BvwgHkOs.js";import"./CopyButton-mlBszqul.js";import"./Checkmark-3br_GopI.js";import"./Sidelaster-Cl1Akhnj.js";import"./KandidatlisteContext-tMH_2NXv.js";import"./OrganisasjonsnummerAlert-Kw2WDzWd.js";import"./VStack-DoqecrzT.js";import"./BasePrimitive-B-03YwKR.js";import"./List-BlNWY6Ar.js";import"./Link-CRlAhKkl.js";import"./KandidatHendelseTag-C7GaS2LG.js";import"./Tag-CGXWCvcz.js";import"./FileXMark-BLSijq_W.js";import"./Trash-DrCBaZmc.js";import"./HandShakeHeart-SYpfDfcJ.js";import"./Calendar-vRZG72bU.js";import"./ThumbUp-D1MY7-bL.js";import"./Table-Cgf_c-8B.js";import"./util-B3kSclT_.js";import"./format-Co7MPrtN.js";import"./match-tiuZ8ZDo.js";import"./parseISO-DJIM71K9.js";import"./parse-B-xC80nj.js";import"./getDefaultOptions-QtkovLFY.js";import"./util-DOP1jEkD.js";import"./InternStatusTag-8LXCzaiC.js";import"./CircleSlash-DzZxKPx8.js";import"./XMarkOctagon-BRHxtZl7.js";import"./Reception-DClBGoe4.js";import"./SealCheckmark-D2VuVw2q.js";import"./PersonChat-DWmpHXb6.js";import"./MagnifyingGlass-DcFLdfke.js";import"./Dropdown-gPm6i20M.js";import"./useControllableState-BZbvvCv1.js";import"./Popover-COO9Mycg.js";import"./floating-ui.react-B3fQZbcy.js";import"./Date.Input-Vql_antk.js";import"./useFormField-QnfnlfxN.js";import"./ChevronDown-D9_c06q4.js";import"./Modal.context-DCuskc3o.js";import"./DismissableLayer-DmBIwcyl.js";import"./useDescendant-CUKpS_dm.js";import"./useClientLayoutEffect-BEQ_m06x.js";import"./Pencil-D93FhzCl.js";const ct={tags:["autodocs"],component:n},r={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>o(()=>e.jsx(n,{...t}))},a={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>o(()=>e.jsx(n,{...t}),d({lukket:!0}))},i={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>o(()=>e.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>e.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
