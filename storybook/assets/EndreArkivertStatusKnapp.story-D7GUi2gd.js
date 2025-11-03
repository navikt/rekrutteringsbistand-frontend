import{r as i,j as e,d as l}from"./iframe-CQ6vvEeK.js";import{E as s}from"./EndreArkivertStatusModal-CA7xPBD5.js";import{A as a}from"./ActionMenu-BjTnXG01.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKszYbKO.js";import"./OrganisasjonsnummerAlert-BmxN11Mr.js";import"./VStack-ChM420R4.js";import"./BasePrimitive-BXoVEjCk.js";import"./List--EevA5Ol.js";import"./Link-x4iWrhKq.js";import"./KandidatHendelseTag-DLSYsUU6.js";import"./Tag-a5dvz4kl.js";import"./ChatExclamationmark-tt-RHu41.js";import"./FileXMark-Cky77w8Z.js";import"./Trash-DAs8orv7.js";import"./HandShakeHeart-JGxqHzHK.js";import"./Calendar-ZplbI33s.js";import"./ThumbUp-wH43M9I4.js";import"./Table-B30Jb__B.js";import"./util-B53mYrdJ.js";import"./parse-D-IkhgM-.js";import"./getDefaultOptions-N4tXrMdT.js";import"./parseISO-ByaoA-27.js";import"./index-DjwqnLDo.js";import"./index-B40KJ5b4.js";import"./isBefore-BhwUETve.js";import"./util-BJHpjWP_.js";import"./Modal-CiBzigW7.js";import"./floating-ui.react-q6qfomDA.js";import"./Date.Input-Lk24Z0xI.js";import"./useFormField-BWgTqZvY.js";import"./useControllableState-B4ZbH_WK.js";import"./ChevronDown-CH8VYIJt.js";import"./Modal.context-BLjCIKII.js";import"./Portal-CBnPcAZ4.js";import"./useDescendant-AZdzncnu.js";import"./useClientLayoutEffect-DY3UtHGC.js";import"./DismissableLayer-iXkqC0Wv.js";import"./Floating-b5-qsFTJ.js";import"./ChevronRight-B5MYPCXi.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
