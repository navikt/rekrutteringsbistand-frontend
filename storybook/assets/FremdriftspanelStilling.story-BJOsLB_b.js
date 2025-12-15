import{aw as w,T as I,j as t,x as k,S as x,cz as j,cH as b,cG as g,cA as u,X as y,c$ as _}from"./iframe-CIT3DOWc.js";import{w as m,c as D}from"./ContextDecorators-DF2vqBdV.js";import{F as N,A as v}from"./FullførtStilling-CR8nMS2l.js";import{R as T}from"./GjenåpneStillingKnapp-D9kQDxsk.js";import{T as A}from"./TilgangskontrollForInnhold-EiS68odp.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-gxtO-ZJa.js";import"./OrganisasjonsnummerAlert-ByXAit9o.js";import"./VStack-DN1B3Ttz.js";import"./BasePrimitive-DCWy4zSg.js";import"./List-p9AHeWui.js";import"./Link-DuFyBj-D.js";import"./KandidatHendelseTag-Bjmrx7hf.js";import"./Tag-C1zXWBwF.js";import"./ChatExclamationmark-B-bsV1Hm.js";import"./FileXMark-B5eS1K0W.js";import"./Trash-D2WhF6M1.js";import"./HandShakeHeart-DHGWgA55.js";import"./Calendar-Czl3AQgB.js";import"./ThumbUp-Cej_gCOM.js";import"./Table-Wq5rUUcx.js";import"./index-BR14ZwBD.js";import"./index-B40KJ5b4.js";import"./util-zX2xrv_1.js";import"./DatoVelger-DOTtY6XB.js";import"./useDatepicker-DUKWdrMx.js";import"./useControllableState-CvPQYz3G.js";import"./Modal-D2WHDTqo.js";import"./floating-ui.react-Bj85ERGC.js";import"./Date.Input-B1f3hjBg.js";import"./useFormField-BmSNLWfL.js";import"./ChevronDown-Be8Qb0zv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CT6DomzI.js";import"./Modal.context-gu5GaKCS.js";import"./Popover-BrSDwvvq.js";import"./DismissableLayer-CQrPSSY1.js";import"./startOfMonth-CqqKejT6.js";import"./Select-Cp6ISNPq.js";import"./endOfMonth-D2dxYIKb.js";import"./ArrowLeft-CnSEDQuE.js";import"./ArrowRight-C_cssyyj.js";import"./isSameDay-CA3EjrQp.js";import"./Checkbox-72MwplIj.js";import"./Fieldset-zIuMhMJG.js";import"./accordion-DU30PICQ.js";import"./index-lOQ8BYJp.js";import"./index-BoYIUqb-.js";import"./index-dG-pNii3.js";import"./Box-Cu_-89rQ.js";import"./Bell-B-aeJk-W.js";import"./PersonChat-CLgqUbw4.js";import"./Eye-D470F1Dz.js";import"./ProgressBar-dFN_0o2O.js";import"./useLatestRef-T07qqzGv.js";import"./EyeSlash-Bq4cvXMM.js";import"./CircleSlash-CiOLYqpL.js";import"./Pencil-ClrUcgjP.js";import"./FullførStillingModal-C4DAYbyI.js";import"./PersonbrukerTekst-ezbXrs-i.js";import"./ClockDashed-C0Ic-Zx6.js";import"./IkonNavnAvatar-DIZWg8Oj.js";import"./umamiEvents-DSuxYBjR.js";import"./Tasklist-DxZa2eK2.js";import"./ErrorBoundary-DJTwaGgu.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
