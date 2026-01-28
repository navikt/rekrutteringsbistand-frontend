import{r as i,j as e,d as p}from"./iframe-CeBddf6m.js";import{E as s}from"./EndreArkivertStatusModal-Txt0yp4H.js";import{A as a}from"./ActionMenu-CcfBY--f.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CM7QZJj3.js";import"./OrganisasjonsnummerAlert-ONyq2mZG.js";import"./VStack-BOGXFEAk.js";import"./BasePrimitive-2FA-uqyG.js";import"./Box-iXv9vOXi.js";import"./List-I1LukFvB.js";import"./Link-D7bRtTL4.js";import"./KandidatHendelseTag-C2BWAqE5.js";import"./Tag-C39wB8zK.js";import"./ChatExclamationmark-CzmxQqFp.js";import"./FileXMark-BHg96SD7.js";import"./Trash-H2SbdjPz.js";import"./HandShakeHeart-9aaqo0N5.js";import"./Calendar-CNK4PSZI.js";import"./ThumbUp-qSlJSduX.js";import"./Table-MB4gVTvn.js";import"./index-COGfCL7v.js";import"./index-B40KJ5b4.js";import"./util-DZUmK0Iu.js";import"./Modal-92vjN1xN.js";import"./floating-ui.react-yriId-T9.js";import"./useFormField-BCtgC-8M.js";import"./ReadMore-DTSsWHn5.js";import"./useControllableState-Z5xfEuBZ.js";import"./ChevronDown-CMHnjEAw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-LE5s5o8b.js";import"./Modal.context-DHabSalL.js";import"./Portal-xuNywQp0.js";import"./useValueAsRef-BfGve3Gx.js";import"./Floating-zp7EWh3L.js";import"./useDescendant-B8uZGA4T.js";import"./DismissableLayer-BVglxUyP.js";import"./ChevronRight-BS1GcyjH.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
