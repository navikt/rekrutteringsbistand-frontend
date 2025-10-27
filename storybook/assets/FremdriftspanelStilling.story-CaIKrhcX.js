import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-BebJRiVm.js";import{w as m,c as D}from"./ContextDecorators-DNLxfNwR.js";import{F as N,A as v}from"./FullførtStilling-DCMtoOiR.js";import{R as T}from"./GjenåpneStillingKnapp-9NUVXyZd.js";import{T as A}from"./TilgangskontrollForInnhold-DxTDFNwx.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-joEcD6VU.js";import"./OrganisasjonsnummerAlert-B58diLk8.js";import"./VStack-ieBgEx_9.js";import"./BasePrimitive-D6Zi2XAC.js";import"./List-D9elBhoj.js";import"./Link-4eNfuCYY.js";import"./KandidatHendelseTag-AB7hUi_-.js";import"./Tag-CL3kJ4mm.js";import"./ChatExclamationmark-Bn6IsHl0.js";import"./FileXMark-DbPiFMgP.js";import"./Trash-DqIrZuIv.js";import"./HandShakeHeart-tczTNArD.js";import"./Calendar-DanYuDDB.js";import"./ThumbUp-_prN9aAy.js";import"./Table-C_EgM2uL.js";import"./util-D15lQn--.js";import"./format-CJcTvnkY.js";import"./match-DfPDRPQM.js";import"./parse-BXYDRMTi.js";import"./getDefaultOptions-B7iLoQN-.js";import"./parseISO-CrR--Dkd.js";import"./index-CjyM3s74.js";import"./index-B40KJ5b4.js";import"./isBefore-DChyuHjT.js";import"./util-CA16XgRB.js";import"./accordion-D9e_tOUb.js";import"./index-Cd1GILtu.js";import"./index-tVP_hNUU.js";import"./index-BY4-6rKf.js";import"./ChevronDown-Dvj_iGkM.js";import"./Box-RIhtWECd.js";import"./Bell-BuAgtGpE.js";import"./PersonChat-CltuADHG.js";import"./Eye-BBnC1zRD.js";import"./ProgressBar-Cr1hbozk.js";import"./EyeSlash-TH46RAWu.js";import"./CircleSlash-BcIq-Uwh.js";import"./Modal-BLbY6Jf6.js";import"./floating-ui.react-XWokGLuC.js";import"./Date.Input-ChXEZ9KO.js";import"./useFormField-mSV91YqM.js";import"./useControllableState-C2NTHZgX.js";import"./Modal.context-pT0tppVX.js";import"./Checkbox-CQAjfPqu.js";import"./Fieldset-DLfzx01U.js";import"./Pencil-CroXyOgI.js";import"./PersonbrukerTekst-DMeevwG0.js";import"./ClockDashed-BXE5Js2J.js";import"./Tasklist-BAWMRNWP.js";import"./ErrorBoundary-DvLPKtQb.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
