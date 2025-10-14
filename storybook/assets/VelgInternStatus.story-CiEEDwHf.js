import{j as s}from"./iframe-DUIlOHDN.js";import{w as d,c as o}from"./ContextDecorators-OHAgwzYd.js";import{V as n}from"./VelgInternStatus-98Tyec2m.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CSTvZGsQ.js";import"./OrganisasjonsnummerAlert-B2Xt21Lw.js";import"./VStack-CP-FOnG8.js";import"./BasePrimitive-KNwMya-W.js";import"./List-yAbYG3Cj.js";import"./Link-CXpb8auh.js";import"./KandidatHendelseTag-DgDOjPoL.js";import"./Tag-BlXO3WSc.js";import"./ChatExclamationmark-Dofq3nTf.js";import"./FileXMark-CtKKNWZ1.js";import"./Trash--ke6aAVh.js";import"./HandShakeHeart-xjJ6R8dj.js";import"./Calendar-KR5O1yQo.js";import"./ThumbUp-BihwvU8r.js";import"./Table-DFVJD2Iv.js";import"./util-BILSI2V5.js";import"./format-CDfDb_lp.js";import"./match-Dp8RA4Ku.js";import"./parseISO-_TwPopcz.js";import"./parse-BGRhHba2.js";import"./getDefaultOptions-DYhQThSW.js";import"./util-kbGLNomq.js";import"./InternStatusTag-DoT0jEW2.js";import"./CircleSlash-D5ebP2Oi.js";import"./XMarkOctagon-DpqG4Pah.js";import"./Reception-DNUX9-kd.js";import"./SealCheckmark-B7ep-bhn.js";import"./PersonChat-B8NcpylV.js";import"./MagnifyingGlass-DtuT0b4_.js";import"./Dropdown-bFF7oA--.js";import"./useControllableState-PeOYsQib.js";import"./Popover-BsIEnUZB.js";import"./floating-ui.react-DgvfWY97.js";import"./Date.Input-CLKoA6_E.js";import"./useFormField-hDMR0tco.js";import"./ChevronDown-Y2lfxo4K.js";import"./Modal.context-Cu402-Eo.js";import"./DismissableLayer-DsBtdNSu.js";import"./useDescendant-Cqjw-0eu.js";import"./useClientLayoutEffect-Bhjp9e8S.js";import"./Pencil-B0newvzj.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
