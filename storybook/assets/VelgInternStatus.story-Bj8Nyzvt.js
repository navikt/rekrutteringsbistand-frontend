import{N as s,j as i}from"./iframe-CkzMmpLa.js";import{V as n}from"./VelgInternStatus-BYBxqHHT.js";import{w as d,c as o}from"./ContextDecorators-1m3sbBI7.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DAa-2J4F.js";import"./Tag-W8lZEK2d.js";import"./CircleSlash-BZYYUDsk.js";import"./XMarkOctagon-Dv65YHVn.js";import"./Reception-DqXcXph_.js";import"./SealCheckmark-BD4gHEId.js";import"./PersonChat-DUPvmZ21.js";import"./MagnifyingGlass-CqjPUslO.js";import"./KandidatlisteContext-B0DkhyJ5.js";import"./OrganisasjonsnummerAlert-BC6tnlJ7.js";import"./VStack-CEafswES.js";import"./BasePrimitive-CKAMW9nX.js";import"./Box-CdBUid5D.js";import"./List--_c70d5t.js";import"./Link-D5Rkt3KG.js";import"./KandidatHendelseTag-Cywuef7d.js";import"./ChatExclamationmark-CjXK0Yi-.js";import"./FileXMark-Dvxqx_pO.js";import"./Trash-rapViwFi.js";import"./HandShakeHeart-C54kqonb.js";import"./Calendar-SXw1zHFn.js";import"./ThumbUp-D25aHmVk.js";import"./ExclamationmarkTriangle-C26Wmt--.js";import"./Table-u8yvfB5y.js";import"./index-CtEzum-F.js";import"./index-B40KJ5b4.js";import"./util-DgmYyb6R.js";import"./Dropdown-jnV093A7.js";import"./useControllableState-mdfm_5Wi.js";import"./Popover-CzcBzvnM.js";import"./floating-ui.react-Wvsvcain.js";import"./Modal.context-DyolBz4N.js";import"./DismissableLayer-PtrKV-0-.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CARqtUut.js";import"./Pencil-jGZ0UgjA.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
