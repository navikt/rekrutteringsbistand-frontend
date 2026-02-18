import{j as e,c as d,r as p}from"./iframe-I1RaL24p.js";import"./KandidatlisteContext-Brh0sSXY.js";import{A as i}from"./ActionMenu-D5AzSTRA.js";import{S as m}from"./KandidatHendelseTag-CH3P3uMK.js";import{S as u}from"./Trash-B-zfF0Gv.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CE9grySA.js";import"./VStack-BcNo5M5H.js";import"./BasePrimitive-ffzBbguk.js";import"./Box-CIK8h6iD.js";import"./List-R_rbwQvs.js";import"./Link-DJLXINnN.js";import"./index-DxilKTmv.js";import"./index-B40KJ5b4.js";import"./util-DVpbqcpO.js";import"./Modal.context-D-E6NpkL.js";import"./useControllableState-CUyvrH3O.js";import"./Portal-CcTZilb4.js";import"./useClientLayoutEffect--j-RM18L.js";import"./FocusBoundary-BPF_cDGJ.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-TfTLYxy2.js";import"./useOpenChangeAnimationComplete-CNbcCoSl.js";import"./useDescendant-6cgXsvo3.js";import"./DismissableLayer-CzUiDmEW.js";import"./Floating-0NFm68YF.js";import"./ChevronRight-PcLolFpm.js";import"./Tag-CYKyVrC_.js";import"./ChatExclamationmark-BnR9Wl2D.js";import"./FileXMark-BmEGjrOU.js";import"./HandShakeHeart-BsXKIDVK.js";import"./Calendar-FE6qr37K.js";import"./ThumbUp-CTTKsmT3.js";import"./ExclamationmarkTriangle-xb8KQJ1P.js";import"./Table-BcVDr8qU.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,V as default};
