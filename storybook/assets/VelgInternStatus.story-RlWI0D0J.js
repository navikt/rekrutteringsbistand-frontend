import{aP as s,j as i}from"./iframe-Bs62DkEX.js";import{w as d,c as o}from"./ContextDecorators-2ziKhUW6.js";import{V as n}from"./VelgInternStatus-DZjgAJYF.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CmU3_d-G.js";import"./OrganisasjonsnummerAlert-BB6dOjTW.js";import"./VStack-DErorjmi.js";import"./BasePrimitive-hqgAfBeE.js";import"./List-D4X4XiY5.js";import"./Link-C-FD5pVt.js";import"./KandidatHendelseTag-DASbdwf-.js";import"./Tag-aBUAMrEB.js";import"./ChatExclamationmark-BjS5JwFD.js";import"./FileXMark-B1A4YTzE.js";import"./Trash-BE175DFP.js";import"./HandShakeHeart-By1TwYOi.js";import"./Calendar-B-bTdlPX.js";import"./ThumbUp-CraOnywH.js";import"./Table-MswEoFGk.js";import"./util-DFhn6qLM.js";import"./format-Ca2I7mTu.js";import"./match-DGpmc3fc.js";import"./parseISO-D4cIKA-0.js";import"./parse-BnkTT2en.js";import"./getDefaultOptions-CLP4Qnh0.js";import"./util-DmMa8XpB.js";import"./InternStatusTag-D_wwVyPn.js";import"./CircleSlash-DoRtUzFt.js";import"./XMarkOctagon-ClmqL6-K.js";import"./Reception-Ba-xj5rM.js";import"./SealCheckmark--Qk6RdnD.js";import"./PersonChat-CrbcnA0-.js";import"./MagnifyingGlass-1ws7ffUv.js";import"./Dropdown-DRIoQva2.js";import"./useControllableState-CF1ufetu.js";import"./Popover-i8PO7x41.js";import"./floating-ui.react-BzSxB3LF.js";import"./Date.Input-DZNBgtRi.js";import"./useFormField-DiCDh7BC.js";import"./ChevronDown-DToF2878.js";import"./Modal.context-CgSnuUz-.js";import"./DismissableLayer-BZd4Nxc3.js";import"./useDescendant-N-iOhkBw.js";import"./useClientLayoutEffect-DGTQ09bR.js";import"./Pencil-BIeT8mFv.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
