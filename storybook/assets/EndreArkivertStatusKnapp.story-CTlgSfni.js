import{r as s,j as e,d as p}from"./iframe-Djf0aaCu.js";import{E as i}from"./EndreArkivertStatusModal-C3q21jrS.js";import{A as a}from"./ActionMenu-DlZGlcQx.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DlK2m225.js";import"./OrganisasjonsnummerAlert-DEBjV0z0.js";import"./VStack-BGsDIkWS.js";import"./BasePrimitive-CSUIcWuf.js";import"./List-DhIUy4Ha.js";import"./Link-C7h0FEQb.js";import"./KandidatHendelseTag-DJib85Pq.js";import"./Tag-DEoThWTs.js";import"./ChatExclamationmark-DB8kfSnV.js";import"./FileXMark-CvsleZFt.js";import"./Trash-BQ_83vSR.js";import"./HandShakeHeart-D7g3P2SO.js";import"./Calendar-B2vIp9Z6.js";import"./ThumbUp-DINwWRPg.js";import"./Table-DoFaPu74.js";import"./index-CaC8I_UC.js";import"./index-B40KJ5b4.js";import"./util-B2PQqqnM.js";import"./Modal-sEzJaJhM.js";import"./floating-ui.react-0NnofmAD.js";import"./Date.Input-DJ-gGXjF.js";import"./useFormField-D-dph_0E.js";import"./useControllableState-DRurQPnd.js";import"./ChevronDown-k3UIUZgA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CRL3UlMw.js";import"./Modal.context-Ak7lim11.js";import"./Portal-DZBkUJ0T.js";import"./useLatestRef-Bf9MrB6D.js";import"./useDescendant-bZqUUkQD.js";import"./DismissableLayer-5bSw7yqi.js";import"./Floating-CT978M8b.js";import"./ChevronRight-DyQc02Ru.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
