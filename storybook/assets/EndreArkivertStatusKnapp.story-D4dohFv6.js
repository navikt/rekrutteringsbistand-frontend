import{j as e,c as d,r as p}from"./iframe-ClMyIzST.js";import"./KandidatlisteContext-oGGvfWDy.js";import{A as i}from"./ActionMenu-ChHe4oVZ.js";import{S as m}from"./KandidatHendelseTag-CWYx2-f5.js";import{S as u}from"./Trash-DczEwQwH.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-C_-rEhpK.js";import"./VStack-CCWlmw28.js";import"./BasePrimitive-DhBovoNH.js";import"./Box-C7JaK5c2.js";import"./List-DccLa0y-.js";import"./Link-DlUtuUu5.js";import"./index-BCNfeqSF.js";import"./index-B40KJ5b4.js";import"./util-B3hQ8lNg.js";import"./Modal.context-D2E0iDkv.js";import"./useControllableState-HyX2mBFK.js";import"./Portal-B7rqaifz.js";import"./useClientLayoutEffect-QdHMCz4D.js";import"./FocusBoundary-BqQtzIo8.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-Db4RzudF.js";import"./useOpenChangeAnimationComplete-D3y3uvYc.js";import"./useDescendant-DiIDbbB6.js";import"./DismissableLayer-DzkdpLc-.js";import"./Floating-BEFQxDWf.js";import"./ChevronRight-BEmwsT8g.js";import"./Tag-CH04uOtr.js";import"./ChatExclamationmark-BYp9JkNG.js";import"./FileXMark-By0-S9LU.js";import"./HandShakeHeart-By1KTdau.js";import"./Calendar-n4_puD3I.js";import"./ThumbUp-BVNP6fyD.js";import"./ExclamationmarkTriangle-DisTa6wr.js";import"./Table-BqJavzdr.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
