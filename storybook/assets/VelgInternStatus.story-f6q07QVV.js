import{P as s,j as i}from"./iframe-DbDViM4l.js";import{V as n}from"./VelgInternStatus-CwKmx7Gr.js";import{w as d,c as o}from"./ContextDecorators-DWtga1Rm.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D5fybbCg.js";import"./Tag-DmEV5QJe.js";import"./CircleSlash-ByT0510W.js";import"./XMarkOctagon-B2c8u0aM.js";import"./Reception-CRFGll7U.js";import"./SealCheckmark-BtH8Pztu.js";import"./PersonChat-OX8NlgFB.js";import"./MagnifyingGlass-DIpqtR-6.js";import"./KandidatlisteContext-z3eI-lmk.js";import"./OrganisasjonsnummerAlert-B9U-ZlbE.js";import"./VStack-BZGT8t60.js";import"./BasePrimitive-BhL9LeIE.js";import"./List-BcY1tyt6.js";import"./Link-Hv6LWAB6.js";import"./KandidatHendelseTag-BGPKM9wu.js";import"./ChatExclamationmark-DeYUKd0q.js";import"./FileXMark-G5KnS3ki.js";import"./Trash-UsxNWQOA.js";import"./HandShakeHeart-Bf-w_Pgz.js";import"./Calendar-3ZbYViuM.js";import"./ThumbUp-DFSV4bnS.js";import"./Table-Bxe2bAWn.js";import"./util-BeoRUcqO.js";import"./parse-ZJjrIIlr.js";import"./getDefaultOptions-C864TKn6.js";import"./parseISO-CV4nDh-T.js";import"./index-CcWw8rVT.js";import"./index-B40KJ5b4.js";import"./isBefore-CIn-mkna.js";import"./util-71l1qqje.js";import"./Dropdown-51hhd5Ms.js";import"./useControllableState-Be-GcjUX.js";import"./Popover-fcBMzoZF.js";import"./floating-ui.react-CtXMieRy.js";import"./Date.Input-CSJDI19P.js";import"./useFormField-CncQnEt9.js";import"./ChevronDown-eZR2a0Dl.js";import"./Modal.context-CNG-GA15.js";import"./DismissableLayer-rxJ3YbO8.js";import"./useDescendant-DX-5F48J.js";import"./useClientLayoutEffect-DutT4olg.js";import"./Pencil-ByyoBfwZ.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
