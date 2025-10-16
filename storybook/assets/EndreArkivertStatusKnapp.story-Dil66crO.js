import{r as i,j as e,e as l}from"./iframe-G1hfx8xa.js";import{E as s}from"./EndreArkivertStatusModal-C5dTtNqx.js";import{A as a}from"./ActionMenu-CS-fIBa0.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-D__NbBKb.js";import"./OrganisasjonsnummerAlert-C3xwG-Jj.js";import"./VStack-c0izGSP4.js";import"./BasePrimitive-CY3tMvtH.js";import"./List-Be4Ie-2l.js";import"./Link-5wsMpGh6.js";import"./KandidatHendelseTag-BR9iMMk8.js";import"./Tag-BSc7GXWR.js";import"./ChatExclamationmark-DxJK5iOy.js";import"./FileXMark-CvM1dNJH.js";import"./Trash-C-SHTNSF.js";import"./HandShakeHeart-DXSKadqG.js";import"./Calendar-CVja620b.js";import"./ThumbUp-BiHwjLyU.js";import"./Table-CUs4zp_K.js";import"./util-Bpfxgop4.js";import"./format-DH5YYcU8.js";import"./match-YPGwa1O1.js";import"./parseISO-KVJ6dj2E.js";import"./parse-COvvf3og.js";import"./getDefaultOptions-Cf2a4PTP.js";import"./util-CR4YimVW.js";import"./Modal-zdqqxkwf.js";import"./floating-ui.react-CbBWK-4r.js";import"./Date.Input-DDMiDXkr.js";import"./useFormField-x-CGa-s7.js";import"./useControllableState-BWTLl1yr.js";import"./ChevronDown-C5xk8A4j.js";import"./Modal.context-Caws_Tsd.js";import"./Portal-ByGiSyJ-.js";import"./useDescendant-DJFzw8Nt.js";import"./useClientLayoutEffect-CEzvnbdf.js";import"./DismissableLayer-DImObKoJ.js";import"./Floating-CJPAhfzD.js";import"./ChevronRight-Dt8IxSY6.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
