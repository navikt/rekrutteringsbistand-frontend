import{aK as s,j as i}from"./iframe-CTO0EUng.js";import{w as d,c as o}from"./ContextDecorators-BAmHjqgm.js";import{V as n}from"./VelgInternStatus-CicubDLk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-EAN-fhgR.js";import"./OrganisasjonsnummerAlert-Bhk3fguW.js";import"./VStack-BCKiRHRL.js";import"./BasePrimitive-CZejWwO7.js";import"./List-CRw_TSPx.js";import"./Link-CbwrBY_r.js";import"./KandidatHendelseTag-CVK4sSLI.js";import"./Tag-Clr8NTKJ.js";import"./ChatExclamationmark-BDNecZd7.js";import"./FileXMark-BxTQWum7.js";import"./Trash-DoAk3teY.js";import"./HandShakeHeart-CPkK6ZSa.js";import"./Calendar-DmnC6cqJ.js";import"./ThumbUp-CKlcTpy-.js";import"./Table-T7IlRG3m.js";import"./util-K0h4U2Kh.js";import"./format-DP7EJBYE.js";import"./match-BthhS41u.js";import"./parse-CWgZKNrQ.js";import"./getDefaultOptions-EjekfoSd.js";import"./parseISO-Dr4bGaFw.js";import"./index-CBD4SOv4.js";import"./index-B40KJ5b4.js";import"./isBefore-BX8aPqPK.js";import"./util-CIAlv6iK.js";import"./InternStatusTag-C6R4QjCT.js";import"./CircleSlash-dMGKJ1Tc.js";import"./XMarkOctagon-BR8rrcr9.js";import"./Reception-BWCOeR6J.js";import"./SealCheckmark-CMHCtFWe.js";import"./PersonChat-BkSweeeT.js";import"./MagnifyingGlass-BXtuKNhP.js";import"./Dropdown-CiQKiBJ5.js";import"./useControllableState-CvQYYuOe.js";import"./Popover-CxtRsMGI.js";import"./floating-ui.react-B4Z1HLBb.js";import"./Date.Input-6V9AOlG7.js";import"./useFormField-B4NBvQqZ.js";import"./ChevronDown--jVvHyz6.js";import"./Modal.context-DujAwibn.js";import"./DismissableLayer-6Oq_Opj4.js";import"./useDescendant-DkRno8Ik.js";import"./useClientLayoutEffect-CMF7cqKE.js";import"./Pencil-DLDTf0KA.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
