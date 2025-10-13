import{j as s}from"./iframe-DxsVXlKp.js";import{w as d,c as o}from"./ContextDecorators-BduKEHIi.js";import{V as n}from"./VelgInternStatus-C9pgEueQ.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DBaap_3A.js";import"./OrganisasjonsnummerAlert-BRaz6LhX.js";import"./VStack-DLr41Sdy.js";import"./BasePrimitive-CVWzEEGe.js";import"./List-Zu0w8-Ow.js";import"./Link-DSnwK8eh.js";import"./KandidatHendelseTag-BzJ2Q9HZ.js";import"./Tag-B0WwZ_XI.js";import"./FileXMark-BOhJsIZe.js";import"./Trash-DXDOAyr4.js";import"./HandShakeHeart-cnO-6KOG.js";import"./Calendar-DrSgH4O2.js";import"./ThumbUp-DKmETQk-.js";import"./Table-DmsM-QeC.js";import"./util-0q4bkZIV.js";import"./format-oEh3d8nI.js";import"./match-C6gf6vFE.js";import"./parseISO-DtIkSN4o.js";import"./parse-SU3b4A8Q.js";import"./getDefaultOptions-zjHXmn5U.js";import"./util-D7yesipt.js";import"./InternStatusTag-DGeHzJZQ.js";import"./CircleSlash-DkJeMFHU.js";import"./XMarkOctagon-CBL-5zrP.js";import"./Reception-BLdp3BQW.js";import"./SealCheckmark-CXbYv6aq.js";import"./PersonChat-DYq_6WPS.js";import"./MagnifyingGlass-B47j9voB.js";import"./Dropdown-BusZ1qz-.js";import"./useControllableState-332WqRZ5.js";import"./Popover-tyRmu7Zy.js";import"./floating-ui.react-Bc1Ow91n.js";import"./Date.Input-BMLFi-Sw.js";import"./useFormField-y2vpLvjz.js";import"./ChevronDown-D_-r46n6.js";import"./Modal.context-B9ZjbwV3.js";import"./DismissableLayer-DiN5We5v.js";import"./useDescendant-Dn2tUnAo.js";import"./useClientLayoutEffect-BczCKQUj.js";import"./Pencil-3cP27ziS.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
