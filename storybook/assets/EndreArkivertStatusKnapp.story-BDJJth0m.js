import{j as e,c as d,r as p}from"./iframe-BIgN2dy8.js";import"./KandidatlisteContext-C62q-dVM.js";import{A as i}from"./ActionMenu-DtyPrgKW.js";import{S as m}from"./KandidatHendelseTag-BIk2S_cj.js";import{S as u}from"./Trash-DeuBW4Zd.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CfKtz4Dx.js";import"./VStack-BPjplv7Q.js";import"./BasePrimitive-BWKQEkUf.js";import"./Box-BHlQkMbP.js";import"./List-CWJ1uZ9h.js";import"./Link-DEKv3d9-.js";import"./index-BQFx-lDr.js";import"./index-B40KJ5b4.js";import"./util-BgV6oLwy.js";import"./Modal.context-BZdBJRXP.js";import"./useControllableState-DzgKsUeQ.js";import"./Portal-DcdcPQGb.js";import"./useClientLayoutEffect-CZ8hWwJn.js";import"./FocusBoundary-DF42L_Rz.js";import"./owner-Cl3CaANg.js";import"./useValueAsRef-02cOYcnY.js";import"./useOpenChangeAnimationComplete-BMyuoxGY.js";import"./useDescendant-CyoMUJFm.js";import"./DismissableLayer-DYMooN7A.js";import"./Floating-BZFx_e5N.js";import"./ChevronRight-Br1U2aac.js";import"./Tag-UZn2eOFN.js";import"./ChatExclamationmark-DzPRhjAg.js";import"./FileXMark-BrGCmu_I.js";import"./HandShakeHeart-DwC4-YwP.js";import"./Calendar-D-bXASkh.js";import"./ThumbUp-BaYT_7xI.js";import"./ExclamationmarkTriangle-DcKgygPL.js";import"./Table-05jR4kq2.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
