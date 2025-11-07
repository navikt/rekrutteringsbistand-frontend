import{P as s,j as i}from"./iframe-rcQ536TZ.js";import{V as n}from"./VelgInternStatus-DoLjuvFz.js";import{w as d,c as o}from"./ContextDecorators-pwe5tr0a.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CoFlzPvZ.js";import"./Tag-xAKM8J8p.js";import"./CircleSlash-pD_7n3jF.js";import"./XMarkOctagon-DKqlSPt2.js";import"./Reception-BP3bkevt.js";import"./SealCheckmark-Bw6Dq4A3.js";import"./PersonChat-BKFs2BiC.js";import"./MagnifyingGlass-COqmLn_J.js";import"./KandidatlisteContext-CqhfWW1z.js";import"./OrganisasjonsnummerAlert-DIxPEGEB.js";import"./VStack-Bd5XxMuD.js";import"./BasePrimitive-DOQGXNDv.js";import"./List-Bge0zYza.js";import"./Link-Dl-V4cSV.js";import"./KandidatHendelseTag-PbGGHMS7.js";import"./ChatExclamationmark-DkFY89ke.js";import"./FileXMark-z-oFo2nP.js";import"./Trash-Cwb_7YZ0.js";import"./HandShakeHeart-D6kFY2Lw.js";import"./Calendar-CwMFbYJ1.js";import"./ThumbUp-DFrEW2Ez.js";import"./Table-DapziAdA.js";import"./util-BO75DCsf.js";import"./parse-B3-puTFr.js";import"./getDefaultOptions-BKcChqVo.js";import"./parseISO-C32pz730.js";import"./index-B3GzxfYD.js";import"./index-B40KJ5b4.js";import"./isBefore-D4c0a3-L.js";import"./util-CCDa60yO.js";import"./Dropdown-CnhTNcki.js";import"./useControllableState-yOoOMJdI.js";import"./Popover-BcXQe6-O.js";import"./floating-ui.react-BnE5Js1c.js";import"./Date.Input-CkhCOS9u.js";import"./useFormField-DVG_5Xb7.js";import"./ChevronDown-CONpnMjq.js";import"./Modal.context-ClNL2aFZ.js";import"./DismissableLayer-C-HcFn6G.js";import"./useDescendant-pbOegnSC.js";import"./useClientLayoutEffect-DfdICjOw.js";import"./Pencil-CJhHjaDe.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
