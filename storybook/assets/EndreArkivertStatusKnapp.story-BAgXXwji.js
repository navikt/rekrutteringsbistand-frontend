import{j as e,c as d,r as p}from"./iframe-Cdu-dd8t.js";import"./KandidatlisteContext-Fo2bEmDt.js";import{A as i}from"./ActionMenu-DZzTbCkj.js";import{S as m}from"./KandidatHendelseTag-B5jA8-OU.js";import{S as u}from"./Trash-C1UsmCVr.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CIgsBJfs.js";import"./VStack-CBe3M6Vc.js";import"./BasePrimitive-DO_2IsaK.js";import"./Box-DOSrxYjq.js";import"./List-aCQ7V76_.js";import"./Link-CGmIUMJW.js";import"./index-Czm4nGE0.js";import"./index-B40KJ5b4.js";import"./util-CGSpvmUL.js";import"./Modal.context-5Djxc6C4.js";import"./useControllableState-Cj_-YJBd.js";import"./Portal-8WNblDG5.js";import"./useClientLayoutEffect-B7re76Ti.js";import"./FocusBoundary-Ci-X4Tt0.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-e4VR0g1A.js";import"./useOpenChangeAnimationComplete-CZzY2SCR.js";import"./useDescendant-QzReSnQA.js";import"./DismissableLayer-DkEGF8Lo.js";import"./Floating--V5LEfUJ.js";import"./ChevronRight-CKsyC-Tq.js";import"./Tag-CuF6ZBnM.js";import"./ChatExclamationmark-BLpXiOOJ.js";import"./FileXMark-COjF_gaD.js";import"./HandShakeHeart-Dm4Jkrgh.js";import"./Calendar-BguiSRGX.js";import"./ThumbUp-C3SV7Dni.js";import"./ExclamationmarkTriangle-Rfy6r7YH.js";import"./Table-DhLgxOwS.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
