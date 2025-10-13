import{r as i,j as e,e as p}from"./iframe-taO6KEVb.js";import{E as s}from"./EndreArkivertStatusModal-BU7QKGKm.js";import{A as a}from"./ActionMenu-Dvuk9wQn.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DTSlPuPd.js";import"./OrganisasjonsnummerAlert-BdJ4-QVF.js";import"./VStack-CD1-oXDL.js";import"./BasePrimitive-wCct1CR8.js";import"./List-rdrUQoKQ.js";import"./Link-BID-uX-a.js";import"./KandidatHendelseTag--nw917LZ.js";import"./Tag-KcS1FDyP.js";import"./FileXMark-NRkoE5MI.js";import"./Trash-mg3r6R_u.js";import"./HandShakeHeart-3-z30V7f.js";import"./Calendar-XTBIa1tH.js";import"./ThumbUp-B7amj6st.js";import"./Table-B4hRwrbQ.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CFkdYIk_.js";import"./format-Cht9JRki.js";import"./match-tu-LbOFz.js";import"./parseISO-BbAFDAsU.js";import"./parse-CRzCE1aA.js";import"./getDefaultOptions-DAqeGPQd.js";import"./util-BZkNEq1o.js";import"./Modal-ByUBFovI.js";import"./floating-ui.react-CNy8nT8N.js";import"./Date.Input-CHvxnZPC.js";import"./useFormField-D0MUwnUw.js";import"./useControllableState-DJG1XFp3.js";import"./ChevronDown-BfqAXBTl.js";import"./Modal.context-BScie5YU.js";import"./Portal-C6aagALP.js";import"./useDescendant-BLQSDdsh.js";import"./useClientLayoutEffect-Cfyx80KT.js";import"./DismissableLayer-Kqg7A9Ve.js";import"./ChevronRight-kVmnr51i.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
