import{r as i,j as e,o as l}from"./iframe-29wJf-MM.js";import{E as s}from"./EndreArkivertStatusModal-DjFXXhJU.js";import{A as a}from"./ActionMenu-C6s4PB-U.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-nC5pSZqq.js";import"./OrganisasjonsnummerAlert-CZllZoGG.js";import"./VStack-BUqoGe0H.js";import"./BasePrimitive-kFQ7tb9Y.js";import"./List-CYAAEi6i.js";import"./Link-BLY7alrK.js";import"./KandidatHendelseTag-DczlWlqm.js";import"./Tag-ckTyjE5j.js";import"./ChatExclamationmark-BBSDZreT.js";import"./FileXMark-BMIrEZUw.js";import"./Trash-B0akXBne.js";import"./HandShakeHeart-7fyLqimj.js";import"./Calendar-CriLi_lr.js";import"./ThumbUp-BgcCqH17.js";import"./Table-D1B3P-cv.js";import"./util-O-1r3e4W.js";import"./format-C27PvbPf.js";import"./match-r1881k89.js";import"./parse-Be59gMbd.js";import"./getDefaultOptions-C1xSy5BF.js";import"./parseISO-CisWrXQ1.js";import"./util-DEtvZ1n6.js";import"./Modal-DLrHj0JG.js";import"./floating-ui.react-BolRxfy1.js";import"./Date.Input-Cv9sKJ7x.js";import"./useFormField-BfJqjwot.js";import"./useControllableState-CdW7uF-V.js";import"./ChevronDown-BWOEzEec.js";import"./Modal.context-Dcp_CmN3.js";import"./Portal-D7kWJn2E.js";import"./useDescendant-Df0cd9Zl.js";import"./useClientLayoutEffect-BlmE3wW5.js";import"./DismissableLayer-Drl13rnU.js";import"./Floating-BvecaDw2.js";import"./ChevronRight-DlzQdbX3.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
