import{ap as I,I as w,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,N as y,cP as N}from"./iframe-CAw-ouFU.js";import{w as m,c as D}from"./ContextDecorators-Dtyz0c9y.js";import{F as _,A as v}from"./FullførtStilling-CtUHkzD7.js";import{R as T}from"./GjenåpneStillingKnapp-CZmwjizi.js";import{T as A}from"./TilgangskontrollForInnhold-CyVgv1Pz.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DZbPDdFr.js";import"./OrganisasjonsnummerAlert-BTVHVsk8.js";import"./VStack-DmbzPDu2.js";import"./BasePrimitive-DNA_EDjk.js";import"./Box-Dv8Q1uI1.js";import"./List-D-26_DGq.js";import"./Link-nyMi0yzP.js";import"./KandidatHendelseTag-DHT8L6b1.js";import"./Tag-KYDN1iTd.js";import"./ChatExclamationmark-5ROYrAqU.js";import"./FileXMark-DXGCpJdw.js";import"./Trash-BJD9PGNe.js";import"./HandShakeHeart-CJySRICZ.js";import"./Calendar-CxHTABhI.js";import"./ThumbUp-Bo3XgmzN.js";import"./ExclamationmarkTriangle-BN2M502l.js";import"./Table-Bq_P-05h.js";import"./index-Bj4NLN9P.js";import"./index-B40KJ5b4.js";import"./util-Bj1y6LrW.js";import"./DatoVelger-DnxxTzte.js";import"./useDatepicker-CwxdexWV.js";import"./useControllableState-BkJ0YlGV.js";import"./Modal-Bfo0SBIi.js";import"./floating-ui.react-DNmGgPj-.js";import"./useFormField-DEADPuFr.js";import"./ReadMore-CIAtE5ac.js";import"./ChevronDown-CeYxn9vA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D6WqdrFI.js";import"./Modal.context-CwD_lHOd.js";import"./Popover-tKnqhCZO.js";import"./DismissableLayer-DqRfWjts.js";import"./startOfMonth-C2Hzd9AR.js";import"./Select-CP4qSFp3.js";import"./endOfMonth-BkJQ3HFL.js";import"./ArrowLeft-DnOZ2WMP.js";import"./ArrowRight-lg5-hzEO.js";import"./isSameDay-CU5AE5em.js";import"./Checkbox-CohbAb9z.js";import"./Fieldset-Ca3EmJ2V.js";import"./accordion-BBsAcbUS.js";import"./index-DZj_95B-.js";import"./index-B677KJ4s.js";import"./index-BEy7GPps.js";import"./ProgressBar-BAsL-a9K.js";import"./useValueAsRef-B-4EPICH.js";import"./Bell-B2XM-C7K.js";import"./PersonChat-CGz0sOYx.js";import"./Eye-BoQ6Y2JX.js";import"./ShieldLock-CVUVaFJ5.js";import"./PadlockLocked-CBvxrzID.js";import"./EyeSlash-DlJf4aD1.js";import"./CircleSlash-BE8iT8VD.js";import"./Pencil-DAP5TFQZ.js";import"./FullførStillingModal-BToS4VQH.js";import"./PersonbrukerTekst-C2axfJAv.js";import"./ClockDashed-BjQb7WnZ.js";import"./IkonNavnAvatar-5p2Zv7H3.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CIBoa7WZ.js";import"./ErrorBoundary-CMK99cmk.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
