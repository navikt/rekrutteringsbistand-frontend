import{r as i,j as e,d as l}from"./iframe-BqqySmLp.js";import{E as s}from"./EndreArkivertStatusModal-Cs0o_qhv.js";import{A as a}from"./ActionMenu-Dff0h8fp.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B9OXJk3i.js";import"./OrganisasjonsnummerAlert-kkbhqWlF.js";import"./VStack-BtxADtMi.js";import"./BasePrimitive-BWzRNP55.js";import"./List-Dl1pxlvW.js";import"./Link-Aullpp7r.js";import"./KandidatHendelseTag-lpezpa5f.js";import"./Tag-IBbczY_i.js";import"./ChatExclamationmark-CXSpNDx3.js";import"./FileXMark-C4vWb03I.js";import"./Trash-DCOqJRkl.js";import"./HandShakeHeart-3fqyHM30.js";import"./Calendar-0jmLLsES.js";import"./ThumbUp-0bgjpBki.js";import"./Table-Ct2DEnrv.js";import"./util-DU_KQZE4.js";import"./parse-C6VNkl2A.js";import"./getDefaultOptions-DvDgDEsD.js";import"./parseISO-CNsO-bOz.js";import"./index-CveF8mzD.js";import"./index-B40KJ5b4.js";import"./isBefore-CVPzrcI2.js";import"./util-vYIPvJw_.js";import"./Modal-50crVqlb.js";import"./floating-ui.react-B-xuQX2d.js";import"./Date.Input-jDUq28oh.js";import"./useFormField-7OmZcCS_.js";import"./useControllableState-CEMIviyc.js";import"./ChevronDown-BnApHggW.js";import"./Modal.context-CnB7G1fS.js";import"./Portal-DdbpEvzU.js";import"./useDescendant-BLkzZ4qU.js";import"./useClientLayoutEffect-Bb3HpSJf.js";import"./DismissableLayer-BBWvjv4X.js";import"./Floating-C0MeBpVP.js";import"./ChevronRight-BxIRWRPq.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
