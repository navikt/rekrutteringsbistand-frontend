import{aL as s,j as i}from"./iframe-BKDoWgHq.js";import{w as d,c as o}from"./ContextDecorators-BcENn2ig.js";import{V as n}from"./VelgInternStatus-D5NS2zRZ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-gV7m6E18.js";import"./OrganisasjonsnummerAlert-CfPcIFBz.js";import"./VStack-B3A9RY2q.js";import"./BasePrimitive-CT8NIZJE.js";import"./List-Buho69gq.js";import"./Link-DFwMo79Q.js";import"./KandidatHendelseTag-Brl649es.js";import"./Tag-BUt2pJu8.js";import"./FileXMark-FeDq2Ysf.js";import"./Trash-rtYXz7QZ.js";import"./HandShakeHeart-DTrI0IiB.js";import"./Calendar-cy2kGKa4.js";import"./ThumbUp-BrJ85Q8J.js";import"./Table-DMk5gh2_.js";import"./util-ClF0mEkr.js";import"./format-CDKvSNBp.js";import"./match-BQKLQD_5.js";import"./parse-S4GxuH9G.js";import"./getDefaultOptions-C8ODERZH.js";import"./parseISO-Ci-fRiyg.js";import"./util-DEm2Fd7B.js";import"./InternStatusTag-BhJzbzqY.js";import"./CircleSlash-C6y3PJJs.js";import"./XMarkOctagon-DlmuqTcV.js";import"./Reception-DWbzTt1k.js";import"./SealCheckmark-uEeY-6cR.js";import"./PersonChat-DfpepgNa.js";import"./MagnifyingGlass-0GVUs7NI.js";import"./Dropdown-B1kgOEeK.js";import"./useControllableState-B3Jf7pLK.js";import"./Popover-D6qCtQVi.js";import"./floating-ui.react-BGZ9fdcN.js";import"./Date.Input-BcSHn9sJ.js";import"./useFormField-3mzbgjvi.js";import"./ChevronDown-DAqA53JU.js";import"./Modal.context-D_pCVJiM.js";import"./DismissableLayer-Bs8j9pC3.js";import"./useDescendant-qpp5_fZY.js";import"./useClientLayoutEffect-CucVCiA2.js";import"./Pencil-B7hO8-hc.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
