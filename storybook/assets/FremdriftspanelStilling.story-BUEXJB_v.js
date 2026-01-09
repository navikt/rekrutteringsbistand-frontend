import{aq as I,J as w,j as t,R as k,S as j,cA as x,cJ as b,cI as g,cB as u,O as y,d0 as _}from"./iframe-5rwrKWZV.js";import{w as m,c as D}from"./ContextDecorators-DU64r7NL.js";import{F as N,A as v}from"./FullførtStilling-CePPmOvd.js";import{R as T}from"./GjenåpneStillingKnapp-BRcPrFXx.js";import{T as A}from"./TilgangskontrollForInnhold-Z2Eh7NWL.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8uGXMrm.js";import"./OrganisasjonsnummerAlert-DU2hBNw6.js";import"./VStack-oJzbuFmu.js";import"./BasePrimitive-CL0qHiBR.js";import"./List-DVV_3A1y.js";import"./Link-C6ttPdgA.js";import"./KandidatHendelseTag-wCOqQU_l.js";import"./Tag-D175MPv5.js";import"./ChatExclamationmark-BRtmzK2M.js";import"./FileXMark-Cjvrd1Rm.js";import"./Trash-CO9mAeL6.js";import"./HandShakeHeart-2soFoNDL.js";import"./Calendar-DErdOGUb.js";import"./ThumbUp-D_I-6Tvx.js";import"./ExclamationmarkTriangle-C-veCX7w.js";import"./Table-B5a9LhMk.js";import"./index-OgKCj3ij.js";import"./index-B40KJ5b4.js";import"./util-CkXlrIPZ.js";import"./DatoVelger-Du3YMrHM.js";import"./useDatepicker-B4yev8B6.js";import"./useControllableState-D-uW9VwC.js";import"./Modal-Ya9Rotr0.js";import"./floating-ui.react-1FrPqNCb.js";import"./Date.Input-DFNMSpaY.js";import"./useFormField-DL1f3G2z.js";import"./ChevronDown-Cf2jlvYQ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DOxN0QLi.js";import"./Modal.context-8SGbIxVb.js";import"./Popover-BwBktzX1.js";import"./DismissableLayer-BDumuCnE.js";import"./startOfMonth-CEhkyR5J.js";import"./Select-D9BELLwR.js";import"./endOfMonth-CiOrKCuq.js";import"./ArrowLeft-CRFLclv5.js";import"./ArrowRight-Cp4kfm4B.js";import"./isSameDay-COgMABK3.js";import"./Checkbox-BHdjWh1m.js";import"./Fieldset-COgYILWo.js";import"./accordion-aH8NZ1_s.js";import"./index-CZxUA3hz.js";import"./index-DBjYjKau.js";import"./index-D1Y5JfyM.js";import"./Box-2Y16bkAR.js";import"./Bell-CYWsVU5J.js";import"./PersonChat-BExsCfMf.js";import"./Eye-C3OaJgQl.js";import"./ProgressBar-B9fbqMsX.js";import"./useLatestRef-IVNWCuoX.js";import"./ShieldLock-TgQY5E6l.js";import"./PadlockLocked-CKqvB8TH.js";import"./EyeSlash-CufYGEeH.js";import"./CircleSlash-fkFT3oU4.js";import"./Pencil-DncpSyE8.js";import"./FullførStillingModal-7ft2GAJw.js";import"./PersonbrukerTekst-CaEC__-z.js";import"./ClockDashed-BQO0t7s7.js";import"./IkonNavnAvatar-ZfFXFCIw.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BEklZwX3.js";import"./ErrorBoundary-CdK6EAcd.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
