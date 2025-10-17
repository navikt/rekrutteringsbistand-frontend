import{r as i,j as e,e as l}from"./iframe-DLVjCQ2l.js";import{E as s}from"./EndreArkivertStatusModal-Cg5FiuUq.js";import{A as a}from"./ActionMenu-PbsPQzIf.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DnXuv4rM.js";import"./OrganisasjonsnummerAlert-BASCv5nu.js";import"./VStack-CNzO53zi.js";import"./BasePrimitive-BHJDX4VK.js";import"./List-C4H0QhkM.js";import"./Link-kSfnfcMU.js";import"./KandidatHendelseTag-BSpIpDkA.js";import"./Tag-DE4yt_GY.js";import"./ChatExclamationmark-DfslM3z_.js";import"./FileXMark-DjJMDplT.js";import"./Trash-CeTBXU1c.js";import"./HandShakeHeart-B70TXLGs.js";import"./Calendar-CxpES4B_.js";import"./ThumbUp-D81IWYru.js";import"./Table-D8hHIQY0.js";import"./util-DyTW6BQh.js";import"./format-Dns01ZrX.js";import"./match-DaillBAK.js";import"./parseISO-BHDmYAfo.js";import"./parse-BpBnstiW.js";import"./getDefaultOptions-BS2zLtv_.js";import"./util-BYGRzxdr.js";import"./Modal-C7Cm0TSj.js";import"./floating-ui.react-BHZzUIMA.js";import"./Date.Input-DLLgFSdx.js";import"./useFormField-DqW3jgUJ.js";import"./useControllableState-B7-O95gB.js";import"./ChevronDown-Hp8-5Hl6.js";import"./Modal.context-DC7G_jSK.js";import"./Portal-qVmeyk5u.js";import"./useDescendant-PZFhHTIi.js";import"./useClientLayoutEffect-DlfPVjcQ.js";import"./DismissableLayer-TqNl7B5c.js";import"./Floating-a8dg55PP.js";import"./ChevronRight-CIP8Hrnh.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
