import{r as s,j as e,d as p}from"./iframe-D39VVUvN.js";import{E as i}from"./EndreArkivertStatusModal-CSap-XuK.js";import{A as a}from"./ActionMenu-QkWE3aUk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D4uu2T-2.js";import"./OrganisasjonsnummerAlert-Dy1OqmL4.js";import"./VStack-BQhXnRv5.js";import"./BasePrimitive-MQf7OfQJ.js";import"./List-Dfv5dPXI.js";import"./Link-CPTb3KmN.js";import"./KandidatHendelseTag-C9smeLbY.js";import"./Tag-DHJh71jG.js";import"./ChatExclamationmark-C_hdwPLg.js";import"./FileXMark-C9AaQ49C.js";import"./Trash-CPVW59ly.js";import"./HandShakeHeart-C6VM6-ej.js";import"./Calendar-B31z38Bc.js";import"./ThumbUp-Bbodya7O.js";import"./Table-Dvx2SbC1.js";import"./index-DVkrSIrT.js";import"./index-B40KJ5b4.js";import"./util-B3YawHvy.js";import"./Modal-Ba_A0xGU.js";import"./floating-ui.react-UTckooEH.js";import"./Date.Input-DKdz0zTn.js";import"./useFormField-CzWypWoY.js";import"./useControllableState-BVmDx8dp.js";import"./ChevronDown-0Sqg8eG_.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-xrnbNCv7.js";import"./Modal.context-Bhs-zAbL.js";import"./Portal-JDg-B03P.js";import"./useLatestRef-DCkpuc9U.js";import"./useDescendant-DVTHk42e.js";import"./DismissableLayer-BaPy2MN_.js";import"./Floating-CxtashUR.js";import"./ChevronRight-0RsPw9Pk.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
