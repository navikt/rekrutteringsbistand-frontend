import{r as i,j as e,o as l}from"./iframe-DjWAYC3X.js";import{E as s}from"./EndreArkivertStatusModal-DWgegcJ2.js";import{A as a}from"./ActionMenu-Bf8ZwH8y.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CtELFOJ9.js";import"./OrganisasjonsnummerAlert-CF7Db9g3.js";import"./VStack-BqFQUYwb.js";import"./BasePrimitive-sX7nyWc6.js";import"./List-DR39Y2pP.js";import"./Link-zymZHbka.js";import"./KandidatHendelseTag-BLQ_daev.js";import"./Tag-BKh_NYfg.js";import"./ChatExclamationmark-wGEED-K-.js";import"./FileXMark-OLFg0HbR.js";import"./Trash-sbNyFVus.js";import"./HandShakeHeart-BCU9vFzG.js";import"./Calendar-DGo2MEgV.js";import"./ThumbUp-CLh74G2X.js";import"./Table-BlUBqtiI.js";import"./util-CAXxsQeM.js";import"./format-BfXTDFos.js";import"./match-BDdBpRqH.js";import"./parse-DO3g-9bF.js";import"./getDefaultOptions-bsi7JpGz.js";import"./parseISO-CkBq9KAX.js";import"./index-C5sFxyTN.js";import"./index-B40KJ5b4.js";import"./isBefore-xCT4RK0D.js";import"./util-D7wgF1k8.js";import"./Modal-BsoN4001.js";import"./floating-ui.react-DKvA-InG.js";import"./Date.Input-DR7nmpz5.js";import"./useFormField-BA43ugRZ.js";import"./useControllableState-B_dAdZ-G.js";import"./ChevronDown-Bwtq3pPt.js";import"./Modal.context-C1cH-4SS.js";import"./Portal-CSnYFtNM.js";import"./useDescendant-DApziTPC.js";import"./useClientLayoutEffect-Bu2a2BR2.js";import"./DismissableLayer-DGq0BrI1.js";import"./Floating-DA6FkBNw.js";import"./ChevronRight-Q2zHiNqf.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
