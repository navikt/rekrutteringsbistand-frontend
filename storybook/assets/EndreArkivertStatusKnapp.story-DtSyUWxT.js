import{r as i,j as e,d as p}from"./iframe-DTWfjzwK.js";import{E as s}from"./EndreArkivertStatusModal-gatb3vgx.js";import{A as a}from"./ActionMenu-KfqeGTxw.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-9j-nByJE.js";import"./OrganisasjonsnummerAlert-DfnnZe-v.js";import"./VStack-CgsrATa5.js";import"./BasePrimitive-DX-eT6RC.js";import"./List-zhRu0RbV.js";import"./Link-oXj3dChs.js";import"./KandidatHendelseTag-UtpQnf23.js";import"./Tag-C2vE6uVe.js";import"./ChatExclamationmark-BF8UDRml.js";import"./FileXMark-DE2jpYqu.js";import"./Trash-C5fcFxY8.js";import"./HandShakeHeart-A_sscZWx.js";import"./Calendar-CISQ762P.js";import"./ThumbUp-BsT8VM0L.js";import"./ExclamationmarkTriangle-DxdM0ej0.js";import"./Table-ChAt4vgz.js";import"./index-CWG33-hS.js";import"./index-B40KJ5b4.js";import"./util-DERHMG49.js";import"./Modal-BSa8CYsD.js";import"./floating-ui.react-BkZ-r5Fb.js";import"./Date.Input-D2qZQohQ.js";import"./useFormField-BCrrrB5u.js";import"./useControllableState-Dgkk00OW.js";import"./ChevronDown-CUL-96TG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BA3EwM4r.js";import"./Modal.context-CC0zqPZ_.js";import"./Portal-BKBcRe2T.js";import"./useLatestRef-CoB66Ct7.js";import"./useDescendant-C18DfnmD.js";import"./DismissableLayer-Ee6nghZx.js";import"./Floating-Dj6Og5nm.js";import"./ChevronRight-PTOk0nWI.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
