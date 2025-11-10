import{P as s,j as i}from"./iframe-CwJGDDxU.js";import{V as n}from"./VelgInternStatus-B6EuU_1K.js";import{w as d,c as o}from"./ContextDecorators-CyDMKkEl.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DL_nDN-E.js";import"./Tag-DvpnlsWL.js";import"./CircleSlash-jAdLxbvI.js";import"./XMarkOctagon-BTGMDXSX.js";import"./Reception-mjpv7-NG.js";import"./SealCheckmark-BU6CMEoY.js";import"./PersonChat-CPq0QJyG.js";import"./MagnifyingGlass-EajauLyo.js";import"./KandidatlisteContext-0s43dc-A.js";import"./OrganisasjonsnummerAlert-DshxqxgC.js";import"./VStack-CNDCiyu4.js";import"./BasePrimitive-C0K8S5OZ.js";import"./List-DSOB5wxT.js";import"./Link-C4zblZwC.js";import"./KandidatHendelseTag-CU2V8uNt.js";import"./ChatExclamationmark-TCExgNZD.js";import"./FileXMark-ByaH1a5R.js";import"./Trash-I6-I8uBv.js";import"./HandShakeHeart-B86EDAGA.js";import"./Calendar-DYNUBx1J.js";import"./ThumbUp-1hm_RCSo.js";import"./Table-CYqCPUqO.js";import"./util-BzMn3h64.js";import"./parse-C9xB9BVk.js";import"./getDefaultOptions-CZVpCRBO.js";import"./parseISO-B0hZ3Rqn.js";import"./index-xK0OEAgp.js";import"./index-B40KJ5b4.js";import"./isBefore-Bx_RfGFc.js";import"./util-Bhmt96ml.js";import"./Dropdown-D7kVVB-X.js";import"./useControllableState-DPtKYuyy.js";import"./Popover-Bz_QAyBu.js";import"./floating-ui.react-Fg2d4LGG.js";import"./Date.Input-D9c1Nuk5.js";import"./useFormField-Cb_KudRA.js";import"./ChevronDown-CfpJJ6Yq.js";import"./Modal.context-DhgkVBla.js";import"./DismissableLayer-40Fxxc10.js";import"./useDescendant-Bvg2tBbK.js";import"./useClientLayoutEffect-aDhQwCtz.js";import"./Pencil-CRMYFBjg.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
