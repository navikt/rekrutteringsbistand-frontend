import{j as s}from"./iframe-B2xGUNX-.js";import{w as d,c as o}from"./ContextDecorators-DARO_qRf.js";import{V as n}from"./VelgInternStatus-Bz7qaTem.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-iMCDFI9i.js";import"./OrganisasjonsnummerAlert-gjj98bPf.js";import"./VStack-LgcJaDfa.js";import"./BasePrimitive-AscQ94av.js";import"./List-BT2hrq8R.js";import"./Link-KW-0U3Oy.js";import"./KandidatHendelseTag-CZrPE1Ic.js";import"./Tag-DO0bA650.js";import"./ChatExclamationmark-BaqHWrX8.js";import"./FileXMark-CBNT-_yc.js";import"./Trash-CdE_28Ci.js";import"./HandShakeHeart-DwzG4i_Y.js";import"./Calendar-Le8lwLWI.js";import"./ThumbUp-Bnf09OAs.js";import"./Table-D1aYPWvO.js";import"./util-CJjk-0R0.js";import"./format-DbvlSUt5.js";import"./match-C0QkKNCv.js";import"./parseISO-IukRNK7-.js";import"./parse-BWBOIAJT.js";import"./getDefaultOptions-BP3X6oux.js";import"./util-B4sWpGcm.js";import"./InternStatusTag-D8wod4E7.js";import"./CircleSlash-D1wC9nJz.js";import"./XMarkOctagon-AyJUSvLz.js";import"./Reception-D1YuTedF.js";import"./SealCheckmark-BRYfZ2HW.js";import"./PersonChat-8V0d_TPr.js";import"./MagnifyingGlass-DtFWyAkG.js";import"./Dropdown-CoV8L5Pb.js";import"./useControllableState-BjNavWkk.js";import"./Popover-DaRF_nw3.js";import"./floating-ui.react-BB9BoIX5.js";import"./Date.Input-DyqbiFvC.js";import"./useFormField-DJnSCjKQ.js";import"./ChevronDown-CnFUOh5J.js";import"./Modal.context-BVPj6e4T.js";import"./DismissableLayer-CTxK1av6.js";import"./useDescendant-vQDS0gox.js";import"./useClientLayoutEffect-Db4Q6k2U.js";import"./Pencil-DKPVtbtf.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
