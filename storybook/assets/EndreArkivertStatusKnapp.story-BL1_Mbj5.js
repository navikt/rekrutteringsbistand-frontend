import{r as i,j as e,d as p}from"./iframe-D8l9BGis.js";import{E as s}from"./EndreArkivertStatusModal-DggtOjdL.js";import{A as a}from"./ActionMenu-BxvJ-g-_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext--tuHKiNq.js";import"./OrganisasjonsnummerAlert-DQLutb3A.js";import"./VStack-B0hY9ntf.js";import"./BasePrimitive-DQuU5A7Q.js";import"./Box-DWh8wLnh.js";import"./List-D4rYQwke.js";import"./Link-nD0NnHfS.js";import"./KandidatHendelseTag-BG0GYoSg.js";import"./Tag-Qlq6vGjg.js";import"./ChatExclamationmark-DnSlsKaK.js";import"./FileXMark-aV0bDqes.js";import"./Trash-CtYOsaOd.js";import"./HandShakeHeart-CK2uE5i6.js";import"./Calendar-DjYZmVha.js";import"./ThumbUp-CsBZxtY2.js";import"./Table-CwSmWQEg.js";import"./index-DflwV3gF.js";import"./index-B40KJ5b4.js";import"./util-CAbY6blA.js";import"./Modal-4q45ceiu.js";import"./floating-ui.react-uksW3Zsc.js";import"./useFormField-CaB6me-E.js";import"./ReadMore-VortQHAm.js";import"./useControllableState-CSpkSaA9.js";import"./ChevronDown-DmqUgsk9.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BiVm7P29.js";import"./Modal.context-QsBti5gJ.js";import"./Portal-CuQ-EkUL.js";import"./useValueAsRef-CrCnaSgK.js";import"./Floating-Bgf5VvnL.js";import"./useDescendant-BVBCIVzW.js";import"./DismissableLayer-oyTpsV4W.js";import"./ChevronRight-B6Hr_1iK.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
