import{aP as s,j as i}from"./iframe-Cg2fkqe5.js";import{w as d,c as o}from"./ContextDecorators-DMXLOF5N.js";import{V as n}from"./VelgInternStatus-BGUpmN-x.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-5x_YrBgJ.js";import"./OrganisasjonsnummerAlert-BaRgJY_4.js";import"./VStack-CJSEXM8k.js";import"./BasePrimitive-0Im7KAv4.js";import"./List-BG4EAyn1.js";import"./Link-Dr8mKu-k.js";import"./KandidatHendelseTag-BPUe_dLW.js";import"./Tag-y-rJf116.js";import"./FileXMark-BPHK-K8D.js";import"./Trash-DjZhcdM2.js";import"./HandShakeHeart-Kjo7763n.js";import"./Calendar-DqMB72Zp.js";import"./ThumbUp-ChpcBkVQ.js";import"./Table-DXE3mVNz.js";import"./util-BqwlTJMB.js";import"./format-DoEwAlkH.js";import"./match-C9kk39F-.js";import"./parseISO-D9uFhrVJ.js";import"./parse-peL9KPAb.js";import"./getDefaultOptions-DJEvIq0A.js";import"./util-BKrb1-En.js";import"./InternStatusTag-oC8eiSwf.js";import"./CircleSlash-BVJpIsYl.js";import"./XMarkOctagon-BOYtZwlx.js";import"./Reception-CtwxLt9u.js";import"./SealCheckmark-4YaCb4Od.js";import"./PersonChat-Dsab2kkl.js";import"./MagnifyingGlass-BmyqgWgP.js";import"./Dropdown-CItdwBpb.js";import"./useControllableState-CwuKQ8Mr.js";import"./Popover-CRjyNCbz.js";import"./floating-ui.react-D_si1yYR.js";import"./Date.Input-e0IQy6l9.js";import"./useFormField-ByFVRcLz.js";import"./ChevronDown-yLvcjboB.js";import"./Modal.context-CyWWEpn_.js";import"./DismissableLayer-uEx1HtDr.js";import"./useDescendant-CAAHdarD.js";import"./useClientLayoutEffect-B_Yh-X2q.js";import"./Pencil-CN_N2rh4.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
