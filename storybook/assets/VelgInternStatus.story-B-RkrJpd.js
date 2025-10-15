import{aP as s,j as i}from"./iframe-vr_vckGk.js";import{w as d,c as o}from"./ContextDecorators-DzycDGbR.js";import{V as n}from"./VelgInternStatus-w6s-QNHi.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DU2FV14N.js";import"./OrganisasjonsnummerAlert-Qw1WU52J.js";import"./VStack-Ids80tda.js";import"./BasePrimitive-ExeXI_SP.js";import"./List-CiVt3XBZ.js";import"./Link-k3aQI0r3.js";import"./KandidatHendelseTag-CPz9oTVw.js";import"./Tag-Cq5UuXvY.js";import"./FileXMark-CWV7r_z-.js";import"./Trash-CnXQhLYY.js";import"./HandShakeHeart-Djq4CAR-.js";import"./Calendar-Chg5Ppxx.js";import"./ThumbUp-DVF4cc9d.js";import"./Table-gSzwElD0.js";import"./util-DBcg3zLe.js";import"./format-C67-2JLM.js";import"./match-Ce7tQTkY.js";import"./parseISO-D2AKsVns.js";import"./parse-4IUJS7Td.js";import"./getDefaultOptions-B0vCFA6N.js";import"./util-C22SUHcZ.js";import"./InternStatusTag-BwfnFpC9.js";import"./CircleSlash-Bz0bOfIC.js";import"./XMarkOctagon-B55w1CZ9.js";import"./Reception-HKzVVO85.js";import"./SealCheckmark-CxY88k3r.js";import"./PersonChat-D-oi4X19.js";import"./MagnifyingGlass-DwIpy9ub.js";import"./Dropdown-BuocO8JK.js";import"./useControllableState-PzA6H3Er.js";import"./Popover-DyiXONVJ.js";import"./floating-ui.react-D3dI4Bwq.js";import"./Date.Input-DP84DOjr.js";import"./useFormField-BLHpsu6M.js";import"./ChevronDown-DivzrKGZ.js";import"./Modal.context-DClbNTny.js";import"./DismissableLayer-CmdCdQXi.js";import"./useDescendant-BTw5M-8w.js";import"./useClientLayoutEffect-CQEZGfii.js";import"./Pencil-BFgo6Gsv.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
