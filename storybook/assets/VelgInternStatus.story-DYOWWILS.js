import{aP as s,j as i}from"./iframe-B9qi-KGR.js";import{w as d,c as o}from"./ContextDecorators-pc9Fvee2.js";import{V as n}from"./VelgInternStatus-CQ5weV7q.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-t437p4ne.js";import"./OrganisasjonsnummerAlert-CpQm-D8c.js";import"./VStack-B_-iknN3.js";import"./BasePrimitive-3ttinvqw.js";import"./List-C3zLaTJK.js";import"./Link-8NZQ7ys1.js";import"./KandidatHendelseTag-BhFCRt7S.js";import"./Tag-C72TaRLw.js";import"./FileXMark-Qm86sBR-.js";import"./Trash-BMPleXSU.js";import"./HandShakeHeart-CIJpddoL.js";import"./Calendar-CMY7Z5Id.js";import"./ThumbUp-BIcAzq2P.js";import"./Table-BnVQs5kX.js";import"./util-Bz9xGlOD.js";import"./format-DWsGMAW-.js";import"./match-BvrA9PW9.js";import"./parseISO-DHGxqYBc.js";import"./parse-CaQ_bvNr.js";import"./getDefaultOptions-BMsDcF0o.js";import"./util-C7hLCw15.js";import"./InternStatusTag-BUO1XAuT.js";import"./CircleSlash-Ube9N45G.js";import"./XMarkOctagon-TTcFL_5b.js";import"./Reception-B2VdVTLx.js";import"./SealCheckmark-Bs00Hl3D.js";import"./PersonChat-DavWeCqV.js";import"./MagnifyingGlass-BGES1C1H.js";import"./Dropdown-Bf1Amtsu.js";import"./useControllableState-Bzw8feKc.js";import"./Popover-D6rF90L1.js";import"./floating-ui.react-B0Q1Z0Uj.js";import"./Date.Input-DJCEhbTs.js";import"./useFormField-BLSmHyXC.js";import"./ChevronDown-azIsXyJw.js";import"./Modal.context-B6t6lyUq.js";import"./DismissableLayer-Dc7F9n5V.js";import"./useDescendant-CA4fFxGA.js";import"./useClientLayoutEffect-CeG6ANYV.js";import"./Pencil-DFdCMJE3.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
