import{r as i,j as e,d as l}from"./iframe-rYPfMBZN.js";import{E as s}from"./EndreArkivertStatusModal-Ha9Cra4G.js";import{A as a}from"./ActionMenu-DhsfhTN5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CRs4GM_E.js";import"./OrganisasjonsnummerAlert-5FZV-rbs.js";import"./VStack-Dz8JjFOb.js";import"./BasePrimitive-BjjeF53e.js";import"./List-RRGcFP05.js";import"./Link-C4T7rFE7.js";import"./KandidatHendelseTag-DhnFAsz8.js";import"./Tag-D1HC3pBs.js";import"./ChatExclamationmark-BbdR5dOM.js";import"./FileXMark-wIvuJboS.js";import"./Trash-Rii4rBtB.js";import"./HandShakeHeart-BWHURL8t.js";import"./Calendar-D_VD61zK.js";import"./ThumbUp-BptVK7Yp.js";import"./Table-Du570W8P.js";import"./dato-SoR29OEJ.js";import"./parse-Cl8XmbO4.js";import"./getDefaultOptions-D9iGir7p.js";import"./parseISO-BbVHBu92.js";import"./index-C65XzgtL.js";import"./index-B40KJ5b4.js";import"./util-BOIkYAu6.js";import"./Modal-CfdjlllU.js";import"./floating-ui.react-BmyHG_a9.js";import"./Date.Input-BERDNUCe.js";import"./useFormField-BMrBnHTm.js";import"./useControllableState-mFgUgRJs.js";import"./ChevronDown-HMna1nBJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DZErODHj.js";import"./Modal.context-B4QjZZ9Z.js";import"./Portal-CmF8HdQ4.js";import"./useLatestRef-BWexI1Gs.js";import"./useDescendant-COCcthND.js";import"./DismissableLayer-C3TXeR6u.js";import"./Floating-GI1P_2-0.js";import"./ChevronRight-Br_oR0tR.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
