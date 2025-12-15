import{r as s,j as e,d as p}from"./iframe-C1ovTrJQ.js";import{E as i}from"./EndreArkivertStatusModal-BTeYQG13.js";import{A as a}from"./ActionMenu-DPaMQQIC.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKGneecr.js";import"./OrganisasjonsnummerAlert-DnBjo3Sr.js";import"./VStack-BODWlaTY.js";import"./BasePrimitive-kfJoC0Sw.js";import"./List-C5fkUS3x.js";import"./Link-B-3pnXuh.js";import"./KandidatHendelseTag-BarwRLK-.js";import"./Tag-C5B9wQUJ.js";import"./ChatExclamationmark-BNNaySzH.js";import"./FileXMark-wrBRLPbV.js";import"./Trash-cvTD7Rhw.js";import"./HandShakeHeart-CIqUKEon.js";import"./Calendar-zxdBpvT8.js";import"./ThumbUp-BzNvvIxt.js";import"./Table-C6jyp0hO.js";import"./index-CKttYGEK.js";import"./index-B40KJ5b4.js";import"./util-sPn1xI8S.js";import"./Modal-CZAjlcXE.js";import"./floating-ui.react-DOaaCIa6.js";import"./Date.Input-CMQNmt4o.js";import"./useFormField-QhcwKSrr.js";import"./useControllableState-B_oB0b42.js";import"./ChevronDown-DwOp--_B.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-o_MBhyI4.js";import"./Modal.context-BM-QBXBc.js";import"./Portal-DSyQQW1F.js";import"./useLatestRef-D4471ZKH.js";import"./useDescendant-fJDm5d6l.js";import"./DismissableLayer-BRnL8OqO.js";import"./Floating-CWgR1yJA.js";import"./ChevronRight-Cz1DRjgx.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
