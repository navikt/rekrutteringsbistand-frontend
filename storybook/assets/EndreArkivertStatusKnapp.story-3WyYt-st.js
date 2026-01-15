import{r as i,j as e,d as p}from"./iframe-BVpQlhXu.js";import{E as s}from"./EndreArkivertStatusModal-D_8gaphP.js";import{A as a}from"./ActionMenu-UeNp6Xse.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-xWK2vGKb.js";import"./OrganisasjonsnummerAlert-D88qbzcp.js";import"./VStack-BlOHU-0T.js";import"./BasePrimitive-CjllcUPO.js";import"./List-DNLt3jEI.js";import"./Link-BFymvS_W.js";import"./KandidatHendelseTag-0d_ofy_p.js";import"./Tag-C3Ns-E6i.js";import"./ChatExclamationmark-CN_Z3M77.js";import"./FileXMark-Cqwhuf8x.js";import"./Trash-CXt3Z_EP.js";import"./HandShakeHeart-BlEIaLmf.js";import"./Calendar-WyB0cMbI.js";import"./ThumbUp-AQ4KgzJP.js";import"./ExclamationmarkTriangle-3r4Z2Jmc.js";import"./Table-ClebMMPG.js";import"./index-C9yN7hBY.js";import"./index-B40KJ5b4.js";import"./util-Dq2C0rzv.js";import"./Modal-BGlsUYHe.js";import"./floating-ui.react-3U288saN.js";import"./Date.Input-KCgvmNDy.js";import"./useFormField-YVNxZSU4.js";import"./useControllableState-J-GqUv9G.js";import"./ChevronDown-BiNlS0AG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C2oyJy3J.js";import"./Modal.context-n9RJuXC-.js";import"./Portal--xP2TzI7.js";import"./useLatestRef-Dfj7Kd_V.js";import"./useDescendant-mHHRtx28.js";import"./DismissableLayer-DNoYzt-k.js";import"./Floating-D-YrUu_V.js";import"./ChevronRight-CSiQ2ooo.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
