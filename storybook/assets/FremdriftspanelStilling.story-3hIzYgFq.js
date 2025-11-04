import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-Db4gm7sv.js";import{w as m,c as E}from"./ContextDecorators-CibIGTWJ.js";import{F as N,A as v}from"./FullførtStilling-C657eoIv.js";import{R as T}from"./GjenåpneStillingKnapp-BNMQS-iI.js";import{T as D}from"./TilgangskontrollForInnhold-mPdt51xD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CLqUZ3Uw.js";import"./OrganisasjonsnummerAlert-Bhvc_O9z.js";import"./VStack-B2qKtTfL.js";import"./BasePrimitive-DhGBNVQz.js";import"./List-B-NNREoJ.js";import"./Link-Cih-0lU6.js";import"./KandidatHendelseTag-CkAKNKFx.js";import"./Tag-CgnbrGVV.js";import"./ChatExclamationmark-DADSIgGk.js";import"./FileXMark-DSnF131M.js";import"./Trash-B6XvmmwI.js";import"./HandShakeHeart-DLUD7zrI.js";import"./Calendar-DhwXWgXC.js";import"./ThumbUp-BbZg4QkZ.js";import"./Table-DYWQUoU3.js";import"./util-Ene38gJ_.js";import"./parse-mbg283r7.js";import"./getDefaultOptions-D7gsGtTo.js";import"./parseISO-1W8p0znK.js";import"./index-B-98khB0.js";import"./index-B40KJ5b4.js";import"./isBefore-DeoMZcNr.js";import"./util-Gs1PX1Y8.js";import"./accordion-CHK_vlTv.js";import"./index-CHRzWQkJ.js";import"./index-BlM4RhtQ.js";import"./index-B3o1jkBa.js";import"./ChevronDown-B_BXj3bk.js";import"./Box-BqfaI-RB.js";import"./Bell-gKgQ74Lu.js";import"./PersonChat-BYm3QQ_k.js";import"./Eye-tKGPqsh8.js";import"./ProgressBar-DaeVyKX8.js";import"./EyeSlash-DbkGd28z.js";import"./CircleSlash-BdbzCmrD.js";import"./Modal-DOx5tVXR.js";import"./floating-ui.react-DQrCiaXj.js";import"./Date.Input-DvwDNPfH.js";import"./useFormField-Dd5ApiFV.js";import"./useControllableState-BzElCyNZ.js";import"./Modal.context-_lDx5AbH.js";import"./Checkbox-C3g7Wxdb.js";import"./Fieldset-RX0WGDDF.js";import"./Pencil-tRiImD2A.js";import"./PersonbrukerTekst-BgCg4UIb.js";import"./ClockDashed-tjHlB6Sf.js";import"./Tasklist-qduuCBNC.js";import"./ErrorBoundary-ChDegqpd.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
