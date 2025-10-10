import{j as s}from"./iframe-DYYFo0EH.js";import{w as d,c as o}from"./ContextDecorators-AgeIh8WY.js";import{V as n}from"./VelgInternStatus-BIv53typ.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DrLAHCvX.js";import"./OrganisasjonsnummerAlert-HgqZSHB0.js";import"./VStack-j-RBo0EF.js";import"./BasePrimitive-B0IXe4ka.js";import"./List-DTt7xmmf.js";import"./Link-CNFJiH9C.js";import"./KandidatHendelseTag-DVUA1DLO.js";import"./Tag-D2CeUP6F.js";import"./FileXMark-CsvJoHtv.js";import"./Trash-CevoRqAe.js";import"./HandShakeHeart-XuBXKhfa.js";import"./Calendar-DiB-DZyk.js";import"./ThumbUp-DEb0cCvQ.js";import"./Table-DWEIgR03.js";import"./util-DLV4rgvl.js";import"./format-bK3tkYVY.js";import"./match-DHpari-S.js";import"./parseISO-Cld3lj8D.js";import"./parse-L4yLavaV.js";import"./getDefaultOptions-D_tEuKPk.js";import"./util-ChfO-3K-.js";import"./InternStatusTag-CxJpfNgk.js";import"./CircleSlash-BkxsaTzT.js";import"./XMarkOctagon-BjJ_fPwr.js";import"./Reception-CV6Av_dO.js";import"./SealCheckmark-Dpkt_q4m.js";import"./PersonChat-BVn7qNz0.js";import"./MagnifyingGlass-Cu64jkVj.js";import"./Dropdown-BIOnfUzq.js";import"./useControllableState-C1UEeCeb.js";import"./Popover-DKIMQPYk.js";import"./floating-ui.react-2_orn2KK.js";import"./Date.Input-9XOu-ODO.js";import"./useFormField-BPvZy4Bw.js";import"./ChevronDown-BUmHjXl6.js";import"./Modal.context-D42TXc5u.js";import"./DismissableLayer-BJBH2qe4.js";import"./useDescendant-BnhCHh0R.js";import"./useClientLayoutEffect-B-_2lxSY.js";import"./Pencil-Bd4zZsOx.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
