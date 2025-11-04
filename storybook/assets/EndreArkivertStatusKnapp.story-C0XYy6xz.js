import{r as i,j as e,d as l}from"./iframe-CeRr706s.js";import{E as s}from"./EndreArkivertStatusModal-Bvuvw0eo.js";import{A as a}from"./ActionMenu-kBjPqPUQ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-t-NNv3ML.js";import"./OrganisasjonsnummerAlert-DArB_n8_.js";import"./VStack-BelJx2wb.js";import"./BasePrimitive-bH-Ec4lL.js";import"./List-DubIZyNA.js";import"./Link-GZDYPOdI.js";import"./KandidatHendelseTag-BrwLnTpB.js";import"./Tag-COiHsKc8.js";import"./ChatExclamationmark-BgHOufrW.js";import"./FileXMark-DkNPmIu-.js";import"./Trash-C3RC9Rc8.js";import"./HandShakeHeart-DLwMcxfs.js";import"./Calendar-CZar09bd.js";import"./ThumbUp-DN-XLfoI.js";import"./Table-Cp34OQwR.js";import"./util-D6FuQLJq.js";import"./parse-Lh68j0Qc.js";import"./getDefaultOptions-Cs_8Py5K.js";import"./parseISO-Bt3-2cgb.js";import"./index-CdPV1OIk.js";import"./index-B40KJ5b4.js";import"./isBefore-BnvwDNL_.js";import"./util-8YNgQF5q.js";import"./Modal-CwJOOMmN.js";import"./floating-ui.react-a2IcLYZ2.js";import"./Date.Input-CTpRzzmZ.js";import"./useFormField-DpsMMUoM.js";import"./useControllableState-7aLFU1jC.js";import"./ChevronDown-DQUdOqVl.js";import"./Modal.context-CbsAixuf.js";import"./Portal-BtjL7sfS.js";import"./useDescendant-DZUSmoVV.js";import"./useClientLayoutEffect-VV1lGVs7.js";import"./DismissableLayer-DntprCGM.js";import"./Floating-1mHHbGY3.js";import"./ChevronRight-BZ6vb5ST.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
