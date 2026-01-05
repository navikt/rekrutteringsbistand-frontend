import{r as i,j as e,d as p}from"./iframe-DQa1UAKP.js";import{E as s}from"./EndreArkivertStatusModal-CMlDgV67.js";import{A as a}from"./ActionMenu-DvUDMRY7.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D94sW2or.js";import"./OrganisasjonsnummerAlert-BBEZJ7v7.js";import"./VStack-PaUjtRpj.js";import"./BasePrimitive-CSzh4H_y.js";import"./List-C0j81Ut8.js";import"./Link-BxG0qBK_.js";import"./KandidatHendelseTag-BswJmHSm.js";import"./Tag-BKmTuQ3h.js";import"./ChatExclamationmark-CbWgNG_0.js";import"./FileXMark-Baefk1XC.js";import"./Trash-Kw9Zps5x.js";import"./HandShakeHeart-D3AMzzS3.js";import"./Calendar-CeD7kRJ5.js";import"./ThumbUp-BlBhjBtJ.js";import"./ExclamationmarkTriangle-CFHatZyD.js";import"./Table-oEbQcJVn.js";import"./index-djMLUd9G.js";import"./index-B40KJ5b4.js";import"./util-CxLzg3xj.js";import"./Modal-CSMNSt-W.js";import"./floating-ui.react-DJuqNH_e.js";import"./Date.Input-gqCIIY8-.js";import"./useFormField-DpwiCcJU.js";import"./useControllableState-CXsJzE3b.js";import"./ChevronDown-GJKeW2bL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-0SK8t1yY.js";import"./Modal.context-duc3HSLS.js";import"./Portal-nkH-bbLf.js";import"./useLatestRef-DpVw4J0Y.js";import"./useDescendant-CB5ktAkG.js";import"./DismissableLayer-BDwDPEkL.js";import"./Floating-Cs0PHTr1.js";import"./ChevronRight-fNEMV94m.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
