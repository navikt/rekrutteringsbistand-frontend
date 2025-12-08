import{r as s,j as e,d as p}from"./iframe-lHk_a_Ys.js";import{E as i}from"./EndreArkivertStatusModal-BCyA9D-b.js";import{A as a}from"./ActionMenu-Cws5h29D.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKwNZ6xA.js";import"./OrganisasjonsnummerAlert-pIiwz4o2.js";import"./VStack-BgragJN7.js";import"./BasePrimitive-mL93Sz-M.js";import"./List-C62mOMDS.js";import"./Link-BK3qalDl.js";import"./KandidatHendelseTag-CE0DX2vf.js";import"./Tag-DOherZZD.js";import"./ChatExclamationmark-DxrFlG-C.js";import"./FileXMark-C7kv2qyg.js";import"./Trash-C29_Zhjq.js";import"./HandShakeHeart-D7XyvQyj.js";import"./Calendar-t7TVRuHz.js";import"./ThumbUp-Bq1lpbw4.js";import"./Table-B9HTLA43.js";import"./index-BfhVw7sA.js";import"./index-B40KJ5b4.js";import"./util-CgO9toBk.js";import"./Modal-DNDm5JxN.js";import"./floating-ui.react-DP9N4sQ7.js";import"./Date.Input-CwQCqCkJ.js";import"./useFormField-AG7POx7Y.js";import"./useControllableState-BAfukxCW.js";import"./ChevronDown-B6zAlv3g.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-q86mg6HT.js";import"./Modal.context-YOjTMdCO.js";import"./Portal-BnMbjmSZ.js";import"./useLatestRef-DDQLWIW7.js";import"./useDescendant-Btqox4sJ.js";import"./DismissableLayer-B2w8ZaY2.js";import"./Floating-BArRbXcv.js";import"./ChevronRight-uHm5rK3T.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
