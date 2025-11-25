import{W as s,j as i}from"./iframe-Cb_tEQhr.js";import{V as n}from"./VelgInternStatus-Bqo4zhLM.js";import{w as d,c as o}from"./ContextDecorators-cpsJlDbX.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BM8k5UxY.js";import"./Tag-DTdzcQHr.js";import"./CircleSlash-Bq-GOaQO.js";import"./XMarkOctagon-c634MNvK.js";import"./Reception-DTYL7c4c.js";import"./SealCheckmark-Bgl6Akdb.js";import"./PersonChat-BtXSDNrF.js";import"./MagnifyingGlass-DTZUjzC5.js";import"./KandidatlisteContext-BnCWjw_c.js";import"./OrganisasjonsnummerAlert-rFOKluri.js";import"./VStack-BF6CQz7r.js";import"./BasePrimitive-CjUx5R6Q.js";import"./List-Q3akeOZU.js";import"./Link-By8fj0RR.js";import"./KandidatHendelseTag-CuyYx9OW.js";import"./ChatExclamationmark-hnQ3EilH.js";import"./FileXMark-BrPH6AFj.js";import"./Trash-I0HNZ4vA.js";import"./HandShakeHeart-DPL39k2f.js";import"./Calendar-D0Df8Rs_.js";import"./ThumbUp-DCp6vNGP.js";import"./Table-DMgHc776.js";import"./dato-B5MZd2kF.js";import"./parse-BM__I-39.js";import"./getDefaultOptions-CUz3V4OU.js";import"./parseISO-15HIodIa.js";import"./index-8U9Br2Q7.js";import"./index-B40KJ5b4.js";import"./util-CMxWB8VY.js";import"./Dropdown-BjsvzwdH.js";import"./useControllableState-sczq1XDD.js";import"./Popover-6DuQgIDe.js";import"./floating-ui.react-C8n_ZStl.js";import"./Date.Input-9jT1Lvgr.js";import"./useFormField-DFxSxc2F.js";import"./ChevronDown-DVgyIXbK.js";import"./Modal.context-CaVH4yK8.js";import"./DismissableLayer-DZ0-rpcq.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DGMrKY-N.js";import"./Pencil-Dilr86s3.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
