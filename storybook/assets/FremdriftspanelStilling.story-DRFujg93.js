import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-DggTbHTG.js";import{w as m,c as E}from"./ContextDecorators-DyVho6xR.js";import{F as N,A as v}from"./FullførtStilling-CW4ZE4Mt.js";import{R as T}from"./GjenåpneStillingKnapp-DAQC408R.js";import{T as D}from"./TilgangskontrollForInnhold-C1lisGO5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DMeHDc5N.js";import"./OrganisasjonsnummerAlert-M41sRSNT.js";import"./VStack-hdgZhtTs.js";import"./BasePrimitive-ByuUTuzm.js";import"./List-BSPQku7V.js";import"./Link-pfPgYY8Y.js";import"./KandidatHendelseTag-BaFxykvB.js";import"./Tag-BRlhBhoK.js";import"./ChatExclamationmark-Byyi9_9c.js";import"./FileXMark-OJrkdDfU.js";import"./Trash-CjvBN-wi.js";import"./HandShakeHeart-6_l6UwHP.js";import"./Calendar-Dxt1eeUH.js";import"./ThumbUp-DqjOC6jP.js";import"./Table-C8w8VGPD.js";import"./util-bQi_RKn_.js";import"./parse-B8VYaoTJ.js";import"./getDefaultOptions-C5cRSyku.js";import"./parseISO-7GUi4n0B.js";import"./index-DuzJlVVz.js";import"./index-B40KJ5b4.js";import"./isBefore-DVy4mKQn.js";import"./util-CRSb4gnp.js";import"./accordion-T0t5vUJv.js";import"./index-DkHHC_DQ.js";import"./index-CZYAZ--f.js";import"./index-BZUzPOs7.js";import"./ChevronDown-BhX91dAV.js";import"./Box-B6Pgl7g7.js";import"./Bell-B8Z6dJpX.js";import"./PersonChat-D5FkiRe5.js";import"./Eye-B-PNl_0H.js";import"./ProgressBar-DfbrIM0K.js";import"./EyeSlash-DNLZgiOT.js";import"./CircleSlash-_roTkGaE.js";import"./Modal-DkW9jzHA.js";import"./floating-ui.react-DflCFKju.js";import"./Date.Input-DjvJoNOi.js";import"./useFormField-Q0UaUZO-.js";import"./useControllableState-D2XNC1Vd.js";import"./Modal.context-naP120KI.js";import"./Checkbox-B_EQ2U38.js";import"./Fieldset-DM4sLQj6.js";import"./Pencil-7ToZ1x72.js";import"./PersonbrukerTekst-BjR2QbR7.js";import"./ClockDashed-DAsbyVL2.js";import"./Tasklist-DRHGkeRc.js";import"./ErrorBoundary-BeODvA9l.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
