import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-MRLikfE6.js";import{w as m,c as D}from"./ContextDecorators-BAyHZ9FA.js";import{F as _,A as v}from"./FullførtStilling-DW9KCM2w.js";import{R as T}from"./GjenåpneStillingKnapp-Dolhx1hA.js";import{T as A}from"./TilgangskontrollForInnhold-D-g8JccX.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DEaKwyD5.js";import"./OrganisasjonsnummerAlert-v9-YnsVe.js";import"./VStack-CKga3UqI.js";import"./BasePrimitive-WcRKw7Lq.js";import"./Box-bxckNUtE.js";import"./List-BP1uHXI-.js";import"./Link-BeQsjFWu.js";import"./KandidatHendelseTag-D-p_npeq.js";import"./Tag-C5lbsKPJ.js";import"./ChatExclamationmark-iKGH1a-g.js";import"./FileXMark-e4FmmKnZ.js";import"./Trash-BEOwnfEK.js";import"./HandShakeHeart-B9dRyKdy.js";import"./Calendar-fbNZIAKe.js";import"./ThumbUp-DHaJAsfw.js";import"./ExclamationmarkTriangle-D2tLiDIf.js";import"./Table-o5a0zq4E.js";import"./index-ClcRPOe_.js";import"./index-B40KJ5b4.js";import"./util-BK0NQHj-.js";import"./DatoVelger-DIjGwIHc.js";import"./useDatepicker-RuHnAthk.js";import"./useControllableState-CXTqdpiU.js";import"./Modal-HWCiB4bD.js";import"./floating-ui.react-CPMB3lDK.js";import"./useFormField-CuV7CE-W.js";import"./ReadMore-CRRbFoIU.js";import"./ChevronDown-DhS0mOol.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Cls70-9d.js";import"./Modal.context-Qf00d-Ga.js";import"./Popover-EqKKh5VZ.js";import"./DismissableLayer-BZ4kC1EZ.js";import"./startOfMonth-D3UcYDXD.js";import"./Select-C1AmnCDv.js";import"./endOfMonth-BJD9WGgu.js";import"./ArrowLeft-BXBuwQzA.js";import"./ArrowRight-DSUrkSLA.js";import"./isSameDay-BjznZWnZ.js";import"./Checkbox-BB_VMUNM.js";import"./Fieldset-I9RNjVyZ.js";import"./accordion-CxfCr6Xi.js";import"./index-iIdkvPmk.js";import"./index-BN4as6Pm.js";import"./index-BoePE_IT.js";import"./ProgressBar-GQxam2Jz.js";import"./useValueAsRef-mICkb1JM.js";import"./Bell-2HLikbJJ.js";import"./PersonChat-3fV2-f4v.js";import"./Eye-B8lzMx7o.js";import"./ShieldLock-h3V7td2F.js";import"./PadlockLocked-BeFolXWv.js";import"./EyeSlash-CfMQqi0C.js";import"./CircleSlash-CTkB1tST.js";import"./Pencil--NSwDsDi.js";import"./FullførStillingModal-CjiCf-i4.js";import"./PersonbrukerTekst-DuqcCkak.js";import"./ClockDashed-vL4O6nHQ.js";import"./IkonNavnAvatar-BPSWevKf.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DLCLiY_L.js";import"./ErrorBoundary-D78JWaaw.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
