import{r as i,j as e,d as p}from"./iframe-_QUoCLzD.js";import{E as s}from"./EndreArkivertStatusModal-BlcLoNtk.js";import{A as a}from"./ActionMenu-MnQcPvY-.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DdK6nfmU.js";import"./OrganisasjonsnummerAlert-BB2zgEoS.js";import"./VStack-B07rP7Ko.js";import"./BasePrimitive-BUOPj2J2.js";import"./List-BX43fcHL.js";import"./Link-CucnNpTx.js";import"./KandidatHendelseTag-BZMp1aBB.js";import"./Tag-DiQnittR.js";import"./ChatExclamationmark-XhXNcNES.js";import"./FileXMark-BU1NHFma.js";import"./Trash-090UAozJ.js";import"./HandShakeHeart-DF-h01jx.js";import"./Calendar-C1c_btA0.js";import"./ThumbUp-CJa7Cc5X.js";import"./ExclamationmarkTriangle-DEQ4Xwvt.js";import"./Table-CDD0Bsw0.js";import"./index-CktUPNRq.js";import"./index-B40KJ5b4.js";import"./util-C51HBXju.js";import"./Modal-Csfh0IqP.js";import"./floating-ui.react-z-ORhGHN.js";import"./Date.Input-C4Dh5hB2.js";import"./useFormField-CPQ4YRRy.js";import"./useControllableState-wViw2aPt.js";import"./ChevronDown-BzJpQY-A.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Y6xfv06t.js";import"./Modal.context-BHSwgPbI.js";import"./Portal-BkG3zDgu.js";import"./useLatestRef-DpvLue1j.js";import"./useDescendant-BM9cR_29.js";import"./DismissableLayer-h4ATGLsG.js";import"./Floating-BzDqfX3-.js";import"./ChevronRight-PeUz0ZGh.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
