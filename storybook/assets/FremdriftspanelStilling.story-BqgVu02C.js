import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-H0yXMhS1.js";import{w as m,c as D}from"./ContextDecorators-rrH6Qgpd.js";import{F as N,A as v}from"./FullførtStilling-BU1QDEWP.js";import{R as T}from"./GjenåpneStillingKnapp-B7PaZaL6.js";import{T as A}from"./TilgangskontrollForInnhold-B2OKNXdw.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CstOaRqK.js";import"./OrganisasjonsnummerAlert-DgqamFsY.js";import"./VStack-DuONN55V.js";import"./BasePrimitive-BySfJsgO.js";import"./List-CRqFUcZT.js";import"./Link-DjgNZ7Vx.js";import"./KandidatHendelseTag-DMO9BgC6.js";import"./Tag-CQgnWam6.js";import"./ChatExclamationmark-DH6ks_jL.js";import"./FileXMark-B_lp7Wpe.js";import"./Trash-4WmyzpwM.js";import"./HandShakeHeart--NoS2pbw.js";import"./Calendar-B6CKet49.js";import"./ThumbUp-EBUKBeKD.js";import"./Table-BG7Ck02Y.js";import"./util-B1yZnOMj.js";import"./format-BYB0Al8D.js";import"./match-CE8FlIHe.js";import"./parse-xp8_Zj_H.js";import"./getDefaultOptions-CtDkAiXh.js";import"./parseISO-CxhTcv8Q.js";import"./index-Btc70d1l.js";import"./index-B40KJ5b4.js";import"./isBefore-Bec-1C9E.js";import"./util-BbrPoFAq.js";import"./accordion-D8ea0MXi.js";import"./index-CPuk6ipK.js";import"./index-jzJfd5_O.js";import"./index-9vspA7j9.js";import"./ChevronDown-kwX6RnPU.js";import"./Box-Bd7kQ_bj.js";import"./Bell-JhcpwVUT.js";import"./PersonChat-BCZAxxqD.js";import"./Eye-D7PBPObk.js";import"./ProgressBar-3XpTLVL1.js";import"./EyeSlash-_z4uRw4m.js";import"./CircleSlash-DFVkbCMW.js";import"./Modal-KxOY_8Qo.js";import"./floating-ui.react-DR0cSvZz.js";import"./Date.Input-BgeletWy.js";import"./useFormField-BlZm1T9Z.js";import"./useControllableState-B0Zl1xS9.js";import"./Modal.context-B1iRXIBr.js";import"./Checkbox-DzJcDlSt.js";import"./Fieldset-CXJEwjFR.js";import"./Pencil-Bc7qzJjg.js";import"./PersonbrukerTekst-Db6CEEAu.js";import"./ClockDashed-CsLDGNE4.js";import"./Tasklist-D9LSUm7m.js";import"./ErrorBoundary-CjgC4kmT.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
