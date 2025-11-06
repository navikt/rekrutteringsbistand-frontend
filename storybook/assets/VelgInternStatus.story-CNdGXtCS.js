import{P as s,j as i}from"./iframe-BKRDZNXg.js";import{V as n}from"./VelgInternStatus-BZfDgXXi.js";import{w as d,c as o}from"./ContextDecorators-m2C0aHVM.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-C299Qriz.js";import"./Tag-BbMdOwfh.js";import"./CircleSlash-BiEK2YE1.js";import"./XMarkOctagon-uKUrJcC2.js";import"./Reception-DvhQkuHQ.js";import"./SealCheckmark-DriHtxnj.js";import"./PersonChat-DBlLtO4X.js";import"./MagnifyingGlass-PWfbpwT0.js";import"./KandidatlisteContext-CqWqv4ei.js";import"./OrganisasjonsnummerAlert-CyVgjPMC.js";import"./VStack-Cor3lLjC.js";import"./BasePrimitive-D6wDJ1Ju.js";import"./List-DJ_cKB5i.js";import"./Link-6OQ1ZwSf.js";import"./KandidatHendelseTag-BQGCGSHc.js";import"./ChatExclamationmark-DZyMaN3C.js";import"./FileXMark-DjIko1xT.js";import"./Trash-DJ9JUCj0.js";import"./HandShakeHeart-BFfmkO36.js";import"./Calendar-BzBLnqNs.js";import"./ThumbUp-DfrVGyDU.js";import"./Table-BrhP77xf.js";import"./util-DK0JTtAX.js";import"./parse-B1i2XOHI.js";import"./getDefaultOptions-BzXjfZcs.js";import"./parseISO-ch9g0eF4.js";import"./index-o5hgtkri.js";import"./index-B40KJ5b4.js";import"./isBefore-DoIdCKq_.js";import"./util-Bjk0GmPL.js";import"./Dropdown-P11aPkiU.js";import"./useControllableState-DcIjNWSg.js";import"./Popover-CySwOLIi.js";import"./floating-ui.react-DpAS_Pzz.js";import"./Date.Input-V2iQ9WC9.js";import"./useFormField-CkZX8Hwz.js";import"./ChevronDown-C8FQsTIa.js";import"./Modal.context-7Ywpz0nY.js";import"./DismissableLayer-BD1inBY6.js";import"./useDescendant-CZi4196E.js";import"./useClientLayoutEffect-DHaUvql3.js";import"./Pencil-ByjS9VNc.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
