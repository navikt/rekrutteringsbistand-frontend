import{r as i,j as e,d as l}from"./iframe-Bh0pRwlZ.js";import{E as s}from"./EndreArkivertStatusModal-DfyGZe8M.js";import{A as a}from"./ActionMenu-BLsY77an.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-zV2xek0y.js";import"./OrganisasjonsnummerAlert-DatBQDbt.js";import"./VStack-Bh5sqxvP.js";import"./BasePrimitive-CIdD0BN-.js";import"./List-CkvlSpuE.js";import"./Link-BX1sqZdd.js";import"./KandidatHendelseTag-CUy4BaC0.js";import"./Tag-JF9Q_tVq.js";import"./ChatExclamationmark-Cd1zPmOB.js";import"./FileXMark-BvjtqqGQ.js";import"./Trash-hvYogGAv.js";import"./HandShakeHeart-Oy_UEsjg.js";import"./Calendar-BcJnnO4v.js";import"./ThumbUp-B1m6WSdd.js";import"./Table-9ymDlq_U.js";import"./util-DvR9_Q0B.js";import"./format-BTbsmh5O.js";import"./match-xCq9uoL5.js";import"./parse-3E_CXpw1.js";import"./getDefaultOptions-C7QosIqT.js";import"./parseISO-4oYzmIp5.js";import"./index-Dt1xWJOQ.js";import"./index-B40KJ5b4.js";import"./isBefore-ml4Crlyx.js";import"./util-BGdIx1Ov.js";import"./Modal-D8B8mV1j.js";import"./floating-ui.react-BDVOfHzl.js";import"./Date.Input-D_w9FTP8.js";import"./useFormField-BxOERrPH.js";import"./useControllableState-D5MDUlNd.js";import"./ChevronDown-sDjvEBsh.js";import"./Modal.context-D0P2soZO.js";import"./Portal-BioWkIYD.js";import"./useDescendant-CeoMm-b3.js";import"./useClientLayoutEffect-Bt8IcS1D.js";import"./DismissableLayer-BUXRPJdy.js";import"./Floating-wwNu0VK_.js";import"./ChevronRight-BlrjslhC.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    return <EndreArkivertStatusKnapp modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />;
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    actionMenu: true,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Åpne meny
        </Button>
        <ActionMenu.Content>
          <EndreArkivertStatusKnapp actionMenu modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
