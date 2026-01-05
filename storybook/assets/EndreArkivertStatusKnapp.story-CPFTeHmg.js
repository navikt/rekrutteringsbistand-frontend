import{r as i,j as e,d as p}from"./iframe-V8deF7AU.js";import{E as s}from"./EndreArkivertStatusModal-BuDfIhwL.js";import{A as a}from"./ActionMenu-Q28nDcY1.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKbhKpGW.js";import"./OrganisasjonsnummerAlert-DCAdZLhF.js";import"./VStack-4hphIx77.js";import"./BasePrimitive-DojJiNHv.js";import"./List-BMjmv9Dz.js";import"./Link-D4MbMoav.js";import"./KandidatHendelseTag-DJa--HJX.js";import"./Tag-t-mS956V.js";import"./ChatExclamationmark-D4jAP78d.js";import"./FileXMark-CyITHuIm.js";import"./Trash-Z3qgeSL3.js";import"./HandShakeHeart-CE085DT4.js";import"./Calendar-BGVAPjpH.js";import"./ThumbUp-CKqB7qDV.js";import"./ExclamationmarkTriangle-1XwdyIBw.js";import"./Table-bvu5gXu-.js";import"./index-WQZ1lYgR.js";import"./index-B40KJ5b4.js";import"./util-CZlB0KAF.js";import"./Modal-BdZR828k.js";import"./floating-ui.react-EAeme2qu.js";import"./Date.Input-B5CGs7IV.js";import"./useFormField-BI6hugGR.js";import"./useControllableState-BrD3n7yG.js";import"./ChevronDown-GlmJUWNv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CubqqCOH.js";import"./Modal.context-CGw18QOf.js";import"./Portal-3aU1ZMl6.js";import"./useLatestRef-Ux7Gc1MN.js";import"./useDescendant-D-kQbSY-.js";import"./DismissableLayer-Bcdf3wle.js";import"./Floating-BYujIvKW.js";import"./ChevronRight-BlEERnWT.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
