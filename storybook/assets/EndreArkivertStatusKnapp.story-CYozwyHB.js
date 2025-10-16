import{r as i,j as e,e as l}from"./iframe-CnEkfJjQ.js";import{E as s}from"./EndreArkivertStatusModal-CaSE2Rmz.js";import{A as a}from"./ActionMenu-CeXBpEzQ.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-HIRI-J95.js";import"./OrganisasjonsnummerAlert-B23Jmmg0.js";import"./VStack-D3_cDo5O.js";import"./BasePrimitive-CJsxFWaA.js";import"./List-CMa3XxGU.js";import"./Link-Bub8b3KC.js";import"./KandidatHendelseTag-B5dnEu9y.js";import"./Tag-DmHnnT3j.js";import"./ChatExclamationmark-CaxCUB7e.js";import"./FileXMark-Bpe-BWEB.js";import"./Trash-DLfbYG6b.js";import"./HandShakeHeart-G1PY24Kb.js";import"./Calendar-C6MR1ehC.js";import"./ThumbUp-BqHABY98.js";import"./Table-CftjquAj.js";import"./util-C2UfT_2f.js";import"./format-Dd_rkWUl.js";import"./match-CfPkVkUS.js";import"./parseISO-CaaYQBsI.js";import"./parse-Cx8TZIRr.js";import"./getDefaultOptions-0dENDqjq.js";import"./util-BX4E7U5l.js";import"./Modal-aZ-miv_B.js";import"./floating-ui.react-CS8Kbatp.js";import"./Date.Input-CkEuVDaW.js";import"./useFormField-yhmtRsl4.js";import"./useControllableState-D9VP06Xz.js";import"./ChevronDown-BA6G5vv2.js";import"./Modal.context-Wi_6ZnAF.js";import"./Portal-GFc0jWLs.js";import"./useDescendant-DEaDV0OM.js";import"./useClientLayoutEffect-BziDiKhG.js";import"./DismissableLayer-BpGxaF4X.js";import"./Floating-BCVKAj49.js";import"./ChevronRight-BDoz2h4T.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
