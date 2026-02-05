import{r as i,j as e,d as l}from"./iframe-C9qr6ajT.js";import{E as s}from"./EndreArkivertStatusModal-CUThFFNg.js";import{A as a}from"./ActionMenu-CeDV4k95.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DCvRCgz8.js";import"./OrganisasjonsnummerAlert-Cxu3-gsQ.js";import"./VStack-sPDQevDu.js";import"./BasePrimitive-Do5WjwtA.js";import"./Box-CqzY5P6E.js";import"./List-BE3Qx1bR.js";import"./Link-hPgkhGBp.js";import"./KandidatHendelseTag-B7_qO63l.js";import"./Tag-DTpHsMkP.js";import"./ChatExclamationmark-OHyhugA4.js";import"./FileXMark-BjBZIB9l.js";import"./Trash-DWh3-6YG.js";import"./HandShakeHeart-CNcTNguu.js";import"./Calendar-Bgrd5uO8.js";import"./ThumbUp-ChhFSAgX.js";import"./ExclamationmarkTriangle-NYyxQjsX.js";import"./Table-CEb8gThy.js";import"./index-Cs4qgHe1.js";import"./index-B40KJ5b4.js";import"./util-B6mb53Gu.js";import"./Modal-CHNKsO9J.js";import"./floating-ui.react-bRhtECzu.js";import"./useFormField-JMrQ0xT4.js";import"./ReadMore-DBRsQsx-.js";import"./useControllableState-ysvxf6Tl.js";import"./ChevronDown-C5SPUB4O.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DTYWJsJ9.js";import"./Modal.context-DGkPTSJ2.js";import"./Portal-C5vzwLvt.js";import"./useValueAsRef-COtXxh9x.js";import"./Floating-dkFdS6af.js";import"./useDescendant-sYfellte.js";import"./DismissableLayer-szL1Inc1.js";import"./ChevronRight-1i8QBOZ4.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
