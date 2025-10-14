import{j as s}from"./iframe-CUkABeAB.js";import{w as d,c as o}from"./ContextDecorators-CMeFEBRm.js";import{V as n}from"./VelgInternStatus-BkeR1Uv_.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CM6BiwiG.js";import"./OrganisasjonsnummerAlert-C-Pqbviv.js";import"./VStack-8d2bOsTl.js";import"./BasePrimitive-Cpq11D6F.js";import"./List-3dklzM8K.js";import"./Link-CAbsed6V.js";import"./KandidatHendelseTag-DNFfyJYB.js";import"./Tag-D-m_iWzx.js";import"./ChatExclamationmark-JBygFkCd.js";import"./FileXMark-D63Q1V8W.js";import"./Trash-CzSjrRUn.js";import"./HandShakeHeart-BrZJHtMd.js";import"./Calendar-BLD0T8W7.js";import"./ThumbUp-DTlY_Wwa.js";import"./Table-Cix3Up-E.js";import"./util-BvWtTNp-.js";import"./format-BnamQXY9.js";import"./match-ou6qwCdC.js";import"./parseISO-DURtih-t.js";import"./parse-Dh-iiOwK.js";import"./getDefaultOptions-DI-qYsVf.js";import"./util-BG9ROYVH.js";import"./InternStatusTag-DhF93NLV.js";import"./CircleSlash-Vv1m7zYy.js";import"./XMarkOctagon-BeTcUBgK.js";import"./Reception-BzvO6Ccf.js";import"./SealCheckmark-DAB602dy.js";import"./PersonChat-DdvIEgZ3.js";import"./MagnifyingGlass-C5zqdhV4.js";import"./Dropdown-B4QSHK0j.js";import"./useControllableState-CupVUa9T.js";import"./Popover-rwrM8NSF.js";import"./floating-ui.react-DSapQsXw.js";import"./Date.Input-D5wMcc1z.js";import"./useFormField-EMReCnbG.js";import"./ChevronDown-WXoNBOJo.js";import"./Modal.context-D39eZ3rC.js";import"./DismissableLayer-28uNBaum.js";import"./useDescendant-Dw3c8EE5.js";import"./useClientLayoutEffect-Ded7RHbC.js";import"./Pencil-Blw1PpvD.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
