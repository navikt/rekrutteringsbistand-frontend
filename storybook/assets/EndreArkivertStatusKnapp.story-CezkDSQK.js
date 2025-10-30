import{r as i,j as e,d as l}from"./iframe-DwwpuTFP.js";import{E as s}from"./EndreArkivertStatusModal-DGUctV4T.js";import{A as a}from"./ActionMenu-v-EeCWO9.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dga9qocn.js";import"./OrganisasjonsnummerAlert-Dsxpzlk0.js";import"./VStack-BN8fhrlC.js";import"./BasePrimitive-CF6MQeVw.js";import"./List-CX9xI7S7.js";import"./Link-CSctH9gV.js";import"./KandidatHendelseTag-BAi-T6SF.js";import"./Tag-6mjVNMQk.js";import"./ChatExclamationmark-BSK7N_cZ.js";import"./FileXMark-BZ2Ib8x0.js";import"./Trash-IEaWH2zW.js";import"./HandShakeHeart-ejnaLvQS.js";import"./Calendar-CvieklPO.js";import"./ThumbUp-wdeyXNkp.js";import"./Table-DBWICR8j.js";import"./util--TOvclJc.js";import"./parse-CZkEaCBT.js";import"./getDefaultOptions-D6tGVtc1.js";import"./parseISO-Q4MDVn8O.js";import"./index-B4g5cUh7.js";import"./index-B40KJ5b4.js";import"./isBefore-CmUWRxsX.js";import"./util-D_fvgQrs.js";import"./Modal-CKTckRfk.js";import"./floating-ui.react-C4ZL8j1u.js";import"./Date.Input-Cr-2ulbS.js";import"./useFormField-B46YkHgM.js";import"./useControllableState-Xz6eYXrU.js";import"./ChevronDown-COPvl1Il.js";import"./Modal.context-D7vtMZZl.js";import"./Portal-BIg4f_X4.js";import"./useDescendant-BHMuV25M.js";import"./useClientLayoutEffect-BxGn7POO.js";import"./DismissableLayer-BnNft1r5.js";import"./Floating-BmQ43gXH.js";import"./ChevronRight-DgH5RDxe.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
