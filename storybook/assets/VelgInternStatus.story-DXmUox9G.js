import{aK as s,j as i}from"./iframe-BpAMzbpD.js";import{w as d,c as o}from"./ContextDecorators-BHVUFTfc.js";import{V as n}from"./VelgInternStatus-GQCnMK4u.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CFLN5hQ2.js";import"./OrganisasjonsnummerAlert-DmySheGN.js";import"./VStack-XMCWsZIr.js";import"./BasePrimitive-BP5Ply4H.js";import"./List-CWTwwk6H.js";import"./Link-BASyYMr1.js";import"./KandidatHendelseTag-qTouAMS0.js";import"./Tag-C2U7Qelp.js";import"./FileXMark-Cp8cIU3v.js";import"./Trash-Zelg3jv0.js";import"./HandShakeHeart-Zv71_2yY.js";import"./Calendar-ChH2CqdW.js";import"./ThumbUp-D7UitzWa.js";import"./Table-DydzMjHR.js";import"./util-BAhXs1Zv.js";import"./format-CERjb80Z.js";import"./match-wsBYmfrA.js";import"./parse-DrdAJy4P.js";import"./getDefaultOptions-YPBy5iMj.js";import"./parseISO-DP54w3ag.js";import"./util-CXMN-qRW.js";import"./InternStatusTag-DCENwY3R.js";import"./CircleSlash-Dcl-XTMS.js";import"./XMarkOctagon-BFiUZ7-X.js";import"./Reception-GDHXVa1d.js";import"./SealCheckmark-BXP1UfTZ.js";import"./PersonChat-EqO5bm4B.js";import"./MagnifyingGlass-CZs8SVOv.js";import"./Dropdown-Bn0x36mE.js";import"./useControllableState-KMcY1F_r.js";import"./Popover-CasU9oOn.js";import"./floating-ui.react-BVqJumW4.js";import"./Date.Input--12ODzPC.js";import"./useFormField-CN_2X3Ux.js";import"./ChevronDown-TAdbvDWv.js";import"./Modal.context-B5dNLjIw.js";import"./DismissableLayer-66eKhA68.js";import"./useDescendant-D-X4lvXf.js";import"./useClientLayoutEffect-TNcmly1U.js";import"./Pencil-Bu86V0xg.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
