import{az as I,I as w,j as t,R as k,S as x,cx as j,cG as b,cF as g,cy as u,N as y,cZ as N}from"./iframe-CeBddf6m.js";import{w as m,c as D}from"./ContextDecorators-DSfdgtod.js";import{F as _,A as v}from"./FullførtStilling-B4pf1hTJ.js";import{R as T}from"./GjenåpneStillingKnapp-BoKIfrpX.js";import{T as A}from"./TilgangskontrollForInnhold-Ci3dfXaf.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CM7QZJj3.js";import"./OrganisasjonsnummerAlert-ONyq2mZG.js";import"./VStack-BOGXFEAk.js";import"./BasePrimitive-2FA-uqyG.js";import"./Box-iXv9vOXi.js";import"./List-I1LukFvB.js";import"./Link-D7bRtTL4.js";import"./KandidatHendelseTag-C2BWAqE5.js";import"./Tag-C39wB8zK.js";import"./ChatExclamationmark-CzmxQqFp.js";import"./FileXMark-BHg96SD7.js";import"./Trash-H2SbdjPz.js";import"./HandShakeHeart-9aaqo0N5.js";import"./Calendar-CNK4PSZI.js";import"./ThumbUp-qSlJSduX.js";import"./Table-MB4gVTvn.js";import"./index-COGfCL7v.js";import"./index-B40KJ5b4.js";import"./util-DZUmK0Iu.js";import"./DatoVelger-Cihn6oiR.js";import"./useDatepicker-BMijD7tT.js";import"./useControllableState-Z5xfEuBZ.js";import"./Modal-92vjN1xN.js";import"./floating-ui.react-yriId-T9.js";import"./useFormField-BCtgC-8M.js";import"./ReadMore-DTSsWHn5.js";import"./ChevronDown-CMHnjEAw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-LE5s5o8b.js";import"./Modal.context-DHabSalL.js";import"./Popover-BmAoqUAm.js";import"./DismissableLayer-BVglxUyP.js";import"./startOfMonth-BBQPkhfJ.js";import"./Select-CZxbg5_-.js";import"./endOfMonth-D-d-P7bd.js";import"./ArrowLeft-VOVuOfaa.js";import"./ArrowRight-C5QfxTHT.js";import"./isSameDay-DEyCkXY6.js";import"./Checkbox-4CAfXbOk.js";import"./Fieldset-Ci9MzniU.js";import"./accordion-D52MBE1k.js";import"./index-BLTazSsS.js";import"./index-CtIZv3S1.js";import"./index-Btn8-iws.js";import"./ProgressBar-DkWpGQxl.js";import"./useValueAsRef-BfGve3Gx.js";import"./Bell-Zj7U8zXc.js";import"./PersonChat-Cb_SnDlw.js";import"./Eye-BzZ6jhEN.js";import"./ShieldLock-rEpcw0Nh.js";import"./PadlockLocked-NfkHkh4M.js";import"./EyeSlash-BICKeSHu.js";import"./CircleSlash-CFC-8DwO.js";import"./Pencil-Bi7MUqrJ.js";import"./FullførStillingModal-BztitUt9.js";import"./PersonbrukerTekst-DXO-kVlp.js";import"./ClockDashed-CEWYYSzP.js";import"./IkonNavnAvatar-DvMwtOH_.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-sJPnKaG2.js";import"./ErrorBoundary-B3N5n7-B.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
