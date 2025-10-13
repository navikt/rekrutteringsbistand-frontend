import{j as s}from"./iframe-DTHA2nxD.js";import{w as d,c as o}from"./ContextDecorators-BvxXSgmB.js";import{V as n}from"./VelgInternStatus-CwA9-YVW.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DAboKifI.js";import"./OrganisasjonsnummerAlert-BVVLJQbe.js";import"./VStack-BuSfiGmL.js";import"./BasePrimitive-27uWw9nl.js";import"./List-B0tDBA85.js";import"./Link-Cnn3O-42.js";import"./KandidatHendelseTag-NyFSbea_.js";import"./Tag-BpBnduOF.js";import"./FileXMark-ohwLyZXm.js";import"./Trash-BkGVVOvI.js";import"./HandShakeHeart-B5iBofOb.js";import"./Calendar-DjNHtV_N.js";import"./ThumbUp-DhTEf4Mz.js";import"./Table-CXJIpCsj.js";import"./util-Bee2RjYD.js";import"./format-DHJbBaGr.js";import"./match-FN6Ws5zG.js";import"./parseISO-itZVSozC.js";import"./parse-C__7ktr7.js";import"./getDefaultOptions-BGp9H_mJ.js";import"./util-DX5gj5C0.js";import"./InternStatusTag-KGRW9Rhw.js";import"./CircleSlash-CVFVOoi5.js";import"./XMarkOctagon-Yo_Rt9TP.js";import"./Reception-BbbiBHPt.js";import"./SealCheckmark-4zTovF83.js";import"./PersonChat-DfGGdvlI.js";import"./MagnifyingGlass-B8MwbnGN.js";import"./Dropdown-D8NfyOF-.js";import"./useControllableState-D9O5mgzD.js";import"./Popover-vnEK5FnI.js";import"./floating-ui.react-lLWQ_lhn.js";import"./Date.Input-Cr4fsRHX.js";import"./useFormField-DRV6dlvA.js";import"./ChevronDown-ItR2lOu8.js";import"./Modal.context-Ckallw7p.js";import"./DismissableLayer-DYtyoKZr.js";import"./useDescendant-BpgT1WKN.js";import"./useClientLayoutEffect-DFb_s-96.js";import"./Pencil-DfBNBdR6.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
