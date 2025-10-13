import{j as s}from"./iframe-Bk2ExMXp.js";import{w as d,c as o}from"./ContextDecorators-CaM--hvF.js";import{V as n}from"./VelgInternStatus-PJ-5urJ9.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C4GS2fi3.js";import"./OrganisasjonsnummerAlert-z-4yC7BL.js";import"./VStack-BrgJZela.js";import"./BasePrimitive-B6Z69lzu.js";import"./List-Bj-Vbc_Z.js";import"./Link-ppp_mE_-.js";import"./KandidatHendelseTag-DBqbqhy3.js";import"./Tag-DLOBuFrJ.js";import"./FileXMark-BWnhuBxQ.js";import"./Trash-53uNVUd4.js";import"./HandShakeHeart-FINHHUTp.js";import"./Calendar-PfOWmbw2.js";import"./ThumbUp-BFeRRNd8.js";import"./Table-Cc2h9Gm3.js";import"./util-D0bY77Dv.js";import"./format-CAywRZQ0.js";import"./match-B7tcGX9u.js";import"./parseISO-7TgmH8mW.js";import"./parse-DosHQWMe.js";import"./getDefaultOptions-Ck1xufvy.js";import"./util-Bj9I7rfg.js";import"./InternStatusTag-BXETsio5.js";import"./CircleSlash-CkKsJg4m.js";import"./XMarkOctagon-D992r8xw.js";import"./Reception-CgjjvJkY.js";import"./SealCheckmark-isL2ayZt.js";import"./PersonChat-DlWadD3M.js";import"./MagnifyingGlass-CbfcTZhI.js";import"./Dropdown-BIqwtXU6.js";import"./useControllableState-JREvtEYi.js";import"./Popover-DcITeSOs.js";import"./floating-ui.react-8gdL2Sbe.js";import"./Date.Input-Dy-LTzXk.js";import"./useFormField-Bzn8rkcz.js";import"./ChevronDown-B7VCVl_G.js";import"./Modal.context-m-44LJgz.js";import"./DismissableLayer-Cpx_wJKs.js";import"./useDescendant-DkY-_hV3.js";import"./useClientLayoutEffect-CIrrbVtR.js";import"./Pencil-BpriiMUI.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
