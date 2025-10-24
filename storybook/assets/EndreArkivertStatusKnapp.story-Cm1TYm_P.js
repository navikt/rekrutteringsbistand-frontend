import{r as i,j as e,o as l}from"./iframe-D5GLcELV.js";import{E as s}from"./EndreArkivertStatusModal-Cfma_GCG.js";import{A as a}from"./ActionMenu-DxIDI-g4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SulhFiUf.js";import"./OrganisasjonsnummerAlert-B9qpUYm5.js";import"./VStack-Bv0JWG-f.js";import"./BasePrimitive-DC9lFHA7.js";import"./List-BCZK_Xy2.js";import"./Link-CHu4RiPq.js";import"./KandidatHendelseTag-Bo8UKgDh.js";import"./Tag-DghhMzmu.js";import"./ChatExclamationmark-C51-UEDe.js";import"./FileXMark-BYjEGPc3.js";import"./Trash-BsCYRgD8.js";import"./HandShakeHeart-B7rRvMPR.js";import"./Calendar-CVA3Syd5.js";import"./ThumbUp-3OU6stig.js";import"./Table-DrxQ9pIW.js";import"./util-CtSO-HR5.js";import"./format-DeHyM4JK.js";import"./match-BGExYOs8.js";import"./parse-CIB-TC0h.js";import"./getDefaultOptions-By9Y0qpY.js";import"./parseISO-BsvmJ_As.js";import"./index-aoNK6OM-.js";import"./index-B40KJ5b4.js";import"./isBefore-D3QM3TL-.js";import"./util-HZY0gpg6.js";import"./Modal-DEfvENa1.js";import"./floating-ui.react-BaVvFCSb.js";import"./Date.Input-BcVGPYHY.js";import"./useFormField-69eCTCUv.js";import"./useControllableState-C6IT1995.js";import"./ChevronDown-_ie1QdRq.js";import"./Modal.context-4Pv1BvK5.js";import"./Portal-DagI-hhJ.js";import"./useDescendant-4xTvoj0i.js";import"./useClientLayoutEffect-DGZN2Qdt.js";import"./DismissableLayer-B9ql3sCc.js";import"./Floating-n1bkuQHG.js";import"./ChevronRight-Dw7Srqqy.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
