import{j as s}from"./iframe-BgMEyBOw.js";import{w as d,c as o}from"./ContextDecorators-BQR2C376.js";import{V as n}from"./VelgInternStatus-BL7Yw2JD.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BB8zXL-X.js";import"./OrganisasjonsnummerAlert-BCWEq8UM.js";import"./VStack-UU3jl9Ja.js";import"./BasePrimitive-R1dwLZrY.js";import"./List-Dber_rM4.js";import"./Link-yB4QutwC.js";import"./KandidatHendelseTag-CeV_QMPr.js";import"./Tag-B6UGrW1v.js";import"./FileXMark-B_uorPd8.js";import"./Trash-7Fs5dgHD.js";import"./HandShakeHeart-D-9O9Vx_.js";import"./Calendar-CwaqC0M5.js";import"./ThumbUp-Cgu-bFYT.js";import"./Table-V3muIp_l.js";import"./util-D0AmwIr_.js";import"./format-DrrAGn9F.js";import"./match-BHTYdbS3.js";import"./parseISO-Dei-hLif.js";import"./parse-C_zuhUlz.js";import"./getDefaultOptions-CTpR1hvo.js";import"./util-D49phOLu.js";import"./InternStatusTag-D1-oqh0d.js";import"./CircleSlash-BcHIgt5f.js";import"./XMarkOctagon-BHPptRYS.js";import"./Reception-D238c32M.js";import"./SealCheckmark-Ds_LUugj.js";import"./PersonChat-CSNx94mj.js";import"./MagnifyingGlass-D6l_TLdB.js";import"./Dropdown-BSnZSJwN.js";import"./useControllableState-q6FKqWzx.js";import"./Popover-3LJhkxbV.js";import"./floating-ui.react-DBIgfcER.js";import"./Date.Input-B-XhQLT9.js";import"./useFormField-Bp_i8G6K.js";import"./ChevronDown-DgJvjKl7.js";import"./Modal.context-D-Q3Jf-p.js";import"./DismissableLayer-DPVbJItl.js";import"./useDescendant-DkEoju_L.js";import"./useClientLayoutEffect-VQhd_znX.js";import"./Pencil-Dg8Fqo8_.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
