import{ap as I,I as w,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,N as y,cP as N}from"./iframe-iYTVubkb.js";import{w as m,c as D}from"./ContextDecorators-DpKP4PxZ.js";import{F as _,A as v}from"./FullførtStilling-C_ZHaeEx.js";import{R as T}from"./GjenåpneStillingKnapp-DHgr31TI.js";import{T as A}from"./TilgangskontrollForInnhold-DlTwcLkA.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-y7ebpxGz.js";import"./OrganisasjonsnummerAlert-DAEs0rwZ.js";import"./VStack-CkGe8GD2.js";import"./BasePrimitive-boMTAT3N.js";import"./Box-BfsKMp9T.js";import"./List-B7AiJCK7.js";import"./Link-C2bgvx0K.js";import"./KandidatHendelseTag-2jNrj2wf.js";import"./Tag-Bo6lmjnk.js";import"./ChatExclamationmark-JmG1reqm.js";import"./FileXMark-CPW7kJ2g.js";import"./Trash-BFfxe-zj.js";import"./HandShakeHeart-CXOdnKtA.js";import"./Calendar-BfOwb4Q1.js";import"./ThumbUp-C9CFps8H.js";import"./ExclamationmarkTriangle-BsjgR85I.js";import"./Table-CPKuIuGE.js";import"./index-BJx6qXND.js";import"./index-B40KJ5b4.js";import"./util-CvOq8zPN.js";import"./DatoVelger-CL93VUK6.js";import"./useDatepicker-y1z2exYr.js";import"./useControllableState-B7MdJ9VK.js";import"./Modal-Td0a8ER3.js";import"./floating-ui.react-DyKrx9yB.js";import"./useFormField-BHvkH1bP.js";import"./ReadMore-D50hHLON.js";import"./ChevronDown-CI0gk8Xa.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D2kexCYt.js";import"./Modal.context-0kHKZyTP.js";import"./Popover-BaFwoxII.js";import"./DismissableLayer-B6vF3936.js";import"./startOfMonth-EU1AXSOe.js";import"./Select-Bs7l8rXB.js";import"./endOfMonth-BtAwp-h5.js";import"./ArrowLeft-CEM1HMur.js";import"./ArrowRight-BbI75nik.js";import"./isSameDay-lb-Ocp8f.js";import"./Checkbox-B0WwDixn.js";import"./Fieldset-CyOuNV7J.js";import"./accordion-DJrDoTog.js";import"./index-D7w7hazh.js";import"./index-eEsM1MBk.js";import"./index-uToZMYSd.js";import"./ProgressBar-nonIZu7C.js";import"./useValueAsRef-B8-QqpES.js";import"./Bell-NK0nyV6s.js";import"./PersonChat-HVnxUi9q.js";import"./Eye-Dt0UfY8E.js";import"./ShieldLock-DJdwrdyg.js";import"./PadlockLocked-BRhMJ7Ut.js";import"./EyeSlash-C6qJs2dE.js";import"./CircleSlash-DP1rypeg.js";import"./Pencil-DSJ8pzM-.js";import"./FullførStillingModal-C72lU_2m.js";import"./PersonbrukerTekst-CtE8DBb4.js";import"./ClockDashed-Cbli5w8-.js";import"./IkonNavnAvatar-DGzZ3K_N.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-C5mjc9x_.js";import"./ErrorBoundary-BNOJWkjW.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
