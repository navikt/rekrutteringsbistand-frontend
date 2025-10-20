import{aP as s,j as i}from"./iframe-D9mqkd8J.js";import{w as d,c as o}from"./ContextDecorators-C2DDybda.js";import{V as n}from"./VelgInternStatus-BBrH0D-j.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DlwI21Yt.js";import"./OrganisasjonsnummerAlert-CS-NcEr6.js";import"./VStack-CDhuPf9Y.js";import"./BasePrimitive-B3ciBDpN.js";import"./List-B-uwTmvA.js";import"./Link-M_AJD5Ob.js";import"./KandidatHendelseTag-BzFOeSdN.js";import"./Tag-BvNBSGKY.js";import"./ChatExclamationmark-L2UpYfHW.js";import"./FileXMark-4rwoeoHF.js";import"./Trash-CzVUQuc8.js";import"./HandShakeHeart-CUYrnLNx.js";import"./Calendar-B0NiFczk.js";import"./ThumbUp-Ctn7Umq2.js";import"./Table-Bks60uh_.js";import"./util-DSVI0ePf.js";import"./format-CzEV6SwL.js";import"./match-FBklN04L.js";import"./parseISO-DOIvH0AY.js";import"./parse-COQhzVgn.js";import"./getDefaultOptions-CWXBYWBL.js";import"./util-PvlszHua.js";import"./InternStatusTag-Cm2uq4cg.js";import"./CircleSlash-CZBBLMyd.js";import"./XMarkOctagon-Q_Oanq13.js";import"./Reception-D-jdstEC.js";import"./SealCheckmark-DVC8Vlm8.js";import"./PersonChat-6zBOgYEh.js";import"./MagnifyingGlass-Uhxr3xdf.js";import"./Dropdown-DOWMHfYs.js";import"./useControllableState-GZ88C6KH.js";import"./Popover-DtFEID1l.js";import"./floating-ui.react-DcHBzFuk.js";import"./Date.Input-6hDRRA25.js";import"./useFormField-HR3NeTCc.js";import"./ChevronDown-Bbco9iiR.js";import"./Modal.context-BivSpKRk.js";import"./DismissableLayer-BVSVExp-.js";import"./useDescendant-Dxtsczz9.js";import"./useClientLayoutEffect-B5nY-R9n.js";import"./Pencil-DRZt_T3H.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
