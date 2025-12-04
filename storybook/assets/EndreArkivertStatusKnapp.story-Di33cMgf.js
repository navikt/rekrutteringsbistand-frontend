import{r as s,j as e,d as p}from"./iframe-ltj2aPP9.js";import{E as i}from"./EndreArkivertStatusModal-BukPg3HM.js";import{A as a}from"./ActionMenu-DElunRzs.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bl_o9k3N.js";import"./OrganisasjonsnummerAlert-CkVXuvDD.js";import"./VStack-Su87Bwfs.js";import"./BasePrimitive-dde3mTwe.js";import"./List-tyYrlZes.js";import"./Link-zi2EHXXv.js";import"./KandidatHendelseTag-BcGnWwtG.js";import"./Tag-BzUY9-pL.js";import"./ChatExclamationmark-bF_GK_lt.js";import"./FileXMark-CYEnjTew.js";import"./Trash-BEDJZQnM.js";import"./HandShakeHeart-CsIpL-Ei.js";import"./Calendar-DpqY7Kck.js";import"./ThumbUp-P1915iXc.js";import"./Table-DCGlJnPG.js";import"./index-BEB9CuG0.js";import"./index-B40KJ5b4.js";import"./util-LWEoSltv.js";import"./Modal-CFpMKMRr.js";import"./floating-ui.react-CkKTAyWh.js";import"./Date.Input-CTrs6ap6.js";import"./useFormField-FqjO8I_3.js";import"./useControllableState-CWWYUZqw.js";import"./ChevronDown-Dvjup_Q5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Cfpp74B7.js";import"./Modal.context-bjbVzsec.js";import"./Portal-DN9ER9Mm.js";import"./useLatestRef-StBaR8os.js";import"./useDescendant-Dt5kOj95.js";import"./DismissableLayer-B4bLkyQP.js";import"./Floating-43NrswhV.js";import"./ChevronRight-BDbjBOqI.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
