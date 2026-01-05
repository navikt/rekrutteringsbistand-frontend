import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-CYiyhWTI.js";import{w as m,c as D}from"./ContextDecorators-FbtIT-Vt.js";import{F as N,A as v}from"./FullførtStilling-DlJFioxd.js";import{R as T}from"./GjenåpneStillingKnapp-BN1I5yOC.js";import{T as A}from"./TilgangskontrollForInnhold-CjnTfA2t.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Ch3xKDrZ.js";import"./OrganisasjonsnummerAlert-3zleYlEj.js";import"./VStack-ClVH4Ku2.js";import"./BasePrimitive-BTpmfR_9.js";import"./List-BX-O7rcO.js";import"./Link-BYs-f_YW.js";import"./KandidatHendelseTag-Dr6MGsc9.js";import"./Tag-BKIF4Jhe.js";import"./ChatExclamationmark-CoE-goaS.js";import"./FileXMark-DacbSndw.js";import"./Trash-Chy14LSL.js";import"./HandShakeHeart-CE36xryi.js";import"./Calendar-BpKyObVo.js";import"./ThumbUp-DK4Sl93n.js";import"./ExclamationmarkTriangle-ngfBzqY_.js";import"./Table-BEF106oA.js";import"./index-WIlmYY_z.js";import"./index-B40KJ5b4.js";import"./util-DW5zFozq.js";import"./DatoVelger-CbymamXj.js";import"./useDatepicker-BJltuT1Q.js";import"./useControllableState-DtSoKbzt.js";import"./Modal-CLHJe2OT.js";import"./floating-ui.react-Bfz6SC7K.js";import"./Date.Input-Bkr6PkeN.js";import"./useFormField-gfWUKjlL.js";import"./ChevronDown-BL_ttcBG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BS5rsZoI.js";import"./Modal.context-DDFbhODk.js";import"./Popover-DAgsnI6R.js";import"./DismissableLayer-BNLVEwnI.js";import"./startOfMonth-CwpmYB9I.js";import"./Select-D_BNzSBp.js";import"./endOfMonth-C1HM__P8.js";import"./ArrowLeft-D_Y2IFjv.js";import"./ArrowRight-mY7SMA0h.js";import"./isSameDay-C1Vl9Pow.js";import"./Checkbox-DyngCYy6.js";import"./Fieldset-D0UN3B57.js";import"./accordion-tOyvk4NQ.js";import"./index-B0xb5F5b.js";import"./index-CMWeF18J.js";import"./index-CT3ZZ-yl.js";import"./Box-CaX4cs1j.js";import"./Bell-exkedDMX.js";import"./PersonChat-w5fk3BXe.js";import"./Eye-crEV8oVk.js";import"./ProgressBar-mCwmq4Ix.js";import"./useLatestRef-Bu2gHKBl.js";import"./ShieldLock-Ixd3TraB.js";import"./PadlockLocked-CTU7VD7O.js";import"./EyeSlash-Cbrn_pAJ.js";import"./CircleSlash-D6uoY03w.js";import"./Pencil-CeSSF06Q.js";import"./FullførStillingModal-DGgy5Phs.js";import"./PersonbrukerTekst-DazV3bUr.js";import"./ClockDashed-BkmnGkw2.js";import"./IkonNavnAvatar-Vko_GW1q.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DsbYh3a_.js";import"./ErrorBoundary-CC6247jo.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Xt as default};
