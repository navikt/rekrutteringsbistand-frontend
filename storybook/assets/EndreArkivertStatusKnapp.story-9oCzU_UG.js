import{r as i,j as e,d as p}from"./iframe-CYkqDpFQ.js";import{E as s}from"./EndreArkivertStatusModal-D5T0HvwX.js";import{A as a}from"./ActionMenu-DrO2emjn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C7pqAoBp.js";import"./OrganisasjonsnummerAlert-B5Idb2Qi.js";import"./VStack-DJPKcU1m.js";import"./BasePrimitive-reuNz4pH.js";import"./List-Bn67-Uss.js";import"./Link-u8POiQZ8.js";import"./KandidatHendelseTag-mKIRRdOJ.js";import"./Tag-7IOW6zyS.js";import"./ChatExclamationmark-D3KvHGNT.js";import"./FileXMark-DVxLpWk-.js";import"./Trash-DqiEXXW0.js";import"./HandShakeHeart-BsIlKUhK.js";import"./Calendar-DQWarZPl.js";import"./ThumbUp-Cq2dP2O9.js";import"./ExclamationmarkTriangle-BMG1JPPl.js";import"./Table-Bb6xp3ny.js";import"./index-DaGfPweS.js";import"./index-B40KJ5b4.js";import"./util-B1_8Nu4i.js";import"./Modal-BNEw6w1L.js";import"./floating-ui.react-BxzS63wE.js";import"./Date.Input-XWqrZOCJ.js";import"./useFormField-z3l0fHsz.js";import"./useControllableState-BXn8QYgD.js";import"./ChevronDown-B-VMQ9SL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-uErDUp0f.js";import"./Modal.context-DUSEIPc7.js";import"./Portal-D2drl2B4.js";import"./useLatestRef-D5tJv1x2.js";import"./useDescendant-CcyedC1J.js";import"./DismissableLayer-BuyAlXxU.js";import"./Floating-MFWnOhje.js";import"./ChevronRight-DuooAMaP.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
