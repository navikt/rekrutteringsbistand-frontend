import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-Dz5WkgO0.js";import{w as m,c as D}from"./ContextDecorators-CtqBMGek.js";import{F as N,A as v}from"./FullførtStilling-XcH6UnpC.js";import{R as T}from"./GjenåpneStillingKnapp-CfiMSHfv.js";import{T as A}from"./TilgangskontrollForInnhold-d2rDmoBz.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BXVVn83h.js";import"./OrganisasjonsnummerAlert-cue8hzmE.js";import"./VStack-BiEkvKf6.js";import"./BasePrimitive-CCDlBmCX.js";import"./List-BtiImhee.js";import"./Link-zoaxWdQX.js";import"./KandidatHendelseTag-CqRiatAU.js";import"./Tag-DDDFzLIg.js";import"./ChatExclamationmark-DMnkqLQD.js";import"./FileXMark-DIL-4EoH.js";import"./Trash-cluU2dwU.js";import"./HandShakeHeart-C1M5G_up.js";import"./Calendar-DzX_tnPl.js";import"./ThumbUp-DvB7mkr_.js";import"./Table-C0E7aHio.js";import"./util-Boa8LuGc.js";import"./format-z-6xuJmt.js";import"./match-CyEf2s84.js";import"./parse-DbdPPznS.js";import"./getDefaultOptions-XvlMf_q4.js";import"./parseISO-jKUOMyLd.js";import"./util-CKNMcXwP.js";import"./accordion-Wa6Yi44H.js";import"./index-BTyZ6MRJ.js";import"./index-BSFt1Fkh.js";import"./index-D9mzdVPs.js";import"./ChevronDown-BOcJumpe.js";import"./Box-B2bwjYJR.js";import"./Bell-CRD9pRiL.js";import"./PersonChat-DbY_eYQ6.js";import"./Eye-CcTbbHBp.js";import"./ProgressBar-C1F3s-rM.js";import"./EyeSlash-BZerh50g.js";import"./CircleSlash-D2skyiKS.js";import"./Modal-BT6NkbUJ.js";import"./floating-ui.react-BVd2IcmE.js";import"./Date.Input-DrgG06vb.js";import"./useFormField-DpLIdY3U.js";import"./useControllableState-XDgiReJF.js";import"./Modal.context-DYi7aOes.js";import"./Checkbox-aZJd8Va3.js";import"./Fieldset-CS0hCvXl.js";import"./Pencil-C63k0nm1.js";import"./PersonbrukerTekst-BqaORMLy.js";import"./ClockDashed-RmpaDYIg.js";import"./Tasklist-DL4ETDbv.js";import"./ErrorBoundary-DlrJLolQ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
