import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-CV73DyWa.js";import{w as m,c as D}from"./ContextDecorators-B7wXlcn7.js";import{F as N,A as v}from"./FullførtStilling-C6oVdqqy.js";import{R as T}from"./GjenåpneStillingKnapp-BMOtQRoR.js";import{T as A}from"./TilgangskontrollForInnhold-CeN9kD_Q.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CjNOdAMg.js";import"./OrganisasjonsnummerAlert-DjE0GWHo.js";import"./VStack-cEHi9SUW.js";import"./BasePrimitive-B_De4CAh.js";import"./List-HnOz_kCx.js";import"./Link-57MGbgPS.js";import"./KandidatHendelseTag-DaWCieF5.js";import"./Tag-Dd3cMFTB.js";import"./ChatExclamationmark-BBPsMkee.js";import"./FileXMark-CgD9lN1y.js";import"./Trash--Kaxf-qN.js";import"./HandShakeHeart-C1iR4CaW.js";import"./Calendar-CapMgFXy.js";import"./ThumbUp-BSLXHmhe.js";import"./ExclamationmarkTriangle-BwwKE67-.js";import"./Table-B8F7NOQx.js";import"./index-DH0maD0N.js";import"./index-B40KJ5b4.js";import"./util-4kSLp8PR.js";import"./DatoVelger-BQSbj4in.js";import"./useDatepicker-Dv9fQY05.js";import"./useControllableState-C-h5BLq2.js";import"./Modal-CoJQlk_0.js";import"./floating-ui.react--4vdpoxG.js";import"./Date.Input-BqYKtR5d.js";import"./useFormField-ApOpuFuN.js";import"./ChevronDown-QpvSSQJL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-f8TwtSD1.js";import"./Modal.context-duSZOSEU.js";import"./Popover-C5sZQCnW.js";import"./DismissableLayer-Dluz05na.js";import"./startOfMonth-C8baYTQ1.js";import"./Select-CtcfYTHr.js";import"./endOfMonth-BlNvFjdQ.js";import"./ArrowLeft-CVMJULav.js";import"./ArrowRight-DyFydOM1.js";import"./isSameDay-DyM9dxef.js";import"./Checkbox-CothVBu3.js";import"./Fieldset-C15zo2ey.js";import"./accordion-BKQ9XPFb.js";import"./index-CsKn3XEG.js";import"./index-DUGNOdWQ.js";import"./index-CedtpR_k.js";import"./Box-D3F940EU.js";import"./Bell-i60Aw78Q.js";import"./PersonChat-BEtJrv5Y.js";import"./Eye-CTBJa5sG.js";import"./ProgressBar-CPG3alhi.js";import"./useLatestRef-DNsMjuQD.js";import"./ShieldLock-BN0boJq5.js";import"./PadlockLocked-vjfa9uks.js";import"./EyeSlash-C6lcbaNV.js";import"./CircleSlash-DYD3UppU.js";import"./Pencil-BiwAnQHV.js";import"./FullførStillingModal-DQeizc4Y.js";import"./PersonbrukerTekst-Da6ln1vV.js";import"./ClockDashed-6hbSGrW9.js";import"./IkonNavnAvatar-DBg1viBq.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CdPNWBDR.js";import"./ErrorBoundary-DpItaT2Q.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
