import{r as i,j as e,d as l}from"./iframe-DxqhZqaS.js";import{E as s}from"./EndreArkivertStatusModal-wvqT5hSw.js";import{A as a}from"./ActionMenu-C1-fsbiR.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CpPdQbLC.js";import"./OrganisasjonsnummerAlert-EjbENWph.js";import"./VStack-cvqccLrx.js";import"./BasePrimitive-DYSm7bwS.js";import"./List-lS0xLvoq.js";import"./Link-CVoPoDzX.js";import"./KandidatHendelseTag-upSNK5Co.js";import"./Tag-CUmrU5ZG.js";import"./ChatExclamationmark-Ch7xS30U.js";import"./FileXMark-hf6Mrp2o.js";import"./Trash-zC9MF7CA.js";import"./HandShakeHeart-CXCC8yfE.js";import"./Calendar-CKfqGBwO.js";import"./ThumbUp-vgw0btPN.js";import"./Table-NC_KmpTa.js";import"./dato-L-iJE9U7.js";import"./parse-D9TuSnDx.js";import"./getDefaultOptions-C5a0nyat.js";import"./parseISO-BFHsUEmE.js";import"./index-CqTTEDZl.js";import"./index-B40KJ5b4.js";import"./util-C0A9QH6B.js";import"./Modal-Bob3JG4_.js";import"./floating-ui.react-DysU3Eee.js";import"./Date.Input-BYJTTWbE.js";import"./useFormField-CyZnCl9A.js";import"./useControllableState-xYO-yVC9.js";import"./ChevronDown-CYQb3Cst.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-J_YqUB-h.js";import"./Modal.context-BijZIr-h.js";import"./Portal-CE_45EHk.js";import"./useLatestRef-CBGCxzKE.js";import"./useDescendant-Bnf4pPYo.js";import"./DismissableLayer-DrAEeoje.js";import"./Floating-OgVeVYEu.js";import"./ChevronRight-ByaeR-Qh.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,_ as default};
