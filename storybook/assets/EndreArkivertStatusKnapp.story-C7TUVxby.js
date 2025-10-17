import{r as i,j as e,e as l}from"./iframe-BTWmweLi.js";import{E as s}from"./EndreArkivertStatusModal-M0N1DOtq.js";import{A as a}from"./ActionMenu-DQZmH3ER.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Bd8csJTp.js";import"./OrganisasjonsnummerAlert-BRU4p2Aa.js";import"./VStack-Bvk6nylg.js";import"./BasePrimitive-BvL64Zdv.js";import"./List-D7f8uJR3.js";import"./Link-CZeDRCSY.js";import"./KandidatHendelseTag-rS1Jue0z.js";import"./Tag-B90XF49d.js";import"./ChatExclamationmark-DtbN4rYy.js";import"./FileXMark-D2QprsHp.js";import"./Trash-CQNSmAUp.js";import"./HandShakeHeart-ocrmw2HP.js";import"./Calendar-dxDUhpS2.js";import"./ThumbUp-yPJns9Zx.js";import"./Table-OeNpFAOB.js";import"./util-CgYIlP8i.js";import"./format-nXkQDeqK.js";import"./match-Ceft5OFa.js";import"./parseISO-cWGmtevm.js";import"./parse-CIeY0Gnj.js";import"./getDefaultOptions-BP7_tTwA.js";import"./util-B-SYN4OI.js";import"./Modal-DiRUPVHz.js";import"./floating-ui.react-DvBUZrXh.js";import"./Date.Input-BDf-ZmtR.js";import"./useFormField-DIeB7L7F.js";import"./useControllableState-CAO2XIOD.js";import"./ChevronDown-BurMjht3.js";import"./Modal.context-CyWp2Ee1.js";import"./Portal-CPjsEQ6X.js";import"./useDescendant-DwMTyTfX.js";import"./useClientLayoutEffect-C-fKe3ty.js";import"./DismissableLayer-D_ok9yD_.js";import"./Floating-DiCgoxpl.js";import"./ChevronRight-EwYlniA4.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
