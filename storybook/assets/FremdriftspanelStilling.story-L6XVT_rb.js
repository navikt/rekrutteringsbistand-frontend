import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-C9qr6ajT.js";import{w as m,c as D}from"./ContextDecorators-DTv2s1e8.js";import{F as _,A as v}from"./FullførtStilling-BXpip_eG.js";import{R as T}from"./GjenåpneStillingKnapp-C6BULebZ.js";import{T as A}from"./TilgangskontrollForInnhold-9qQd8T-K.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DCvRCgz8.js";import"./OrganisasjonsnummerAlert-Cxu3-gsQ.js";import"./VStack-sPDQevDu.js";import"./BasePrimitive-Do5WjwtA.js";import"./Box-CqzY5P6E.js";import"./List-BE3Qx1bR.js";import"./Link-hPgkhGBp.js";import"./KandidatHendelseTag-B7_qO63l.js";import"./Tag-DTpHsMkP.js";import"./ChatExclamationmark-OHyhugA4.js";import"./FileXMark-BjBZIB9l.js";import"./Trash-DWh3-6YG.js";import"./HandShakeHeart-CNcTNguu.js";import"./Calendar-Bgrd5uO8.js";import"./ThumbUp-ChhFSAgX.js";import"./ExclamationmarkTriangle-NYyxQjsX.js";import"./Table-CEb8gThy.js";import"./index-Cs4qgHe1.js";import"./index-B40KJ5b4.js";import"./util-B6mb53Gu.js";import"./DatoVelger-P_ZBD_j7.js";import"./useDatepicker-DKKLMM08.js";import"./useControllableState-ysvxf6Tl.js";import"./Modal-CHNKsO9J.js";import"./floating-ui.react-bRhtECzu.js";import"./useFormField-JMrQ0xT4.js";import"./ReadMore-DBRsQsx-.js";import"./ChevronDown-C5SPUB4O.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DTYWJsJ9.js";import"./Modal.context-DGkPTSJ2.js";import"./Popover-lD4eHY-s.js";import"./DismissableLayer-szL1Inc1.js";import"./startOfMonth-COc3k--F.js";import"./Select-CiUn5nIk.js";import"./endOfMonth-Dx-1Jxhy.js";import"./ArrowLeft-ajWIKcEg.js";import"./ArrowRight-BH6yQjwK.js";import"./isSameDay-CoEYjxeC.js";import"./Checkbox-DdoTYe98.js";import"./Fieldset-C3JyvIdj.js";import"./accordion-B4rrD3NK.js";import"./index-7Fc47zxp.js";import"./index-ghrD2OEQ.js";import"./index-nuUpaiOx.js";import"./ProgressBar-DJsxAWqP.js";import"./useValueAsRef-COtXxh9x.js";import"./Bell-CxD7Qamw.js";import"./PersonChat-C3ujdHBo.js";import"./Eye-BZUyW7_y.js";import"./ShieldLock-Dn5TGXQC.js";import"./PadlockLocked-Dh_TYNFm.js";import"./EyeSlash-Dz8FMDwk.js";import"./CircleSlash-DsP5rppw.js";import"./Pencil-CWWibKjR.js";import"./FullførStillingModal-BIO37GJ7.js";import"./PersonbrukerTekst-DWEHSbXp.js";import"./ClockDashed-NKLfJBx8.js";import"./IkonNavnAvatar-DvSzjGFe.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DBL1EwRF.js";import"./ErrorBoundary-DRa_z84b.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
