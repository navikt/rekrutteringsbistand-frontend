import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-CS4cw4gB.js";import{w as m,c as D}from"./ContextDecorators-BYson2Tm.js";import{F as _,A as v}from"./FullførtStilling-DoVJL7Bk.js";import{R as T}from"./GjenåpneStillingKnapp-CiHZeZr0.js";import{T as A}from"./TilgangskontrollForInnhold-DlxkEoTe.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BtHFg94K.js";import"./OrganisasjonsnummerAlert-DjukhxoG.js";import"./VStack-BxLT0d6X.js";import"./BasePrimitive-DDMhX20D.js";import"./Box-BVPjClTp.js";import"./List-AWxqnavx.js";import"./Link-CdKIer7e.js";import"./KandidatHendelseTag-Dim6KXxF.js";import"./Tag-DHnluFVD.js";import"./ChatExclamationmark-t88kacSQ.js";import"./FileXMark-Bnhenm1k.js";import"./Trash-CXIR7oXi.js";import"./HandShakeHeart-up2aL-a2.js";import"./Calendar-BxkcVKI0.js";import"./ThumbUp-CCLqk3ge.js";import"./ExclamationmarkTriangle-eudKkerf.js";import"./Table-DJs7crw0.js";import"./index-CFZJFg7l.js";import"./index-B40KJ5b4.js";import"./util-BdeMvgko.js";import"./DatoVelger-DIzjnL8A.js";import"./useDatepicker-BkNSDXoS.js";import"./useControllableState-d5HlKukQ.js";import"./Modal-BZ5C8WF8.js";import"./floating-ui.react-CvEZw-0s.js";import"./useFormField-DPcPQkwW.js";import"./ReadMore-CDsOAi5a.js";import"./ChevronDown-D2QCjj1N.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C1L6rLPT.js";import"./Modal.context-Cq02MwlR.js";import"./Popover-C7vs6pPC.js";import"./DismissableLayer-BWglAePK.js";import"./startOfMonth-BSjY8bXe.js";import"./Select-Bmokcs6T.js";import"./endOfMonth-DsU3qq4D.js";import"./ArrowLeft-Bcp3BqP1.js";import"./ArrowRight-Bhbbpg0E.js";import"./isSameDay-D_bUC1sf.js";import"./Checkbox-C7m8e-sh.js";import"./Fieldset-DdjKM8Wr.js";import"./accordion-B5UVw--Q.js";import"./index-Xg6l4zby.js";import"./index-9RuOa9dJ.js";import"./index-3jBsYYGx.js";import"./ProgressBar-B7CVP9g8.js";import"./useValueAsRef-hxxWJ-et.js";import"./Bell-JT5m-Tqm.js";import"./PersonChat-CTIAH8cM.js";import"./Eye-qtgq5i8U.js";import"./ShieldLock-C0MoUZHB.js";import"./PadlockLocked-BtOkmnQV.js";import"./EyeSlash-QRTIc9n2.js";import"./CircleSlash-Cy_b0hO1.js";import"./Pencil-D-g0pXTM.js";import"./FullførStillingModal-DJOZcS6X.js";import"./PersonbrukerTekst-DhYuBOpB.js";import"./ClockDashed-BXD76BXf.js";import"./IkonNavnAvatar-CpIVnhGX.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DvjEDNwm.js";import"./ErrorBoundary-D5x9PL53.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
