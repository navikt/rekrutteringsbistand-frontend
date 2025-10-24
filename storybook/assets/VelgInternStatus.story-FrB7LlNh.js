import{aK as s,j as i}from"./iframe-DjWAYC3X.js";import{w as d,c as o}from"./ContextDecorators-CG1xE8mr.js";import{V as n}from"./VelgInternStatus-BYnsUduU.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CtELFOJ9.js";import"./OrganisasjonsnummerAlert-CF7Db9g3.js";import"./VStack-BqFQUYwb.js";import"./BasePrimitive-sX7nyWc6.js";import"./List-DR39Y2pP.js";import"./Link-zymZHbka.js";import"./KandidatHendelseTag-BLQ_daev.js";import"./Tag-BKh_NYfg.js";import"./ChatExclamationmark-wGEED-K-.js";import"./FileXMark-OLFg0HbR.js";import"./Trash-sbNyFVus.js";import"./HandShakeHeart-BCU9vFzG.js";import"./Calendar-DGo2MEgV.js";import"./ThumbUp-CLh74G2X.js";import"./Table-BlUBqtiI.js";import"./util-CAXxsQeM.js";import"./format-BfXTDFos.js";import"./match-BDdBpRqH.js";import"./parse-DO3g-9bF.js";import"./getDefaultOptions-bsi7JpGz.js";import"./parseISO-CkBq9KAX.js";import"./index-C5sFxyTN.js";import"./index-B40KJ5b4.js";import"./isBefore-xCT4RK0D.js";import"./util-D7wgF1k8.js";import"./InternStatusTag-jaCK-Dez.js";import"./CircleSlash-CCi2vh-B.js";import"./XMarkOctagon-BlvbT-ci.js";import"./Reception-7cSwcdFX.js";import"./SealCheckmark-B-i-4GQ8.js";import"./PersonChat-Bu8-LbMw.js";import"./MagnifyingGlass-B5_PMLFR.js";import"./Dropdown-BGubHVj9.js";import"./useControllableState-B_dAdZ-G.js";import"./Popover-DC8AkzXf.js";import"./floating-ui.react-DKvA-InG.js";import"./Date.Input-DR7nmpz5.js";import"./useFormField-BA43ugRZ.js";import"./ChevronDown-Bwtq3pPt.js";import"./Modal.context-C1cH-4SS.js";import"./DismissableLayer-DGq0BrI1.js";import"./useDescendant-DApziTPC.js";import"./useClientLayoutEffect-Bu2a2BR2.js";import"./Pencil-yfcPR7eH.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
