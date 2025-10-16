import{j as s}from"./iframe-dGv2OqX7.js";import{w as d,c as o}from"./ContextDecorators-BWRtmIde.js";import{V as n}from"./VelgInternStatus-Dbp4XcAo.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CH5HuuKx.js";import"./OrganisasjonsnummerAlert-n2dV-P-v.js";import"./VStack-CjJi4I4a.js";import"./BasePrimitive-BWtsHynz.js";import"./List-D5cAhRDP.js";import"./Link-CwO_djth.js";import"./KandidatHendelseTag-B0mmGHV7.js";import"./Tag-CgfBMYwD.js";import"./ChatExclamationmark-Bvsy52tL.js";import"./FileXMark-B6kYZGpK.js";import"./Trash-DMPYbM-l.js";import"./HandShakeHeart-Clc80Ve9.js";import"./Calendar-ZQMAGjm7.js";import"./ThumbUp-B3N30VxE.js";import"./Table-Ghjcd_Wj.js";import"./util-Dg3Yiv4F.js";import"./format-CtIKURVf.js";import"./match-DS7-xQIv.js";import"./parseISO-BhPVCY7_.js";import"./parse-v2VrHbDj.js";import"./getDefaultOptions-EcdeV_1b.js";import"./util-BvOI1xe7.js";import"./InternStatusTag-D8fX3psU.js";import"./CircleSlash-Ca5jcjqB.js";import"./XMarkOctagon-BhqI446B.js";import"./Reception-B82wdXDJ.js";import"./SealCheckmark-DoXyA0vA.js";import"./PersonChat-DwWxZYU5.js";import"./MagnifyingGlass-BukcpAcD.js";import"./Dropdown-D7adYUae.js";import"./useControllableState-QlpvQoL3.js";import"./Popover-CPQS7j6M.js";import"./floating-ui.react-C24_lbML.js";import"./Date.Input-Dx75IMGX.js";import"./useFormField-LfchmHsG.js";import"./ChevronDown-CnuRnvxx.js";import"./Modal.context-BVpHri-9.js";import"./DismissableLayer-DakBz1QQ.js";import"./useDescendant-l4rE7gIp.js";import"./useClientLayoutEffect-WHkWpX14.js";import"./Pencil-rEVOaxW5.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
