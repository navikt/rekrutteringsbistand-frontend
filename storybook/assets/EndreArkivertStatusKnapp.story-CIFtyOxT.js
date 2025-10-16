import{r as i,j as e,d as p}from"./iframe-B5lap-Ku.js";import{E as s}from"./EndreArkivertStatusModal-CtyqpZe2.js";import{A as a}from"./ActionMenu-DMgrDs6h.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C0nj-sEy.js";import"./OrganisasjonsnummerAlert-Cid1IVtu.js";import"./VStack-BAOUzk4Q.js";import"./BasePrimitive-JTxShD_Z.js";import"./List-BTCphmi9.js";import"./Link-B4ZX8J7S.js";import"./KandidatHendelseTag-DC5SqOk2.js";import"./Tag-DijBKXLj.js";import"./FileXMark-BONsLRyz.js";import"./Trash-ADvoL7uR.js";import"./HandShakeHeart-CrVsSIsC.js";import"./Calendar-nE1M2tRJ.js";import"./ThumbUp-CJ1CrxUC.js";import"./Table-DXoj44Y2.js";import"./util-9NfOLJI3.js";import"./format-C3YakQiN.js";import"./match-Dfp5Gb3j.js";import"./parse-DwqJeXH-.js";import"./getDefaultOptions-C7m5dLFw.js";import"./parseISO-Cd2_vPbt.js";import"./util-BCPyWica.js";import"./Modal-L55sw-mH.js";import"./floating-ui.react-DL-ezC40.js";import"./Date.Input-Bqz9kZmu.js";import"./useFormField-CbCCiLm3.js";import"./useControllableState-DGruGuX1.js";import"./ChevronDown-ZgbNc0TD.js";import"./Modal.context-ZJjq0Plj.js";import"./Portal-JktbVhdI.js";import"./useDescendant-CgX9pFMc.js";import"./useClientLayoutEffect-C5Qcaslz.js";import"./DismissableLayer-C84ykXs6.js";import"./Floating-CE9nzoQJ.js";import"./ChevronRight-B3Bi-VV2.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,X as default};
