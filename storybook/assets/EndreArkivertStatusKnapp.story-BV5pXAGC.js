import{r as i,j as e,e as l}from"./iframe-uCi_mQk4.js";import{E as s}from"./EndreArkivertStatusModal-CMqTPi1U.js";import{A as a}from"./ActionMenu-rwNeERLC.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-2TSOcbVy.js";import"./OrganisasjonsnummerAlert-D2ZDhlEi.js";import"./VStack-Dcwb538F.js";import"./BasePrimitive-Bsz9K4MY.js";import"./List-D_BiqU3x.js";import"./Link-CDg6BDKK.js";import"./KandidatHendelseTag-DmMWL5xZ.js";import"./Tag-D6F68oqU.js";import"./ChatExclamationmark-0MBCjqVa.js";import"./FileXMark-CVAfBa1I.js";import"./Trash-t0U_yquN.js";import"./HandShakeHeart-BX_z94qc.js";import"./Calendar-DNe2Xfpi.js";import"./ThumbUp-CFxhu4lm.js";import"./Table-taIHKPoA.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-Tz1VMCCF.js";import"./format-C9LY8iZK.js";import"./match-ChqzxeL3.js";import"./parseISO-BkupR9xz.js";import"./parse-BgUE4KId.js";import"./getDefaultOptions-2bGULAAd.js";import"./util-BThEYQ9W.js";import"./Modal-DO5Ttv0-.js";import"./floating-ui.react-vq7Q8IrH.js";import"./Date.Input--CeuYuQs.js";import"./useFormField-CKp_MqU7.js";import"./useControllableState-CTHa6vAV.js";import"./ChevronDown-ChWcP7RJ.js";import"./Modal.context-CsE4BeM4.js";import"./Portal-B-078IAz.js";import"./useDescendant-CFdznkdX.js";import"./useClientLayoutEffect--UZ4v6un.js";import"./DismissableLayer-MLFOpObD.js";import"./ChevronRight-m2QZFCva.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
