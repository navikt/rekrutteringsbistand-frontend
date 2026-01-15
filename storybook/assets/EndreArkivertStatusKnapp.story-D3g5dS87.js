import{r as i,j as e,d as p}from"./iframe-CIDC3Z6q.js";import{E as s}from"./EndreArkivertStatusModal-BadnI8vk.js";import{A as a}from"./ActionMenu-rFFCkPfn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-watgMLoN.js";import"./OrganisasjonsnummerAlert-BaynNlkq.js";import"./VStack-B9vhOXzh.js";import"./BasePrimitive-BenqU5Ny.js";import"./List-DrNKfggA.js";import"./Link-CGl9Recr.js";import"./KandidatHendelseTag-DKzSSGOG.js";import"./Tag-bdB-v9K4.js";import"./ChatExclamationmark-B8sPg0st.js";import"./FileXMark-Cx41xJB4.js";import"./Trash-BIJDRe3Q.js";import"./HandShakeHeart-D8LWJ5fd.js";import"./Calendar-U8EZjtNx.js";import"./ThumbUp-DD_qpRFb.js";import"./ExclamationmarkTriangle-DGtk2zqK.js";import"./Table-BsDh2VfC.js";import"./index-B71oAnfL.js";import"./index-B40KJ5b4.js";import"./util-CPo_B2nz.js";import"./Modal-Do1NnOqH.js";import"./floating-ui.react-Bn_hf3YY.js";import"./Date.Input-C_TK-f3Y.js";import"./useFormField-TVXsso69.js";import"./useControllableState-zwJkXhKO.js";import"./ChevronDown-BdFEv6NO.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DVrPlUWd.js";import"./Modal.context-BU5Stcmk.js";import"./Portal-DW6Tvl57.js";import"./useLatestRef-DLTJIpGN.js";import"./useDescendant-DQPzWpCP.js";import"./DismissableLayer-BMWwLBet.js";import"./Floating-krv8KVzr.js";import"./ChevronRight-Cvn5KyDs.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
