import{r as s,j as e,d as p}from"./iframe-nRhSYCvZ.js";import{E as i}from"./EndreArkivertStatusModal-CjlUbWqH.js";import{A as a}from"./ActionMenu-BMTTSEH7.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-uYh8gWUZ.js";import"./OrganisasjonsnummerAlert-DCsl607j.js";import"./VStack-PEvcQc95.js";import"./BasePrimitive-BIZiyU-w.js";import"./List-DBc6WJmZ.js";import"./Link-BZ0LHHL5.js";import"./KandidatHendelseTag-BE_yv2X7.js";import"./Tag-COzDOVW9.js";import"./ChatExclamationmark-BfStBVOL.js";import"./FileXMark-bdaafn80.js";import"./Trash-BqGjYOzn.js";import"./HandShakeHeart-aR12a-Mn.js";import"./Calendar-BZNwxc2P.js";import"./ThumbUp-D0pwDn3X.js";import"./Table-BdqMt9GS.js";import"./index-DPtEuWSC.js";import"./index-B40KJ5b4.js";import"./util-COFemefV.js";import"./Modal-Bj0DOBfz.js";import"./floating-ui.react-nolZAvpl.js";import"./Date.Input-CVqKzlSL.js";import"./useFormField-Cwe4eWS0.js";import"./useControllableState-C3_wTSJE.js";import"./ChevronDown-BF2Hm28B.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C47GNyJy.js";import"./Modal.context-BDOVP4V9.js";import"./Portal-Btfq3olU.js";import"./useLatestRef-CqvnlZdY.js";import"./useDescendant-Cqj9zkLr.js";import"./DismissableLayer-Bb1GHrD4.js";import"./Floating-dWoROiR4.js";import"./ChevronRight-B672aWQy.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
