import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-CpaCEoJu.js";import{w as m,c as D}from"./ContextDecorators-tvJqVhRB.js";import{F as _,A as v}from"./FullførtStilling-CNoFMN1O.js";import{R as T}from"./GjenåpneStillingKnapp-19WHXv6B.js";import{T as A}from"./TilgangskontrollForInnhold-BReVNMq9.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DYslwLvD.js";import"./OrganisasjonsnummerAlert-CBKTM_bV.js";import"./VStack-DZOHDKWr.js";import"./BasePrimitive-B0kOqQyV.js";import"./Box-B7IY5ylq.js";import"./List-Czd-EMJu.js";import"./Link-DQF4F1ji.js";import"./KandidatHendelseTag-kwJ1jV44.js";import"./Tag-BqYppfeq.js";import"./ChatExclamationmark-D3pUvoye.js";import"./FileXMark-CpKz2oGD.js";import"./Trash-W_8MUcLN.js";import"./HandShakeHeart-DQ_HFcAF.js";import"./Calendar-BLCRivOi.js";import"./ThumbUp-Ckly2uCF.js";import"./ExclamationmarkTriangle-D26JaztB.js";import"./Table-D9t9M2UJ.js";import"./index-Cu9Sbfix.js";import"./index-B40KJ5b4.js";import"./util-D3Hr9p3M.js";import"./DatoVelger-BwHPt4Qn.js";import"./useDatepicker-Bt0NVtgD.js";import"./useControllableState-C5_OEs8z.js";import"./Modal-Cgabz7Y8.js";import"./floating-ui.react-hy8tB0AH.js";import"./useFormField-Cqq2OdCv.js";import"./ReadMore-V7HVrQRM.js";import"./ChevronDown-DbzlDCwY.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Dbupq2RB.js";import"./Modal.context-D_dG1LGR.js";import"./Popover-DvtXZg9t.js";import"./DismissableLayer-YI4klIIr.js";import"./startOfMonth-nLATADly.js";import"./Select-DWixKBxo.js";import"./endOfMonth-DayAeDCS.js";import"./ArrowLeft-BhpLoz5c.js";import"./ArrowRight-CuOEeFLI.js";import"./isSameDay-Bk5c_ZWG.js";import"./Checkbox-BUFXOuOY.js";import"./Fieldset-Ds1zA65V.js";import"./accordion-DZxqOcFW.js";import"./index-BOcGDSVl.js";import"./index-GG7gA1S0.js";import"./index-bZq4CANm.js";import"./ProgressBar-DN9291hM.js";import"./useValueAsRef-DSWBXVQ5.js";import"./Bell-C3Gzt-u5.js";import"./PersonChat-C6ryrk0q.js";import"./Eye-DP1P_-mK.js";import"./ShieldLock-BtMdTkow.js";import"./PadlockLocked-CospdC9P.js";import"./EyeSlash-C9wmCsF_.js";import"./CircleSlash-CqqIAjqj.js";import"./Pencil-D15pN6uj.js";import"./FullførStillingModal-CEcSD4mb.js";import"./PersonbrukerTekst-CQjl1NnF.js";import"./ClockDashed-DfaKW8Sf.js";import"./IkonNavnAvatar-CpF1RYQp.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-gig0Xjyw.js";import"./ErrorBoundary-CRINXdcR.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
