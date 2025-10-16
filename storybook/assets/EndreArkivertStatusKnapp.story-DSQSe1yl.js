import{r as i,j as e,e as p}from"./iframe-CcX8-4GA.js";import{E as s}from"./EndreArkivertStatusModal-Zeqv25OW.js";import{A as a}from"./ActionMenu-D26dYIs0.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-2pjLwa4b.js";import"./OrganisasjonsnummerAlert-rbWDvMcL.js";import"./VStack-gF6g1u0a.js";import"./BasePrimitive-BUKns9Ma.js";import"./List-knAYMItp.js";import"./Link-RXPHszoE.js";import"./KandidatHendelseTag-Js6vMPxN.js";import"./Tag-jMajnUf2.js";import"./FileXMark-CFDEXvnD.js";import"./Trash-hb8-bWan.js";import"./HandShakeHeart-DQO3PzO_.js";import"./Calendar-DJqHZqeu.js";import"./ThumbUp-B39Bam7E.js";import"./Table-DoSv98b9.js";import"./util-BnKCOiCX.js";import"./format-DxFJCfdi.js";import"./match-BSotj6vx.js";import"./parseISO-Ciw9O8eu.js";import"./parse-h2sVsWqr.js";import"./getDefaultOptions-CYTM-JIK.js";import"./util-BVOBI2nQ.js";import"./Modal-Ke8_CzKR.js";import"./floating-ui.react-CoAGIUUn.js";import"./Date.Input-DlRggdUa.js";import"./useFormField-B0V7Rwez.js";import"./useControllableState-CC5b_oP9.js";import"./ChevronDown-BhCG83Hq.js";import"./Modal.context-CQY3-GGu.js";import"./Portal-b-kcbRk6.js";import"./useDescendant-B5pFWjou.js";import"./useClientLayoutEffect-6_RpH1W8.js";import"./DismissableLayer-DGfODv6M.js";import"./Floating-BIWMUylC.js";import"./ChevronRight-BoCs2O8n.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
