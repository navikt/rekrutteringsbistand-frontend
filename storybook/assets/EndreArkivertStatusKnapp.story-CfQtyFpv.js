import{r as i,j as e,d as l}from"./iframe-cLJRmr5B.js";import{E as s}from"./EndreArkivertStatusModal-BnDM35R3.js";import{A as a}from"./ActionMenu-CGATYqUX.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BSYuaauy.js";import"./OrganisasjonsnummerAlert-CCSY39nJ.js";import"./VStack-B2r-tQtf.js";import"./BasePrimitive-DTZDTqQs.js";import"./List-UT7Ujmtc.js";import"./Link-9PaDWQ5u.js";import"./KandidatHendelseTag-DZelb0om.js";import"./Tag-C-d1Pyhp.js";import"./ChatExclamationmark-BxusJMw0.js";import"./FileXMark-Cr6_-DVc.js";import"./Trash-C7kcIopf.js";import"./HandShakeHeart-46D9JgEp.js";import"./Calendar-Cr35rsID.js";import"./ThumbUp-BfeXTZAz.js";import"./Table-DVn9t72p.js";import"./util-DwduAItI.js";import"./parse-Cy-KfFvb.js";import"./getDefaultOptions-Ckh4Aw2C.js";import"./parseISO-DcOpjpXk.js";import"./index-BPuz4oKp.js";import"./index-B40KJ5b4.js";import"./isBefore-Db2DvAxc.js";import"./util-D6noReb-.js";import"./Modal-CGfxLs3s.js";import"./floating-ui.react-oTc_ktS-.js";import"./Date.Input-CxMEZoBY.js";import"./useFormField-CUE04D8g.js";import"./useControllableState-BdxLHsnI.js";import"./ChevronDown-CYilpRIH.js";import"./Modal.context-Dv_WIP1o.js";import"./Portal-q3XAE_dB.js";import"./useDescendant-zeVkUmkX.js";import"./useClientLayoutEffect-GVk9Ue51.js";import"./DismissableLayer-BuXh4or2.js";import"./Floating-8nf5T7iJ.js";import"./ChevronRight-DCCiGThW.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
