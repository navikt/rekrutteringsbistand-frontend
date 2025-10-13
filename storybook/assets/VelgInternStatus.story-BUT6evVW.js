import{j as s}from"./iframe-CGQVJkZv.js";import{w as d,c as o}from"./ContextDecorators-SdjbtubF.js";import{V as n}from"./VelgInternStatus-DveqMwLO.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-z4cn_Tu6.js";import"./OrganisasjonsnummerAlert-C37u_xfx.js";import"./VStack-C5KzQuUX.js";import"./BasePrimitive-s2EheN14.js";import"./List-CNdOL3td.js";import"./Link-BRD7cyqO.js";import"./KandidatHendelseTag-B9e_GCjh.js";import"./Tag-BYGMQyUB.js";import"./ChatExclamationmark-Ctf9I7R-.js";import"./FileXMark-CkGUbLaq.js";import"./Trash-Cfm_mnaq.js";import"./HandShakeHeart-Ct4yzxQW.js";import"./Calendar-KW0SH5xc.js";import"./ThumbUp-VvYbW0ZU.js";import"./Table-Cs32rzIX.js";import"./util-B2m8-gjm.js";import"./format-CR1bAaa0.js";import"./match-BSb9op-T.js";import"./parseISO-DERGW5BV.js";import"./parse-CIYjvRWn.js";import"./getDefaultOptions-B1f2vFnt.js";import"./util-TyBsJmZS.js";import"./InternStatusTag-CCusx20b.js";import"./CircleSlash-0Njrim5g.js";import"./XMarkOctagon-CWpeIRah.js";import"./Reception-BvxPN9cx.js";import"./SealCheckmark-DfqrIYt6.js";import"./PersonChat-CrKF06uZ.js";import"./MagnifyingGlass-CV9WcoP1.js";import"./Dropdown-7mgD7vuU.js";import"./useControllableState-CIPclepf.js";import"./Popover-BbTlaqpk.js";import"./floating-ui.react-BhfoJmgs.js";import"./Date.Input-BF_igJ6F.js";import"./useFormField-DAHFiV9C.js";import"./ReadMore-jjn0L2Ni.js";import"./ChevronDown-CotaTqsc.js";import"./Modal.context-aOxf75o7.js";import"./DismissableLayer-uB2_gaYD.js";import"./useDescendant-eu_fnbno.js";import"./useClientLayoutEffect-CKYD5ZqV.js";import"./Pencil-DYDgl1Qt.js";const rt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,rt as default};
