import{j as e,c as d,r as p}from"./iframe-CCb5PQcY.js";import"./KandidatlisteContext-Dc37_TCH.js";import{A as i}from"./ActionMenu-BMH7IYDm.js";import{S as m}from"./KandidatHendelseTag-DirEbrpn.js";import{S as u}from"./Trash-DDfway-W.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-xc3gUtYm.js";import"./VStack-GuuCXI7l.js";import"./BasePrimitive-BvB3PA65.js";import"./Box-CbCiLbTk.js";import"./List-CnK_8OkB.js";import"./Link-rPLI3IhV.js";import"./index-BlPNPszT.js";import"./index-B40KJ5b4.js";import"./util-oaPuE8Fm.js";import"./Modal.context-Cyjgyz6B.js";import"./useControllableState-CozOow6N.js";import"./Portal-DlQg27NJ.js";import"./useClientLayoutEffect-Bmjur04w.js";import"./FocusBoundary-BCt9R62n.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-psYrR4qP.js";import"./useOpenChangeAnimationComplete-sgguhJ0b.js";import"./useDescendant-CVFskVfd.js";import"./DismissableLayer-nY22yEH_.js";import"./Floating-COFSjcLt.js";import"./ChevronRight-CfgsPFJ8.js";import"./Tag-BaR3L-Dh.js";import"./ChatExclamationmark-y3EdFamj.js";import"./FileXMark-BcmF-wlJ.js";import"./HandShakeHeart-BQJN1IXL.js";import"./Calendar-CA9P8KHZ.js";import"./ThumbUp-Cps_Sn-O.js";import"./ExclamationmarkTriangle-BBH31ES4.js";import"./Table-BOcKp25A.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
