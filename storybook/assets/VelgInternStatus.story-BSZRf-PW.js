import{aP as s,j as i}from"./iframe-G1hfx8xa.js";import{w as d,c as o}from"./ContextDecorators-DFnaNYxM.js";import{V as n}from"./VelgInternStatus-CcMefusA.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-D__NbBKb.js";import"./OrganisasjonsnummerAlert-C3xwG-Jj.js";import"./VStack-c0izGSP4.js";import"./BasePrimitive-CY3tMvtH.js";import"./List-Be4Ie-2l.js";import"./Link-5wsMpGh6.js";import"./KandidatHendelseTag-BR9iMMk8.js";import"./Tag-BSc7GXWR.js";import"./ChatExclamationmark-DxJK5iOy.js";import"./FileXMark-CvM1dNJH.js";import"./Trash-C-SHTNSF.js";import"./HandShakeHeart-DXSKadqG.js";import"./Calendar-CVja620b.js";import"./ThumbUp-BiHwjLyU.js";import"./Table-CUs4zp_K.js";import"./util-Bpfxgop4.js";import"./format-DH5YYcU8.js";import"./match-YPGwa1O1.js";import"./parseISO-KVJ6dj2E.js";import"./parse-COvvf3og.js";import"./getDefaultOptions-Cf2a4PTP.js";import"./util-CR4YimVW.js";import"./InternStatusTag-BoaA6NAk.js";import"./CircleSlash-BDZUx65H.js";import"./XMarkOctagon-BqJJCO3U.js";import"./Reception-DltCEL28.js";import"./SealCheckmark-ZMfCalB1.js";import"./PersonChat-B5r8UdnN.js";import"./MagnifyingGlass-CsmrleIA.js";import"./Dropdown-B7Onyud1.js";import"./useControllableState-BWTLl1yr.js";import"./Popover-HdIWJAw6.js";import"./floating-ui.react-CbBWK-4r.js";import"./Date.Input-DDMiDXkr.js";import"./useFormField-x-CGa-s7.js";import"./ChevronDown-C5xk8A4j.js";import"./Modal.context-Caws_Tsd.js";import"./DismissableLayer-DImObKoJ.js";import"./useDescendant-DJFzw8Nt.js";import"./useClientLayoutEffect-CEzvnbdf.js";import"./Pencil-C9-gHaRB.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
