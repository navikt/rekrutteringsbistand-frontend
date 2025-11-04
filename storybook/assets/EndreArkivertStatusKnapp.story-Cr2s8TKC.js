import{r as i,j as e,d as l}from"./iframe-Db4gm7sv.js";import{E as s}from"./EndreArkivertStatusModal-Doh6lK7u.js";import{A as a}from"./ActionMenu-B2g4WVo4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CLqUZ3Uw.js";import"./OrganisasjonsnummerAlert-Bhvc_O9z.js";import"./VStack-B2qKtTfL.js";import"./BasePrimitive-DhGBNVQz.js";import"./List-B-NNREoJ.js";import"./Link-Cih-0lU6.js";import"./KandidatHendelseTag-CkAKNKFx.js";import"./Tag-CgnbrGVV.js";import"./ChatExclamationmark-DADSIgGk.js";import"./FileXMark-DSnF131M.js";import"./Trash-B6XvmmwI.js";import"./HandShakeHeart-DLUD7zrI.js";import"./Calendar-DhwXWgXC.js";import"./ThumbUp-BbZg4QkZ.js";import"./Table-DYWQUoU3.js";import"./util-Ene38gJ_.js";import"./parse-mbg283r7.js";import"./getDefaultOptions-D7gsGtTo.js";import"./parseISO-1W8p0znK.js";import"./index-B-98khB0.js";import"./index-B40KJ5b4.js";import"./isBefore-DeoMZcNr.js";import"./util-Gs1PX1Y8.js";import"./Modal-DOx5tVXR.js";import"./floating-ui.react-DQrCiaXj.js";import"./Date.Input-DvwDNPfH.js";import"./useFormField-Dd5ApiFV.js";import"./useControllableState-BzElCyNZ.js";import"./ChevronDown-B_BXj3bk.js";import"./Modal.context-_lDx5AbH.js";import"./Portal-BwjZ2tSD.js";import"./useDescendant-Ba2aSA-P.js";import"./useClientLayoutEffect-DD-jHHhO.js";import"./DismissableLayer-CesHQX8D.js";import"./Floating-BhUk3bxl.js";import"./ChevronRight-vBY-whxn.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
