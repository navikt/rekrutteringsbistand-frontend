import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DwCeUcpF.js";import{w as m,c as D}from"./ContextDecorators-DosWQLJK.js";import{F as N,A as v}from"./FullførtStilling-Be8lf8Gp.js";import{R as T}from"./GjenåpneStillingKnapp-rMzW_rnA.js";import{T as A}from"./TilgangskontrollForInnhold-BeH6JuVN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-ChP9k33A.js";import"./OrganisasjonsnummerAlert-CoXjmlwF.js";import"./VStack-D6hOBrE4.js";import"./BasePrimitive-Jh0xf_JO.js";import"./List-D9io_hwL.js";import"./Link-BOXQ--_T.js";import"./KandidatHendelseTag-DMrzV7Tn.js";import"./Tag-DVJQu9tw.js";import"./ChatExclamationmark-gKxU5Or8.js";import"./FileXMark-jm5k5WE5.js";import"./Trash-dx6nwkck.js";import"./HandShakeHeart-D82zD2iw.js";import"./Calendar-BLuLYfCH.js";import"./ThumbUp-DQKSXmIX.js";import"./Table-Dj9aueVg.js";import"./util-BItQrrej.js";import"./format-BMhxV5pv.js";import"./match-CB3mvxqp.js";import"./parse-CzlhRlc5.js";import"./getDefaultOptions-BnFjI66N.js";import"./parseISO-N1d7_gMU.js";import"./index-BEKt7dbX.js";import"./index-B40KJ5b4.js";import"./isBefore-XnSLFwsW.js";import"./util-BRXlMc76.js";import"./accordion-Dm9j5s3t.js";import"./index-2aQQ4kU2.js";import"./index-Br9aBSQU.js";import"./index-BKHDRxXy.js";import"./ChevronDown-D5-1Qh-a.js";import"./Box-mCGaoEcG.js";import"./Bell-ChhSgpxi.js";import"./PersonChat-Ds1MSjOl.js";import"./Eye-CLJvAIH_.js";import"./ProgressBar-DnINtdf1.js";import"./EyeSlash-mgfnBtBc.js";import"./CircleSlash-DqpH1Na5.js";import"./Modal-gYe538qt.js";import"./floating-ui.react-CFeW6sX0.js";import"./Date.Input-x0C3NBAs.js";import"./useFormField-20kFEF7J.js";import"./useControllableState-CdwTxnNv.js";import"./Modal.context-CbGkjZ7C.js";import"./Checkbox-yTVacmwt.js";import"./Fieldset-CyPkleK0.js";import"./Pencil-DENLPI5N.js";import"./PersonbrukerTekst-CgnLh2dv.js";import"./ClockDashed-BJb49rlM.js";import"./Tasklist-C06M4Ly8.js";import"./ErrorBoundary-BgRFN4wX.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
