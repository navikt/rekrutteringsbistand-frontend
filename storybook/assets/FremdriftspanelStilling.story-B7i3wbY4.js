import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-D1P1_UW8.js";import{w as m,c as D}from"./ContextDecorators-BRmtbSvJ.js";import{F as N,A as v}from"./FullførtStilling-DvyE5H3Q.js";import{R as T}from"./GjenåpneStillingKnapp-AkTEJPkT.js";import{T as A}from"./TilgangskontrollForInnhold-BNsXqe6_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C1pWQErK.js";import"./OrganisasjonsnummerAlert-DaW1RgFU.js";import"./VStack-DnXFRTfB.js";import"./BasePrimitive-DQPxH2SA.js";import"./List-C6rND9OD.js";import"./Link-DGeWC8PI.js";import"./KandidatHendelseTag-Gcto27zC.js";import"./Tag-BF0fVLzi.js";import"./ChatExclamationmark-NDb_v3yu.js";import"./FileXMark-DUHFId3R.js";import"./Trash-CcKvLfxV.js";import"./HandShakeHeart-BO6Hx1to.js";import"./Calendar-CUklSc48.js";import"./ThumbUp-BaU7Vlly.js";import"./Table-Btjy1hoN.js";import"./util-ClOszpdN.js";import"./format-lAfslPga.js";import"./match-C328oq0P.js";import"./parse-C8R03IWs.js";import"./getDefaultOptions-D8Wf4dlj.js";import"./parseISO-AXk05REW.js";import"./index-Dj3qVHhP.js";import"./index-B40KJ5b4.js";import"./isBefore-Dt5OoaD5.js";import"./util-LqgaeGCQ.js";import"./accordion-sp3HPaWc.js";import"./index-BOOJGM4-.js";import"./index-BfKekHkd.js";import"./index-BHG5uVJq.js";import"./ChevronDown-DrvMofhM.js";import"./Box-DVYDa21S.js";import"./Bell-mWF9Z0-w.js";import"./PersonChat-DDI8Q0Fw.js";import"./Eye-BQ2Tgzy8.js";import"./ProgressBar-BXbyc6Mx.js";import"./EyeSlash-B3f9p91V.js";import"./CircleSlash-DOT7J47t.js";import"./Modal-CIBZOMiW.js";import"./floating-ui.react-NqINbjK8.js";import"./Date.Input-9SqZ1cqs.js";import"./useFormField-DQ2U86-F.js";import"./useControllableState-BihhkRmU.js";import"./Modal.context-wTC2bp0_.js";import"./Checkbox-CFigypHq.js";import"./Fieldset-DNpFPC4y.js";import"./Pencil-CJ8diRAl.js";import"./PersonbrukerTekst-DiSPUx2Q.js";import"./ClockDashed-B7_07eRJ.js";import"./Tasklist-2pm6yfw7.js";import"./ErrorBoundary-CzZ_Eyb_.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
