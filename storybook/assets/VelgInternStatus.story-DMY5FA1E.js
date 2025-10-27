import{aK as s,j as i}from"./iframe-CjKR20BC.js";import{w as d,c as o}from"./ContextDecorators-C4j0gZQD.js";import{V as n}from"./VelgInternStatus-Ba2O9uo7.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-OpMdsle5.js";import"./OrganisasjonsnummerAlert-sFY24i-k.js";import"./VStack-BsXqGekW.js";import"./BasePrimitive-CaBgxhbE.js";import"./List-BTmbOlVO.js";import"./Link-Bo6mtrNI.js";import"./KandidatHendelseTag-DfF6i5Jw.js";import"./Tag-wvT3nD46.js";import"./ChatExclamationmark-mD1OYTO5.js";import"./FileXMark-QgeazkCH.js";import"./Trash-D7LhkQ4B.js";import"./HandShakeHeart-C7oIGzp0.js";import"./Calendar-w3e5z85I.js";import"./ThumbUp-DN2dUS2g.js";import"./Table-CRzPg50P.js";import"./util-DJhqGnO3.js";import"./format-CSKBpAGE.js";import"./match-Cl20IGZX.js";import"./parse-DJYX9sRd.js";import"./getDefaultOptions-ZyZ1VfiA.js";import"./parseISO-CNiVbHcC.js";import"./index-CEKpCU6D.js";import"./index-B40KJ5b4.js";import"./isBefore-C5zPZljL.js";import"./util-CxD7CZfs.js";import"./InternStatusTag-Cx-QubEI.js";import"./CircleSlash-co31CbGN.js";import"./XMarkOctagon-Mg7BSeCa.js";import"./Reception-BL9ona8w.js";import"./SealCheckmark-DiF4aqek.js";import"./PersonChat-DmdPVRrk.js";import"./MagnifyingGlass-BcV8fGUs.js";import"./Dropdown-CTWjoKUg.js";import"./useControllableState-CjVFov-N.js";import"./Popover-CPhy6G4M.js";import"./floating-ui.react-CQJkre1v.js";import"./Date.Input-BNLwAM5u.js";import"./useFormField-CLSriUsV.js";import"./ChevronDown-BxxgTCqk.js";import"./Modal.context-Bj39DRJf.js";import"./DismissableLayer-jW99rNmR.js";import"./useDescendant-BJjA5T6g.js";import"./useClientLayoutEffect-BLLZDShU.js";import"./Pencil-CMXd_VlQ.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
