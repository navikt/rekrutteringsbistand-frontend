import{aP as s,j as i}from"./iframe-BTWmweLi.js";import{w as d,c as o}from"./ContextDecorators-L6Jwyqpb.js";import{V as n}from"./VelgInternStatus-pj2JdwCh.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Bd8csJTp.js";import"./OrganisasjonsnummerAlert-BRU4p2Aa.js";import"./VStack-Bvk6nylg.js";import"./BasePrimitive-BvL64Zdv.js";import"./List-D7f8uJR3.js";import"./Link-CZeDRCSY.js";import"./KandidatHendelseTag-rS1Jue0z.js";import"./Tag-B90XF49d.js";import"./ChatExclamationmark-DtbN4rYy.js";import"./FileXMark-D2QprsHp.js";import"./Trash-CQNSmAUp.js";import"./HandShakeHeart-ocrmw2HP.js";import"./Calendar-dxDUhpS2.js";import"./ThumbUp-yPJns9Zx.js";import"./Table-OeNpFAOB.js";import"./util-CgYIlP8i.js";import"./format-nXkQDeqK.js";import"./match-Ceft5OFa.js";import"./parseISO-cWGmtevm.js";import"./parse-CIeY0Gnj.js";import"./getDefaultOptions-BP7_tTwA.js";import"./util-B-SYN4OI.js";import"./InternStatusTag-D8KESwPD.js";import"./CircleSlash-CI2msOg9.js";import"./XMarkOctagon-CVmutUD1.js";import"./Reception-CGP5NV5j.js";import"./SealCheckmark-ibJFQAo7.js";import"./PersonChat-CFKxDmFJ.js";import"./MagnifyingGlass-DCdUR2wv.js";import"./Dropdown-CT6VjFzK.js";import"./useControllableState-CAO2XIOD.js";import"./Popover-DCUKSINN.js";import"./floating-ui.react-DvBUZrXh.js";import"./Date.Input-BDf-ZmtR.js";import"./useFormField-DIeB7L7F.js";import"./ChevronDown-BurMjht3.js";import"./Modal.context-CyWp2Ee1.js";import"./DismissableLayer-D_ok9yD_.js";import"./useDescendant-DwMTyTfX.js";import"./useClientLayoutEffect-C-fKe3ty.js";import"./Pencil-CMHMBpmS.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
