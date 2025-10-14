import{aP as s,j as i}from"./iframe-Toj4pykk.js";import{w as d,c as o}from"./ContextDecorators-DrlChovi.js";import{V as n}from"./VelgInternStatus-DNyGcuh6.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DSBqXm2s.js";import"./OrganisasjonsnummerAlert-g64K9oEi.js";import"./VStack-Cvr9eCR3.js";import"./BasePrimitive-DPRW-2ci.js";import"./List-6umJsgvh.js";import"./Link-CnRvrC1D.js";import"./KandidatHendelseTag-Bv77E4ep.js";import"./Tag-Da0VVrnZ.js";import"./FileXMark-CXngGzHw.js";import"./Trash-D3GH5m_z.js";import"./HandShakeHeart-Cg646Fa_.js";import"./Calendar-DbsWeNMw.js";import"./ThumbUp-DA1fCJZp.js";import"./Table-wHMVrjQU.js";import"./util-CkgJohuK.js";import"./format-DkxpHWLB.js";import"./match-cULtJEmT.js";import"./parseISO-CY5p6dlu.js";import"./parse-wdjbf7Nz.js";import"./getDefaultOptions-CMKcdfqW.js";import"./util-QhXL_9PD.js";import"./InternStatusTag-B6VnBKzU.js";import"./CircleSlash-6j0IsSu1.js";import"./XMarkOctagon-CL8qeUMN.js";import"./Reception-Bhu0xye4.js";import"./SealCheckmark-hQ8UWTZd.js";import"./PersonChat-DFqxLPvB.js";import"./MagnifyingGlass-C878U7Ip.js";import"./Dropdown-DQbRwCDZ.js";import"./useControllableState-CwIFAokw.js";import"./Popover-2uyVuhcm.js";import"./floating-ui.react-BQ3mxbEN.js";import"./Date.Input-Dr0SC9lG.js";import"./useFormField-Ckpw-EIc.js";import"./ChevronDown-DBDFtXTt.js";import"./Modal.context-vL2zOWLK.js";import"./DismissableLayer-CMluUa1A.js";import"./useDescendant-sJpxruLl.js";import"./useClientLayoutEffect-Cy5IKDaR.js";import"./Pencil-YTRVNVK0.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
