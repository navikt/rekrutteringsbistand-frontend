import{r as i,j as e,o as l}from"./iframe-CTO0EUng.js";import{E as s}from"./EndreArkivertStatusModal-C8E1jy0r.js";import{A as a}from"./ActionMenu-DjWeQWt5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-EAN-fhgR.js";import"./OrganisasjonsnummerAlert-Bhk3fguW.js";import"./VStack-BCKiRHRL.js";import"./BasePrimitive-CZejWwO7.js";import"./List-CRw_TSPx.js";import"./Link-CbwrBY_r.js";import"./KandidatHendelseTag-CVK4sSLI.js";import"./Tag-Clr8NTKJ.js";import"./ChatExclamationmark-BDNecZd7.js";import"./FileXMark-BxTQWum7.js";import"./Trash-DoAk3teY.js";import"./HandShakeHeart-CPkK6ZSa.js";import"./Calendar-DmnC6cqJ.js";import"./ThumbUp-CKlcTpy-.js";import"./Table-T7IlRG3m.js";import"./util-K0h4U2Kh.js";import"./format-DP7EJBYE.js";import"./match-BthhS41u.js";import"./parse-CWgZKNrQ.js";import"./getDefaultOptions-EjekfoSd.js";import"./parseISO-Dr4bGaFw.js";import"./index-CBD4SOv4.js";import"./index-B40KJ5b4.js";import"./isBefore-BX8aPqPK.js";import"./util-CIAlv6iK.js";import"./Modal-D3_1GhZF.js";import"./floating-ui.react-B4Z1HLBb.js";import"./Date.Input-6V9AOlG7.js";import"./useFormField-B4NBvQqZ.js";import"./useControllableState-CvQYYuOe.js";import"./ChevronDown--jVvHyz6.js";import"./Modal.context-DujAwibn.js";import"./Portal-B9RkAQC6.js";import"./useDescendant-DkRno8Ik.js";import"./useClientLayoutEffect-CMF7cqKE.js";import"./DismissableLayer-6Oq_Opj4.js";import"./Floating-MeRCEnLI.js";import"./ChevronRight-B-7QTj_3.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
