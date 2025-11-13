import{r as i,j as e,d as l}from"./iframe-D36rECNd.js";import{E as s}from"./EndreArkivertStatusModal-D8-PkKhf.js";import{A as a}from"./ActionMenu-D-d7fDP5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dq0o6vNi.js";import"./OrganisasjonsnummerAlert-DjNjCHpd.js";import"./VStack-vlL2a3-1.js";import"./BasePrimitive-CsZRqtO4.js";import"./List-Dbmh8xVI.js";import"./Link-B8R0tkWb.js";import"./KandidatHendelseTag-DFOw4G4q.js";import"./Tag-Bc2qo3WD.js";import"./ChatExclamationmark-Ba8iKWqc.js";import"./FileXMark-NFwVFiz9.js";import"./Trash-DPEYqurP.js";import"./HandShakeHeart-CIPt3blb.js";import"./Calendar-D34si2k-.js";import"./ThumbUp-Cw11vHuf.js";import"./Table-BMinlwuP.js";import"./util-uRUzvd7T.js";import"./parse-BvzsN-no.js";import"./getDefaultOptions-BlGED2ny.js";import"./parseISO-D8g9glIl.js";import"./index-DirQeSrQ.js";import"./index-B40KJ5b4.js";import"./isBefore-BnhTsP5z.js";import"./util-AnFGb_gx.js";import"./Modal-Bp-GQATU.js";import"./floating-ui.react-Cwl-MhBg.js";import"./Date.Input-_3ypxCdT.js";import"./useFormField-B2iVjPpq.js";import"./useControllableState-BKO9CC8z.js";import"./ChevronDown-O8MvsOkm.js";import"./Modal.context-CGOHahkN.js";import"./Portal-DdhNqD1J.js";import"./useDescendant-2_ilYl57.js";import"./useClientLayoutEffect-BXcMQ-Tq.js";import"./DismissableLayer-DMTAFfIm.js";import"./Floating-BXqMX3gI.js";import"./ChevronRight-CVDsqbC-.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
