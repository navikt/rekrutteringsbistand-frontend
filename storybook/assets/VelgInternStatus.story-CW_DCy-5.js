import{j as s}from"./iframe-BAewwkeG.js";import{w as d,c as o}from"./ContextDecorators-CBnNhaeJ.js";import{V as n}from"./VelgInternStatus-C_WP8Liy.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Bn92wMOu.js";import"./OrganisasjonsnummerAlert-BH8Lhl2-.js";import"./VStack-CXI2svzi.js";import"./BasePrimitive-4knkzmP5.js";import"./List-BxHSDXvl.js";import"./Link-CPqVa9BH.js";import"./KandidatHendelseTag-CDB_MZMJ.js";import"./Tag-ft2zgNkX.js";import"./ChatExclamationmark-CiEunF_E.js";import"./FileXMark-BMJk6nUx.js";import"./Trash-ZbXVgxpa.js";import"./HandShakeHeart-Uxce-0Ck.js";import"./Calendar-C2wH3ZKH.js";import"./ThumbUp-breDGNtp.js";import"./Table-BN-ar8bS.js";import"./util-DWsJO9vX.js";import"./format-C3LjDUB4.js";import"./match-BwSFFpFi.js";import"./parseISO-Do-jGKA2.js";import"./parse-7oeilopQ.js";import"./getDefaultOptions-BGnhS9gy.js";import"./util-iUGWdSys.js";import"./InternStatusTag-CfbtLqgT.js";import"./CircleSlash-B6yD6jk9.js";import"./XMarkOctagon-R8Qv1S2j.js";import"./Reception-B5w1VlSm.js";import"./SealCheckmark-9-3gRBhX.js";import"./PersonChat-BAMMK2H0.js";import"./MagnifyingGlass-Da4awYPN.js";import"./Dropdown-uUwEYG1F.js";import"./useControllableState-Cqtxf3VW.js";import"./Popover-BiH71nUt.js";import"./floating-ui.react-D1PTwaoy.js";import"./Date.Input-D0t2X3FR.js";import"./useFormField-BJTd7Cub.js";import"./ChevronDown-BxKDu35T.js";import"./Modal.context-DrU834AP.js";import"./DismissableLayer-CN0GulJB.js";import"./useDescendant-C00DRe1V.js";import"./useClientLayoutEffect-BcavQbKr.js";import"./Pencil-DlknACg4.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
