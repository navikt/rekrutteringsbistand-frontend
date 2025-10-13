import{r as i,j as e,e as p}from"./iframe-C8Gl0mmh.js";import{E as s}from"./EndreArkivertStatusModal-Ceta_XyF.js";import{A as a}from"./ActionMenu-tkzjCk6q.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BYtw_0rU.js";import"./OrganisasjonsnummerAlert-CB9Kr7E9.js";import"./VStack-BffUPoxl.js";import"./BasePrimitive-DFjLXfXf.js";import"./List-oZe_goSR.js";import"./Link-st7cyUAe.js";import"./KandidatHendelseTag-C0cN80A6.js";import"./Tag-0a98e10q.js";import"./FileXMark-CQYUGwIo.js";import"./Trash-D9mbKbwf.js";import"./HandShakeHeart-CBkS_T2P.js";import"./Calendar-BOo7kByH.js";import"./ThumbUp-CtUREWQf.js";import"./Table-BLgXToty.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CavAHLKM.js";import"./format-BnHT7mDE.js";import"./match-BKbbZIL-.js";import"./parseISO-Dcg31-h9.js";import"./parse-Cnayn12o.js";import"./getDefaultOptions-LCou5PkA.js";import"./util-D23RsQRc.js";import"./Modal-CGMMBTKO.js";import"./floating-ui.react-DUCUKrYp.js";import"./Date.Input-CymeDj0W.js";import"./useFormField-7Ac9MHU5.js";import"./useControllableState-CTitMRCv.js";import"./ChevronDown-jpEGjyLY.js";import"./Modal.context-BSnuQfAZ.js";import"./Portal-Dj6sj1Kk.js";import"./useDescendant-Ch9tqvDi.js";import"./useClientLayoutEffect-Ddg3E30Z.js";import"./DismissableLayer-B-uTvNmP.js";import"./ChevronRight-BEwTy6EZ.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
