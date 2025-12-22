import{aw as I,T as w,j as t,x as k,S as x,cz as j,cI as b,cH as g,cA as u,X as y,c$ as _}from"./iframe-dDyLELCN.js";import{w as m,c as D}from"./ContextDecorators-ClfIIYPG.js";import{F as N,A as v}from"./FullførtStilling-DNoiP6qt.js";import{R as T}from"./GjenåpneStillingKnapp-CT4GZAW0.js";import{T as A}from"./TilgangskontrollForInnhold-D40jGWl4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-29_U6Mp7.js";import"./OrganisasjonsnummerAlert-DkZcrKX0.js";import"./VStack-jPI2_5MN.js";import"./BasePrimitive-B9_PGHxz.js";import"./List-DX2Nsu8R.js";import"./Link-BHHifg93.js";import"./KandidatHendelseTag-KOWE9ntz.js";import"./Tag-5nFgEjDD.js";import"./ChatExclamationmark-clHFKuI8.js";import"./FileXMark-BPctVBRQ.js";import"./Trash-VOyAOEn3.js";import"./HandShakeHeart-r3C8OKTj.js";import"./Calendar-BsgMjBiK.js";import"./ThumbUp-CkfxuxUI.js";import"./ExclamationmarkTriangle-DeVuXY-G.js";import"./Table-mRucO3Hx.js";import"./index-BfWeFRSW.js";import"./index-B40KJ5b4.js";import"./util-CBgO15wo.js";import"./DatoVelger-DAtxB8gJ.js";import"./useDatepicker-BXW-kU8C.js";import"./useControllableState-DB-5zWXL.js";import"./Modal-Cn4DiLEm.js";import"./floating-ui.react-C9yisIqS.js";import"./Date.Input-BNgyAyBN.js";import"./useFormField-BguGJLCY.js";import"./ChevronDown-COKw2Fvl.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-_reS0PqZ.js";import"./Modal.context-CyJwV-9C.js";import"./Popover-D7lwJy2p.js";import"./DismissableLayer-C-7oYFSu.js";import"./startOfMonth-BxjHNBpr.js";import"./Select-BN1hy_VN.js";import"./endOfMonth-DoJSIoQf.js";import"./ArrowLeft-C1FopD5u.js";import"./ArrowRight-CF4zxWQa.js";import"./isSameDay-2GuRG7U9.js";import"./Checkbox-ChfVtTlc.js";import"./Fieldset-CkITidrn.js";import"./accordion-C_F2O6Jp.js";import"./index-0_IBKXsV.js";import"./index-Bm5krBrT.js";import"./index-BOhH_f6J.js";import"./Box-CWCuGFT8.js";import"./Bell-DlqLuL6t.js";import"./PersonChat-DVy9MOkL.js";import"./Eye-CIrEzaQU.js";import"./ProgressBar-9SwgkgLx.js";import"./useLatestRef-CYtNFwCZ.js";import"./ShieldLock-BHSSSzbu.js";import"./PadlockLocked-D1Iu9XSG.js";import"./EyeSlash-Br4fadCv.js";import"./CircleSlash-CeSptrV0.js";import"./Pencil-uNLTvCBs.js";import"./FullførStillingModal-CxbQcrDk.js";import"./PersonbrukerTekst-B3jgQxgr.js";import"./ClockDashed-Brj6YEIF.js";import"./IkonNavnAvatar-DkH3fO1z.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-ruzLKvHj.js";import"./ErrorBoundary-Bb17ut-Z.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
