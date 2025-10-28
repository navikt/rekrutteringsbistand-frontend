import{Y as s,j as i}from"./iframe-aLQ-e9Bs.js";import{w as d,c as o}from"./ContextDecorators-CC2YiYcd.js";import{V as n}from"./VelgInternStatus-KzDMEz1F.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-n7fWOt1w.js";import"./OrganisasjonsnummerAlert-CMKyOgZS.js";import"./VStack-B_NMgWl2.js";import"./BasePrimitive-DgQ0muEM.js";import"./List--FbSpWGF.js";import"./Link-C7TG3Wbo.js";import"./KandidatHendelseTag-Bhlx4A7s.js";import"./Tag-BSiLor6A.js";import"./ChatExclamationmark-BpCuBXwx.js";import"./FileXMark-fdPIH0gM.js";import"./Trash-CE3GJCl1.js";import"./HandShakeHeart-Bmmk-Kl2.js";import"./Calendar-yUYAdLGF.js";import"./ThumbUp-BevLsdBM.js";import"./Table-Dh8r2BxK.js";import"./util-DmiB4DbH.js";import"./format-DRoHYGaf.js";import"./match-DKTEQDYa.js";import"./parse-CmNi_03g.js";import"./getDefaultOptions-Cq9nUZhj.js";import"./parseISO-DveLVf6B.js";import"./index-BfZzGsIa.js";import"./index-B40KJ5b4.js";import"./isBefore-CNJ43cBE.js";import"./util-BEZIGxgn.js";import"./InternStatusTag-B6XP5uuW.js";import"./CircleSlash-bEfWymwp.js";import"./XMarkOctagon-DU3yQf3p.js";import"./Reception-B-GpcJ7W.js";import"./SealCheckmark-DEqhIrgD.js";import"./PersonChat-yFHiKCpe.js";import"./MagnifyingGlass-Bve9AQ7Y.js";import"./Dropdown-D5mJUypL.js";import"./useControllableState-D6h_Nb38.js";import"./Popover-Bjp6Vl8N.js";import"./floating-ui.react-aWiTZIT7.js";import"./Date.Input-CuKmVmUv.js";import"./useFormField-Cl-fyKfU.js";import"./ChevronDown-CSinFy1h.js";import"./Modal.context-61ODrapt.js";import"./DismissableLayer-DKbepy-Q.js";import"./useDescendant-Dfnj1lAO.js";import"./useClientLayoutEffect-FMHHNWN1.js";import"./Pencil-DwHz7QaW.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
