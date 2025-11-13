import{r as i,j as e,d as l}from"./iframe-D8-4xOqC.js";import{E as s}from"./EndreArkivertStatusModal-Csb8yB2N.js";import{A as a}from"./ActionMenu-c1HME1ww.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKHm_AeS.js";import"./OrganisasjonsnummerAlert-BZQSof-U.js";import"./VStack-Csyu--T2.js";import"./BasePrimitive-SqCEysjS.js";import"./List-Cf5eDNuv.js";import"./Link-tQS8r4JE.js";import"./KandidatHendelseTag-3LzUL4w_.js";import"./Tag-CX-JbphV.js";import"./ChatExclamationmark-BgVP6Ccr.js";import"./FileXMark-60MOd4dt.js";import"./Trash-DjsmULNt.js";import"./HandShakeHeart-n157OPxh.js";import"./Calendar-CM-2s9vn.js";import"./ThumbUp-CgwsWvRJ.js";import"./Table-CjFE-4lz.js";import"./util-CGLOq6CR.js";import"./parse-Cc9pUomc.js";import"./getDefaultOptions-juMckS2Q.js";import"./parseISO-C_A1ZeST.js";import"./index-DHUfW4xb.js";import"./index-B40KJ5b4.js";import"./isBefore-CyeQ0GHU.js";import"./util-DGKfUUBU.js";import"./Modal-C1cLZQxk.js";import"./floating-ui.react-DdHAZyX-.js";import"./Date.Input-BehvWA5_.js";import"./useFormField-BPLkC9Pa.js";import"./useControllableState-C_sAK1x3.js";import"./ChevronDown-CdyITUaA.js";import"./Modal.context-D4VPuVea.js";import"./Portal-DIqTKqC0.js";import"./useDescendant-r2CzUX1t.js";import"./useClientLayoutEffect-7ME0nGbZ.js";import"./DismissableLayer-CWqnheAj.js";import"./Floating-CS2K4jHM.js";import"./ChevronRight-BHq3Ai57.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
